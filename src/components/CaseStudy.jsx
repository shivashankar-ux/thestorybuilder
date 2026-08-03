import { useEffect } from "react";

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

  useEffect(() => {
    const els = document.querySelectorAll(".case-study .sr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  return (
    <main className="case-study">
      <div className="wrap">
        <button
          className="case-back"
          onClick={() => navigate({ page: "home", scrollTo: "projects" })}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Projects
        </button>

        <span className="tag sr">{study.industry}</span>
        <h1 className="case-title sr">
          {study.client}
        </h1>
        <p className="case-summary muted sr">{study.summary}</p>

        <div className="case-meta sr">
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
        </div>

        <div className="case-hero sr">
          <img src={study.hero} alt={`${study.client} project hero`} loading="lazy" />
        </div>

        <div className="case-results sr">
          {study.results.map((r) => (
            <div className="case-result" key={r.label}>
              <span className="case-result-val">{r.value}</span>
              <span className="case-result-label">{r.label}</span>
            </div>
          ))}
        </div>

        <div className="case-sections">
          {study.sections.map((s) => (
            <section className="case-section sr" key={s.title}>
              <h2 className="case-section-h">{s.title}</h2>
              <p className="case-section-body">{s.body}</p>
            </section>
          ))}
        </div>

        <blockquote className="case-quote sr">
          <p>"{study.quote.text}"</p>
          <cite>— {study.quote.attr}</cite>
        </blockquote>

        <div className="case-cta sr">
          <h3>Want results like these?</h3>
          <p className="muted">
            Tell us about your business and we'll send a 90-day growth plan in 48 hours.
          </p>
          <div className="case-cta-btns">
            <button
              className="btn btn-gold"
              data-track="case_study_start"
              onClick={() => navigate({ page: "contact" })}
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => navigate({ page: "case", caseSlug: study.related })}
            >
              {study.relatedLabel}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
