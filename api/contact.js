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

async function sendGoogleSheetWebhook(payload) {
  const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!sheetWebhookUrl || !sheetWebhookUrl.startsWith("https://")) {
    console.warn("⚠️ GOOGLE_SHEET_WEBHOOK_URL is not configured.");
    return false;
  }

  try {
    const res = await fetch(sheetWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (res.status === 302 || res.status === 301 || res.status === 307) {
      const location = res.headers.get("location");
      if (location) {
        await fetch(location, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    }

    if (res.ok) {
      console.log("✅ Lead successfully posted to Google Sheet");
      return true;
    } else {
      console.warn("⚠️ Google Sheet Webhook returned HTTP status:", res.status);
      return false;
    }
  } catch (err) {
    console.warn("⚠️ Error dispatching to Google Sheet Webhook:", err.message);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      ok: false,
      error: "Too many contact submissions from your network. Please try again in 15 minutes.",
    });
  }

  const origin = req.headers.origin || req.headers.referer || "";
  if (
    origin &&
    !origin.includes("thestorybuilder.in") &&
    !origin.includes("localhost") &&
    !origin.includes("127.0.0.1") &&
    !origin.includes("vercel.app")
  ) {
    return res.status(403).json({ ok: false, error: "Forbidden origin" });
  }

  try {
    const { name, email, phone, area, project, message, utm, honeypot } = req.body || {};

    if (honeypot && typeof honeypot === "string" && honeypot.trim() !== "") {
      return res.status(200).json({ ok: true, message: "Message received" });
    }

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

    // Extract UTM details
    const utmObj = utm && typeof utm === "object" ? utm : {};
    const utm_source = sanitizeText(String(utmObj.utm_source || "direct").slice(0, 100));
    const utm_medium = sanitizeText(String(utmObj.utm_medium || "none").slice(0, 100));
    const utm_campaign = sanitizeText(String(utmObj.utm_campaign || "none").slice(0, 100));
    const utm_content = sanitizeText(String(utmObj.utm_content || "").slice(0, 100));
    const utm_term = sanitizeText(String(utmObj.utm_term || "").slice(0, 100));
    const fbclid = sanitizeText(String(utmObj.fbclid || "").slice(0, 100));
    const gclid = sanitizeText(String(utmObj.gclid || "").slice(0, 100));

    const sheetPayload = {
      timestamp: new Date().toISOString(),
      form_type: "Contact Form",
      name: sanitizeText(name.trim()),
      email: sanitizeText(email.trim()),
      phone: phone ? sanitizeText(phone.trim()) : "Not provided",
      area: area ? sanitizeText(area.trim()) : "Not specified",
      project: project ? sanitizeText(project.trim()) : "Not specified",
      message: sanitizeText(message.trim()),
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      fbclid,
      gclid,
      landing_page: sanitizeText(utmObj.landing_page || "/contact"),
    };

    // 1. Send to Google Sheets Webhook
    await sendGoogleSheetWebhook(sheetPayload);

    // 2. Send to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const utmDetails = [
        "📌 Source: " + utm_source,
        "📌 Medium: " + utm_medium,
        "📌 Campaign: " + utm_campaign,
        fbclid ? "⚡ Meta Click ID: " + fbclid : "",
        gclid ? "⚡ Google Click ID: " + gclid : "",
      ].filter(Boolean).join("\n");

      const text = [
        "🔔 **New Portfolio Enquiry!**",
        "━━━━━━━━━━━━━━━━━━━━━",
        "👤 **Name:** " + sheetPayload.name,
        "📧 **Email:** " + sheetPayload.email,
        "📱 **Phone:** " + sheetPayload.phone,
        "📍 **Area:** " + sheetPayload.area,
        "💼 **Project:** " + sheetPayload.project,
        "💬 **Message:** " + sheetPayload.message,
        "━━━━━━━━━━━━━━━━━━━━━",
        utmDetails,
        "⏰ " + new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ].join("\n");

      try {
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
        });
      } catch (tgErr) {
        console.warn("Telegram dispatch failed:", tgErr);
      }
    }

    return res.status(200).json({ ok: true, message: "Enquiry submitted successfully." });
  } catch (err) {
    console.error("Contact API Handler Error:", err);
    return res.status(500).json({ ok: false, error: "An unexpected error occurred." });
  }
}
