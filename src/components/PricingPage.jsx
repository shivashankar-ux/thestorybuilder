import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "./common/GlowCard";
import MagneticButton from "./common/MagneticButton";

const pricingCategories = [
  {
    id: "websites",
    name: "Websites & Growth",
    tagline: "Whether you're just getting started or ready to scale, we have a solution designed for your growth.",
    note: "Launch Offer Pricing — Available For A Limited Number Of Clients While We Build Our Portfolio.",
    themeClass: "theme-blue",
    pillars: ["Fast Delivery", "Mobile Friendly", "SEO Ready", "Business Growth Focused"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    tiers: [
      {
        badge: "STARTER",
        name: "Starter",
        price: "Rs.13,000",
        cadence: "project",
        desc: "Perfect for businesses starting their online journey.",
        features: [
          "1-5 page website",
          "Mobile responsive design",
          "WhatsApp button integration",
          "Contact form setup",
          "Basic on-page SEO",
          "Google Business profile setup",
          "1 revision round",
          "7 days support"
        ],
        cta: "Get Started",
        highlight: false
      },
      {
        badge: "MOST POPULAR",
        name: "Growth",
        price: "Rs. 18,000",
        cadence: "project",
        desc: "Built for businesses that want consistent leads.",
        features: [
          "Up to 7 pages",
          "Lead capture forms",
          "Google Maps integration",
          "Basic copywriting included",
          "Speed & performance optimization",
          "Google Analytics setup",
          "Social media links & icons",
          "2 revision rounds",
          "30 days support"
        ],
        cta: "Start Growing",
        highlight: true
      },
      {
        badge: "PREMIUM",
        name: "Premium",
        price: "Rs.30,000",
        cadence: "project",
        desc: "For businesses ready to dominate online and scale.",
        features: [
          "Up to 12 pages",
          "Custom design (no templates)",
          "Appointment booking system",
          "Advanced SEO setup",
          "Blog / CMS setup",
          "WhatsApp automation integration",
          "CRM-ready contact forms",
          "3 revision rounds",
          "Priority support",
          "60 days support"
        ],
        cta: "Scale My Business",
        highlight: false
      }
    ]
  },
  {
    id: "instagram",
    name: "Instagram Management",
    tagline: "Done-for-you Instagram content, strategy, and growth — so you can focus on running your business.",
    note: "All packages are month-to-month. No long-term contracts. Cancel anytime.",
    themeClass: "theme-magenta",
    pillars: ["Reels included", "Custom Creatives", "No Templates", "Growth Focused"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    tiers: [
      {
        badge: "BASIC",
        name: "Basic",
        price: "Rs.9,999",
        cadence: "month",
        desc: "Build your presence with consistent, quality content.",
        features: [
          "12 posts per month",
          "8 static posts (graphics)",
          "4 carousel posts",
          "Caption writing + hashtags",
          "Content calendar",
          "Instagram bio optimization",
          "Monthly performance report",
          "7-day story highlights setup"
        ],
        cta: "Get Started",
        highlight: false
      },
      {
        badge: "MOST POPULAR",
        name: "Standard",
        price: "Rs. 14,000",
        cadence: "month",
        desc: "Grow your audience with Reels, strategy, and engagement.",
        features: [
          "20 posts per month",
          "10 static + 4 carousels",
          "6 Reels (scripted + edited)",
          "Caption writing + hashtags",
          "Content calendar + strategy",
          "Community management",
          "Story posts (3x/week)",
          "Hashtag research & rotation",
          "Monthly analytics report"
        ],
        cta: "Start Growing",
        highlight: true
      },
      {
        badge: "PREMIUM",
        name: "Premium",
        price: "Rs. 21,000",
        cadence: "month",
        desc: "Full-service Instagram management built to generate leads.",
        features: [
          "28 posts per month",
          "12 static + 6 carousels",
          "10 Reels (scripted + edited)",
          "Daily stories",
          "Caption + copywriting",
          "Community mgmt + DM replies",
          "Festival & campaign creatives",
          "Competitor analysis",
          "Bi-weekly strategy call",
          "Detailed monthly report"
        ],
        cta: "Scale My Brand",
        highlight: false
      }
    ]
  },
  {
    id: "branding",
    name: "Branding & Identity",
    tagline: "Build a brand that people remember, trust, and buy from — before they even visit your website.",
    note: "One-time project fee. Delivered within 7-15 working days depending on package.",
    themeClass: "theme-gold",
    pillars: ["You Own All Files", "No Templates Used", "Custom Designed", "Fast Turnaround"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    tiers: [
      {
        badge: "ESSENTIAL",
        name: "Essential",
        price: "Rs. 7,999",
        cadence: "one-time",
        desc: "Everything you need to look professional and consistent.",
        features: [
          "Logo design (3 concepts)",
          "Primary + secondary color palette",
          "Typography selection (2 fonts)",
          "Business card design",
          "Letterhead design",
          "Basic brand usage guidelines",
          "All files (PNG, SVG, PDF)",
          "2 revision rounds",
          "Delivered in 7 working days"
        ],
        cta: "Build My Brand",
        highlight: false
      },
      {
        badge: "MOST POPULAR",
        name: "Brand Identity",
        price: "Rs. 14,999",
        cadence: "one-time",
        desc: "A complete identity system that works across every touchpoint.",
        features: [
          "Logo design (5 concepts)",
          "Full color palette system",
          "Typography hierarchy",
          "Business card + letterhead",
          "Email signature design",
          "Social media profile kit",
          "Instagram post templates (5)",
          "Brand voice & tone guide",
          "Brand guidelines document",
          "3 revision rounds",
          "Delivered in 12 working days"
        ],
        cta: "Create My Identity",
        highlight: true
      },
      {
        badge: "PREMIUM",
        name: "Premium",
        price: "Rs. 24,999",
        cadence: "one-time",
        desc: "Full brand system built for businesses ready to scale.",
        features: [
          "Logo + icon + wordmark suite",
          "Complete color system",
          "Typography + iconography kit",
          "Full stationery set",
          "Social media template kit (15)",
          "Pitch deck / presentation design",
          "Brand story + messaging guide",
          "Brand guidelines (20+ pages)",
          "WhatsApp Business profile setup",
          "Packaging / label design (1)",
          "Unlimited revisions",
          "Delivered in 15 working days"
        ],
        cta: "Build My Legacy",
        highlight: false
      }
    ]
  },
  {
    id: "leads",
    name: "Lead Generation",
    tagline: "Performance marketing that brings real customers to your business — not just clicks.",
    note: "Management fee only. Ad spend budget is separate and paid directly to Meta / Google.",
    themeClass: "theme-teal",
    pillars: ["Meta + Google Ads", "Real Lead Tracking", "No Ad Spend Markup", "ROI Focused"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
        <line x1="22" y1="2" x2="11" y2="13" />
      </svg>
    ),
    tiers: [
      {
        badge: "STARTER",
        name: "Starter",
        price: "Rs.14,999",
        cadence: "month",
        desc: "Get your first leads flowing with Meta Ads.",
        features: [
          "Meta Ads setup (Facebook + Instagram)",
          "1 active campaign",
          "Audience research & targeting",
          "2 ad creatives per month",
          "Lead form",
          "Pixel installation & tracking",
          "Recommended ad spend: Rs. 5k-10k",
          "Monthly performance report"
        ],
        cta: "Start Getting Leads",
        highlight: false
      },
      {
        badge: "MOST POPULAR",
        name: "Growth",
        price: "Rs.24,000",
        cadence: "month",
        desc: "Multi-platform campaigns built to consistently generate leads.",
        features: [
          "Meta Ads + Google Ads",
          "Up to 3 active campaigns",
          "Audience research + retargeting",
          "4 ad creatives per month",
          "Custom landing page (1 page)",
          "Pixel + conversion tracking",
          "A/B testing of ad copies",
          "WhatsApp lead follow-up setup",
          "Recommended ad spend: Rs. 15k-25k",
          "Bi-weekly performance report"
        ],
        cta: "Grow My Leads",
        highlight: true
      },
      {
        badge: "PREMIUM",
        name: "Premium",
        price: "Rs.35,000",
        cadence: "month",
        desc: "Full-funnel lead generation with automation and scaling.",
        features: [
          "Meta Ads / Google Ads",
          "Up to 5 active campaigns",
          "Advanced audience segmentation",
          "8 ad creatives per month",
          "Custom landing pages (up to 3)",
          "Full funnel setup",
          "CRM / lead sheet integration",
          "WhatsApp automation for leads",
          "Lookalike audience targeting",
          "Recommended ad spend: Rs. 30k+",
          "Weekly report + strategy call"
        ],
        cta: "Scale With Performance",
        highlight: false
      }
    ]
  }
];

const CheckIcon = () => (
  <svg className="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PricingPage({ setPage }) {
  const [activeCategory, setActiveCategory] = useState("websites");

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const activeData = pricingCategories.find((c) => c.id === activeCategory);

  return (
    <main className={`pricing-page-wrapper ${activeData.themeClass}`}>
      <div className="hero-bg" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="dots" />
      </div>

      <div className="wrap">
        {/* HEADER */}
        <header className="pricing-pg-header" style={{ paddingTop: "140px", textAlign: "center" }}>
          <motion.span
            className="tag"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Pricing Plans
          </motion.span>
          <motion.h1
            className="sec-h"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Pricing built around<br />
            <em>real business growth.</em>
          </motion.h1>
          <motion.p
            className="muted pricing-pg-intro"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Choose the right services to start scaling. Flexible packages, transparent terms, and zero hidden costs.
          </motion.p>
        </header>

        {/* INTERACTIVE CATEGORY TABS */}
        <div className="pricing-tabs-container" style={{ margin: "40px 0" }}>
          <div className="pricing-tabs-list">
            {pricingCategories.map((cat) => (
              <button
                key={cat.id}
                className={`pricing-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{ cursor: "pointer", position: "relative", zIndex: 1 }}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    className="pricing-tab-active-bg"
                    layoutId="activeTabBg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="pricing-tab-icon">{cat.icon}</span>
                <span className="pricing-tab-name">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* PACKAGE INTRO */}
        <motion.div
          key={activeCategory + "-intro"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pricing-category-intro"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h2>{activeData.name} Packages</h2>
          <p className="tagline">{activeData.tagline}</p>
          {activeData.note && <p className="sub-note" style={{ color: "var(--gold)", fontSize: "13px", marginTop: "8px" }}>{activeData.note}</p>}
        </motion.div>

        {/* PRICING GRID */}
        <div className="pricing-grid-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pricing-grid"
            >
              {activeData.tiers.map((tier, idx) => (
                <GlowCard
                  key={tier.name}
                  className={`pricing-card-tier ${tier.highlight ? "highlighted-tier" : ""}`}
                  borderColor={tier.highlight ? "rgba(245, 158, 11, 0.5)" : "rgba(255, 255, 255, 0.15)"}
                  style={{
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    background: tier.highlight ? "rgba(245, 158, 11, 0.08)" : "rgba(19, 22, 34, 0.65)",
                    border: tier.highlight ? "1px solid rgba(245, 158, 11, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="tier-badge-container">
                    <span className="tier-badge-label" style={{ background: tier.highlight ? "var(--gold)" : "rgba(255,255,255,0.1)", color: tier.highlight ? "#000" : "var(--text)" }}>{tier.badge}</span>
                  </div>

                  <div className="tier-price-header" style={{ margin: "20px 0" }}>
                    <h3 className="tier-title" style={{ fontSize: "22px", fontFamily: "var(--fd)", fontWeight: 800 }}>{tier.name}</h3>
                    <div className="price-value-row" style={{ display: "flex", alignItems: "baseline", gap: "6px", margin: "8px 0" }}>
                      <span className="price-amount" style={{ fontSize: "32px", fontWeight: 800, color: "var(--gold)" }}>{tier.price}</span>
                      <span className="price-cadence" style={{ fontSize: "14px", color: "var(--muted)" }}>/ {tier.cadence}</span>
                    </div>
                    <p className="tier-description-text" style={{ fontSize: "14px", color: "var(--muted)" }}>{tier.desc}</p>
                  </div>

                  <ul className="tier-features-list" style={{ flex: 1, margin: "20px 0" }}>
                    {tier.features.map((feat, fidx) => (
                      <li key={fidx} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "13.5px" }}>
                        <CheckIcon />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <MagneticButton distance={0.3}>
                    <button
                      className={`btn tier-action-button ${tier.highlight ? "btn-gold" : "btn-ghost"}`}
                      onClick={() => setPage("contact")}
                      style={{ cursor: "pointer", width: "100%", justifyContent: "center" }}
                    >
                      {tier.cta}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </MagneticButton>
                </GlowCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM PILLARS */}
        <motion.section
          className="pricing-bottom-pillars"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: "60px" }}
        >
          <div className="pillars-grid" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "24px" }}>
            {activeData.pillars.map((pillar, pidx) => (
              <div key={pidx} className="pillar-item" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--muted)" }}>
                <CheckIcon />
                <span>{pillar}</span>
              </div>
            ))}
          </div>
          <p className="pricing-bottom-branding" style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", letterSpacing: "0.1em", color: "var(--muted)" }}>thestorybuilder.in</p>
        </motion.section>

        {/* CONTACT BANNER */}
        <motion.section
          className="pricing-bottom-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginTop: "60px", textAlign: "center", padding: "60px 20px", background: "var(--card)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}
        >
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "32px", fontWeight: 800, marginBottom: "16px" }}>Need a custom package?</h2>
          <p className="muted" style={{ maxWidth: "560px", margin: "0 auto 32px" }}>
            Looking for something tailored to your exact business size, scope, or custom development requirements?
            Let's build a customized solution for you.
          </p>
          <div className="pricing-cta-actions" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticButton distance={0.3}>
              <button className="btn btn-gold" onClick={() => setPage("contact")} style={{ cursor: "pointer" }}>
                Talk to Us
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </MagneticButton>
            <MagneticButton distance={0.3}>
              <button className="btn btn-ghost" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
                Back to Home
              </button>
            </MagneticButton>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
