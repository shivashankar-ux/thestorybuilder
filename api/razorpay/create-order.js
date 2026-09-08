import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

function getSupabaseServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default async function handler(req, res) {
  // CORS & Method Check
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { ebook_id, buyer_name, buyer_email } = req.body || {};

    if (!ebook_id || typeof ebook_id !== "string") {
      return res.status(400).json({ ok: false, error: "Invalid or missing ebook_id." });
    }

    if (!buyer_name || typeof buyer_name !== "string" || buyer_name.trim().length < 2) {
      return res.status(400).json({ ok: false, error: "Please enter a valid name." });
    }

    if (
      !buyer_email ||
      typeof buyer_email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer_email.trim())
    ) {
      return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables missing.");
      return res.status(500).json({
        ok: false,
        error: "Payment gateway configuration missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.",
      });
    }

    const supabase = getSupabaseServiceRoleClient();
    let ebook = null;

    const isUuid = typeof ebook_id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ebook_id);

    if (supabase && isUuid) {
      const { data } = await supabase
        .from("ebooks")
        .select("*")
        .eq("id", ebook_id)
        .single();
      ebook = data;
    }

    const priceInr = ebook?.price_inr || (req.body?.amount ? req.body.amount / 100 : 499);
    const amountInPaise = Math.round(Number(priceInr) * 100);

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receiptId = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptId,
      notes: {
        ebook_id: ebook_id || "",
        ebook_title: ebook?.title || "Digital Ebook",
        buyer_email: buyer_email.trim(),
        buyer_name: buyer_name.trim(),
      },
    });

    // Record pending order in Supabase orders table
    let dbOrderId = null;
    if (supabase) {
      const { data: orderData, error: orderErr } = await supabase
        .from("orders")
        .insert({
          ebook_id: isUuid ? ebook_id : null,
          buyer_name: buyer_name.trim(),
          buyer_email: buyer_email.trim(),
          razorpay_order_id: razorpayOrder.id,
          status: "pending",
        })
        .select()
        .single();

      if (orderErr) {
        console.error("Failed to insert pending order to DB:", orderErr);
      } else {
        dbOrderId = orderData?.id || null;
      }
    }

    return res.status(200).json({
      ok: true,
      order_id: razorpayOrder.id,
      key_id: keyId,
      amount: amountInPaise,
      currency: "INR",
      db_order_id: orderData?.id || null,
      ebook: {
        id: ebook.id,
        title: ebook.title,
        price_inr: ebook.price_inr,
      },
    });
  } catch (err) {
    console.error("Razorpay Create Order Error:", err);
    return res.status(500).json({
      ok: false,
      error: err?.message || "Failed to create payment order.",
    });
  }
}
