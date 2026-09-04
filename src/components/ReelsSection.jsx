import React, { useState } from "react";
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
  const [globalMuted, setGlobalMuted] = useState(true);
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
            marginBottom: "28px",
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
              🎬 Portfolio Reels
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

          {/* Master Sound Button (Touch Friendly) */}
          <button
            type="button"
            onClick={toggleGlobalSound}
            style={{
              background: globalMuted && !unmutedVideoId ? "rgba(15, 23, 42, 0.06)" : "var(--gold, #D97706)",
              color: globalMuted && !unmutedVideoId ? "var(--text, #0F172A)" : "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "10px 20px",
              minHeight: "42px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              transition: "all 0.25s ease",
              touchAction: "manipulation",
            }}
          >
            {globalMuted && !unmutedVideoId ? "🔇 Muted (Click for Sound)" : "🔊 Sound Enabled"}
          </button>
        </div>

        {/* Responsive Mobile-Optimized Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {reelsData.map((reel) => {
            const isUnmuted = unmutedVideoId === reel.id || (!globalMuted && unmutedVideoId === null);
            const muteParam = isUnmuted ? 0 : 1;

            const embedSrc = `https://www.youtube-nocookie.com/embed/${reel.id}?autoplay=1&mute=${muteParam}&loop=1&playlist=${reel.id}&playsinline=1&controls=1&rel=0`;

            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#000000",
                  aspectRatio: "9 / 16",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                  border: "2px solid var(--border)",
                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 42px rgba(217,119,6,0.22)";
                  e.currentTarget.style.borderColor = "var(--gold, #D97706)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.12)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
                onClick={() => setActiveModalReel(reel)}
              >
                {/* Autoplay Looped YouTube Shorts Video Embed */}
                <iframe
                  src={embedSrc}
                  title={reel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    pointerEvents: "auto",
                  }}
                />

                {/* Touch-Optimized Floating Sound Toggle */}
                <button
                  type="button"
                  onClick={(e) => toggleCardSound(reel.id, e)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                    background: isUnmuted ? "var(--gold, #D97706)" : "rgba(0, 0, 0, 0.78)",
                    backdropFilter: "blur(8px)",
                    color: "#FFFFFF",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    padding: "6px 12px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                    transition: "all 0.2s ease",
                    touchAction: "manipulation",
                  }}
                >
                  {isUnmuted ? "🔊 Sound On" : "🔇 Tap for Sound"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Touch-Optimized Lightbox Video Modal */}
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
              background: "rgba(15, 23, 42, 0.92)",
              backdropFilter: "blur(14px)",
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
                maxWidth: "400px",
                width: "92vw",
                maxHeight: "90vh",
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
                  top: "12px",
                  right: "12px",
                  zIndex: 10,
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  touchAction: "manipulation",
                }}
              >
                ✕
              </button>

              {/* Modal Unmuted Video Player */}
              <div style={{ aspectRatio: "9 / 16", width: "100%", background: "#000" }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeModalReel.id}?autoplay=1&mute=0&loop=1&playlist=${activeModalReel.id}&controls=1&rel=0`}
                  title={activeModalReel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: 0 }}
                />
              </div>

              {/* Direct Fallback Button */}
              <div style={{ padding: "14px", textAlign: "center", background: "#0F172A" }}>
                <a
                  href={`https://youtube.com/shorts/${activeModalReel.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--gold, #D97706)",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Open Direct on YouTube Shorts ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
