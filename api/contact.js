// In-memory rate limiting map for serverless execution environment
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 contact submissions per IP per 15 mins

function getClientIp(req) {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (xForwardedFor && typeof xForwardedFor === "string") {
    return xForwardedFor.split(",")[0].trim();
  }
  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "127.0.0.1";
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) rateLimitMap.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

function sanitizeText(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const clientIp = getClientIp(req);

  // Enforce IP Rate Limiting
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      ok: false,
      error: "Too many contact submissions from your network. Please try again in 15 minutes.",
    });
  }

  // Validate Origin / Referer domain header if present
  const origin = req.headers.origin || req.headers.referer || "";
  if (origin && !origin.includes("thestorybuilder.in") && !origin.includes("localhost") && !origin.includes("127.0.0.1") && !origin.includes("vercel.app")) {
    return res.status(403).json({ ok: false, error: "Forbidden origin" });
  }

  try {
    const { name, email, phone, area, project, message, utm, honeypot } = req.body || {};

    // Honeypot check for bots — if honeypot field is filled, silently succeed without sending
    if (honeypot && typeof honeypot === "string" && honeypot.trim() !== "") {
      return res.status(200).json({ ok: true, message: "Message received" });
    }

    // Strict input length validation & bounds checking
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ ok: false, error: "Please provide a valid name (2-100 characters)." });
    }

    if (!email || typeof email !== "string" || email.trim().length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
    }

    if (phone && (typeof phone !== "string" || phone.trim().length > 30)) {
      return res.status(400).json({ ok: false, error: "Phone number format invalid." });
    }

    if (area && (typeof area !== "string" || area.trim().length > 100)) {
      return res.status(400).json({ ok: false, error: "Area parameter exceeds maximum length." });
    }

    if (project && (typeof project !== "string" || project.trim().length > 100)) {
      return res.status(400).json({ ok: false, error: "Project type parameter exceeds maximum length." });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5 || message.trim().length > 2000) {
      return res.status(400).json({ ok: false, error: "Please provide a message between 5 and 2000 characters." });
    }

    // Retrieve Telegram credentials strictly from server environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variable is missing.");
      return res.status(200).json({
        ok: true,
        note: "Submission recorded. Telegram notification pending environment variable configuration.",
      });
    }

    // Format & sanitize attribution details
    const utmDetails = utm && typeof utm === "object" ? [
      "📌 UTM Source: " + sanitizeText(String(utm.utm_source || "direct / none").slice(0, 50)),
      "📌 UTM Medium: " + sanitizeText(String(utm.utm_medium || "none").slice(0, 50)),
      "📌 UTM Campaign: " + sanitizeText(String(utm.utm_campaign || "none").slice(0, 50)),
    ].join("\n") : "📌 Source: Direct / Organic";

    const text = [
      "🔔 New Portfolio Enquiry!",
      "",
      "👤 Name: " + sanitizeText(name.trim()),
      "📧 Email: " + sanitizeText(email.trim()),
      "📱 Phone: " + (phone ? sanitizeText(phone.trim()) : "Not provided"),
      "📍 Area: " + (area ? sanitizeText(area.trim()) : "Not specified"),
      "💼 Project: " + (project ? sanitizeText(project.trim()) : "Not specified"),
      "💬 Message: " + sanitizeText(message.trim()),
      "",
      utmDetails,
      "",
      "📅 " + new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ].join("\n");

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API Error:", data);
      return res.status(500).json({ ok: false, error: "Failed to dispatch message." });
    }

    return res.status(200).json({ ok: true, message: "Enquiry submitted successfully." });
  } catch (err) {
    console.error("Contact API Handler Error:", err);
    return res.status(500).json({ ok: false, error: "An unexpected error occurred." });
  }
}

