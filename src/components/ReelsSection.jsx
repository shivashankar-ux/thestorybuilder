import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reelsData = [
  { id: "QAL6E6fy1f0", title: "Portfolio Reel 1" },
  { id: "1EwM31QxnKk", title: "Portfolio Reel 2" },
  { id: "_aVoaZbyXJQ", title: "Portfolio Reel 3" },
  { id: "rVUkWK8lRmw", title: "Portfolio Reel 4" },
  { id: "VdsrsWmmhiw", title: "Portfolio Reel 5" },
  { id: "k-bJd1yYk1A", title: "Portfolio Reel 6" },
  { id: "wDfOBIsFCUE", title: "Portfolio Reel 7" },
];

export default function ReelsSection() {
  // Global sound state (muted by default so videos autoplay continuously in loop)
  const [globalMuted, setGlobalMuted] = useState(true);
  // Track individual video sound overrides
  const [unmutedVideoId, setUnmutedVideoId] = useState(null);
  const [activeModalReel, setActiveModalReel] = useState(null);

  const toggleGlobalSound = () => {
    if (globalMuted) {
      setGlobalMuted(false);
    } else {
      setGlobalMuted(true);
      setUnmutedVideoId(null);
    }
  };

  const toggleCardSound = (id, e) => {
    e.stopPropagation();
    if (unmutedVideoId === id) {
      setUnmutedVideoId(null);
    } else {
      setGlobalMuted(false);
      setUnmutedVideoId(id);
    }
  };

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
      <div
        className="wrap"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px" }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
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
                marginBottom: "10px",
                border: "1px solid rgba(217,119,6,0.2)",
              }}
            >
              🎬 Watch Our Reels
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontFamily: "var(--fd)",
                fontWeight: 800,
                color: "var(--text, #0F172A)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Portfolio <span style={{ color: "var(--gold, #D97706)" }}>Reels & Video Showcase</span>
            </h2>
          </div>

          {/* Global Master Audio Control */}
          <button
            type="button"
            onClick={toggleGlobalSound}
            style={{
              background: globalMuted && !unmutedVideoId ? "rgba(15, 23, 42, 0.06)" : "var(--gold, #D97706)",
              color: globalMuted && !unmutedVideoId ? "var(--text, #0F172A)" : "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "10px 22px",
              fontSize: "13.5px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              transition: "all 0.25s ease",
            }}
          >
            {globalMuted && !unmutedVideoId ? "🔇 Audio Muted (Click for Sound)" : "🔊 Sound Enabled"}
          </button>
        </div>

        {/* Clean Video Reels Grid (No category buttons, no text banners over video) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "22px",
            justifyContent: "center",
          }}
        >
          {reelsData.map((reel) => {
            const isUnmuted = unmutedVideoId === reel.id || (!globalMuted && unmutedVideoId === null);
            const muteParam = isUnmuted ? 0 : 1;

            // Embedded URL designed for continuous looped autoplay without controls clutter
            const embedSrc = `https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=${muteParam}&loop=1&playlist=${reel.id}&controls=0&modestbranding=1&rel=0&enablejsapi=1&playsinline=1`;

            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  borderRadius: "22px",
                  overflow: "hidden",
                  background: "#000000",
                  aspectRatio: "9 / 16",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  border: "2px solid var(--border)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 42px rgba(217,119,6,0.22)";
                  e.currentTarget.style.borderColor = "var(--gold, #D97706)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
                onClick={() => setActiveModalReel(reel)}
              >
                {/* Autoplay Looped YouTube Shorts Video Embed */}
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

                {/* Floating Sound Mute/Unmute Overlay Button */}
                <button
                  type="button"
                  onClick={(e) => toggleCardSound(reel.id, e)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    zIndex: 10,
                    background: isUnmuted ? "var(--gold, #D97706)" : "rgba(0, 0, 0, 0.65)",
                    backdropFilter: "blur(8px)",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "6px 12px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isUnmuted ? "🔊 Sound On" : "🔇 Tap for Sound"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Video Modal Lightbox */}
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
              background: "rgba(15, 23, 42, 0.9)",
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
                background: "#000000",
                borderRadius: "24px",
                overflow: "hidden",
                maxWidth: "420px",
                width: "100%",
                border: "2px solid var(--gold, #D97706)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
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
                  top: "14px",
                  right: "14px",
                  zIndex: 10,
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                  width: "38px",
                  height: "38px",
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

              {/* Modal Unmuted Video Player */}
              <div style={{ aspectRatio: "9 / 16", width: "100%", background: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeModalReel.id}?autoplay=1&mute=0&loop=1&playlist=${activeModalReel.id}&controls=1&modestbranding=1&rel=0`}
                  title={activeModalReel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: 0 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
