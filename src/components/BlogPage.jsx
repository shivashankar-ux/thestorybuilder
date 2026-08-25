import { useEffect } from "react";

export default function BlogPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="blog-page-wrapper" style={{ padding: "120px 24px 80px", maxWidth: 1000, margin: "0 auto", color: "var(--text, #e2e8f0)" }}>
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

      <span className="tag" style={{ display: "block", marginBottom: 12 }}>Resources & Insights</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 20 }}>
        Growth Guides & <span style={{ color: "var(--gold, #facc15)" }}>Case Breakdown</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #94a3b8)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Deep dives on performance marketing, website conversion optimization, local SEO, and digital growth strategies for Indian founders.
      </p>

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(250,204,21,0.3)", borderRadius: 20, padding: "48px 32px", textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✍️</div>
        <h3 style={{ fontSize: 24, color: "#fff", marginBottom: 12 }}>Growth Insights Coming Soon</h3>
        <p style={{ color: "#94a3b8", maxWidth: 540, margin: "0 auto 24px", lineHeight: 1.6 }}>
          We prioritize publishing battle-tested strategies over generic AI content. Our team is finalizing technical breakdowns of real client campaigns.
        </p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("contact")}>
          Get Notified / Discuss Your Strategy →
        </button>
      </div>
    </main>
  );
}
