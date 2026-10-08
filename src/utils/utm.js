const UTM_STORAGE_KEY = "tsb_utm_params";

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "gad_source",
  "gbraid",
  "wbraid",
  "ttclid",
  "msclkid",
  "ref",
  "referrer",
];

/**
 * Capture UTM parameters from URL query string and store in sessionStorage & localStorage.
 * Detects organic referrers if no explicit query parameters are present.
 */
export function captureUTMParams() {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const foundUTMs = {};
    let hasNewUTM = false;

    TRACKING_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val) {
        foundUTMs[key] = val.trim();
        hasNewUTM = true;
      }
    });

    const existing = getUTMParams();

    if (hasNewUTM) {
      const updated = {
        ...existing,
        ...foundUTMs,
        landing_page: window.location.pathname,
        captured_at: new Date().toISOString(),
      };
      saveToStorage(updated);
      return;
    }

    // If no existing stored UTMs and no new UTM query params, check document.referrer
    if (!existing.utm_source && document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        const refHost = refUrl.hostname.replace(/^www\./, "");
        const currentHost = window.location.hostname.replace(/^www\./, "");

        if (refHost && refHost !== currentHost) {
          let source = refHost;
          let medium = "referral";

          if (source.includes("google.")) {
            source = "google";
            medium = "organic";
          } else if (source.includes("bing.")) {
            source = "bing";
            medium = "organic";
          } else if (source.includes("facebook.") || source.includes("fb.me") || source.includes("instagram.")) {
            source = source.includes("instagram") ? "instagram" : "facebook";
            medium = "social";
          } else if (source.includes("t.co") || source.includes("twitter.") || source.includes("x.com")) {
            source = "twitter";
            medium = "social";
          } else if (source.includes("linkedin.")) {
            source = "linkedin";
            medium = "social";
          } else if (source.includes("youtube.")) {
            source = "youtube";
            medium = "social";
          }

          const referrerData = {
            utm_source: source,
            utm_medium: medium,
            utm_campaign: "organic_referral",
            referrer_domain: refHost,
            landing_page: window.location.pathname,
            captured_at: new Date().toISOString(),
          };
          saveToStorage(referrerData);
        }
      } catch (e) {
        // Invalid referrer URL format
      }
    }
  } catch (e) {
    console.warn("UTM capture error:", e);
  }
}

function saveToStorage(data) {
  try {
    const serialized = JSON.stringify(data);
    sessionStorage.setItem(UTM_STORAGE_KEY, serialized);
    localStorage.setItem(UTM_STORAGE_KEY, serialized);
  } catch (e) {
    // Storage quota or restricted access
  }
}

/**
 * Retrieve captured UTM parameters from sessionStorage or localStorage.
 */
export function getUTMParams() {
  if (typeof window === "undefined") return { utm_source: "direct", utm_medium: "none", utm_campaign: "direct" };

  try {
    const sessionData = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (sessionData) return JSON.parse(sessionData);

    const localData = localStorage.getItem(UTM_STORAGE_KEY);
    if (localData) return JSON.parse(localData);
  } catch (e) {
    // Parsing error
  }

  return { utm_source: "direct", utm_medium: "none", utm_campaign: "direct" };
}

// Auto-run on module load in browser context
if (typeof window !== "undefined") {
  captureUTMParams();
}

