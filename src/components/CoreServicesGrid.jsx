import React, { useEffect } from "react";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: "web-dev",
    route: "service-web-dev",
    step: "01 • WEB DEV",
    title: "Website Development",
    subtitle: "Custom Websites & Web Apps",
    desc: "Lightning-fast, mobile-responsive custom websites shipped in 7 days. Engineered for peak conversion rates, seamless UX, and top-tier Google rankings.",
    pills: ["Custom Web Apps", "Live in 7 Days", "SEO & Speed Built-In", "E-Commerce"],
    accentColor: "#38bdf8",
    gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(37, 99, 235, 0.04) 100%)",
    borderColor: "rgba(56, 189, 248, 0.3)",
    glowColor: "rgba(56, 189, 248, 0.25)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 8l3 3-3 3" />
        <line x1="12" y1="14" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    id: "social-media",
    route: "service-smm",
    step: "02 • SOCIAL MEDIA",
    title: "Social Media Management",
    subtitle: "Organic Growth & Reels Suite",
    desc: "Done-for-you Instagram management, viral Reels scripting, sleek graphic carousels, and strategic content pipelines designed to build brand authority.",
    pills: ["Instagram Reels", "Content Strategy", "Graphic Carousels", "Audience Growth"],
    accentColor: "#ec4899",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(192, 38, 211, 0.04) 100%)",
    borderColor: "rgba(236, 72, 153, 0.3)",
    glowColor: "rgba(236, 72, 153, 0.25)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "branding",
    route: "service-branding",
    step: "03 • BRANDING",
    title: "Branding & Visual Identity",
    subtitle: "Strategy & Design Systems",
    desc: "Command trust and prestige with bespoke logo suites, cohesive color palettes, typography hierarchies, and complete brand design systems.",
    pills: ["Logo Design", "Color & Typography", "Brand Style Guides", "Visual Assets"],
    accentColor: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(217, 119, 6, 0.05) 100%)",
    borderColor: "rgba(245, 158, 11, 0.35)",
    glowColor: "rgba(245, 158, 11, 0.3)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "performance-marketing",
    route: "service-perf-mktg",
    step: "04 • MARKETING",
    title: "Performance Marketing",
    subtitle: "Paid Ads & Lead Funnels",
    desc: "ROI-driven Meta & Google ad campaigns built for high lead volume, positive return on ad spend (ROAS), and automated conversion tracking.",
    pills: ["Meta & Google Ads", "High ROAS Campaigns", "Lead Generation", "Funnel Tracking"],
    accentColor: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.04) 100%)",
    borderColor: "rgba(16, 185, 129, 0.3)",
    glowColor: "rgba(16, 185, 129, 0.25)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function CoreServicesGrid({ setPage }) {
  useEffect(() => {
    const els = document.querySelectorAll(".sr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
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
    <section className="core-services-section" id="core-services">
      <div className="wrap">
        {/* Header */}
        <div className="core-services-header text-center">
          <span className="tag sr">WHAT WE DO</span>
          <h2 className="sec-h sr">
            Everything your brand needs to <em className="gold">stand out &amp; scale.</em>
          </h2>
          <p className="muted sr core-services-subtitle">
            Explore our 4 core service pillars engineered to elevate your online presence, captivate your audience, and drive real business growth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="core-services-grid">
          {servicesData.map((item, idx) => (
            <motion.div
              key={item.id}
              className="core-service-card sr"
              style={{
                "--accent": item.accentColor,
                "--card-gradient": item.gradient,
                "--card-border": item.borderColor,
                "--card-glow": item.glowColor,
                "--i": `${idx * 0.1}s`,
              }}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setPage && setPage(item.route)}
            >
              <div className="card-top-bar">
                <span className="card-step-badge">{item.step}</span>
                <div className="card-icon-wrapper">{item.icon}</div>
              </div>

              <div className="card-content">
                <h3 className="card-service-title">{item.title}</h3>
                <span className="card-service-sub">{item.subtitle}</span>
                <p className="card-service-desc">{item.desc}</p>
              </div>

              <div className="card-pills">
                {item.pills.map((pill, pIdx) => (
                  <span key={pIdx} className="service-pill-tag">
                    {pill}
                  </span>
                ))}
              </div>

              <div className="card-footer-action">
                <button
                  type="button"
                  className="card-explore-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (setPage) setPage(item.route);
                  }}
                >
                  <span>Explore Service</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
