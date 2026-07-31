import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlowCard from "./common/GlowCard";
import MagneticButton from "./common/MagneticButton";

const studies = {
  "legacy-solar": {
    client: "Legacy Solar",
    industry: "Solar Energy · Lead Generation",
    summary:
      "Solar in India is a long-cycle, high-ticket sale. Legacy Solar had product, installer network and good pricing — but no consistent lead engine. We built one.",
    hero:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
    services: ["Web Development", "Performance Marketing", "Lead Funnel", "Conversion Tracking"],
    duration: "12 weeks",
    market: "India",
    results: [
      { value: "2.1×", label: "Monthly enquiries" },
      { value: "−38%", label: "Cost per qualified lead" },
      { value: "0 → 47", label: "Leads / month (avg)" },
      { value: "9.4%", label: "Landing page conv. rate" },
    ],
    sections: [
      {
        title: "The Problem",
        body: "Visitors landed on a generic brochure site, scrolled, and left. The team relied on word-of-mouth — unpredictable, unscalable. No tracking, no funnel, no ad spend strategy. Cost per acquisition was a guess.",
      },
      {
        title: "The Strategy",
        body: "Reposition the brand around outcomes (savings, payback period, EMI options) rather than features. Single-purpose landing pages per intent (residential, commercial, EMI seekers). Meta lead-form ads at the top of the funnel; Google search ads for high-intent. Pixel + offline conversion tracking from day one.",
      },
      {
        title: "What We Built",
        body: "A fast, mobile-first website built around a five-step quote calculator. Three landing pages (residential, commercial, EMI). Meta lead-form campaigns with custom-audience retargeting. Google Search ads on commercial-intent queries. WhatsApp auto-reply for new leads inside 60 seconds.",
      },
      {
        title: "The Outcome",
        body: "Within 90 days, Legacy Solar went from inconsistent inbound to a predictable lead pipeline of ~47 qualified enquiries per month. Cost per qualified lead dropped 38%. The team now closes installations from leads they would never have seen otherwise.",
      },
    ],
    quote: {
      text: "They didn't just build a website — they engineered a lead engine. Our pipeline is now something we can plan around.",
      attr: "Founder, Legacy Solar",
    },
    liveUrl: "https://legacysolar.in",
    related: "chess-academy",
    relatedLabel: "Next: Chess Academy",
  },
  "chess-academy": {
    client: "Chess Academy",
    industry: "Education · AI",
    summary:
      "An ambitious chess education platform with AI-powered tutoring needed to convert curious parents into committed students — at scale.",
    hero:
      "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=1600&q=80",
    services: ["Next.js Development", "Funnel Design", "AI Integration", "SEO"],
    duration: "10 weeks",
    market: "India + Global",
    results: [
      { value: "3.4×", label: "Trial-class sign-ups" },
      { value: "+182%", label: "Organic traffic in 90 days" },
      { value: "62%", label: "Trial → paid enrolment" },
      { value: "<2.1s", label: "First Contentful Paint" },
    ],
    sections: [
      {
        title: "The Problem",
        body: "The platform had real product depth — AI-driven training, structured curriculum, expert coaches — but the website led with features, not parent outcomes. Parents browsed, hesitated, and left without booking the free trial.",
      },
      {
        title: "The Strategy",
        body: "Pivot the entire funnel around the parent decision: 'Will this make my child better, faster, and more confident?' Outcome-led messaging, social proof at every step, and a frictionless trial-class enrolment flow as the single conversion goal.",
      },
      {
        title: "What We Built",
        body: "A Next.js platform with sub-second navigation and an AI-led demo embedded on the homepage. A two-step trial-class enrolment flow (zero friction). SEO-optimised pillar pages around 'chess for kids', 'beginner chess online', and similar parent intent. Schema markup for course listings. Google search ads layered on top.",
      },
      {
        title: "The Outcome",
        body: "Trial sign-ups 3.4×'d in the first quarter and 62% of trial students converted to paid enrolment. Organic traffic compounded as content went live. The platform now runs as a self-sustaining acquisition machine — paid ads scaled deliberately on top of an SEO base, not as a crutch.",
      },
    ],
    quote: {
      text: "Strategy first, execution next, reporting always. They feel like an in-house growth team — not a vendor.",
      attr: "Director, Chess Academy",
    },
    liveUrl: "https://chessacademy-next-js-chirag-client.vercel.app/",
    related: "legacy-solar",
    relatedLabel: "Next: Legacy Solar",
  },
};

export default function CaseStudy({ slug, navigate }) {
  const study = studies[slug] || studies["legacy-solar"];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <main className="case-study" style={{ paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="wrap">
        <motion.button
          className="case-back"
          onClick={() => navigate({ page: "home", scrollTo: "projects" })}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ cursor: "pointer" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Projects
        </motion.button>

        <motion.span
          className="tag"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {study.industry}
        </motion.span>

        <motion.h1
          className="case-title"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(36px, 6vw, 64px)", fontFamily: "var(--fd)", fontWeight: 800 }}
        >
          {study.client}
        </motion.h1>

        <motion.p
          className="case-summary muted"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {study.summary}
        </motion.p>

        <motion.div
          className="case-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ margin: "32px 0 48px" }}
        >
          <div className="case-meta-cell">
            <span className="case-meta-label">Services</span>
            <span className="case-meta-val">{study.services.join(" · ")}</span>
          </div>
          <div className="case-meta-cell">
            <span className="case-meta-label">Duration</span>
            <span className="case-meta-val">{study.duration}</span>
          </div>
          <div className="case-meta-cell">
            <span className="case-meta-label">Market</span>
            <span className="case-meta-val">{study.market}</span>
          </div>
          <div className="case-meta-cell">
            <span className="case-meta-label">Live Site</span>
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-meta-link"
            >
              Visit ↗
            </a>
          </div>
        </motion.div>

        <motion.div
          ref={heroRef}
          className="case-hero"
          style={{ scale: heroScale, borderRadius: "20px", overflow: "hidden", margin: "40px 0" }}
        >
          <img src={study.hero} alt={`${study.client} project hero`} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
        </motion.div>

        <div className="case-results" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", margin: "48px 0" }}>
          {study.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlowCard className="case-result" style={{ padding: "24px", textAlign: "center" }}>
                <span className="case-result-val" style={{ fontSize: "36px", fontWeight: 800, color: "var(--gold)", fontFamily: "var(--fd)" }}>{r.value}</span>
                <span className="case-result-label" style={{ display: "block", marginTop: "8px", fontSize: "13px", color: "var(--muted)" }}>{r.label}</span>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <div className="case-sections" style={{ margin: "60px 0" }}>
          {study.sections.map((s) => (
            <motion.section
              className="case-section"
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: "40px" }}
            >
              <h2 className="case-section-h" style={{ fontSize: "24px", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: "12px" }}>{s.title}</h2>
              <p className="case-section-body" style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--muted)" }}>{s.body}</p>
            </motion.section>
          ))}
        </div>

        <motion.blockquote
          className="case-quote"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: "32px", background: "rgba(245, 158, 11, 0.06)", borderLeft: "4px solid var(--gold)", borderRadius: "8px", margin: "48px 0" }}
        >
          <p style={{ fontSize: "18px", fontStyle: "italic", marginBottom: "12px" }}>"{study.quote.text}"</p>
          <cite style={{ fontSize: "14px", color: "var(--gold)", fontStyle: "normal", fontWeight: 700 }}>— {study.quote.attr}</cite>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlowCard className="case-cta" style={{ textAlign: "center", padding: "48px 32px" }}>
            <h3 style={{ fontSize: "28px", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: "12px" }}>Want results like these?</h3>
            <p className="muted" style={{ maxWidth: "480px", margin: "0 auto 28px" }}>
              Tell us about your business and we'll send a 90-day growth plan in 48 hours.
            </p>
            <div className="case-cta-btns" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <MagneticButton distance={0.3}>
                <button
                  className="btn btn-gold"
                  data-track="case_study_start"
                  onClick={() => navigate({ page: "contact" })}
                  style={{ cursor: "pointer" }}
                >
                  Start a Project
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </MagneticButton>
              <MagneticButton distance={0.3}>
                <button
                  className="btn btn-ghost"
                  onClick={() => navigate({ page: "case", caseSlug: study.related })}
                  style={{ cursor: "pointer" }}
                >
                  {study.relatedLabel}
                </button>
              </MagneticButton>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </main>
  );
}
