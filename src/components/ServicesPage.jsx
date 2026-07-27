import { useEffect } from "react";

const allServices = [
  {
    id: "website",
    title: "Website Design & Development",
    desc: "Lightning-fast, mobile-responsive websites engineered to turn visitors into leads and customers.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="21" x2="16" y2="21" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="17" x2="12" y2="21" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "social",
    title: "Social Media Management",
    desc: "End-to-end organic social growth. We handle strategy, posting, and community building so you stay top-of-mind.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    desc: "Data-driven SEO strategies that improve organic rankings and drive high-intent traffic to your brand.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="11" y1="8" x2="11" y2="14" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="11" x2="14" y2="11" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "shoots",
    title: "Professional Shoots",
    desc: "High-end commercial photography and product shoots that elevate your visual identity and tell your story.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="4" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "reels",
    title: "Reels & Shorts Production",
    desc: "Viral-ready short-form content. Scripted, shot, and optimized for algorithms across Instagram, YouTube, and TikTok.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="7" y1="2" x2="7" y2="22" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="17" y1="2" x2="17" y2="22" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="2" y1="7" x2="7" y2="7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="2" y1="17" x2="7" y2="17" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="17" y1="17" x2="22" y2="17" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="17" y1="7" x2="22" y2="7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "video",
    title: "Video Editing",
    desc: "Dynamic, retention-focused editing for long-form video. We master pacing, sound design, and color grading.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <polygon points="23 7 16 12 23 17 23 7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "branding",
    title: "Branding & Identity",
    desc: "Complete visual systems. Logos, typography, color palettes, and brand guidelines that make you unforgettable.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }
];

export default function ServicesPage({ setPage }) {
  useEffect(() => {
    const els = document.querySelectorAll(".sr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { 
        if (e.isIntersecting) { 
          e.target.classList.add("visible"); 
          io.unobserve(e.target); 
        } 
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="services-page" style={{ paddingBottom: "100px" }}>
      <div className="hero-bg" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="dots" />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* PAGE HEADER */}
        <header className="services-pg-header fi" style={{ "--i": 0, paddingTop: "140px", marginBottom: "60px", textAlign: "center" }}>
          <span className="tag sr" style={{ margin: "0 auto 20px" }}>Our Capabilities</span>
          <h1 className="sec-h sr" style={{ maxWidth: "800px", margin: "0 auto 20px" }}>
            Everything you need to <br />
            <em>scale your brand.</em>
          </h1>
          <p className="muted services-pg-intro sr" style={{ maxWidth: "600px", margin: "0 auto" }}>
            From compelling content to high-converting websites, we offer an end-to-end suite of creative and technical services.
          </p>
        </header>

        {/* SERVICES GRID */}
        <section className="services-grid sr">
          {allServices.map((service, index) => (
            <div 
              className="sk" 
              key={service.id}
              style={{ 
                "--i": `${index * 0.1}s`, 
                display: "flex", 
                flexDirection: "column",
                padding: "32px 28px",
                height: "100%"
              }}
            >
              <div className="sk-ico" style={{ marginBottom: "20px" }}>{service.icon}</div>
              <h2 style={{ fontSize: "18px", fontFamily: "var(--fd)", fontWeight: 700, marginBottom: "12px", letterSpacing: "-0.2px" }}>
                {service.title}
              </h2>
              <p className="muted" style={{ fontSize: "14px", lineHeight: 1.6, flex: 1, margin: 0 }}>
                {service.desc}
              </p>
            </div>
          ))}
        </section>

        {/* EXTRA CALL TO ACTION SECTION */}
        <section className="services-bottom-cta sr" style={{ marginTop: "100px", textAlign: "center", padding: "60px 20px", background: "var(--card)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "32px", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.5px" }}>Ready to bring your vision to life?</h2>
          <p className="muted" style={{ maxWidth: "560px", margin: "0 auto 32px" }}>
            Whether you need a full brand overhaul or a targeted campaign, we are here to help you dominate your market.
          </p>
          <div className="services-cta-actions" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-gold" onClick={() => setPage("contact")}>
              Let's Discuss
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn btn-ghost" onClick={() => setPage("home")}>
              Back to Home
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
