import { useEffect } from "react";

export default function RefundPage({ setPage }) {
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
        Refund & Cancellation Policy
      </h1>
      <p style={{ color: "var(--muted, #665843)", fontSize: 14, marginBottom: 40, fontWeight: 500 }}>
        Last updated: August 25, 2026 | Effective Date: August 25, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "var(--text, #1A1208)" }}>
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            1. Service Overview & Transparent Commitments
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            At The Story Builder, we provide custom professional services including web design, custom website development, performance marketing, social media marketing, and branding. We believe in clear milestones, transparent communication, and dedicated execution.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            2. Web Development Projects
          </h2>
          <ul style={{ paddingLeft: 24, marginBottom: 16, color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            <li><strong style={{ color: "var(--text)" }}>Initial Deposit / Advance Payment:</strong> Project deposits cover dedicated design, architecture setup, and copy creation work. Deposit payments are non-refundable once design assets and development work have commenced.</li>
            <li><strong style={{ color: "var(--text)" }}>Pre-Kickoff Cancellation:</strong> If a project is cancelled in writing before any design or development work begins, a full refund minus administrative processing fees will be issued.</li>
            <li><strong style={{ color: "var(--text)" }}>Milestone Payments:</strong> Remaining project payments are tied to agreed deliverables. Once deliverables are reviewed and approved, corresponding payments are non-refundable.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            3. Monthly Retainer Services (Performance Marketing & Social Media)
          </h2>
          <ul style={{ paddingLeft: 24, marginBottom: 16, color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            <li><strong style={{ color: "var(--text)" }}>Month-to-Month Contracts:</strong> Marketing retainers operate on a month-to-month basis with no long-term lock-in unless explicitly agreed in writing.</li>
            <li><strong style={{ color: "var(--text)" }}>Cancellation Notice:</strong> Clients may cancel monthly retainers at any time by providing a 7-day written notice prior to the start of the next billing cycle.</li>
            <li><strong style={{ color: "var(--text)" }}>Third-Party Ad Spend:</strong> Ad spend paid directly to Meta or Google is non-refundable by the Agency as payments are processed directly by those third-party platforms.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            4. Refund Processing
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            Eligible refunds approved by management will be processed using the original payment method within 7–10 working days of written approval.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            5. Contact Us
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            For refund or cancellation requests, please email us directly with your project details:
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
