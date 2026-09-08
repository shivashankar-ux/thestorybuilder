import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default async function handler(req, res) {
  // Set CORS headers
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
    return res.status(405).json({ ok: false, error: "Method not allowed. Use POST." });
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || process.env.ITE_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(401).json({
        ok: false,
        error: "Authentication failed. Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in environment variables.",
      });
    }

    const { amount, currency = "INR", receipt, ebook_id, buyer_name, buyer_email } = req.body || {};

    let finalAmountPaise = 0;

    if (amount !== undefined && amount !== null) {
      finalAmountPaise = Number(amount);
    } else if (ebook_id) {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: ebook } = await supabase
          .from("ebooks")
          .select("price_inr")
          .eq("id", ebook_id)
          .single();

        if (ebook?.price_inr) {
          finalAmountPaise = Math.round(Number(ebook.price_inr) * 100);
        }
      }
    }

    // Default minimum fallback if amount is missing
    if (!finalAmountPaise || isNaN(finalAmountPaise)) {
      finalAmountPaise = 49900; // ₹499 default
    }

    // Validation: Minimum amount 100 paise (₹1)
    if (finalAmountPaise < 100) {
      return res.status(400).json({
        ok: false,
        error: "Invalid amount. Minimum required amount is 100 paise (₹1).",
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receiptId = receipt || `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const razorpayOrder = await razorpay.orders.create({
      amount: finalAmountPaise,
      currency: currency || "INR",
      receipt: receiptId,
      notes: {
        buyer_name: buyer_name || "Customer",
        buyer_email: buyer_email || "",
        ebook_id: ebook_id || "",
      },
    });

    // Record pending order in Supabase if database available
    const supabase = getSupabaseClient();
    let dbOrderId = null;
    if (supabase && (ebook_id || buyer_email)) {
      try {
        const { data: orderData } = await supabase
          .from("orders")
          .insert({
            ebook_id: ebook_id || null,
            buyer_name: buyer_name || "Customer",
            buyer_email: buyer_email || "customer@example.com",
            razorpay_order_id: razorpayOrder.id,
            status: "pending",
          })
          .select()
          .single();

        dbOrderId = orderData?.id || null;
      } catch (dbErr) {
        console.warn("DB Order record skipped:", dbErr.message);
      }
    }

    return res.status(200).json({
      ok: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: keyId,
      receipt: razorpayOrder.receipt,
      db_order_id: dbOrderId,
    });
  } catch (err) {
    console.error("Razorpay Create Order API Error:", err);
    return res.status(500).json({
      ok: false,
      error: err?.message || "Failed to create Razorpay order.",
    });
  }
}
