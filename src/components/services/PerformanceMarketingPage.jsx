import { useEffect } from "react";

export default function PerformanceMarketingPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="service-detail-page" style={{ padding: "120px 24px 80px", maxWidth: 1000, margin: "0 auto", color: "var(--text, #e2e8f0)" }}>
      <button
        onClick={() => setPage && setPage("services")}
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
        ← All Services
      </button>

      <span className="tag" style={{ display: "block", marginBottom: 12 }}>ROI-Focused Paid Media</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 20 }}>
        Performance Marketing & <span style={{ color: "var(--gold, #facc15)" }}>Lead Gen Ads</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #94a3b8)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Meta Ads (Facebook & Instagram) and Google Search campaign management engineered for qualified lead volume and positive ROAS, not vanity metrics.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>🎯 Meta Ads Precision</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Custom audience segmentation, high-converting ad copy, scroll-stopping creatives, and lead form funnels.</p>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>🔍 Google High-Intent Search</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Capture active search intent from customers looking specifically for your services in your target city or region.</p>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>📊 End-to-End Tracking</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Meta Pixel, Conversions API, GA4, and UTM attribution parameters to measure true customer acquisition costs.</p>
        </div>
      </div>

      <div style={{ textAlign: "center", background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.2)", padding: 40, borderRadius: 20 }}>
        <h3 style={{ fontSize: 26, color: "#fff", marginBottom: 12 }}>Want predictable leads every month?</h3>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>Let us audit your ad campaigns or set up your performance marketing funnel.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("contact")}>
          Get Performance Marketing Audit →
        </button>
      </div>
    </main>
  );
}
