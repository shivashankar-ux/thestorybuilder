import { useEffect } from "react";

export default function SeoServicesPage({ setPage }) {
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

      <span className="tag" style={{ display: "inline-flex", marginBottom: 12 }}>Search Engine Growth</span>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #1A1208)", marginBottom: 20 }}>
        SEO Agency Hyderabad — <span style={{ color: "var(--gold, #D97706)" }}>Organic Search Growth & Visibility</span>
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted, #665843)", maxWidth: 780, lineHeight: 1.6, marginBottom: 48 }}>
        Data-driven Technical SEO, Local Google Maps Optimization, and Intent-Focused Content Strategy designed to get your business ranking #1 on Google Search in Hyderabad & across India.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>📍 Local SEO & Google Maps</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Dominate local pack searches in Hyderabad (HITECH City, Gachibowli, Madhapur, Jubilee Hills) with verified Schema.org markup and Google Business Profile optimization.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>⚡ Technical & Core Web Vitals</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>Fix indexability bottlenecks, speed up LCP/CLS metrics, optimize canonicals, and structure clean XML sitemaps for flawless crawler discovery.</p>
        </div>
        <div className="card" style={{ background: "var(--card, #FFFDF9)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: "var(--text, #1A1208)", fontSize: 20, marginBottom: 12, fontFamily: "var(--fd)" }}>🎯 Search Intent Content</h3>
          <p style={{ color: "var(--muted, #665843)", fontSize: 14, lineHeight: 1.65 }}>We write high-converting landing page copy and authoritative guides that satisfy high-intent buyer searches rather than keyword stuffing.</p>
        </div>
      </div>

      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 28, color: "var(--text, #1A1208)", marginBottom: 24, fontFamily: "var(--fd)" }}>Our 4-Phase SEO Execution Framework</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { step: "01", title: "Technical & Competitor Intelligence Audit", desc: "We uncover hidden crawling blocks, missing page opportunities, and competitor ranking strategy gaps." },
            { step: "02", title: "Keyword Architecture & Search Intent Mapping", desc: "Selecting high-yield commercial keywords and mapping them directly to dedicated landing pages." },
            { step: "03", title: "On-Page Optimization & Schema Graph Wiring", desc: "Implementing precise HTML titles, semantic H1-H3 headings, alt text, and rich JSON-LD structured data." },
            { step: "04", title: "Continuous Monitoring & AI Overview Visibility", desc: "Tracking Google Search Console rankings, CTR optimization, and building authority for AI Overviews." },
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
        <h3 style={{ fontSize: 26, color: "var(--text, #1A1208)", marginBottom: 12, fontFamily: "var(--fd)" }}>Ready to rank #1 on Google in Hyderabad?</h3>
        <p style={{ color: "var(--muted, #665843)", marginBottom: 24 }}>Get a comprehensive organic search audit and custom SEO roadmap for your business.</p>
        <button className="btn btn-gold" onClick={() => setPage && setPage("contact")}>
          Claim Free SEO Audit →
        </button>
      </div>
    </main>
  );
}
