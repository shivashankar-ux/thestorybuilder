import crypto from "crypto";
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

  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const supabase = getSupabaseServiceRoleClient();
    if (!supabase) {
      return res.status(500).json({ ok: false, error: "Supabase connection unavailable." });
    }

    // Support GET request for retrieving paid order download link by order_id
    if (req.method === "GET") {
      const orderId = req.query?.order_id;
      if (!orderId) {
        return res.status(400).json({ ok: false, error: "order_id parameter required" });
      }

      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .select("*, ebooks(*)")
        .eq("razorpay_order_id", orderId)
        .single();

      if (orderErr || !order) {
        return res.status(404).json({ ok: false, error: "Order not found." });
      }

      if (order.status !== "paid") {
        return res.status(400).json({ ok: false, error: "Order payment has not been verified yet.", status: order.status });
      }

      const ebook = order.ebooks;
      const fileStoragePath = ebook?.file_url || "";

      let signedUrl = null;
      if (fileStoragePath) {
        // Remove bucket name prefix if included in file_url string
        const cleanPath = fileStoragePath.replace(/^ebooks-private\//, "");
        const { data: signedData, error: signErr } = await supabase.storage
          .from("ebooks-private")
          .createSignedUrl(cleanPath, 86400); // 24 hours link

        if (!signErr && signedData?.signedUrl) {
          signedUrl = signedData.signedUrl;
        }
      }

      return res.status(200).json({
        ok: true,
        status: "paid",
        order: {
          id: order.id,
          buyer_name: order.buyer_name,
          buyer_email: order.buyer_email,
          created_at: order.created_at,
        },
        ebook: {
          title: ebook?.title,
          description: ebook?.description,
          cover_image_url: ebook?.cover_image_url,
        },
        download_url: signedUrl,
      });
    }

    // Handle POST request to verify payment signature
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        ok: false,
        error: "Missing required payment verification parameters.",
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(500).json({ ok: false, error: "Server missing RAZORPAY_KEY_SECRET." });
    }

    // Verify HMAC-SHA256 signature
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Razorpay signature mismatch:", { expectedSignature, razorpay_signature });

      // Mark order as failed in database
      await supabase
        .from("orders")
        .update({ status: "failed", razorpay_payment_id })
        .eq("razorpay_order_id", razorpay_order_id);

      return res.status(400).json({
        ok: false,
        error: "Invalid payment signature. Payment verification failed.",
      });
    }

    // Payment is authentic! Update order status to paid
    const { data: updatedOrder, error: updateErr } = await supabase
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id: razorpay_payment_id,
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .select("*, ebooks(*)")
      .single();

    if (updateErr || !updatedOrder) {
      console.error("Failed to update order status to paid:", updateErr);
      return res.status(500).json({ ok: false, error: "Failed to update order record." });
    }

    const ebook = updatedOrder.ebooks;
    const fileStoragePath = ebook?.file_url || "";

    // Generate expiring signed URL from private bucket
    let signedUrl = null;
    if (fileStoragePath) {
      const cleanPath = fileStoragePath.replace(/^ebooks-private\//, "");
      const { data: signedData, error: signErr } = await supabase.storage
        .from("ebooks-private")
        .createSignedUrl(cleanPath, 86400);

      if (!signErr && signedData?.signedUrl) {
        signedUrl = signedData.signedUrl;
      } else {
        console.error("Error creating signed URL:", signErr);
      }
    }

    // Send email notification via Resend API if key is available
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && signedUrl) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "The Story Builder <downloads@thestorybuilder.in>",
            to: [updatedOrder.buyer_email],
            subject: `Your Ebook Download: ${ebook.title}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; max-width: 600px; color: #111;">
                <h2>Thank you for your purchase, ${updatedOrder.buyer_name}!</h2>
                <p>You have successfully purchased <strong>${ebook.title}</strong>.</p>
                <p>Click the button below to download your ebook. This link is valid for 24 hours:</p>
                <div style="margin: 30px 0;">
                  <a href="${signedUrl}" style="background-color: #f97316; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Download Ebook PDF</a>
                </div>
                <p style="font-size: 12px; color: #666;">If you have any questions or need help, reply directly to this email or visit thestorybuilder.in.</p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send download email via Resend:", emailErr);
      }
    }

    return res.status(200).json({
      ok: true,
      status: "paid",
      order_id: razorpay_order_id,
      download_url: signedUrl,
      ebook: {
        title: ebook?.title,
        description: ebook?.description,
      },
    });
  } catch (err) {
    console.error("Razorpay Verify Error:", err);
    return res.status(500).json({ ok: false, error: err?.message || "Verification failed." });
  }
}
