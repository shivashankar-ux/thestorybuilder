import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultProjects = [
  {
    id: 1,
    title: "Legacy Solar",
    kicker: "Solar Energy · Lead Generation",
    text: "Conversion-focused website backed by paid search and SEO — built to capture high-intent solar leads and turn page visits into qualified consultations.",
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80",
    url: "https://legacysolar.in",
    caseSlug: "legacy-solar",
    services: ["Web Development", "SEO", "Google Ads"],
    metric: "Lead-Gen Funnel",
  },
  {
    id: 2,
    title: "Star Fitness Studio",
    kicker: "Fitness · Local Growth",
    text: "Mobile-first studio site engineered with local SEO and Meta ads to drive consistent membership sign-ups across the city.",
    img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1200&q=80",
    url: "https://starfitnessstudio.in",
    services: ["Web Development", "Local SEO", "Meta Ads"],
    metric: "Membership Growth",
  },
  {
    id: 3,
    title: "WafflesHub",
    kicker: "Food & Beverage · D2C",
    text: "Appetising D2C brand experience with an order-driven layout and Meta retargeting in place to keep customers coming back.",
    img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=1200&q=80",
    url: "https://waffleshub.com/",
    services: ["Brand Strategy", "Web Development", "Meta Ads"],
    metric: "Online Orders",
  },
  {
    id: 4,
    title: "Chess Academy",
    kicker: "Education · AI Platform",
    text: "AI-powered education platform built on Next.js with a student-first funnel — clean acquisition flow, automated nurture, and conversion-led design.",
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&q=80",
    url: "https://chessacademy-next-js-chirag-client.vercel.app/",
    caseSlug: "chess-academy",
    services: ["Next.js", "Funnel Design", "AI Platform"],
    metric: "Student Acquisition",
  },
  {
    id: 5,
    title: "Unbent Martial Fitness",
    kicker: "Martial Arts · Performance Ads",
    text: "Bold, high-energy brand site paired with performance ad campaigns engineered to drive trial sign-ups and walk-ins.",
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&q=80",
    url: "https://unbentmartialfitness.com",
    services: ["Brand Strategy", "Web Development", "Paid Ads"],
    metric: "Trial Sign-ups",
  },
  {
    id: 6,
    title: "The White Closet",
    kicker: "Interior Design · Studio Brand",
    text: "A refined web presence for a boutique interior design studio — portfolio-led storytelling, project galleries, and a soft conversion path.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    url: "https://the-white-closet.vercel.app/",
    services: ["Web Development", "Brand Storytelling", "Portfolio UX"],
    metric: "Consultation Enquiries",
  },
  {
    id: 7,
    title: "DigitalWithChirag",
    kicker: "Personal Brand · Authority",
    text: "Personal brand experience built to position the founder as a category authority — credibility-led design plus content-led SEO for inbound clients.",
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80",
    url: "https://www.digitalwithchirag.com/",
    services: ["Personal Branding", "Web Development", "Content SEO"],
    metric: "Inbound Enquiries",
  },
];

const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function MzaCarousel({ projects = defaultProjects, navigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef(0);
  const isDragging = useRef(false);
  const total = projects.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    pointerStartX.current = e.clientX;
    setIsPaused(true);
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diffX = e.clientX - pointerStartX.current;
    if (diffX > 40) prevSlide();
    else if (diffX < -40) nextSlide();
  };

  const current = projects[activeIndex] || projects[0];

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Project Selector Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 14,
          marginBottom: 20,
          scrollbarWidth: "none",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {projects.map((proj, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={proj.id || idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #FACC15 0%, #D97706 100%)"
                  : "rgba(255, 255, 255, 0.04)",
                color: isActive ? "#0F172A" : "var(--muted, #665843)",
                border: isActive
                  ? "1px solid #FACC15"
                  : "1px solid var(--border, rgba(120, 90, 40, 0.15))",
                padding: "8px 16px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: isActive ? "0 4px 14px rgba(250, 204, 21, 0.2)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {proj.title}
            </button>
          );
        })}
      </div>

      {/* Main Glassmorphic Showcase Card */}
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{
          background: "linear-gradient(145deg, #121216 0%, #0a0a0c 100%)",
          borderRadius: 24,
          border: "1px solid rgba(250, 204, 21, 0.2)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35), 0 0 30px rgba(250, 204, 21, 0.06)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          minHeight: 460,
          position: "relative",
        }}
      >
        {/* Left Side: Mockup Frame Preview */}
        <div style={{ position: "relative", minHeight: 300, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Window Header */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              zIndex: 2,
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span
              style={{
                marginLeft: 12,
                fontSize: 11,
                color: "#94a3b8",
                background: "rgba(0, 0, 0, 0.4)",
                padding: "2px 12px",
                borderRadius: 100,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontFamily: "monospace",
              }}
            >
              {current.url ? current.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "thestorybuilder.in"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id || activeIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              style={{ flex: 1, position: "relative", minHeight: 320 }}
            >
              <img
                src={current.img}
                alt={current.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, rgba(10,10,12,0.05) 0%, rgba(10,10,12,0.85) 100%)",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Details & Actions */}
        <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFFDF9", zIndex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id || activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: 11,
                    fontWeight: 800,
                    background: "rgba(250, 204, 21, 0.12)",
                    color: "#FACC15",
                    border: "1px solid rgba(250, 204, 21, 0.3)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {current.kicker || current.tag || "Featured Project"}
                </span>

                {current.metric && (
                  <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                    {current.metric}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                  fontFamily: "var(--fd)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 14,
                  color: "#FFFFFF",
                }}
              >
                {current.title}
              </h3>

              <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.65, marginBottom: 24 }}>
                {current.text || current.desc}
              </p>

              {/* Service Badges */}
              {current.services && current.services.length > 0 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                  {current.services.map((srv, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontSize: 12,
                        color: "#e2e8f0",
                      }}
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "linear-gradient(135deg, #FACC15 0%, #D97706 100%)",
                    color: "#0F172A",
                    padding: "12px 24px",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 14,
                    textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(250, 204, 21, 0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  View Live Site <ExternalIcon />
                </a>

                {current.caseSlug && navigate && (
                  <button
                    onClick={() => navigate({ page: "case", caseSlug: current.caseSlug })}
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      color: "#FFFDF9",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "12px 22px",
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    Read Case Study →
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls & Indicators */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, padding: "0 4px" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={prevSlide}
            aria-label="Previous project"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--card, #FFFDF9)",
              border: "1px solid var(--border)",
              color: "var(--text, #1A1208)",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next project"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--card, #FFFDF9)",
              border: "1px solid var(--border)",
              color: "var(--text, #1A1208)",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            →
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === activeIndex ? 28 : 10,
                height: 10,
                borderRadius: 100,
                background: idx === activeIndex ? "var(--gold, #D97706)" : "var(--border, rgba(120,90,40,0.2))",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
