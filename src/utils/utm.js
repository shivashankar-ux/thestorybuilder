const UTM_STORAGE_KEY = "tsb_utm_params";

/**
 * Capture UTM parameters from the URL query string and store them in sessionStorage.
 * Preserves existing parameters if non-empty, so navigating pages doesn't wipe them.
 */
export function captureUTMParams() {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const foundUTMs = {};

    let hasNewUTM = false;
    utmKeys.forEach((key) => {
      const val = params.get(key);
      if (val) {
        foundUTMs[key] = val;
        hasNewUTM = true;
      }
    });

    if (hasNewUTM) {
      const existing = getUTMParams();
      const updated = { ...existing, ...foundUTMs, captured_at: new Date().toISOString() };
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn("UTM capture error:", e);
  }
}

/**
 * Retrieve captured UTM parameters from sessionStorage.
 */
export function getUTMParams() {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    return {};
  }
}
