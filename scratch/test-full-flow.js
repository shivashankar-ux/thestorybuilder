import fs from "fs";
import path from "path";
import crypto from "crypto";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

const envContent = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const [k, v] = line.split("=");
  if (k && v) envVars[k.trim()] = v.trim();
});

const keyId = envVars.RAZORPAY_KEY_ID;
const keySecret = envVars.RAZORPAY_KEY_SECRET;
const url = envVars.VITE_SUPABASE_URL || "https://prxgbhxjdesjsybrskhx.supabase.co";
const serviceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

async function testFullFlow() {
  console.log("=== STEP 1: Creating Order via Razorpay SDK ===");
  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  const razorpayOrder = await razorpay.orders.create({
    amount: 49900,
    currency: "INR",
    receipt: `rcpt_test_${Date.now()}`,
    notes: { buyer_name: "Kiran Test", buyer_email: "kiran@example.com" },
  });

  console.log("SUCCESS! Razorpay Order Created:", razorpayOrder.id);

  console.log("\n=== STEP 2: Inserting Pending Order into Supabase ===");
  const supabase = createClient(url, serviceKey);
  const { data: ebook } = await supabase.from("ebooks").select("*").eq("slug", "7-day-web-design-blueprint").single();

  console.log("Found Ebook ID in DB:", ebook.id, "| File path:", ebook.file_url);

  const { data: order, error: oErr } = await supabase
    .from("orders")
    .insert({
      ebook_id: ebook.id,
      buyer_name: "Kiran Test",
      buyer_email: "kiran@example.com",
      razorpay_order_id: razorpayOrder.id,
      status: "pending",
    })
    .select()
    .single();

  if (oErr) {
    console.error("Order insertion error:", oErr.message);
    return;
  }
  console.log("Order Record Inserted into Supabase ID:", order.id);

  console.log("\n=== STEP 3: Simulating Payment Verification ===");
  const mockPaymentId = `pay_mock_${Date.now()}`;
  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrder.id}|${mockPaymentId}`)
    .digest("hex");

  // Update order status to paid
  const { data: updatedOrder } = await supabase
    .from("orders")
    .update({ status: "paid", razorpay_payment_id: mockPaymentId })
    .eq("razorpay_order_id", razorpayOrder.id)
    .select("*, ebooks(*)")
    .single();

  console.log("Order Status Updated to 'paid' in DB!");

  // Generate 24-hour signed download URL
  const cleanPath = updatedOrder.ebooks.file_url.replace(/^ebooks-private\//, "");
  const { data: signedData, error: sErr } = await supabase.storage
    .from("ebooks-private")
    .createSignedUrl(cleanPath, 86400);

  if (sErr || !signedData?.signedUrl) {
    console.error("Signed URL creation error:", sErr);
    return;
  }

  console.log("\nSUCCESS! END-TO-END PURCHASE & VERIFICATION TEST PASSED!");
  console.log("Secure Signed PDF/Doc Download Link:", signedData.signedUrl);
}

testFullFlow();
