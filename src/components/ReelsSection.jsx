import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Utility function to extract standard 11-character YouTube video ID
 */
export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return "JGwWNGJdvx8";
  const str = String(urlOrId).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;

  const shortsMatch = str.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i);
  if (shortsMatch) return shortsMatch[1];

  const watchMatch = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (watchMatch) return watchMatch[1];

  const youtuBeMatch = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (youtuBeMatch) return youtuBeMatch[1];

  const embedMatch = str.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (embedMatch) return embedMatch[1];

  return "JGwWNGJdvx8";
}

// YouTube Shorts Portfolio Collection
const reelsData = [
  {
    id: "reel-1",
    title: "Brand Identity Showcase",
    category: "Branding & Visuals",
    views: "24.8K",
    likes: 1840,
    duration: "0:24",
    description: "Watch how we crafted a premium brand identity for a luxury tech startup in 7 days.",
    youtubeUrl: "https://youtube.com/shorts/JGwWNGJdvx8",
    youtubeId: "JGwWNGJdvx8",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-2",
    title: "Social Ad Creative Strategy",
    category: "Performance Ads",
    views: "31.2K",
    likes: 2490,
    duration: "0:30",
    description: "High-ROAS Meta ad creative teardown driving 4.8x Return On Ad Spend.",
    youtubeUrl: "https://youtube.com/shorts/LXb3EKWsInQ",
    youtubeId: "LXb3EKWsInQ",
    poster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-3",
    title: "High-Converting Sales Funnel",
    category: "Web Design & UX",
    views: "19.5K",
    likes: 1420,
    duration: "0:28",
    description: "Interactive mobile wireframes and high-conversion landing page walkthrough.",
    youtubeUrl: "https://youtube.com/shorts/3JZ_D3ELwOQ",
    youtubeId: "3JZ_D3ELwOQ",
    poster: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-4",
    title: "Local SEO Growth Blueprint",
    category: "SEO & Traffic",
    views: "42.1K",
    likes: 3810,
    duration: "0:35",
    description: "How we ranked a Hyderabad local business #1 on Google Search & Maps in 30 days.",
    youtubeUrl: "https://youtube.com/shorts/OPf0YbXqDm0",
    youtubeId: "OPf0YbXqDm0",
    poster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-5",
    title: "Instagram Content Engine",
    category: "Social Growth",
    views: "15.9K",
    likes: 1210,
    duration: "0:22",
    description: "Batching 30 days of high-engagement Reels in 1 shoot day for maximum reach.",
    youtubeUrl: "https://youtube.com/shorts/9bZkp7q19f0",
    youtubeId: "9bZkp7q19f0",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-6",
    title: "E-Commerce Scaling Ads",
    category: "Meta & Google Ads",
    views: "28.4K",
    likes: 2190,
    duration: "0:40",
    description: "Scaling an e-commerce brand from ₹50K to ₹5L monthly ad spend profitably.",
    youtubeUrl: "https://youtube.com/shorts/CevxZvSJLk8",
    youtubeId: "CevxZvSJLk8",
    poster: "https://images.unsplash.com/photo-1556742049-0a67cf6004b1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-7",
    title: "Founder Personal Brand",
    category: "Reels Shoot & Edit",
    views: "53.6K",
    likes: 4920,
    duration: "0:32",
    description: "Personal branding story breakdown for CEOs & agency founders.",
    youtubeUrl: "https://youtube.com/shorts/kJQP7kiw5Fk",
    youtubeId: "kJQP7kiw5Fk",
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ReelsSection() {
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const touchStartY = useRef(0);
  const activeReel = activeModalIndex !== null ? reelsData[activeModalIndex] : null;

  // Handle previous short
  const handlePrev = (e) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : reelsData.length - 1));
    }
  };

  // Handle next short
  const handleNext = (e) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev < reelsData.length - 1 ? prev + 1 : 0));
    }
  };

  // Touch Swipe navigation (Up / Down)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex === null) return;

      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex]);

  return (
    <section
      className="reels-section sr"
      id="reels"
      style={{
        paddingTop: "70px",
        paddingBottom: "85px",
        background: "var(--card, #FFFFFF)",
        color: "var(--text, #0F172A)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(217,119,6,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />

      <div className="wrap" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 16px", position: "relative" }}>
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px",
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
                fontSize: "12.5px",
                marginBottom: "10px",
                border: "1px solid rgba(217,119,6,0.25)",
              }}
            >
              🎬 Portfolio Reels & YouTube Shorts
            </span>
            <h2
              style={{
                fontSize: "clamp(1.85rem, 5vw, 2.9rem)",
                fontFamily: "var(--fd)",
                fontWeight: 800,
                color: "var(--text, #0F172A)",
                margin: 0,
                lineHeight: 1.16,
              }}
            >
              Portfolio <span style={{ color: "var(--gold, #D97706)" }}>YouTube Shorts Showcase</span>
            </h2>
          </div>

          <p
            style={{
              fontSize: "14.5px",
              color: "var(--muted, #64748B)",
              margin: 0,
              maxWidth: "420px",
              lineHeight: 1.5,
            }}
          >
            Click any short-form video below to play directly in native 9:16 YouTube Shorts format.
          </p>
        </div>

        {/* Grid of 9:16 Shorts Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: "22px",
            justifyContent: "center",
          }}
        >
          {reelsData.map((reel, idx) => {
            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                style={{
                  position: "relative",
                  borderRadius: "22px",
                  overflow: "hidden",
                  background: "#0F172A",
                  aspectRatio: "9 / 16",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                  border: "2px solid var(--border)",
                  cursor: "pointer",
                  touchAction: "manipulation",
                  userSelect: "none",
                }}
                whileHover={{
                  y: -7,
                  borderColor: "var(--gold, #D97706)",
                  boxShadow: "0 22px 48px rgba(217,119,6,0.28)",
                }}
                onClick={() => {
                  setActiveModalIndex(idx);
                }}
              >
                {/* Thumbnail Image */}
                <img
                  src={reel.poster}
                  alt={reel.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                />

                {/* Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.25) 50%, rgba(0,0,0,0.45) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "14px",
                  }}
                >
                  {/* Category Badge */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        background: "rgba(0,0,0,0.75)",
                        backdropFilter: "blur(8px)",
                        color: "#FFFFFF",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "100px",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {reel.category}
                    </span>
                    <span
                      style={{
                        background: "#FF0000",
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: "100px",
                      }}
                    >
                      Shorts ▶
                    </span>
                  </div>

                  {/* Play Button */}
                  <div style={{ textAlign: "center", margin: "auto 0" }}>
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.94 }}
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        background: "#FF0000",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        boxShadow: "0 8px 24px rgba(255,0,0,0.55)",
                        fontSize: "22px",
                        paddingLeft: "3px",
                      }}
                    >
                      ▶
                    </motion.div>
                  </div>

                  {/* Title & Stats */}
                  <div>
                    <h3
                      style={{
                        color: "#FFFFFF",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        margin: "0 0 4px 0",
                        lineHeight: 1.3,
                        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                      }}
                    >
                      {reel.title}
                    </h3>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.8)",
                        fontWeight: 600,
                      }}
                    >
                      <span>👁 {reel.views} views</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Clean 9:16 YouTube Shorts Modal */}
      <AnimatePresence>
        {activeModalIndex !== null && activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(10, 15, 30, 0.92)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            {/* Main Modal Container */}
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                background: "#0F172A",
                borderRadius: "24px",
                overflow: "hidden",
                width: "100%",
                maxWidth: "380px",
                maxHeight: "88vh",
                aspectRatio: "9 / 16",
                boxShadow: "0 25px 80px rgba(0,0,0,0.9)",
                border: "2px solid rgba(217, 119, 6, 0.5)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Modal Clean Header Bar (Outside video face) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: "#090D16",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  zIndex: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#FF0000", fontWeight: 800, fontSize: "14px" }}>▶ Shorts</span>
                  <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#FFFFFF" }}>
                    {activeReel.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalIndex(null)}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: 0,
                    color: "#FFFFFF",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>

              {/* Clean YouTube Shorts Iframe Container — NO clutter on video face */}
              <div
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  background: "#000000",
                  position: "relative",
                }}
              >
                <iframe
                  key={extractYouTubeId(activeReel.youtubeUrl || activeReel.youtubeId)}
                  src={`https://www.youtube.com/embed/${extractYouTubeId(
                    activeReel.youtubeUrl || activeReel.youtubeId
                  )}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={activeReel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    display: "block",
                  }}
                />
              </div>

              {/* Navigation Controls (Previous / Next) outside video face */}
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: "-48px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 30,
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  fontSize: "22px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Previous Short (←)"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: "-48px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 30,
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  fontSize: "22px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Next Short (→)"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
