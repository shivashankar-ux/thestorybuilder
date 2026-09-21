import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Utility function to extract standard 11-character YouTube video ID
 * from raw IDs, Shorts links, watch URLs, youtu.be links, or embed links.
 */
export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return "";
  const str = String(urlOrId).trim();

  // Raw 11-char YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  // YouTube Shorts link: https://youtube.com/shorts/QAL6E6fy1f0
  const shortsMatch = str.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i);
  if (shortsMatch) return shortsMatch[1];

  // YouTube Watch link: https://www.youtube.com/watch?v=QAL6E6fy1f0
  const watchMatch = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (watchMatch) return watchMatch[1];

  // Shortened link: https://youtu.be/QAL6E6fy1f0
  const youtuBeMatch = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (youtuBeMatch) return youtuBeMatch[1];

  // Embed link: https://www.youtube.com/embed/QAL6E6fy1f0
  const embedMatch = str.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (embedMatch) return embedMatch[1];

  return str;
}

const reelsData = [
  { url: "https://youtube.com/shorts/QAL6E6fy1f0", title: "Brand Identity Showcase", category: "Branding" },
  { url: "https://youtube.com/shorts/1EwM31QxnKk", title: "Social Ad Creative", category: "Performance Ads" },
  { url: "https://youtube.com/shorts/_aVoaZbyXJQ", title: "High-Converting Funnel", category: "Web Design" },
  { url: "https://youtube.com/shorts/rVUkWK8lRmw", title: "Local SEO Growth", category: "SEO Growth" },
  { url: "https://youtube.com/shorts/VdsrsWmmhiw", title: "Instagram Content Strategy", category: "Social Growth" },
  { url: "https://youtube.com/shorts/k-bJd1yYk1A", title: "E-Commerce Campaign", category: "Meta Ads" },
  { url: "https://youtube.com/shorts/wDfOBIsFCUE", title: "Founder Personal Branding", category: "Reels & Shorts" },
];

export default function ReelsSection() {
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const activeReel = activeModalIndex !== null ? reelsData[activeModalIndex] : null;
  const activeVideoId = activeReel ? extractYouTubeId(activeReel.url) : null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : reelsData.length - 1));
    }
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev < reelsData.length - 1 ? prev + 1 : 0));
    }
  };

  // Keyboard navigation for modal player
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
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
        paddingTop: "60px",
        paddingBottom: "75px",
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
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 16px" }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
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
                fontSize: "12.5px",
                marginBottom: "8px",
                border: "1px solid rgba(217,119,6,0.2)",
              }}
            >
              🎬 Portfolio Reels & Shorts
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 5vw, 2.8rem)",
                fontFamily: "var(--fd)",
                fontWeight: 800,
                color: "var(--text, #0F172A)",
                margin: 0,
                lineHeight: 1.18,
              }}
            >
              Portfolio <span style={{ color: "var(--gold, #D97706)" }}>Reels & Video Showcase</span>
            </h2>
          </div>

          <p
            style={{
              fontSize: "14px",
              color: "var(--muted, #64748B)",
              margin: 0,
              maxWidth: "380px",
              lineHeight: 1.5,
            }}
          >
            Click any video below to watch in full HD short-form video player.
          </p>
        </div>

        {/* Responsive Mobile-Optimized Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {reelsData.map((reel, idx) => {
            const videoId = extractYouTubeId(reel.url);
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <motion.div
                key={videoId || idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#0F172A",
                  aspectRatio: "9 / 16",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                  border: "2px solid var(--border)",
                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
                whileHover={{
                  y: -6,
                  borderColor: "var(--gold, #D97706)",
                  boxShadow: "0 20px 42px rgba(217,119,6,0.25)",
                }}
                onClick={() => setActiveModalIndex(idx)}
              >
                {/* Poster Thumbnail Image */}
                <img
                  src={thumbnailUrl}
                  alt={reel.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                />

                {/* Dark Gradient Overlay for Contrast & Readability */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.25) 50%, rgba(0,0,0,0.4) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "14px",
                  }}
                >
                  {/* Category Tag */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        background: "rgba(0,0,0,0.65)",
                        backdropFilter: "blur(6px)",
                        color: "#FFFFFF",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        padding: "4px 9px",
                        borderRadius: "100px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {reel.category || "Reel"}
                    </span>
                  </div>

                  {/* Play Button & Title */}
                  <div style={{ textAlign: "center" }}>
                    {/* YouTube Shorts Red Play Badge */}
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "var(--gold, #D97706)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                        boxShadow: "0 6px 20px rgba(217,119,6,0.5)",
                        fontSize: "18px",
                      }}
                    >
                      ▶
                    </div>

                    <h3
                      style={{
                        color: "#FFFFFF",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        margin: 0,
                        lineHeight: 1.3,
                        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                      }}
                    >
                      {reel.title}
                    </h3>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        fontSize: "11px",
                        color: "var(--gold, #F59E0B)",
                        fontWeight: 600,
                      }}
                    >
                      Click to Play 🔊
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Touch-Optimized YouTube Shorts Video Modal */}
      <AnimatePresence>
        {activeModalIndex !== null && activeReel && activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(15, 23, 42, 0.94)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#000000",
                borderRadius: "24px",
                overflow: "hidden",
                maxWidth: "420px",
                width: "92vw",
                maxHeight: "92vh",
                border: "2px solid var(--gold, #D97706)",
                boxShadow: "0 30px 90px rgba(0,0,0,0.85)",
                color: "#FFFFFF",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Modal Top Header Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "rgba(15, 23, 42, 0.95)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  zIndex: 10,
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
                    {activeReel.title}
                  </h4>
                  <span style={{ fontSize: "11px", color: "var(--gold, #D97706)", fontWeight: 600 }}>
                    Reel {activeModalIndex + 1} of {reelsData.length}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveModalIndex(null)}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#FFFFFF",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>

              {/* Modal Vertical 9:16 YouTube Shorts Video Player */}
              <div style={{ aspectRatio: "9 / 16", width: "100%", background: "#000000", position: "relative" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=0&loop=1&playlist=${activeVideoId}&controls=1&rel=0&enablejsapi=1`}
                  title={activeReel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: 0 }}
                />

                {/* Left Navigation Arrow */}
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 5,
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#FFFFFF",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  }}
                  title="Previous Reel (←)"
                >
                  ‹
                </button>

                {/* Right Navigation Arrow */}
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 5,
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#FFFFFF",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  }}
                  title="Next Reel (→)"
                >
                  ›
                </button>
              </div>

              {/* Bottom Actions Footer */}
              <div
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#0F172A",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Next →
                  </button>
                </div>

                <a
                  href={`https://youtube.com/shorts/${activeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--gold, #D97706)",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Open on YouTube ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
