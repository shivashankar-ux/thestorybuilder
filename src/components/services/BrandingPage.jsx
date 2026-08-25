import { useEffect } from "react";

export default function BrandingPage({ setPage }) {
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

      <span className="tag" style={{ display: "inline-flex", marginBottom: 12 }}>Brand Identity</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #1A1208)", marginBottom: 20 }}>
        Brand Strategy & <span style={{ color: "var(--gold, #D97706)" }}>Identity Design</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #665843)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Build a memorable, premium brand identity that commands trust, positioning your business as the obvious choice in your market before customers even read a single sentence.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>💎 Logo & Symbol Suite</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Primary logos, secondary marks, wordmarks, and favicon assets delivered in vector formats (SVG, PNG, PDF).</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>🎨 Color & Typography Systems</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Curated color palettes and font hierarchies engineered for digital screens and printed stationery.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>📘 Brand Guidelines</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Comprehensive brand usage guidelines ensuring complete visual consistency across web, social media, and collateral.</p>
        </div>
      </div>

      <div style={{ textAlign: "center", background: "var(--card, #FFFDF9)", border: "1px solid rgba(217,119,6,0.3)", padding: 40, borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <h3 style={{ fontSize: 26, color: "var(--text, #1A1208)", marginBottom: 12, fontFamily: "var(--fd)" }}>Build a brand that customers remember.</h3>
        <p style={{ color: "var(--muted, #665843)", marginBottom: 24 }}>One-time branding packages starting from ₹7,999 with full file ownership.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("pricing")}>
          Explore Branding Packages →
        </button>
      </div>
    </main>
  );
}
