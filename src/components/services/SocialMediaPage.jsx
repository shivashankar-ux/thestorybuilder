import { useEffect } from "react";

export default function SocialMediaPage({ setPage }) {
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

      <span className="tag" style={{ display: "inline-flex", marginBottom: 12 }}>Organic Brand Growth</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #1A1208)", marginBottom: 20 }}>
        Social Media Marketing & <span style={{ color: "var(--gold, #D97706)" }}>Content Strategy</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #665843)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Done-for-you Instagram management, short-form Reels scripts, graphic content creation, and strategic social campaigns that build brand authority and engaged audiences.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>🎬 Scripted Reels & Video</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Short-form video content scripted for engagement and edited for high watch-time on Instagram & YouTube Shorts.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>🎨 Custom Visual Creatives</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Zero generic templates. Bespoke carousels and brand posts designed around your visual identity.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>📈 Growth & Analytics</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Monthly performance reporting, hashtag research, content calendars, and audience engagement tuning.</p>
        </div>
      </div>

      <div style={{ textAlign: "center", background: "var(--card, #FFFDF9)", border: "1px solid rgba(217,119,6,0.3)", padding: 40, borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <h3 style={{ fontSize: 26, color: "var(--text, #1A1208)", marginBottom: 12, fontFamily: "var(--fd)" }}>Ready to elevate your brand presence?</h3>
        <p style={{ color: "var(--muted, #665843)", marginBottom: 24 }}>Explore our Instagram management packages starting from ₹9,999/month.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("pricing")}>
          View Pricing & Packages →
        </button>
      </div>
    </main>
  );
}
