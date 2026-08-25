import { useEffect } from "react";

export default function PrivacyPage({ setPage }) {
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
        Privacy Policy
      </h1>
      <p style={{ color: "var(--muted, #665843)", fontSize: 14, marginBottom: 40, fontWeight: 500 }}>
        Last updated: August 25, 2026 | Effective Date: August 25, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "var(--text, #1A1208)" }}>
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            1. Overview
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            The Story Builder ("we", "us", or "our") operates the website <strong style={{ color: "var(--text)" }}>https://thestorybuilder.in/</strong>. We are a full-service digital marketing, web design, performance marketing, and brand strategy agency based in Hyderabad, Telangana, India. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Website and services.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            2. Information We Collect
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12, lineHeight: 1.8 }}>We collect several different types of information for various purposes to provide and improve our service to you:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 16, color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            <li><strong style={{ color: "var(--text)" }}>Personal Contact Data:</strong> When you submit an enquiry, book a consultation, or request an audit, we may collect your name, email address, phone number, location/area in Hyderabad or elsewhere, and project details.</li>
            <li><strong style={{ color: "var(--text)" }}>Tracking & Analytics Data:</strong> We use Google Analytics (GA4), Google Tag Manager (GTM), Meta Pixel (Facebook/Instagram Ads), and IP/geolocation services (e.g., ipapi.co) to measure website traffic, conversion actions, user interactions, and geographic origin.</li>
            <li><strong style={{ color: "var(--text)" }}>UTM Attribution Data:</strong> We capture campaign query parameters (such as <code style={{ color: "var(--gold)" }}>utm_source</code>, <code style={{ color: "var(--gold)" }}>utm_medium</code>, <code style={{ color: "var(--gold)" }}>utm_campaign</code>) to identify which marketing channels bring visitors to our Website.</li>
            <li><strong style={{ color: "var(--text)" }}>Device & Browser Data:</strong> IP address, browser type, device category (desktop/mobile/tablet), screen resolution, operating system, and page view timestamps.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            3. How We Use Your Information
          </h2>
          <ul style={{ paddingLeft: 24, color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            <li>To respond to your enquiries, provide project quotes, and schedule strategy calls.</li>
            <li>To deliver our web development, performance marketing, social media marketing, and branding services.</li>
            <li>To track ad conversions and optimize performance campaigns across Meta Ads and Google Ads.</li>
            <li>To monitor, analyze, and maintain the security and technical performance of our Website.</li>
            <li>To comply with applicable legal obligations in India.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            4. Third-Party Tracking & Advertising Services
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            We use verified third-party tools to optimize user experience and measure advertisement performance:
          </p>
          <ul style={{ paddingLeft: 24, marginTop: 12, color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            <li><strong style={{ color: "var(--text)" }}>Google Analytics & GTM:</strong> Used to understand site performance and visitor journeys.</li>
            <li><strong style={{ color: "var(--text)" }}>Meta Pixel & Conversions API:</strong> Used to measure advertising efficiency on Facebook and Instagram.</li>
            <li><strong style={{ color: "var(--text)" }}>Calendly:</strong> Embedded for scheduling 30-minute strategy calls.</li>
            <li><strong style={{ color: "var(--text)" }}>Telegram API:</strong> Used for real-time internal notification alerts when a contact form is submitted.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            5. Your Data Protection Rights & Consent
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            You have the right to request access to, correction of, or deletion of your personal data held by us. You can manage or revoke your tracking consent at any time via our Cookie Consent banner or browser settings.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 700, color: "var(--text, #1A1208)", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
            6. Contact Information
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", lineHeight: 1.8 }}>
            For any privacy inquiries or requests regarding your personal data, please contact us:
          </p>
          <p style={{ marginTop: 12, color: "var(--text, #1A1208)", fontWeight: 600 }}>
            The Story Builder<br />
            Hyderabad, Telangana, India<br />
            Email: <a href="mailto:shivashankar.7991@gmail.com" style={{ color: "var(--gold)", textDecoration: "underline" }}>shivashankar.7991@gmail.com</a><br />
            Phone: <a href="tel:+918341928526" style={{ color: "var(--gold)", textDecoration: "underline" }}>+91 83419 28526</a>
          </p>
        </section>
      </div>
    </main>
  );
}
