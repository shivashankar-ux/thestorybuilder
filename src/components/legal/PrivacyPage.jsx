import { useEffect } from "react";

export default function PrivacyPage({ setPage }) {
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
        Privacy Policy
      </h1>
      <p style={{ color: "var(--muted, #94a3b8)", fontSize: 14, marginBottom: 40 }}>
        Last updated: August 25, 2026 | Effective Date: August 25, 2026
      </p>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 16, color: "#cbd5e1" }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            1. Overview
          </h2>
          <p>
            The Story Builder ("we", "us", or "our") operates the website <strong>https://thestorybuilder.in/</strong>. We are a full-service digital marketing, web design, performance marketing, and brand strategy agency based in Hyderabad, Telangana, India. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Website and services.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            2. Information We Collect
          </h2>
          <p style={{ marginBottom: 12 }}>We collect several different types of information for various purposes to provide and improve our service to you:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li><strong>Personal Contact Data:</strong> When you submit an enquiry, book a consultation, or request an audit, we may collect your name, email address, phone number, location/area in Hyderabad or elsewhere, and project details.</li>
            <li><strong>Tracking & Analytics Data:</strong> We use Google Analytics (GA4), Google Tag Manager (GTM), Meta Pixel (Facebook/Instagram Ads), and IP/geolocation services (e.g., ipapi.co) to measure website traffic, conversion actions, user interactions, and geographic origin.</li>
            <li><strong>UTM Attribution Data:</strong> We capture campaign query parameters (such as <code style={{ color: "#facc15" }}>utm_source</code>, <code style={{ color: "#facc15" }}>utm_medium</code>, <code style={{ color: "#facc15" }}>utm_campaign</code>) to identify which marketing channels bring visitors to our Website.</li>
            <li><strong>Device & Browser Data:</strong> IP address, browser type, device category (desktop/mobile/tablet), screen resolution, operating system, and page view timestamps.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            3. How We Use Your Information
          </h2>
          <ul style={{ paddingLeft: 24 }}>
            <li>To respond to your enquiries, provide project quotes, and schedule strategy calls.</li>
            <li>To deliver our web development, performance marketing, social media marketing, and branding services.</li>
            <li>To track ad conversions and optimize performance campaigns across Meta Ads and Google Ads.</li>
            <li>To monitor, analyze, and maintain the security and technical performance of our Website.</li>
            <li>To comply with applicable legal obligations in India.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            4. Third-Party Tracking & Advertising Services
          </h2>
          <p>
            We use verified third-party tools to optimize user experience and measure advertisement performance:
          </p>
          <ul style={{ paddingLeft: 24, marginTop: 12 }}>
            <li><strong>Google Analytics & GTM:</strong> Used to understand site performance and visitor journeys.</li>
            <li><strong>Meta Pixel & Conversions API:</strong> Used to measure advertising efficiency on Facebook and Instagram.</li>
            <li><strong>Calendly:</strong> Embedded for scheduling 30-minute strategy calls.</li>
            <li><strong>Telegram API:</strong> Used for real-time internal notification alerts when a contact form is submitted.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            5. Your Data Protection Rights & Consent
          </h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal data held by us. You can manage or revoke your tracking consent at any time via our Cookie Consent banner or browser settings.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: "#fff", marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
            6. Contact Information
          </h2>
          <p>
            For any privacy inquiries or requests regarding your personal data, please contact us:
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
