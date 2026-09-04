import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reelsData = [
  {
    id: "QAL6E6fy1f0",
    title: "Brand Identity & Strategy Reel",
    tag: "Brand Identity",
    views: "180K+ Views",
    metric: "High Impact",
    desc: "High-impact visual story and brand positioning reel engineered for market expansion.",
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
    desc: "High-converting ad script & video creative framework engineered for maximum conversions.",
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

const categories = ["All", "Brand Identity", "Growth Strategy", "Meta Ads", "Web Development", "SEO & Growth"];

export default function ReelsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalReel, setActiveModalReel] = useState(null);
  const [playingInlineId, setPlayingInlineId] = useState(null);

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
        paddingBottom: "95px",
        background: "var(--card, #FFFFFF)",
        color: "var(--text, #0F172A)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient glow effect */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(217,119,6,0.08) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="wrap"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "36px",
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
              🎬 Client Work & Video Portfolio
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
              Short-Form <span style={{ color: "var(--gold, #D97706)" }}>Portfolio Reels & Creatives</span>
            </h2>
            <p
              style={{
                color: "var(--muted, #475569)",
                fontSize: "16px",
                marginTop: "10px",
                maxWidth: "640px",
                lineHeight: 1.6,
              }}
            >
              Watch our client campaign highlights, short-form video ads, and brand story reels engineered for high watch-time and conversion.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "12px",
            marginBottom: "40px",
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
                  padding: "9px 20px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 4px 14px rgba(217,119,6,0.3)" : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Reels Showcase Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "28px",
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredReels.map((reel) => {
              const isPlaying = playingInlineId === reel.id;
              const thumbnailUrl = `https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`;
              const embedSrc = `https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`;

              return (
                <motion.div
                  key={reel.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    position: "relative",
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "#0F172A",
                    aspectRatio: "9 / 16",
                    boxShadow: "0 14px 36px rgba(0,0,0,0.15)",
                    border: "2px solid var(--border)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 24px 50px rgba(217,119,6,0.25)";
                    e.currentTarget.style.borderColor = "var(--gold, #D97706)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 14px 36px rgba(0,0,0,0.15)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                  onClick={() => setActiveModalReel(reel)}
                >
                  {isPlaying ? (
                    <iframe
                      src={embedSrc}
                      title={reel.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                        position: "absolute",
                        inset: 0,
                      }}
                    />
                  ) : (
                    <>
                      {/* High-Res YouTube Poster Image */}
                      <img
                        src={thumbnailUrl}
                        alt={reel.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      {/* Vignette Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.1) 40%, rgba(15,23,42,0.85) 100%)",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Top Badges */}
                      <div
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          right: "14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          pointerEvents: "none",
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(15, 23, 42, 0.75)",
                            backdropFilter: "blur(10px)",
                            color: "#FFFFFF",
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "4px 12px",
                            borderRadius: "100px",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                          }}
                        >
                          {reel.tag}
                        </span>
                        <span
                          style={{
                            background: "var(--gold, #D97706)",
                            color: "#FFFFFF",
                            fontSize: "11px",
                            fontWeight: 800,
                            padding: "4px 10px",
                            borderRadius: "100px",
                            boxShadow: "0 4px 12px rgba(217,119,6,0.4)",
                          }}
                        >
                          {reel.metric}
                        </span>
                      </div>

                      {/* Centered Glowing Play Button Icon */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 3,
                          pointerEvents: "none",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "rgba(217, 119, 6, 0.95)",
                            boxShadow: "0 0 30px rgba(217, 119, 6, 0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            fontSize: "22px",
                            paddingLeft: "4px",
                            transition: "transform 0.25s ease",
                          }}
                        >
                          ▶
                        </div>
                      </div>

                      {/* Bottom Info Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "18px 16px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          zIndex: 2,
                        }}
                      >
                        <div style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700, lineHeight: 1.35 }}>
                          {reel.title}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12.5px", fontWeight: 600 }}>
                            👁️ {reel.views}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModalReel(reel);
                            }}
                            style={{
                              background: "rgba(255, 255, 255, 0.25)",
                              backdropFilter: "blur(8px)",
                              border: "1px solid rgba(255,255,255,0.3)",
                              color: "#FFFFFF",
                              fontSize: "12px",
                              fontWeight: 700,
                              padding: "5px 12px",
                              borderRadius: "100px",
                              cursor: "pointer",
                              transition: "background 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold, #D97706)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")}
                          >
                            Watch Video ▶
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            marginTop: "52px",
            background: "rgba(217, 119, 6, 0.05)",
            border: "1px solid rgba(217, 119, 6, 0.25)",
            borderRadius: "24px",
            padding: "28px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}
        >
          <div>
            <h4 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "var(--text, #0F172A)" }}>
              Want custom high-converting video reels & creatives for your business?
            </h4>
            <p style={{ margin: "6px 0 0 0", fontSize: "14.5px", color: "var(--muted, #475569)" }}>
              We script, edit, and launch short-form video campaigns designed for viral reach and positive ROAS.
            </p>
          </div>
          <a
            href="/contact"
            className="btn btn-gold"
            style={{
              padding: "12px 26px",
              fontSize: "14.5px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              borderRadius: "100px",
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
              zIndex: 99999,
              background: "rgba(15, 23, 42, 0.88)",
              backdropFilter: "blur(14px)",
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
                borderRadius: "28px",
                overflow: "hidden",
                maxWidth: "440px",
                width: "100%",
                border: "2px solid var(--gold, #D97706)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                color: "#FFFFFF",
                position: "relative",
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalReel(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  zIndex: 10,
                  background: "rgba(0,0,0,0.65)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#FFFFFF",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(217, 119, 6, 0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.65)")}
              >
                ✕
              </button>

              {/* Responsive Video Player */}
              <div style={{ aspectRatio: "9 / 16", width: "100%", background: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeModalReel.id}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                  title={activeModalReel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: 0 }}
                />
              </div>

              {/* Campaign Info */}
              <div style={{ padding: "22px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <span
                    style={{
                      background: "rgba(217,119,6,0.2)",
                      color: "var(--gold, #D97706)",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "4px 12px",
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
                      padding: "4px 12px",
                      borderRadius: "100px",
                    }}
                  >
                    {activeModalReel.metric}
                  </span>
                </div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 800 }}>
                  {activeModalReel.title}
                </h3>
                <p style={{ margin: "0 0 18px 0", fontSize: "14px", color: "rgba(255,255,255,0.72)", lineHeight: 1.55 }}>
                  {activeModalReel.desc}
                </p>
                <a
                  href="/contact"
                  className="btn btn-gold"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "13px",
                    borderRadius: "100px",
                    fontSize: "14px",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Book a Video Strategy Call →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
