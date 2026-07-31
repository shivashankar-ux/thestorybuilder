import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MzaCarousel from "./MzaCarousel";
import GlowCard from "./common/GlowCard";
import MagneticButton from "./common/MagneticButton";

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
    tag: "Education · AI",
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
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.98]);

  return (
    <motion.article
      ref={rowRef}
      className={`showcase-row ${reversed ? "reversed" : ""}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="showcase-media"
        aria-label={`Visit ${project.title}`}
        style={{ scale: imageScale }}
      >
        <img src={project.img} alt={project.alt} loading="lazy" />
        <span className="showcase-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="showcase-hover">
          <span className="showcase-hover-btn">
            <ArrowIcon /> Visit Live Site
          </span>
        </div>
      </motion.a>

      <div className="showcase-body">
        <span className="card-tag">{project.tag}</span>
        <h3 className="showcase-title">{project.title}</h3>
        <p className="showcase-desc">{project.desc}</p>

        <div className="showcase-services">
          {project.services.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>

        <div className="showcase-foot">
          <div className="showcase-metric">
            <span className="metric-dot" />
            <span>{project.metric}</span>
          </div>
          <div className="showcase-actions">
            {project.caseSlug && navigate && (
              <button
                type="button"
                className="showcase-link showcase-case"
                data-track={`case_${project.caseSlug}`}
                onClick={() => navigate({ page: "case", caseSlug: project.caseSlug })}
                style={{ cursor: "pointer" }}
              >
                Read Case Study <ArrowIcon />
              </button>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="showcase-link"
            >
              View Live <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ setPage, navigate }) {
  const [viewMode, setViewMode] = useState("carousel");

  return (
    <section className="projects" id="projects" style={{ padding: "100px 0" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
          <motion.span
            className="tag"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ margin: 0 }}
          >
            Selected Work
          </motion.span>

          <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.06)", padding: "4px", borderRadius: "100px", border: "1px solid var(--border)", position: "relative" }}>
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              style={{
                background: "none",
                color: viewMode === "carousel" ? "#000" : "var(--muted)",
                border: 0,
                borderRadius: "100px",
                padding: "6px 16px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                position: "relative",
                zIndex: 1,
              }}
            >
              {viewMode === "carousel" && (
                <motion.div
                  layoutId="activeProjectMode"
                  style={{ position: "absolute", inset: 0, background: "var(--gold)", borderRadius: "100px", zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              ✨ 3D Coverflow
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              style={{
                background: "none",
                color: viewMode === "grid" ? "#000" : "var(--muted)",
                border: 0,
                borderRadius: "100px",
                padding: "6px 16px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                position: "relative",
                zIndex: 1,
              }}
            >
              {viewMode === "grid" && (
                <motion.div
                  layoutId="activeProjectMode"
                  style={{ position: "absolute", inset: 0, background: "var(--gold)", borderRadius: "100px", zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              📋 All Projects List
            </button>
          </div>
        </div>

        <motion.div
          className="proj-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="sec-h">
            Brands we've helped <em>grow</em>
          </h2>
          <p className="muted">
            Performance marketing, SEO, and high-converting websites — built for measurable outcomes. Swipe or drag to explore our featured work.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === "carousel" ? (
            <motion.div key="carousel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ margin: "20px 0 50px 0" }}>
              <MzaCarousel projects={projects} navigate={navigate} />
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="showcase-list">
              {projects.map((project, i) => (
                <ShowcaseRow key={project.id} project={project} index={i} navigate={navigate} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlowCard className="card card-cta showcase-cta" style={{ textAlign: "center", padding: "48px 32px" }}>
            <div className="cta-icon" style={{ margin: "0 auto 16px" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4v20M4 14h20" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Ready to be the next case study?</h3>
            <p style={{ margin: "8px auto 24px", maxWidth: "440px" }}>Tell us about your business — we'll map a growth plan in 48 hours.</p>
            <MagneticButton distance={0.3}>
              <button className="btn btn-gold" data-track="projects_start_project" onClick={() => setPage("contact")} style={{ cursor: "pointer" }}>
                Start a Project
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </MagneticButton>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
