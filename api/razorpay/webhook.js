import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

function getSupabaseServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Disable body parsing in Vercel function to get raw body if needed
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    if (!webhookSecret) {
      console.warn("RAZORPAY_WEBHOOK_SECRET is not configured on the server.");
      return res.status(200).json({ ok: true, note: "Webhook secret missing, skipped signature validation" });
    }

    if (!signature) {
      return res.status(400).json({ ok: false, error: "Missing x-razorpay-signature header." });
    }

    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Razorpay webhook signature validation failed.");
      return res.status(400).json({ ok: false, error: "Invalid webhook signature." });
    }

    const payload = req.body || {};
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;

    if (event === "payment.captured" || event === "order.paid") {
      const razorpayOrderId = paymentEntity?.order_id;
      const razorpayPaymentId = paymentEntity?.id;

      if (razorpayOrderId) {
        const supabase = getSupabaseServiceRoleClient();
        if (supabase) {
          await supabase
            .from("orders")
            .update({
              status: "paid",
              razorpay_payment_id: razorpayPaymentId,
            })
            .eq("razorpay_order_id", razorpayOrderId);
        }
      }
    }

    return res.status(200).json({ ok: true, status: "processed" });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return res.status(500).json({ ok: false, error: "Internal server error." });
  }
}
