import { useState, useEffect } from "react";
import MzaCarousel from "./MzaCarousel";

const projects = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80",
    alt: "Legacy Solar website",
    tag: "Solar Energy · Lead Generation",
    title: "Legacy Solar",
    kicker: "Solar Energy · Lead Generation",
    text: "Conversion-focused website backed by paid search and SEO — built to capture high-intent solar leads and turn page visits into qualified consultations.",
    desc: "Conversion-focused website backed by paid search and SEO — built to capture high-intent solar leads and turn page visits into qualified consultations.",
    services: ["Web Development", "SEO", "Performance Marketing"],
    metric: "Lead-gen funnel",
    url: "https://legacysolar.in",
    caseSlug: "legacy-solar",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1200&q=80",
    alt: "Star Fitness Studio website",
    tag: "Fitness · Local Growth",
    title: "Star Fitness Studio",
    kicker: "Fitness · Local Growth",
    text: "Mobile-first studio site engineered with local SEO and Meta ads to drive consistent membership sign-ups across the city.",
    desc: "Mobile-first studio site engineered with local SEO and Meta ads to drive consistent membership sign-ups across the city.",
    services: ["Web Development", "Local SEO", "Meta Ads"],
    metric: "Membership growth",
    url: "https://starfitnessstudio.in",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=1200&q=80",
    alt: "WafflesHub website",
    tag: "Food & Beverage · D2C",
    title: "WafflesHub",
    kicker: "Food & Beverage · D2C",
    text: "Appetising D2C brand experience with an order-driven layout and Meta retargeting in place to keep customers coming back.",
    desc: "Appetising D2C brand experience with an order-driven layout and Meta retargeting in place to keep customers coming back.",
    services: ["Brand Strategy", "Web Development", "Meta Ads"],
    metric: "Online orders",
    url: "https://waffleshub.com/",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&q=80",
    alt: "Chess Academy website",
    tag: "Education · AI Platform",
    title: "Chess Academy",
    kicker: "Education · AI Platform",
    text: "AI-powered education platform built on Next.js with a student-first funnel — clean acquisition flow, automated nurture, and conversion-led design.",
    desc: "AI-powered education platform built on Next.js with a student-first funnel — clean acquisition flow, automated nurture, and conversion-led design.",
    services: ["Next.js Development", "Funnel Design", "AI Integration"],
    metric: "Student acquisition",
    url: "https://chessacademy-next-js-chirag-client.vercel.app/",
    caseSlug: "chess-academy",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&q=80",
    alt: "Unbent Martial Fitness website",
    tag: "Martial Arts · Performance Ads",
    title: "Unbent Martial Fitness",
    kicker: "Martial Arts · Performance Ads",
    text: "Bold, high-energy brand site paired with performance ad campaigns engineered to drive trial sign-ups and walk-ins.",
    desc: "Bold, high-energy brand site paired with performance ad campaigns engineered to drive trial sign-ups and walk-ins.",
    services: ["Brand Strategy", "Web Development", "Paid Ads"],
    metric: "Trial sign-ups",
    url: "https://unbentmartialfitness.com",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80",
    alt: "DigitalWithChirag website",
    tag: "Personal Brand · Authority",
    title: "DigitalWithChirag",
    kicker: "Personal Brand · Authority",
    text: "Personal brand experience built to position the founder as a category authority — credibility-led design plus content-led SEO for inbound clients.",
    desc: "Personal brand experience built to position the founder as a category authority — credibility-led design plus content-led SEO for inbound clients.",
    services: ["Personal Branding", "Web Development", "Content SEO"],
    metric: "Inbound enquiries",
    url: "https://www.digitalwithchirag.com/",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
    alt: "Siolim Cafe website",
    tag: "Hospitality · Local SEO",
    title: "Siolim Cafe",
    kicker: "Hospitality · Local SEO",
    text: "Warm, mobile-first hospitality site optimised for Google Maps and 'near-me' search — designed to convert browsers into walk-in customers.",
    desc: "Warm, mobile-first hospitality site optimised for Google Maps and 'near-me' search — designed to convert browsers into walk-in customers.",
    services: ["Web Development", "Local SEO", "Google Business"],
    metric: "Footfall growth",
    url: "https://siolimcafe.vercel.app/",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80",
    alt: "SevAction Foundation website",
    tag: "Non-Profit · Donations",
    title: "SevAction Foundation",
    kicker: "Non-Profit · Donations",
    text: "Mission-driven non-profit website engineered to communicate impact and convert empathy into donations — clear story, clear ask, frictionless giving.",
    desc: "Mission-driven non-profit website engineered to communicate impact and convert empathy into donations — clear story, clear ask, frictionless giving.",
    services: ["Web Development", "Donation Funnel", "Storytelling"],
    metric: "Donation conversions",
    url: "https://sevactionfoundation.in/",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    alt: "The White Closet — interior design studio website",
    tag: "Interior Design · Studio Brand",
    title: "The White Closet",
    kicker: "Interior Design · Studio Brand",
    text: "A refined web presence for a boutique interior design studio — portfolio-led storytelling, project galleries, and a soft conversion path from browsing to consultation enquiry.",
    desc: "A refined web presence for a boutique interior design studio — portfolio-led storytelling, project galleries, and a soft conversion path from browsing to consultation enquiry.",
    services: ["Web Development", "Brand Storytelling", "Portfolio UX"],
    metric: "Consultation enquiries",
    url: "https://the-white-closet.vercel.app/",
  },
];

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function ShowcaseRow({ project, index, navigate }) {
  const reversed = index % 2 === 1;
  return (
    <article
      className={`showcase-row sr ${reversed ? "reversed" : ""}`}
      style={{ "--i": `${index * 0.08}s`, background: "var(--card, #FFFFFF)", borderRadius: 20, border: "1px solid var(--border)", padding: 24, marginBottom: 24 }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="showcase-media"
        aria-label={`Visit ${project.title}`}
        style={{ borderRadius: 16, overflow: "hidden" }}
      >
        <img src={project.img} alt={project.alt} loading="lazy" style={{ borderRadius: 16 }} />
        <span className="showcase-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="showcase-hover">
          <span className="showcase-hover-btn">
            <ArrowIcon /> Visit Live Site
          </span>
        </div>
      </a>

      <div className="showcase-body" style={{ color: "var(--text, #0F172A)" }}>
        <span className="card-tag" style={{ color: "var(--gold, #D97706)", fontWeight: 700 }}>{project.tag}</span>
        <h3 className="showcase-title" style={{ color: "var(--text, #0F172A)", fontFamily: "var(--fd)" }}>{project.title}</h3>
        <p className="showcase-desc" style={{ color: "var(--muted, #475569)", lineHeight: 1.65 }}>{project.desc}</p>

        <div className="showcase-services" style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0" }}>
          {project.services.map((s) => (
            <span key={s} style={{ background: "rgba(217, 119, 6, 0.08)", color: "var(--text, #0F172A)", border: "1px solid rgba(217, 119, 6, 0.2)", borderRadius: 6, padding: "3px 10px", fontSize: 12 }}>
              {s}
            </span>
          ))}
        </div>

        <div className="showcase-foot" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
          <div className="showcase-metric" style={{ color: "var(--muted, #475569)", fontSize: 13 }}>
            <span className="metric-dot" style={{ background: "#22c55e" }} />
            <span>{project.metric}</span>
          </div>
          <div className="showcase-actions" style={{ display: "flex", gap: 12 }}>
            {project.caseSlug && navigate && (
              <button
                type="button"
                className="showcase-link showcase-case"
                data-track={`case_${project.caseSlug}`}
                onClick={() => navigate({ page: "case", caseSlug: project.caseSlug })}
                style={{ color: "var(--gold, #D97706)", fontWeight: 700 }}
              >
                Read Case Study <ArrowIcon />
              </button>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="showcase-link"
              style={{ color: "var(--text, #0F172A)", fontWeight: 700 }}
            >
              View Live <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects({ setPage, navigate }) {
  const [viewMode, setViewMode] = useState("carousel");

  useEffect(() => {
    const els = document.querySelectorAll(".projects .sr");
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
  }, [viewMode]);

  return (
    <section className="projects" id="projects" style={{ paddingTop: "70px", paddingBottom: "80px", color: "var(--text, #0F172A)" }}>
      <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
          <span className="tag sr" style={{ margin: 0 }}>Selected Work</span>

          {/* Toggle Button */}
          <div style={{ display: "inline-flex", background: "var(--card, #FFFFFF)", padding: "4px", borderRadius: "100px", border: "1px solid var(--border)" }}>
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              style={{
                background: viewMode === "carousel" ? "var(--gold, #D97706)" : "transparent",
                color: viewMode === "carousel" ? "#FFFFFF" : "var(--muted, #475569)",
                border: 0,
                borderRadius: "100px",
                padding: "6px 18px",
                fontSize: "13px",
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
                borderRadius: "100px",
                padding: "6px 18px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              📋 All Projects List
            </button>
          </div>
        </div>

        <div className="proj-header sr" style={{ marginBottom: "36px" }}>
          <h2 className="sec-h" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #0F172A)", marginBottom: 12 }}>
            Brands we've helped <span style={{ color: "var(--gold, #D97706)" }}>grow</span>
          </h2>
          <p className="muted" style={{ fontSize: 16, color: "var(--muted, #475569)", maxWidth: 640, lineHeight: 1.6 }}>
            Performance marketing, SEO, and high-converting websites — built for measurable business outcomes.
          </p>
        </div>

        {viewMode === "carousel" ? (
          <div style={{ margin: "20px 0 50px 0" }}>
            <MzaCarousel projects={projects} navigate={navigate} />
          </div>
        ) : (
          <div className="showcase-list" style={{ marginBottom: "50px" }}>
            {projects.map((project, i) => (
              <ShowcaseRow key={project.id} project={project} index={i} navigate={navigate} />
            ))}
          </div>
        )}

        <article
          className="card card-cta sr showcase-cta"
          style={{
            "--i": "0.4s",
            background: "var(--card, #FFFFFF)",
            border: "1px solid rgba(217,119,6,0.3)",
            borderRadius: 24,
            padding: "48px 32px",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,0.05)",
          }}
        >
          <div className="cta-icon" style={{ marginBottom: 16 }}>
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <path d="M14 4v20M4 14h20" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 style={{ fontSize: 28, fontFamily: "var(--fd)", fontWeight: 800, color: "var(--text, #0F172A)", marginBottom: 12 }}>
            Ready to be our next growth case study?
          </h3>
          <p style={{ fontSize: 16, color: "var(--muted, #475569)", maxWidth: 540, margin: "0 auto 24px", lineHeight: 1.6 }}>
            Tell us about your business — we'll map out a custom digital strategy & project quote within 24 hours.
          </p>
          <button
            className="btn btn-gold"
            data-track="projects_start_project"
            onClick={() => setPage && setPage("contact")}
            style={{ padding: "14px 28px", fontSize: 15 }}
          >
            Start a Project →
          </button>
        </article>
      </div>
    </section>
  );
}
