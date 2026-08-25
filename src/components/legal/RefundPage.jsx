import { useEffect } from "react";

export default function RefundPage({ setPage }) {
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
        Refund & Cancellation Policy
      </h1>
      <p style={{ color: "var(--muted, #94a3b8)", fontSize: 14, marginBottom: 40 }}>
        Last updated: August 25, 2026 | Effective Date: August 25, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "#cbd5e1" }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            1. Service Overview & Transparent Commitments
          </h2>
          <p>
            At The Story Builder, we provide custom professional services including web design, custom website development, performance marketing, social media marketing, and branding. We believe in clear milestones, transparent communication, and dedicated execution.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            2. Web Development Projects
          </h2>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li><strong>Initial Deposit / Advance Payment:</strong> Project deposits cover dedicated design, architecture setup, and copy creation work. Deposit payments are non-refundable once design assets and development work have commenced.</li>
            <li><strong>Pre-Kickoff Cancellation:</strong> If a project is cancelled in writing before any design or development work begins, a full refund minus administrative processing fees will be issued.</li>
            <li><strong>Milestone Payments:</strong> Remaining project payments are tied to agreed deliverables. Once deliverables are reviewed and approved, corresponding payments are non-refundable.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            3. Monthly Retainer Services (Performance Marketing & Social Media)
          </h2>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li><strong>Month-to-Month Contracts:</strong> Marketing retainers operate on a month-to-month basis with no long-term lock-in unless explicitly agreed in writing.</li>
            <li><strong>Cancellation Notice:</strong> Clients may cancel monthly retainers at any time by providing a 7-day written notice prior to the start of the next billing cycle.</li>
            <li><strong>Third-Party Ad Spend:</strong> Ad spend paid directly to Meta or Google is non-refundable by the Agency as payments are processed directly by those third-party platforms.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            4. Refund Processing
          </h2>
          <p>
            Eligible refunds approved by management will be processed using the original payment method within 7–10 working days of written approval.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            5. Contact Us
          </h2>
          <p>
            For refund or cancellation requests, please email us directly with your project details:
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
