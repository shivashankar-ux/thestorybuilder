import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const servicesData = [
  {
    id: "service-web-dev",
    tag: "Shipped in 7 Days",
    title: "Website Design & Web Development",
    category: "High-Converting Custom Websites",
    desc: "Custom, mobile-first websites engineered for high conversion rates, 95+ Core Web Vitals speed scores, and seamless WhatsApp/CRM lead capture.",
    highlights: [
      "Mobile-First Responsive Layouts",
      "Lead Capture & WhatsApp Direct Wiring",
      "SEO Foundation & Schema Markup",
      "Complete Source Code Ownership",
    ],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    route: "service-web-dev",
  },
  {
    id: "service-perf-mktg",
    tag: "ROI-Driven Paid Media",
    title: "Performance Marketing & Meta Ads",
    category: "Meta & Google Lead Generation",
    desc: "High-ROAS Meta Ads (Facebook & Instagram) and Google Search ad campaigns designed to generate predictable monthly lead volume for your business.",
    highlights: [
      "Targeted Audience Segmentation",
      "Scroll-Stopping Visual Creatives",
      "Meta Pixel & Conversions API Tracking",
      "Weekly Performance & ROAS Reports",
    ],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    route: "service-perf-mktg",
  },
  {
    id: "service-smm",
    tag: "Organic Brand Authority",
    title: "Social Media Marketing & Reels",
    category: "Instagram & Content Strategy",
    desc: "Done-for-you Instagram management, short-form Reels scripts, bespoke carousel designs, and content calendars that build engaged audiences.",
    highlights: [
      "Short-Form Scripted Reels",
      "Custom Graphic Carousels",
      "Monthly Content Calendar",
      "Hashtag & Growth Strategy",
    ],
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80",
    route: "service-smm",
  },
  {
    id: "service-branding",
    tag: "Premium Brand Identity",
    title: "Brand Strategy & Identity Design",
    category: "Logo Suites & Brand Systems",
    desc: "Build a brand identity that commands instant trust. Vector logo suites, curated color palettes, typography rules, and brand guidelines.",
    highlights: [
      "Primary & Secondary Logo Suite",
      "Color & Typography Hierarchy",
      "Social & Business Stationery",
      "Full Brand Guidelines PDF",
    ],
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    route: "service-branding",
  },
  {
    id: "service-seo",
    tag: "Organic Search Dominance",
    title: "Search Engine Optimization (SEO)",
    category: "High-Intent Organic Traffic",
    desc: "Technical SEO audits, local Google Business Profile optimization, and content strategies that rank your business on Google Page 1.",
    highlights: [
      "Technical Site Health Audits",
      "Local Hyderabad & National Keyword Target",
      "On-Page & Schema Markup",
      "High-Authority Backlink Blueprint",
    ],
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    route: "service-web-dev",
  },
];

export default function Services3DDeck({ setPage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef(0);
  const isDragging = useRef(false);
  const total = servicesData.length;

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

  const current = servicesData[activeIndex];

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto 60px",
        padding: "0 20px",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Category Pills Navigation */}
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 16,
          marginBottom: 24,
          scrollbarWidth: "none",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {servicesData.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #FACC15 0%, #D97706 100%)"
                  : "rgba(255, 255, 255, 0.04)",
                color: isActive ? "#0F172A" : "var(--muted, #475569)",
                border: isActive
                  ? "1px solid #FACC15"
                  : "1px solid var(--border)",
                padding: "8px 18px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive ? "0 4px 14px rgba(250, 204, 21, 0.25)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {item.title.split("&")[0].trim()}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Showcase Card */}
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
        {/* Left Side: Visual Preview Browser Frame */}
        <div style={{ position: "relative", minHeight: 300, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Top Mock Window Bar */}
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
              thestorybuilder.in/{current.id}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
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
                  background: "linear-gradient(to right, rgba(10,10,12,0.1) 0%, rgba(10,10,12,0.85) 100%)",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Details & Action */}
        <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFFFFF", zIndex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 700,
                  background: "rgba(250, 204, 21, 0.12)",
                  color: "#FACC15",
                  border: "1px solid rgba(250, 204, 21, 0.3)",
                  marginBottom: 16,
                  letterSpacing: "0.03em",
                }}
              >
                ✨ {current.tag}
              </span>

              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontFamily: "var(--fd)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: 12,
                  color: "#FFFFFF",
                }}
              >
                {current.title}
              </h2>

              <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.65, marginBottom: 24 }}>
                {current.desc}
              </p>

              {/* Highlights Checklist */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 32 }}>
                {current.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#e2e8f0" }}>
                    <span style={{ color: "#FACC15", fontWeight: 800 }}>✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <button
                  onClick={() => setPage && setPage(current.route)}
                  style={{
                    background: "linear-gradient(135deg, #FACC15 0%, #D97706 100%)",
                    color: "#0F172A",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(250, 204, 21, 0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "transform 0.2s",
                  }}
                >
                  Explore Details →
                </button>
                <button
                  onClick={() => setPage && setPage("contact")}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: "12px 22px",
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Book Strategy Call
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Deck Controls & Dots */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "between", marginTop: 24, padding: "0 8px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={prevSlide}
            aria-label="Previous service"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "var(--card, #FFFFFF)",
              border: "1px solid var(--border)",
              color: "var(--text, #0F172A)",
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
            aria-label="Next service"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "var(--card, #FFFFFF)",
              border: "1px solid var(--border)",
              color: "var(--text, #0F172A)",
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
          {servicesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              style={{
                width: idx === activeIndex ? 28 : 10,
                height: 10,
                borderRadius: 100,
                background: idx === activeIndex ? "var(--gold, #D97706)" : "var(--border)",
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
