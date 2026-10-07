// API Handler for US Video Editing Lead Qualification Funnel
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 lead submissions per IP per 15 mins

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      ok: false,
      error: "Too many quote requests from your network. Please try again in a few minutes.",
    });
  }

  try {
    const {
      name,
      email,
      phone,
      company,
      content_types,
      monthly_volume,
      business_type,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      fbclid,
      gclid,
      landing_page,
      timestamp,
      honeypot,
    } = req.body || {};

    // Silent honeypot for bots
    if (honeypot && typeof honeypot === "string" && honeypot.trim() !== "") {
      return res.status(200).json({ ok: true, message: "Quote request received" });
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ ok: false, error: "Please enter your name." });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 5) {
      return res.status(400).json({ ok: false, error: "Please enter a contact phone/WhatsApp number." });
    }

    const payload = {
      name: sanitizeText(name.trim()),
      email: sanitizeText(email.trim()),
      phone: sanitizeText(phone.trim()),
      company: sanitizeText((company || "").trim()),
      content_types: Array.isArray(content_types) ? content_types.map(sanitizeText) : [sanitizeText(String(content_types || ""))],
      monthly_volume: sanitizeText(String(monthly_volume || "Not specified")),
      business_type: sanitizeText(String(business_type || "Not specified")),
      message: sanitizeText((message || "").trim()),
      utm_source: sanitizeText(utm_source || "direct"),
      utm_medium: sanitizeText(utm_medium || "none"),
      utm_campaign: sanitizeText(utm_campaign || "none"),
      utm_content: sanitizeText(utm_content || "none"),
      utm_term: sanitizeText(utm_term || "none"),
      fbclid: sanitizeText(fbclid || ""),
      gclid: sanitizeText(gclid || ""),
      landing_page: sanitizeText(landing_page || "/us-video-editing"),
      timestamp: timestamp || new Date().toISOString(),
    };

    console.log("📥 [US Lead Received]:", payload);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const formattedText = [
        "🇺🇸 **NEW US VIDEO EDITING LEAD!**",
        "━━━━━━━━━━━━━━━━━━━━━",
        `👤 **Name:** ${payload.name}`,
        `📧 **Email:** ${payload.email}`,
        `📞 **Phone/WhatsApp:** ${payload.phone}`,
        `🏢 **Company/Brand:** ${payload.company || "N/A"}`,
        `💼 **Business Type:** ${payload.business_type}`,
        `🎬 **Content Types:** ${payload.content_types.join(", ")}`,
        `📦 **Monthly Volume:** ${payload.monthly_volume}`,
        `💬 **Notes:** ${payload.message || "None provided"}`,
        "━━━━━━━━━━━━━━━━━━━━━",
        `📌 **Source:** ${payload.utm_source} | ${payload.utm_medium}`,
        `🎯 **Campaign:** ${payload.utm_campaign}`,
        payload.fbclid ? `⚡ **Meta Click ID:** ${payload.fbclid}` : "",
        `⏰ **Time:** ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST`,
      ].filter(Boolean).join("\n");

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: formattedText, parse_mode: "Markdown" }),
        });
      } catch (err) {
        console.warn("Telegram alert failed:", err);
      }
    }

    return res.status(200).json({
      ok: true,
      message: "Lead processed successfully. Custom quote will be dispatched.",
      lead_id: `us_lead_${Date.now()}`,
    });
  } catch (err) {
    console.error("Error in US quote handler:", err);
    return res.status(500).json({ ok: false, error: "Internal server error." });
  }
}
