import { useEffect } from "react";

export default function DisclaimerPage({ setPage }) {
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
        Disclaimer
      </h1>
      <p style={{ color: "var(--muted, #665843)", fontSize: 14, marginBottom: 40, fontWeight: 500 }}>
        Last updated: August 25, 2026 | Effective Date: August 25, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "var(--text, #1A1208)" }}>
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            1. Website Content & Educational Information
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            The information provided on <strong style={{ color: "var(--text)" }}>https://thestorybuilder.in/</strong> is for general information and marketing purposes only. While we endeavor to keep all information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information contained on the Website.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            2. Marketing Performance & Case Studies Disclaimer
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            Any case studies, metrics, conversion figures, or growth statistics mentioned on our Website represent real historical project outcomes achieved for specific clients under specific market conditions. They are provided as illustrative examples of our capabilities. Past results do not guarantee identical future outcomes for all businesses, as individual success depends on factors including brand reputation, offer competitiveness, ad budgets, market dynamics, and operational execution.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            3. External Links Disclaimer
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            Our Website contains links to external websites (e.g., client websites, third-party tools, social platforms). The Story Builder has no control over the content, privacy policies, or availability of external sites and does not endorse or assume responsibility for third-party materials.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            4. Professional Contact
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            For any queries regarding this Disclaimer, please reach out to:
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
