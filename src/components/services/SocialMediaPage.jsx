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

      <span className="tag" style={{ display: "inline-flex", marginBottom: 12 }}>Reels Production & Editing</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #1A1208)", marginBottom: 20 }}>
        Reels Shoot & <span style={{ color: "var(--gold, #D97706)" }}>Professional Edit</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #665843)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        High-impact short-form video production — we shoot and edit engaging Reels tailored for maximum watch time, audience retention, and brand impact.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>🎬 Professional Video Shoot</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>High-definition camera, lighting, and audio setup to capture premium footage for your business.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>✂️ Expert Video Editing</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Seamless cuts, dynamic transitions, text overlays, and hook refinement built for high retention.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>🎵 Audio & Polish</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Trending audio integration, sound design, color grading, and export ready for Instagram Reels.</p>
        </div>
      </div>

      <div style={{ textAlign: "center", background: "var(--card, #FFFDF9)", border: "1px solid rgba(217,119,6,0.3)", padding: 40, borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <h3 style={{ fontSize: 26, color: "var(--text, #1A1208)", marginBottom: 12, fontFamily: "var(--fd)" }}>Ready to shoot & edit your Reels?</h3>
        <p style={{ color: "var(--muted, #665843)", marginBottom: 24 }}>Explore our Reels Shoot & Edit packages starting from ₹10,000.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("pricing")}>
          View Pricing & Packages →
        </button>
      </div>
    </main>
  );
}
