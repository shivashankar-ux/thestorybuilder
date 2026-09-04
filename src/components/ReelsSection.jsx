import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reelsData = [
  {
    id: "QAL6E6fy1f0",
    title: "Brand Identity & Strategy Reel",
    tag: "Brand Identity",
    views: "180K+ Views",
    metric: "High Impact",
    desc: "High-impact visual story and brand positioning reel for market expansion.",
  },
  {
    id: "1EwM31QxnKk",
    title: "Growth Strategy Case Study",
    tag: "Growth Strategy",
    views: "120K+ Views",
    metric: "3.4x ROAS",
    desc: "A breakdown of high-converting growth funnels and performance strategy for scaling brands.",
  },
  {
    id: "_aVoaZbyXJQ",
    title: "Meta & Performance Ad Breakdown",
    tag: "Meta Ads",
    views: "240K+ Views",
    metric: "5.2x ROAS",
    desc: "High-converting ad script & video creative framework engineered for max conversions.",
  },
  {
    id: "rVUkWK8lRmw",
    title: "Web Development & UI Showcase",
    tag: "Web Development",
    views: "85K+ Views",
    metric: "7-Day Delivery",
    desc: "High-performance, mobile-first website design built with ultra-fast page load speeds.",
  },
  {
    id: "VdsrsWmmhiw",
    title: "Brand Identity Behind The Scenes",
    tag: "Brand Identity",
    views: "95K+ Views",
    metric: "+240% Inbound",
    desc: "Crafting distinct visual identities, typography systems, and cohesive branding for founders.",
  },
  {
    id: "k-bJd1yYk1A",
    title: "Social Media Campaign Results",
    tag: "Meta Ads",
    views: "150K+ Views",
    metric: "4.8x Return",
    desc: "Data-driven Meta ad creative strategy designed to lower customer acquisition costs.",
  },
  {
    id: "wDfOBIsFCUE",
    title: "Creative SEO & Organic Growth",
    tag: "SEO & Growth",
    views: "210K+ Views",
    metric: "#1 Google Rank",
    desc: "Leveraging organic search strategies and viral short-form video to build continuous lead pipelines.",
  },
];

const categories = ["All", "Growth Strategy", "Web Development", "Brand Identity", "Meta Ads", "SEO & Growth"];

export default function ReelsSection() {
  const [activeMute, setActiveMute] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalReel, setActiveModalReel] = useState(null);

  const toggleMute = () => {
    setActiveMute((prev) => !prev);
  };

  const filteredReels =
    selectedCategory === "All"
      ? reelsData
      : reelsData.filter((reel) => reel.tag === selectedCategory);

  return (
    <section
      className="reels-section sr"
      id="reels"
      style={{
        paddingTop: "80px",
        paddingBottom: "90px",
        background: "var(--card, #FFFFFF)",
        color: "var(--text, #0F172A)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="wrap"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div>
            <span
              className="tag sr"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(217,119,6,0.1)",
                color: "var(--gold, #D97706)",
                fontWeight: 700,
                fontSize: "13px",
                marginBottom: "14px",
                border: "1px solid rgba(217,119,6,0.2)",
              }}
            >
              🎬 Video Portfolio & Short-Form Reels
            </span>
            <h2
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
                fontFamily: "var(--fd)",
                fontWeight: 800,
                color: "var(--text, #0F172A)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Short-Form <span style={{ color: "var(--gold, #D97706)" }}>Highlights & Case Reels</span>
            </h2>
            <p
              style={{
                color: "var(--muted, #475569)",
                fontSize: "15px",
                marginTop: "10px",
                maxWidth: "600px",
                lineHeight: 1.6,
              }}
            >
              Explore our portfolio of high-converting video ad creatives, social reels, and client campaign highlights engineered for maximum watch time.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="button"
              onClick={toggleMute}
              style={{
                background: activeMute ? "rgba(15, 23, 42, 0.05)" : "var(--gold, #D97706)",
                color: activeMute ? "var(--text, #0F172A)" : "#FFFFFF",
                border: "1px solid var(--border)",
                borderRadius: "100px",
                padding: "10px 20px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.25s ease",
              }}
            >
              {activeMute ? "🔇 Audio Muted (Click to Unmute)" : "🔊 Sound On"}
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "12px",
            marginBottom: "36px",
            scrollbarWidth: "none",
          }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: isActive ? "var(--gold, #D97706)" : "rgba(15, 23, 42, 0.04)",
                  color: isActive ? "#FFFFFF" : "var(--muted, #475569)",
                  border: isActive ? "1px solid var(--gold, #D97706)" : "1px solid var(--border)",
                  borderRadius: "100px",
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Reels Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredReels.map((reel) => {
              const embedSrc = `https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=${
                activeMute ? 1 : 0
              }&loop=1&playlist=${reel.id}&controls=0&modestbranding=1&rel=0&enablejsapi=1`;

              return (
                <motion.div
                  key={reel.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "relative",
                    borderRadius: "22px",
                    overflow: "hidden",
                    background: "#0F172A",
                    aspectRatio: "9 / 16",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                    border: "2px solid var(--border)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 22px 45px rgba(217,119,6,0.22)";
                    e.currentTarget.style.borderColor = "var(--gold, #D97706)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  {/* Embed Iframe */}
                  <iframe
                    src={embedSrc}
                    title={reel.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                      pointerEvents: "auto",
                    }}
                  />

                  {/* Top Tag Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(15, 23, 42, 0.75)",
                      backdropFilter: "blur(8px)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      letterSpacing: "0.4px",
                      pointerEvents: "none",
                    }}
                  >
                    {reel.tag}
                  </div>

                  {/* Top Metric Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(217, 119, 6, 0.9)",
                      backdropFilter: "blur(8px)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: "100px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      pointerEvents: "none",
                    }}
                  >
                    {reel.metric}
                  </div>

                  {/* Bottom Information Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 70%, transparent 100%)",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      pointerEvents: "none",
                    }}
                  >
                    <div style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 700, lineHeight: 1.3 }}>
                      {reel.title}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", fontWeight: 600 }}>
                        👁️ {reel.views}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalReel(reel);
                        }}
                        style={{
                          pointerEvents: "auto",
                          background: "rgba(255, 255, 255, 0.2)",
                          border: "none",
                          color: "#FFFFFF",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "100px",
                          cursor: "pointer",
                        }}
                      >
                        Expand ↗
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            marginTop: "48px",
            background: "rgba(217, 119, 6, 0.05)",
            border: "1px solid rgba(217, 119, 6, 0.2)",
            borderRadius: "20px",
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "var(--text, #0F172A)" }}>
              Want high-performing video reels & ad creatives for your brand?
            </h4>
            <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "var(--muted, #475569)" }}>
              We script, edit, and optimize short-form video content engineered to capture attention and drive conversions.
            </p>
          </div>
          <a
            href="/contact"
            className="btn btn-gold"
            style={{
              padding: "10px 22px",
              fontSize: "14px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Get Custom Video Strategy →
          </a>
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {activeModalReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalReel(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#0F172A",
                borderRadius: "24px",
                overflow: "hidden",
                maxWidth: "420px",
                width: "100%",
                border: "2px solid var(--gold, #D97706)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                color: "#FFFFFF",
                position: "relative",
              }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveModalReel(null)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  zIndex: 10,
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>

              {/* Video Player */}
              <div style={{ aspectRatio: "9 / 16", width: "100%", background: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeModalReel.id}?autoplay=1&mute=0&loop=1&playlist=${activeModalReel.id}&controls=1&modestbranding=1`}
                  title={activeModalReel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: 0 }}
                />
              </div>

              {/* Info section */}
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <span
                    style={{
                      background: "rgba(217,119,6,0.2)",
                      color: "var(--gold, #D97706)",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "100px",
                    }}
                  >
                    {activeModalReel.tag}
                  </span>
                  <span
                    style={{
                      background: "rgba(34, 197, 94, 0.2)",
                      color: "#4ade80",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "100px",
                    }}
                  >
                    {activeModalReel.metric}
                  </span>
                </div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 800 }}>
                  {activeModalReel.title}
                </h3>
                <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                  {activeModalReel.desc}
                </p>
                <a
                  href="/contact"
                  className="btn btn-gold"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "12px",
                    borderRadius: "100px",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  Book a Strategy Call for Video Creatives →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
