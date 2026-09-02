/* ----------------------------------------------------------
   Visitor tracking — logs to a Google Sheet via Apps Script
   webhook and fires email alerts on key events.

   SETUP: paste your Apps Script Web App URL below.
   Until this is set, tracking silently no-ops.
---------------------------------------------------------- */
const WEBHOOK_URL = ""; // <-- paste Apps Script /exec URL here

const SESSION_KEY = "tsb_session";
const SEEN_EVENT_KEY = "tsb_seen_events";
const CONSENT_KEY = "tsb_cookie_consent_v1";

export function hasAnalyticsConsent() {
  try {
    if (typeof localStorage === "undefined") return false;
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed.analytics);
  } catch {
    return false;
  }
}

function isEnabled() {
  return typeof WEBHOOK_URL === "string" && WEBHOOK_URL.startsWith("https://");
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getSession() {
  try {
    let s = sessionStorage.getItem(SESSION_KEY);
    if (!s) {
      s = uid();
      sessionStorage.setItem(SESSION_KEY, s);
    }
    return s;
  } catch {
    return "no-storage";
  }
}

function getDeviceType() {
  const ua = navigator.userAgent || "";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

function getReferrer() {
  const r = document.referrer || "direct";
  try {
    if (r === "direct") return "direct";
    const u = new URL(r);
    if (u.hostname === window.location.hostname) return "internal";
    return u.hostname;
  } catch {
    return r;
  }
}

let cachedGeo = null;
async function fetchGeo() {
  if (!hasAnalyticsConsent()) {
    return { ip: "[anonymized]", city: "", region: "", country: "", org: "" };
  }
  if (cachedGeo) return cachedGeo;
  try {
    const res = await fetch("https://ipapi.co/json/", { method: "GET" });
    if (!res.ok) throw new Error("geo fetch failed");
    const data = await res.json();
    cachedGeo = {
      ip: "[anonymized]", // Minimize raw IP storage to protect visitor privacy
      city: data.city || "",
      region: data.region || "",
      country: data.country_name || "",
      org: data.org || "",
    };
  } catch {
    cachedGeo = { ip: "", city: "", region: "", country: "", org: "" };
  }
  return cachedGeo;
}

async function send(payload) {
  if (!isEnabled() || !hasAnalyticsConsent()) return;
  try {
    // text/plain content-type avoids CORS preflight; Apps Script reads e.postData.contents
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    /* silent — never break the site */
  }
}

function basePayload() {
  return {
    sessionId: getSession(),
    timestamp: new Date().toISOString(),
    page: window.location.pathname + window.location.hash,
    referrer: getReferrer(),
    device: getDeviceType(),
    language: navigator.language || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    screen: `${window.screen.width}x${window.screen.height}`,
  };
}

/* Public API ------------------------------------------------- */

let pageviewSent = false;

export async function trackPageView(page) {
  if (!isEnabled() || !hasAnalyticsConsent()) return;
  const geo = await fetchGeo();
  await send({
    type: "pageview",
    alert: !pageviewSent, // first pageview of session triggers email
    ...basePayload(),
    page: page || basePayload().page,
    ...geo,
  });
  pageviewSent = true;
}

export async function trackEvent(name, extra = {}) {
  // Fire Meta Pixel Events only if user has granted analytics/marketing consent
  if (typeof window !== "undefined" && typeof window.fbq === "function" && hasAnalyticsConsent()) {
    try {
      if (name === "contact_form_submitted") {
        window.fbq("track", "Lead", {
          content_name: extra.project || "Contact Form",
          content_category: extra.area || "General",
        });
      } else if (name.includes("whatsapp") || name.includes("wa_")) {
        window.fbq("track", "Contact", { channel: "WhatsApp", ...extra });
      } else if (name.includes("phone_click") || name.includes("email_click")) {
        window.fbq("track", "Contact", { method: name, ...extra });
      } else if (name.includes("book") || name.includes("schedule") || name.includes("calendly")) {
        window.fbq("track", "Schedule", extra);
      } else if (name.includes("pricing") || name.includes("services")) {
        window.fbq("track", "ViewContent", { content_type: "page", name, ...extra });
      } else if (name === "exit_intent_claimed") {
        window.fbq("track", "Lead", { content_name: "Free Audit Claim" });
      } else {
        window.fbq("trackCustom", name, extra);
      }
    } catch (err) {
      console.warn("Meta Pixel event tracking error:", err);
    }
  }

  if (!isEnabled() || !hasAnalyticsConsent()) return;
  // dedupe per session: don't email about the same event repeatedly
  const seen = (() => {
    try { return JSON.parse(sessionStorage.getItem(SEEN_EVENT_KEY) || "[]"); }
    catch { return []; }
  })();
  const isFirstThisSession = !seen.includes(name);
  if (isFirstThisSession) {
    try {
      sessionStorage.setItem(SEEN_EVENT_KEY, JSON.stringify([...seen, name]));
    } catch { /* ignore */ }
  }
  const geo = await fetchGeo();
  await send({
    type: "event",
    name,
    alert: isFirstThisSession, // only email once per session per event
    ...basePayload(),
    ...geo,
    ...extra,
  });
}

/* Engagement timer — fires once after 30s on the site */
let engagedFired = false;
export function startEngagementTimer() {
  if (engagedFired) return;
  setTimeout(() => {
    if (engagedFired) return;
    engagedFired = true;
    if (hasAnalyticsConsent()) {
      trackEvent("engaged_30s");
    }
  }, 30_000);
}

/* Auto-bind clicks on elements with data-track attribute and contact links */
export function bindAutoTracking() {
  document.addEventListener(
    "click",
    (e) => {
      if (!hasAnalyticsConsent()) return;
      const link = e.target.closest("a");
      if (link && link.href) {
        if (link.href.includes("wa.me")) {
          trackEvent("whatsapp_click", { href: link.href });
        } else if (link.href.startsWith("tel:")) {
          trackEvent("phone_click", { href: link.href });
        } else if (link.href.startsWith("mailto:")) {
          trackEvent("email_click", { href: link.href });
        }
      }

      const t = e.target.closest("[data-track]");
      if (!t) return;
      trackEvent(t.getAttribute("data-track") || "click", {
        text: (t.innerText || "").slice(0, 80),
      });
    },
    { passive: true, capture: true }
  );
}


