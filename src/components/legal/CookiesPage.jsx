import { useEffect } from "react";

export default function CookiesPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="legal-page-wrapper" style={{ padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto", color: "var(--text, #e2e8f0)" }}>
      <button
        onClick={() => setPage && setPage("home")}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "var(--gold, #facc15)",
          padding: "8px 16px",
          borderRadius: 8,
          cursor: "pointer",
          marginBottom: 32,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        ← Back to Homepage
      </button>

      <span className="tag" style={{ display: "block", marginBottom: 12 }}>Legal Notice</span>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 16 }}>
        Cookie Policy
      </h1>
      <p style={{ color: "var(--muted, #94a3b8)", fontSize: 14, marginBottom: 40 }}>
        Last updated: August 25, 2026 | Effective Date: August 25, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "#cbd5e1" }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files stored on your computer or mobile device when you visit a website. They allow the website to recognize your device, remember preferences, and analyze how visitors interact with the site.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            2. How We Use Cookies
          </h2>
          <p style={{ marginBottom: 12 }}>The Story Builder uses cookies for the following specific purposes:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li><strong>Essential Cookies:</strong> Required for fundamental site features, security, session state, and saving your cookie consent preferences.</li>
            <li><strong>Analytics Cookies (Google Analytics & GTM):</strong> Used to collect anonymous information about visitor volume, popular pages, referral sources, and session duration.</li>
            <li><strong>Marketing & Advertising Cookies (Meta Pixel):</strong> Used to measure advertising effectiveness, track ad conversion events, and deliver retargeted ads on Facebook and Instagram.</li>
            <li><strong>Functional Storage:</strong> Session storage used to persist UTM campaign attribution (<code style={{ color: "#facc15" }}>utm_source</code>, <code style={{ color: "#facc15" }}>utm_medium</code>, etc.) during form submissions.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            3. Third-Party Cookies On Our Website
          </h2>
          <ul style={{ paddingLeft: 24 }}>
            <li><strong>Google Analytics (G-9NQBHF1BQD):</strong> Google privacy policies apply. You can opt out using the Google Analytics Opt-Out Browser Add-on.</li>
            <li><strong>Meta Pixel (1069792155491301):</strong> Meta privacy policies apply. You can manage Facebook ad preferences inside your Facebook account settings.</li>
            <li><strong>Calendly Embed:</strong> Calendly sets functional cookies when loading interactive appointment booking widgets.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            4. Managing Your Cookie Preferences
          </h2>
          <p>
            You can modify your cookie choices at any time via our Cookie Consent banner on the Website or by adjusting your web browser settings to block or delete cookies. Note that disabling essential cookies may impact certain interactive site features.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            5. Contact Us
          </h2>
          <p>
            For questions regarding our Cookie Policy, contact us at:
          </p>
          <p style={{ marginTop: 8 }}>
            <strong>The Story Builder</strong><br />
            Email: <a href="mailto:shivashankar.7991@gmail.com" style={{ color: "#facc15" }}>shivashankar.7991@gmail.com</a><br />
            Phone: <a href="tel:+918341928526" style={{ color: "#facc15" }}>+91 83419 28526</a>
          </p>
        </section>
      </div>
    </main>
  );
}
