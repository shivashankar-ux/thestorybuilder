import { useState, useEffect } from "react";

const CONSENT_KEY = "tsb_cookie_consent_v1";

export default function CookieConsent({ setPage }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        // Show after 1.5s delay for smooth entrance
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, marketing: true, date: new Date().toISOString() }));
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
        });
      }
    } catch {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, marketing: false, date: new Date().toISOString() }));
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
        });
      }
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        right: 24,
        maxWidth: 520,
        margin: "0 auto",
        backgroundColor: "rgba(18, 18, 22, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(250, 204, 21, 0.25)",
        borderRadius: 16,
        padding: "20px 24px",
        zIndex: 9999,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(250, 204, 21, 0.08)",
        color: "#e2e8f0",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ fontSize: 24, lineHeight: 1, marginTop: 2 }}>🍪</div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 6px 0", fontSize: 16, fontWeight: 700, color: "#fff" }}>
            We respect your privacy
          </h4>
          <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
            We use cookies to analyze site traffic, personalize content, and improve our services. Read our{" "}
            <button
              onClick={() => setPage && setPage("privacy")}
              style={{
                background: "none",
                border: "none",
                color: "#facc15",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
                fontSize: 13,
              }}
            >
              Privacy Policy
            </button>{" "}
            and{" "}
            <button
              onClick={() => setPage && setPage("cookies")}
              style={{
                background: "none",
                border: "none",
                color: "#facc15",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
                fontSize: 13,
              }}
            >
              Cookie Policy
            </button>.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
        <button
          onClick={handleDecline}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: 8,
            color: "#cbd5e1",
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Essential Only
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: "linear-gradient(135deg, #facc15 0%, #eab308 100%)",
            border: "none",
            borderRadius: 8,
            color: "#0f172a",
            padding: "8px 20px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(250, 204, 21, 0.3)",
            transition: "all 0.2s",
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
