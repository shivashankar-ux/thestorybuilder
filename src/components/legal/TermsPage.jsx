import { useEffect } from "react";

export default function TermsPage({ setPage }) {
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
        Terms & Conditions
      </h1>
      <p style={{ color: "var(--muted, #94a3b8)", fontSize: 14, marginBottom: 40 }}>
        Last updated: August 25, 2026 | Effective Date: August 25, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "#cbd5e1" }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the website at <strong>https://thestorybuilder.in/</strong> ("Website"), owned and operated by The Story Builder ("Agency", "we", "us"), you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, you may not access our Website or use our services.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            2. Scope of Services
          </h2>
          <p>
            The Story Builder provides digital marketing services including website development, performance marketing (Meta Ads and Google Ads), social media management, brand strategy, and lead generation funnels. Specific deliverables, timelines, and payment terms for client projects are defined in individual statements of work or project proposals agreed upon prior to project commencement.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            3. Intellectual Property Rights
          </h2>
          <p>
            Upon full payment of agreed project fees, clients receive full ownership rights to final website source code, design assets, and custom deliverables created specifically for their business. The Story Builder retains ownership of proprietary agency templates, framework starters, pre-existing tools, and methodology.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            4. Client Responsibilities & Ad Spend
          </h2>
          <p>
            For performance marketing campaigns, ad spend budgets are separate from agency management fees and are paid directly by the client to advertising platforms (Meta, Google). Clients are responsible for providing necessary assets, domain access, brand guidelines, and timely feedback required to meet agreed project timelines.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            5. Limitation of Liability
          </h2>
          <p>
            While we engineer high-converting websites and performance campaigns, marketing results depend on external variables including market demand, product quality, third-party platform algorithm changes, and client sales follow-up. The Story Builder shall not be liable for any indirect, consequential, or incidental damages arising out of service performance beyond the total fees paid by the client for the specific project.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            6. Governing Law
          </h2>
          <p>
            These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            7. Contact Us
          </h2>
          <p>
            If you have questions regarding these Terms & Conditions, please contact us at:
          </p>
          <p style={{ marginTop: 8 }}>
            <strong>The Story Builder</strong><br />
            Hyderabad, Telangana, India<br />
            Email: <a href="mailto:shivashankar.7991@gmail.com" style={{ color: "#facc15" }}>shivashankar.7991@gmail.com</a><br />
            Phone: <a href="tel:+918341928526" style={{ color: "#facc15" }}>+91 83419 28526</a>
          </p>
        </section>
      </div>
    </main>
  );
}
