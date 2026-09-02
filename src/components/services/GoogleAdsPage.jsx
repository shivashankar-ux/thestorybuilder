import { useEffect } from "react";

export default function GoogleAdsPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="service-detail-page" style={{ padding: "120px 24px 80px", maxWidth: 1000, margin: "0 auto", color: "var(--text, #1A1208)" }}>
      <button
        onClick={() => setPage && setPage("services")}
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
        ← All Services
      </button>

      <span className="tag" style={{ display: "inline-flex", marginBottom: 12 }}>Paid Search Lead Generation</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #1A1208)", marginBottom: 20 }}>
        Google Ads Agency Hyderabad — <span style={{ color: "var(--gold, #D97706)" }}>High-ROAS Pay-Per-Click Campaigns</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #665843)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Precision-targeted Search, Display, and Performance Max ad campaigns engineered to capture active buyer intent and deliver measurable qualified lead volume for growing businesses.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>🎯 High-Intent Search Ads</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Capture prospects at the exact moment they search for your services with negative keyword filtering, ad extension wiring, and strict match type control.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>⚡ Conversion Landing Pages</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>We pair your Google Ads campaigns with custom, 7-day landing pages built for 20%+ lead conversion rates rather than sending ad traffic to generic homepages.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>📊 Full-Funnel Conversion Tracking</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Google Tag Manager, GTAG Enhanced Conversion tracking, WhatsApp click monitoring, and CRM integration ensure zero lost attribution.</p>
        </div>
      </div>

      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 28, color: "var(--text, #1A1208)", marginBottom: 24, fontFamily: "var(--fd)" }}>Our Paid Ad Optimization Blueprint</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { step: "01", title: "Audience & Competitor Keyword Research", desc: "Identifying transactional keyword queries with high commercial intent and low wasted ad spend." },
            { step: "02", title: "High-Converting Ad Copy & Assets", desc: "Crafting compelling headlines, descriptions, callouts, and location extensions tailored to Hyderabad buyers." },
            { step: "03", title: "Bid Management & Quality Score Tuning", desc: "Optimizing Quality Scores to lower Cost-Per-Click (CPC) while dominating top-of-page impression share." },
            { step: "04", title: "Weekly Lead Audits & ROAS Scaling", desc: "Continuous A/B testing of ad variations, negative keywords, and landing page elements for max ROI." },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", gap: 20, background: "var(--card, #FFFDF9)", padding: 20, borderRadius: 12, border: "1px solid var(--border)" }}>
              <span style={{ color: "var(--gold)", fontFamily: "var(--fd)", fontSize: 24, fontWeight: 800 }}>{item.step}</span>
              <div>
                <h4 style={{ color: "var(--text, #1A1208)", fontSize: 18, marginBottom: 4, fontFamily: "var(--fd)" }}>{item.title}</h4>
                <p style={{ color: "var(--muted, #665843)", fontSize: 14, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", background: "var(--card, #FFFDF9)", border: "1px solid rgba(217,119,6,0.3)", padding: 40, borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <h3 style={{ fontSize: 26, color: "var(--text, #1A1208)", marginBottom: 12, fontFamily: "var(--fd)" }}>Stop wasting ad budget on unqualified clicks.</h3>
        <p style={{ color: "var(--muted, #665843)", marginBottom: 24 }}>Book a free 30-minute Google Ads strategy call and discover your growth potential.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("contact")}>
          Book Ads Strategy Call →
        </button>
      </div>
    </main>
  );
}
