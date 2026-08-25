import { useEffect } from "react";

export default function CookiesPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="legal-page-wrapper" style={{ padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto", color: "var(--text, #1A1208)" }}>
      <button
        onClick={() => setPage && setPage("home")}
        className="btn btn-ghost"
        style={{
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

      <span className="tag" style={{ display: "inline-flex", marginBottom: 12 }}>Legal Notice</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #1A1208)", marginBottom: 16, lineHeight: 1.15 }}>
        Cookie Policy
      </h1>
      <p style={{ color: "var(--muted, #665843)", fontSize: 14, marginBottom: 40, fontWeight: 500 }}>
        Last updated: August 25, 2026 | Effective Date: August 25, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "var(--text, #1A1208)" }}>
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            1. What Are Cookies?
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            Cookies are small text files stored on your computer or mobile device when you visit a website. They allow the website to recognize your device, remember preferences, and analyze how visitors interact with the site.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            2. How We Use Cookies
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12, lineHeight: 1.8 }}>The Story Builder uses cookies for the following specific purposes:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 16, color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            <li><strong style={{ color: "var(--text)" }}>Essential Cookies:</strong> Required for fundamental site features, security, session state, and saving your cookie consent preferences.</li>
            <li><strong style={{ color: "var(--text)" }}>Analytics Cookies (Google Analytics & GTM):</strong> Used to collect anonymous information about visitor volume, popular pages, referral sources, and session duration.</li>
            <li><strong style={{ color: "var(--text)" }}>Marketing & Advertising Cookies (Meta Pixel):</strong> Used to measure advertising effectiveness, track ad conversion events, and deliver retargeted ads on Facebook and Instagram.</li>
            <li><strong style={{ color: "var(--text)" }}>Functional Storage:</strong> Session storage used to persist UTM campaign attribution (<code style={{ color: "var(--gold)" }}>utm_source</code>, <code style={{ color: "var(--gold)" }}>utm_medium</code>, etc.) during form submissions.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            3. Third-Party Cookies On Our Website
          </h2>
          <ul style={{ paddingLeft: 24, color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            <li><strong style={{ color: "var(--text)" }}>Google Analytics (G-9NQBHF1BQD):</strong> Google privacy policies apply. You can opt out using the Google Analytics Opt-Out Browser Add-on.</li>
            <li><strong style={{ color: "var(--text)" }}>Meta Pixel (1069792155491301):</strong> Meta privacy policies apply. You can manage Facebook ad preferences inside your Facebook account settings.</li>
            <li><strong style={{ color: "var(--text)" }}>Calendly Embed:</strong> Calendly sets functional cookies when loading interactive appointment booking widgets.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            4. Managing Your Cookie Preferences
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            You can modify your cookie choices at any time via our Cookie Consent banner on the Website or by adjusting your web browser settings to block or delete cookies. Note that disabling essential cookies may impact certain interactive site features.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            5. Contact Us
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            For questions regarding our Cookie Policy, contact us at:
          </p>
          <p style={{ marginTop: 12, color: "var(--text, #1A1208)", fontWeight: 600 }}>
            The Story Builder<br />
            Email: <a href="mailto:shivashankar.7991@gmail.com" style={{ color: "var(--gold)", textDecoration: "underline" }}>shivashankar.7991@gmail.com</a><br />
            Phone: <a href="tel:+918341928526" style={{ color: "var(--gold)", textDecoration: "underline" }}>+91 83419 28526</a>
          </p>
        </section>
      </div>
    </main>
  );
}
