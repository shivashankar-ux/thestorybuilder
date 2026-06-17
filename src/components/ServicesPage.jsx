import { useEffect } from "react";

const servicesDetails = [
  {
    id: 1,
    title: "Performance Marketing",
    subtitle: "Paid Acquisition & ROI-Driven Media Buy",
    desc: "Meta & Google ads engineered for ROAS, not vanity metrics. We focus on scaling your revenue, reducing acquisition costs, and building customer pathways that convert.",
    features: [
      "Search & Shopping Campaigns",
      "Social Media Ads (Meta, Instagram)",
      "Audience Architecture & Retargeting",
      "Funnel & Analytics Tracking"
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14l4-4 4 4 5-5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9h4v4" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Social Media Marketing",
    subtitle: "Organic Growth & Brand Authority",
    desc: "Organic content, community building, and social campaigns that keep your brand top-of-mind. We design narratives that captivate, build active audiences, and generate trust.",
    features: [
      "Content Strategy & Creation",
      "Community Management & Engagement",
      "Influencer Partnerships",
      "Brand Authority Campaigns"
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="18" cy="5" r="3" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="12" r="3" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="19" r="3" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Web Development",
    subtitle: "High-Performance Digital Products",
    desc: "Mobile-first, lightning-fast websites engineered to convert visitors into clients. We build custom React and Next.js applications that score 100% on PageSpeed audits.",
    features: [
      "Vite & Next.js Websites",
      "Conversion Rate Optimization (CRO)",
      "Interactive Product Design",
      "Search Engine Optimization (SEO)"
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Brand Strategy",
    subtitle: "Positioning & Category Design",
    desc: "Strategic positioning and visual identity systems that make you the obvious choice. We define your competitive edge, brand voice, and craft stories that separate you from competitors.",
    features: [
      "Competitor Audits & Positioning",
      "Brand Voice & Message Design",
      "Visual Identity & Styling Guides",
      "Go-to-Market Execution Plans"
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" stroke="#facc15" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function ServicesPage({ setPage }) {
  useEffect(() => {
    const els = document.querySelectorAll(".sr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="services-page">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="dots" />
      </div>

      <div className="wrap">
        {/* PAGE HEADER */}
        <header className="services-pg-header fi" style={{ "--i": 0 }}>
          <span className="tag">What We Do</span>
          <h1 className="sec-h">
            Specialized growth solutions<br />
            <em>engineered to scale.</em>
          </h1>
          <p className="muted services-pg-intro">
            We build and run systems that move real numbers, not just vanity impressions. 
            Here is how we work with founders and growing brands across India to drive revenue.
          </p>
        </header>

        {/* SERVICES DETAILS SECTION */}
        <section className="services-list-container">
          {servicesDetails.map((service, index) => (
            <div 
              className="service-card-detailed sr" 
              key={service.id}
              style={{ "--i": `${index * 0.1}s` }}
            >
              <div className="service-details-meta">
                <div className="service-details-icon">{service.icon}</div>
                <span className="service-details-subtitle">{service.subtitle}</span>
                <h2>{service.title}</h2>
                <p className="muted">{service.desc}</p>
              </div>

              <div className="service-details-features">
                <h3>Core Deliverables</h3>
                <ul>
                  {service.features.map((feat, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polyline points="20 6 9 17 4 12" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* EXTRA CALL TO ACTION SECTION */}
        <section className="services-bottom-cta sr">
          <h2>Ready to design your growth plan?</h2>
          <p className="muted">
            Let's dissect your current numbers and find out what's holding you back. 
            Book a strategy call or get in touch.
          </p>
          <div className="services-cta-actions">
            <button className="btn btn-gold" onClick={() => setPage("contact")}>
              Get Started
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
