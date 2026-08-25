import { useEffect } from "react";

export default function BlogPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="blog-page-wrapper" style={{ padding: "120px 24px 80px", maxWidth: 1000, margin: "0 auto", color: "var(--text, #1A1208)" }}>
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

      <span className="tag" style={{ display: "inline-flex", marginBottom: 12 }}>Resources & Insights</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #1A1208)", marginBottom: 20 }}>
        Growth Guides & <span style={{ color: "var(--gold, #D97706)" }}>Case Breakdown</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #665843)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Deep dives on performance marketing, website conversion optimization, local SEO, and digital growth strategies for Indian founders.
      </p>

      <div style={{ background: "var(--card, #FFFDF9)", border: "1px dashed rgba(217,119,6,0.3)", borderRadius: 20, padding: "48px 32px", textAlign: "center", marginBottom: 60, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✍️</div>
        <h3 style={{ fontSize: 24, color: "var(--text, #1A1208)", marginBottom: 12, fontFamily: "var(--fd)" }}>Growth Insights Coming Soon</h3>
        <p style={{ color: "var(--muted, #665843)", maxWidth: 540, margin: "0 auto 24px", lineHeight: 1.6 }}>
          We prioritize publishing battle-tested strategies over generic AI content. Our team is finalizing technical breakdowns of real client campaigns.
        </p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("contact")}>
          Get Notified / Discuss Your Strategy →
        </button>
      </div>
    </main>
  );
}
