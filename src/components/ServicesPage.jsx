import { useEffect } from "react";

const servicesDetails = [
  {
    id: 1,
    title: "Starter",
    price: "₹6,999 onwards",
    subtitle: "Static website for new Hyderabad businesses",
    desc: "Delivered in 24 hours.",
    features: [
      "5-page static website (Home, About, Services, Gallery, Contact)",
      "Custom mobile-first design — phone, tablet & desktop",
      "1 year web hosting with free SSL (HTTPS)",
      "5 professional email accounts on your domain",
      "On-page SEO setup — meta titles, descriptions & H1 structure",
      "LocalBusiness + FAQ schema for Google rich results",
      "Google Maps embed + click-to-call phone buttons",
      "Lead enquiry form with instant email notifications",
      "WhatsApp chat button + social profile links",
      "Google Analytics 4 setup & Search Console ready",
      "2 content revision rounds + 30-day post-launch support",
      "Delivered in 24 hours"
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
    title: "Business",
    price: "₹12,999 onwards",
    subtitle: "Dynamic CMS website for growing brands",
    desc: "Delivered in 48 hours. Most Popular.",
    features: [
      "Dynamic CMS website — up to 8 editable pages",
      "Custom UI/UX with admin dashboard (no coding needed)",
      "5 professional email accounts on your domain",
      "Advanced on-page SEO + XML sitemap for Google indexing",
      "Conversion layouts — CTAs, trust badges & enquiry forms",
      "Google Maps, WhatsApp & social media integrations",
      "Core Web Vitals speed optimization (mobile-first)",
      "Auto-responder emails on form submissions",
      "3 revision rounds + hands-on CMS training for your team",
      "Delivered in 48 hours - priority WhatsApp support"
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
    title: "Ecommerce",
    price: "₹24,999 onwards",
    subtitle: "Full online store for Hyderabad retailers",
    desc: "Delivered in 3 days.",
    features: [
      "WooCommerce store setup with custom storefront design",
      "Up to 50 products — categories, filters & search",
      "10 professional email accounts on your domain",
      "Razorpay gateway — UPI, cards, net banking & wallets",
      "Mobile-optimized cart, checkout & order confirmation",
      "Product SEO — titles, schema markup & image alt tags",
      "Order alerts via email + WhatsApp notifications",
      "Inventory, coupons, shipping zones & tax setup",
      "Google Analytics ecommerce + conversion tracking",
      "Admin training, documentation & full handover",
      "Delivered in 3 days - ongoing maintenance available"
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          <span className="tag">Pricing Plans</span>
          <h1 className="sec-h">
            Website packages tailored<br />
            <em>for your business.</em>
          </h1>
          <p className="muted services-pg-intro">
            Transparent pricing, fast delivery, and high-performance websites.
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
                <div style={{color: "#facc15", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem"}}>{service.price}</div>
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
