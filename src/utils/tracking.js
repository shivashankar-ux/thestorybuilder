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

// Meta Pixel Standard Event Map according to official Meta specifications
const META_STANDARD_EVENTS = {
  addpaymentinfo: "AddPaymentInfo",
  addtocart: "AddToCart",
  addtowishlist: "AddToWishlist",
  completeregistration: "CompleteRegistration",
  contact: "Contact",
  customizeproduct: "CustomizeProduct",
  donate: "Donate",
  findlocation: "FindLocation",
  initiatecheckout: "InitiateCheckout",
  lead: "Lead",
  purchase: "Purchase",
  schedule: "Schedule",
  search: "Search",
  starttrial: "StartTrial",
  submitapplication: "SubmitApplication",
  subscribe: "Subscribe",
  viewcontent: "ViewContent",
};

/**
 * Resolves event name to Meta Pixel standard event if applicable
 */
function resolveMetaStandardEvent(name) {
  if (!name) return null;
  const sanitized = name.toLowerCase().replace(/[^a-z]/g, "");
  
  if (META_STANDARD_EVENTS[sanitized]) {
    return META_STANDARD_EVENTS[sanitized];
  }

  // Alias & keyword mapping to standard events
  if (
    sanitized === "contactformsubmitted" ||
    sanitized === "exitintentclaimed" ||
    sanitized === "freeauditclaimed" ||
    sanitized === "leadformsubmit" ||
    sanitized === "quoterequest"
  ) {
    return "Lead";
  }

  if (
    sanitized.includes("whatsapp") ||
    sanitized.includes("phoneclick") ||
    sanitized.includes("emailclick") ||
    sanitized.includes("contactclick")
  ) {
    return "Contact";
  }

  if (
    sanitized.includes("book") ||
    sanitized.includes("schedule") ||
    sanitized.includes("calendly")
  ) {
    return "Schedule";
  }

  if (
    sanitized.includes("pricing") ||
    sanitized.includes("services") ||
    sanitized.includes("viewedpage") ||
    sanitized.includes("viewcase") ||
    sanitized.includes("viewarticle")
  ) {
    return "ViewContent";
  }

  if (
    sanitized.includes("location") ||
    sanitized.includes("address") ||
    sanitized.includes("mapclick")
  ) {
    return "FindLocation";
  }

  if (
    sanitized.includes("newsletter") ||
    sanitized.includes("subscribe") ||
    sanitized.includes("retainer")
  ) {
    return "Subscribe";
  }

  if (
    sanitized.includes("customizepackage") ||
    sanitized.includes("quotebuilder") ||
    sanitized.includes("pricingcalculator")
  ) {
    return "CustomizeProduct";
  }

  if (
    sanitized.includes("projectapplication") ||
    sanitized.includes("submitproposal")
  ) {
    return "SubmitApplication";
  }

  if (
    sanitized.includes("trial") ||
    sanitized.includes("build7day")
  ) {
    return "StartTrial";
  }

  if (
    sanitized.includes("search")
  ) {
    return "Search";
  }

  if (
    sanitized.includes("checkout") ||
    sanitized.includes("getstarted") ||
    sanitized.includes("chooseplan")
  ) {
    return "InitiateCheckout";
  }

  if (
    sanitized.includes("payment") ||
    sanitized.includes("payinfo")
  ) {
    return "AddPaymentInfo";
  }

  if (
    sanitized.includes("purchase") ||
    sanitized.includes("ordersuccess")
  ) {
    return "Purchase";
  }

  return null;
}

export async function trackPageView(page) {
  if (typeof window !== "undefined" && typeof window.fbq === "function" && hasAnalyticsConsent()) {
    try {
      window.fbq("track", "PageView");
    } catch (err) {
      console.warn("Meta Pixel PageView error:", err);
    }
  }

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
      const stdEvent = resolveMetaStandardEvent(name);
      if (stdEvent) {
        window.fbq("track", stdEvent, { ...extra });
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

/* Standalone Meta Pixel Standard Event Helper Functions */
export const trackAddPaymentInfo = (extra = {}) => trackEvent("AddPaymentInfo", extra);
export const trackAddToCart = (extra = {}) => trackEvent("AddToCart", extra);
export const trackAddToWishlist = (extra = {}) => trackEvent("AddToWishlist", extra);
export const trackCompleteRegistration = (extra = {}) => trackEvent("CompleteRegistration", extra);
export const trackContact = (extra = {}) => trackEvent("Contact", extra);
export const trackCustomizeProduct = (extra = {}) => trackEvent("CustomizeProduct", extra);
export const trackDonate = (extra = {}) => trackEvent("Donate", extra);
export const trackFindLocation = (extra = {}) => trackEvent("FindLocation", extra);
export const trackInitiateCheckout = (extra = {}) => trackEvent("InitiateCheckout", extra);
export const trackLead = (extra = {}) => trackEvent("Lead", extra);
export const trackPurchase = (extra = {}) => trackEvent("Purchase", { currency: "INR", ...extra });
export const trackSchedule = (extra = {}) => trackEvent("Schedule", extra);
export const trackSearch = (extra = {}) => trackEvent("Search", extra);
export const trackStartTrial = (extra = {}) => trackEvent("StartTrial", extra);
export const trackSubmitApplication = (extra = {}) => trackEvent("SubmitApplication", extra);
export const trackSubscribe = (extra = {}) => trackEvent("Subscribe", extra);
export const trackViewContent = (extra = {}) => trackEvent("ViewContent", extra);

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
          trackContact({ channel: "WhatsApp", href: link.href });
        } else if (link.href.startsWith("tel:")) {
          trackContact({ method: "phone", href: link.href });
        } else if (link.href.startsWith("mailto:")) {
          trackContact({ method: "email", href: link.href });
        } else if (link.href.includes("maps.google.com") || link.href.includes("goo.gl/maps")) {
          trackFindLocation({ search_string: link.href });
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



