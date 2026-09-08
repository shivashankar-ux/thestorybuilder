import fs from "fs";
import path from "path";
import Razorpay from "razorpay";

// Read .env manually
const envContent = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
const envVars = {};
envContent.split("\n").forEach(line => {
  const [k, v] = line.split("=");
  if (k && v) envVars[k.trim()] = v.trim();
});

async function testRazorpay() {
  const keyId = envVars.RAZORPAY_KEY_ID || envVars.VITE_RAZORPAY_KEY_ID;
  const keySecret = envVars.RAZORPAY_KEY_SECRET;

  console.log("Testing Razorpay Order Creation...");
  console.log("Key ID:", keyId);
  console.log("Key Secret Present:", !!keySecret);

  if (!keyId || !keySecret) {
    console.error("Missing keys!");
    return;
  }

  try {
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: 49900,
      currency: "INR",
      receipt: `test_${Date.now()}`,
      notes: { test: "true" }
    });

    console.log("SUCCESS! Razorpay Order Created:", order.id);
  } catch (err) {
    console.error("RAZORPAY API ERROR:", err);
  }
}

testRazorpay();
