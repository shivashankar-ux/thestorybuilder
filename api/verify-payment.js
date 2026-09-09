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

      // Automatically email the ebook download link to the buyer
      if (updatedOrder && updatedOrder.buyer_email && signedUrl) {
        try {
          const smtpUser = process.env.SMTP_EMAIL;
          const smtpPass = process.env.SMTP_PASSWORD;
          
          if (smtpUser && smtpPass) {
            // dynamic import to avoid bundling issues if possible, but static import at top is better
            // We'll use a dynamic import for nodemailer here to ensure it's only loaded when needed
            const nodemailer = await import("nodemailer");
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
            });

            const mailOptions = {
              from: `"The Story Builder" <${smtpUser}>`,
              to: updatedOrder.buyer_email,
              subject: `Your Ebook Purchase: ${ebook.title}`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
                  <h2 style="color: #f97316;">Thank you for your purchase!</h2>
                  <p>Hi ${updatedOrder.buyer_name || "Customer"},</p>
                  <p>We have successfully received your payment for <strong>${ebook.title}</strong>.</p>
                  <p>You can download your secure digital copy using the button below. Please note that this link expires in 24 hours.</p>
                  <div style="margin: 30px 0; text-align: center;">
                    <a href="${signedUrl}" style="background-color: #f97316; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Download Ebook</a>
                  </div>
                  <p style="font-size: 13px; color: #666;">If the button doesn't work, copy and paste this link into your browser:<br><br>${signedUrl}</p>
                  <p>If you have any issues, reply directly to this email and our support team will help you out!</p>
                  <p>Best regards,<br><strong>The Story Builder Team</strong></p>
                </div>
              `,
            };

            await transporter.sendMail(mailOptions);
            console.log("Purchase email sent successfully to", updatedOrder.buyer_email);
          } else {
            console.warn("SMTP_EMAIL or SMTP_PASSWORD not set. Skipping email delivery.");
          }
        } catch (emailErr) {
          console.error("Failed to send purchase email:", emailErr);
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
