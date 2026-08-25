import { useEffect } from "react";

export default function SocialMediaPage({ setPage }) {
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

      <span className="tag" style={{ display: "block", marginBottom: 12 }}>Organic Brand Growth</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 20 }}>
        Social Media Marketing & <span style={{ color: "var(--gold, #facc15)" }}>Content Strategy</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #94a3b8)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Done-for-you Instagram management, short-form Reels scripts, graphic content creation, and strategic social campaigns that build brand authority and engaged audiences.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>🎬 Scripted Reels & Video</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Short-form video content scripted for engagement and edited for high watch-time on Instagram & YouTube Shorts.</p>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>🎨 Custom Visual Creatives</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Zero canva templates. Bespoke carousels and brand posts designed around your visual identity.</p>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>📈 Growth & Analytics</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Monthly performance reporting, hashtag research, content calendars, and audience engagement tuning.</p>
        </div>
      </div>

      <div style={{ textAlign: "center", background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.2)", padding: 40, borderRadius: 20 }}>
        <h3 style={{ fontSize: 26, color: "#fff", marginBottom: 12 }}>Ready to elevate your brand presence?</h3>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>Explore our Instagram management packages starting from ₹9,999/month.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("pricing")}>
          View Pricing & Packages →
        </button>
      </div>
    </main>
  );
}
