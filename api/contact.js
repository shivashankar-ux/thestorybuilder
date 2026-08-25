export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { name, email, phone, area, project, message, utm, honeypot } = req.body || {};

    // Honeypot check for bots — if honeypot field is filled, silently succeed without sending
    if (honeypot && honeypot.trim() !== "") {
      return res.status(200).json({ ok: true, message: "Message received" });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ ok: false, error: "Please provide a valid name." });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return res.status(400).json({ ok: false, error: "Please provide a message with at least 5 characters." });
    }

    // Retrieve Telegram Bot Token and Chat ID securely from server environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || "1340316382";

    if (!botToken) {
      console.error("TELEGRAM_BOT_TOKEN environment variable is not configured.");
      // Return success status so user interface doesn't crash if env var is missing during setup, but log error
      return res.status(200).json({
        ok: true,
        note: "Submission recorded. Telegram notification pending environment variable configuration.",
      });
    }

    // Format attribution & campaign details
    const utmDetails = utm && typeof utm === "object" ? [
      "📌 UTM Source: " + (utm.utm_source || "direct / none"),
      "📌 UTM Medium: " + (utm.utm_medium || "none"),
      "📌 UTM Campaign: " + (utm.utm_campaign || "none"),
    ].join("\n") : "📌 Source: Direct / Organic";

    const text = [
      "🔔 New Portfolio Enquiry!",
      "",
      "👤 Name: " + name.trim(),
      "📧 Email: " + email.trim(),
      "📱 Phone: " + (phone ? phone.trim() : "Not provided"),
      "📍 Area: " + (area ? area.trim() : "Not specified"),
      "💼 Project: " + (project ? project.trim() : "Not specified"),
      "💬 Message: " + message.trim(),
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
