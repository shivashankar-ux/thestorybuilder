import { useEffect } from "react";

export default function BrandingPage({ setPage }) {
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

      <span className="tag" style={{ display: "block", marginBottom: 12 }}>Brand Identity</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 20 }}>
        Brand Strategy & <span style={{ color: "var(--gold, #facc15)" }}>Identity Design</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #94a3b8)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Build a memorable, premium brand identity that commands trust, positioning your business as the obvious choice in your market before customers even read a single sentence.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>💎 Logo & Symbol Suite</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Primary logos, secondary marks, wordmarks, and favicon assets delivered in vector formats (SVG, PNG, PDF).</p>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>🎨 Color & Typography Systems</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Curated color palettes and font hierarchies engineered for digital screens and printed stationery.</p>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>📘 Brand Guidelines</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Comprehensive brand usage guidelines ensuring complete visual consistency across web, social media, and collateral.</p>
        </div>
      </div>

      <div style={{ textAlign: "center", background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.2)", padding: 40, borderRadius: 20 }}>
        <h3 style={{ fontSize: 26, color: "#fff", marginBottom: 12 }}>Build a brand that customers remember.</h3>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>One-time branding packages starting from ₹7,999 with full file ownership.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("pricing")}>
          Explore Branding Packages →
        </button>
      </div>
    </main>
  );
}
