import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Services3DDeck from "./Services3DDeck";

const allServices = [
  {
    id: "website",
    route: "service-web-dev",
    tag: "LIVE IN 7 DAYS",
    title: "Website Design & Development",
    desc: "Lightning-fast, mobile-responsive websites engineered to turn visitors into qualified leads and paying customers.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="21" x2="16" y2="21" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="17" x2="12" y2="21" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "ads",
    route: "service-perf-mktg",
    tag: "HIGH ROAS CAMPAIGNS",
    title: "Performance Marketing & Meta Ads",
    desc: "Meta & Google Ads campaigns engineered for qualified lead volume and positive return on ad spend (ROAS).",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "social",
    route: "service-smm",
    tag: "ORGANIC GROWTH",
    title: "Social Media Marketing & Reels",
    desc: "Done-for-you Instagram management, short-form Reels scripts, graphic carousels, and strategic audience building.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "branding",
    route: "service-branding",
    tag: "BRAND AUTHORITY",
    title: "Brand Strategy & Visual Identity",
    desc: "Vector logo suites, curated color palettes, typography rules, and brand guidelines that make your business command trust.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "seo",
    route: "service-web-dev",
    tag: "ORGANIC TRAFFIC",
    title: "Search Engine Optimization (SEO)",
    desc: "Data-driven SEO strategies that improve organic rankings on Google Page 1 and drive high-intent customer traffic.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "shoots",
    route: "service-smm",
    tag: "CREATIVE PRODUCTION",
    title: "Professional Shoots & Video Suite",
    desc: "High-end commercial photo shoots and retention-focused video editing for Reels, YouTube, and digital ads.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="4" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function ServicesPage({ setPage }) {
  const [viewMode, setViewMode] = useState("deck");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="services-page" style={{ paddingBottom: "100px", color: "var(--text, #0F172A)" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        {/* PAGE HEADER */}
        <header style={{ paddingTop: "120px", marginBottom: "40px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
            <span className="tag" style={{ margin: 0 }}>Our Capabilities</span>
            
            {/* View Mode Toggle */}
            <div style={{ display: "inline-flex", background: "var(--card, #FFFFFF)", padding: 4, borderRadius: 100, border: "1px solid var(--border)" }}>
              <button
                type="button"
                onClick={() => setViewMode("deck")}
                style={{
                  background: viewMode === "deck" ? "var(--gold, #D97706)" : "transparent",
                  color: viewMode === "deck" ? "#FFFFFF" : "var(--muted, #475569)",
                  border: 0,
                  borderRadius: 100,
                  padding: "6px 18px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              >
                ✨ Interactive Showcase
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                style={{
                  background: viewMode === "grid" ? "var(--gold, #D97706)" : "transparent",
                  color: viewMode === "grid" ? "#FFFFFF" : "var(--muted, #475569)",
                  border: 0,
                  borderRadius: 100,
                  padding: "6px 18px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              >
                📋 All Services Grid
              </button>
            </div>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontFamily: "var(--fd)", fontWeight: 800, maxWidth: 850, margin: "0 auto 20px", color: "var(--text, #0F172A)", lineHeight: 1.15 }}>
            Everything you need to <br />
            <span style={{ color: "var(--gold, #D97706)" }}>scale your brand online.</span>
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted, #475569)", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            From high-converting websites to ROI-focused Meta Ads and Instagram growth strategies for businesses in Hyderabad & across India.
          </p>
        </header>
      </div>

      {viewMode === "deck" ? (
        <Services3DDeck setPage={setPage} />
      ) : (
        <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto 60px", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {allServices.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  background: "var(--card, #FFFFFF)",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: "rgba(217, 119, 6, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(217, 119, 6, 0.2)",
                      }}
                    >
                      {service.icon}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "var(--gold, #D97706)", letterSpacing: "0.05em" }}>
                      {service.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 22, fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 12, color: "var(--text, #0F172A)" }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "var(--muted, #475569)", lineHeight: 1.65, marginBottom: 28 }}>
                    {service.desc}
                  </p>
                </div>

                <button
                  onClick={() => setPage && setPage(service.route)}
                  className="btn btn-ghost"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    borderColor: "var(--border)",
                    color: "var(--text, #0F172A)",
                  }}
                >
                  Explore Details →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* CTA SECTION */}
      <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <section
          style={{
            textAlign: "center",
            padding: "50px 32px",
            background: "var(--card, #FFFFFF)",
            borderRadius: 24,
            border: "1px solid rgba(217,119,6,0.3)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontFamily: "var(--fd)", fontSize: 32, fontWeight: 800, marginBottom: 16, color: "var(--text, #0F172A)" }}>
            Ready to bring your vision to life?
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted, #475569)", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Whether you need a high-converting website built in 7 days or an ROI-focused Meta Ads campaign, we're ready to help you grow.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-gold" onClick={() => setPage && setPage("contact")} style={{ padding: "14px 28px", fontSize: 15 }}>
              Book Free Strategy Call →
            </button>
            <button className="btn btn-ghost" onClick={() => setPage && setPage("pricing")} style={{ padding: "14px 28px", fontSize: 15 }}>
              View Transparent Pricing
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
