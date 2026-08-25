import { useEffect } from "react";

export default function WebDevPage({ setPage }) {
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

      <span className="tag" style={{ display: "block", marginBottom: 12 }}>Core Expertise</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 20 }}>
        Website Design & <span style={{ color: "var(--gold, #facc15)" }}>Web Development</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #94a3b8)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Custom, high-converting websites engineered for fast load speeds, mobile responsiveness, and measurable lead generation. Shipped in 7 days for businesses in Hyderabad and across India.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>🚀 Shipped in 7 Days</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>We don't drag projects out over months. Clear milestones and rapid execution mean your business goes live fast.</p>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>📱 Mobile-First UX</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Over 80% of your visitors browse on smartphones. Every page is pixel-perfect and optimized for touch devices.</p>
        </div>
        <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>🎯 Built for Conversions</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>WhatsApp lead capture, CRM-ready contact forms, and strategic CTAs convert passive traffic into real customer enquiries.</p>
        </div>
      </div>

      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 28, color: "#fff", marginBottom: 24, fontFamily: "var(--fd)" }}>Our Web Development Process</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { step: "01", title: "Discovery & Funnel Strategy", desc: "We map out your customer journey, positioning, and conversion goals." },
            { step: "02", title: "Custom UI/UX & Copywriting", desc: "No generic templates. Custom visual design paired with punchy sales copy." },
            { step: "03", title: "Engineering & Speed Optimization", desc: "Clean code, image compression, preloading, and Core Web Vitals checks." },
            { step: "04", title: "SEO Foundation & Handover", desc: "Meta tags, schema, sitemap, analytics wiring, and complete client code ownership." },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", gap: 20, background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color: "#facc15", fontFamily: "var(--fd)", fontSize: 24, fontWeight: 800 }}>{item.step}</span>
              <div>
                <h4 style={{ color: "#fff", fontSize: 18, marginBottom: 4 }}>{item.title}</h4>
                <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.2)", padding: 40, borderRadius: 20 }}>
        <h3 style={{ fontSize: 26, color: "#fff", marginBottom: 12 }}>Ready for a website that actually drives growth?</h3>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>Book a free 30-minute strategy call or request a custom project quote today.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("contact")}>
          Start Web Project →
        </button>
      </div>
    </main>
  );
}
