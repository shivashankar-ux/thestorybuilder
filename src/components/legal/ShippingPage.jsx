import { useEffect } from "react";

export default function ShippingPage({ setPage }) {
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
        Shipping & Digital Delivery Policy
      </h1>
      <p style={{ color: "var(--muted, #665843)", fontSize: 14, marginBottom: 40, fontWeight: 500 }}>
        Last updated: September 8, 2026 | Effective Date: September 8, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "var(--text, #1A1208)" }}>
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            1. Digital Product Delivery Notice
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            All products offered on <strong style={{ color: "var(--text)" }}>The Story Builder Store</strong> (including digital ebooks, PDF guides, playbooks, and downloadable templates) are <strong style={{ color: "var(--text)" }}>100% digital goods</strong>. We do not ship physical packages, hardcopy books, or paper deliverables to your postal address.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            2. Delivery Method & SLA Timeline
          </h2>
          <ul style={{ paddingLeft: 24, marginBottom: 16, color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            <li>
              <strong style={{ color: "var(--text)" }}>Instant On-Screen Download:</strong> Upon completion of successful payment verification via Razorpay, you will be redirected automatically to our confirmation page (<code>/store/success</code>) containing a direct, secure download link for your purchased PDF ebook.
            </li>
            <li>
              <strong style={{ color: "var(--text)" }}>Email Delivery (0 to 5 minutes):</strong> An automated receipt along with your digital download link is dispatched instantly to the email address provided during checkout. Delivery takes between 0 and 5 minutes depending on your mail provider.
            </li>
            <li>
              <strong style={{ color: "var(--text)" }}>Delivery Fees:</strong> ₹0 (Free electronic instant delivery worldwide).
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            3. Download Link Expiration & Access Support
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            For maximum privacy and file security, generated download URLs are signed and valid for 24 hours. If your link expires or if you experience internet interruptions, email filters, or technical glitches, our support team will re-issue a fresh download link free of charge.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            4. Customer Delivery Support
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            If you have not received your digital ebook access within 15 minutes of payment, please check your spam/promotions folder or contact our support desk directly with your Razorpay payment ID:
          </p>
          <p style={{ marginTop: 12, color: "var(--text, #1A1208)", fontWeight: 600 }}>
            The Story Builder Support Desk<br />
            Registered Operating Address: Hyderabad, Telangana, India - 500001<br />
            Email: <a href="mailto:shivashankar.7991@gmail.com" style={{ color: "var(--gold)", textDecoration: "underline" }}>shivashankar.7991@gmail.com</a><br />
            Phone / WhatsApp: <a href="tel:+918341928526" style={{ color: "var(--gold)", textDecoration: "underline" }}>+91 83419 28526</a><br />
            Support Hours: Monday to Saturday, 9:00 AM – 7:00 PM IST (Responses within 24 hours)
          </p>
        </section>
      </div>
    </main>
  );
}
