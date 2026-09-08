import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://prxgbhxjdesjsybrskhx.supabase.co";
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

  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed. Use POST." });
  }

  try {
    const supabase = getSupabaseClient();

    // Support GET status check for order verification
    if (req.method === "GET") {
      const orderId = req.query?.order_id;
      if (!orderId) {
        return res.status(400).json({ ok: false, error: "Missing order_id parameter." });
      }

      if (supabase) {
        const { data: order } = await supabase
          .from("orders")
          .select("*, ebooks(*)")
          .eq("razorpay_order_id", orderId)
          .single();

        if (order && order.status === "paid") {
          let signedUrl = null;
          if (order.ebooks?.file_url) {
            const cleanPath = order.ebooks.file_url.replace(/^ebooks-private\//, "");
            const { data: signedData } = await supabase.storage
              .from("ebooks-private")
              .createSignedUrl(cleanPath, 86400);
            signedUrl = signedData?.signedUrl || null;
          }

          return res.status(200).json({
            ok: true,
            status: "paid",
            order,
            download_url: signedUrl,
          });
        }
      }

      return res.status(200).json({ ok: true, status: "paid", message: "Order processed." });
    }

    // POST: Signature Verification
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.",
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(500).json({
        ok: false,
        error: "Server configuration error. RAZORPAY_KEY_SECRET is missing.",
      });
    }

    // Compute HMAC-SHA256 signature
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Razorpay signature mismatch:", { generatedSignature, razorpay_signature });

      // Mark order as failed in database if available
      if (supabase) {
        await supabase
          .from("orders")
          .update({ status: "failed", razorpay_payment_id })
          .eq("razorpay_order_id", razorpay_order_id);
      }

      return res.status(400).json({
        ok: false,
        error: "Signature verification failed. Generated signature does not match razorpay_signature.",
      });
    }

    // Signatures match! Update database if available
    let signedUrl = null;
    let ebook = null;

    if (supabase) {
      const { data: updatedOrder } = await supabase
        .from("orders")
        .update({ status: "paid", razorpay_payment_id })
        .eq("razorpay_order_id", razorpay_order_id)
        .select("*, ebooks(*)")
        .single();

      if (updatedOrder?.ebooks) {
        ebook = updatedOrder.ebooks;
        if (ebook.file_url) {
          const cleanPath = ebook.file_url.replace(/^ebooks-private\//, "");
          const { data: signedData } = await supabase.storage
            .from("ebooks-private")
            .createSignedUrl(cleanPath, 86400);
          signedUrl = signedData?.signedUrl || null;
        }
      }
    }

    return res.status(200).json({
      ok: true,
      message: "Payment verified successfully.",
      status: "paid",
      razorpay_order_id,
      razorpay_payment_id,
      download_url: signedUrl,
      ebook,
    });
  } catch (err) {
    console.error("Razorpay Payment Verification API Error:", err);
    return res.status(500).json({
      ok: false,
      error: err?.message || "Failed to verify Razorpay payment.",
    });
  }
}
