import React, { useState, useEffect } from "react";
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
  const [activeModalReel, setActiveModalReel] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveModalReel(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      }}
    >
      <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="tag sr" style={{ marginBottom: "12px" }}>
            🎬 Portfolio Reels & Video
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontFamily: "var(--fd)",
              fontWeight: 800,
              color: "var(--text, #0F172A)",
              margin: "0 0 12px 0",
              lineHeight: 1.15,
            }}
          >
            Watch Our <span style={{ color: "var(--gold, #D97706)" }}>Reels & Video Work</span>
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--muted, #64748B)",
              margin: "0 auto",
              maxWidth: "500px",
              lineHeight: 1.6,
            }}
          >
            Click any video below to play directly in 9:16 format.
          </p>
        </div>

        {/* Clean Video Grid - 9:16 aspect ratio cards with zero clutter */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {reelsData.map((reel, idx) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveModalReel(reel)}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#000000",
                aspectRatio: "9 / 16",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                border: "1.5px solid var(--border)",
                cursor: "pointer",
              }}
            >
              {/* Clean Poster Image */}
              <img
                src={`https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`}
                alt={reel.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Minimal Clean Play Button Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.2)",
                  transition: "background 0.25s ease",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "50%",
                    background: "#FF0000",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    paddingLeft: "3px",
                    boxShadow: "0 6px 20px rgba(255,0,0,0.5)",
                  }}
                >
                  ▶
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pure 9:16 Video Player Modal */}
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
              background: "rgba(10, 15, 30, 0.92)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            {/* Modal 9:16 Frame */}
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "380px",
                aspectRatio: "9 / 16",
                maxHeight: "88vh",
                background: "#000000",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 25px 80px rgba(0,0,0,0.9)",
                border: "2px solid var(--gold, #D97706)",
              }}
            >
              {/* Floating Close Button outside video face */}
              <button
                type="button"
                onClick={() => setActiveModalReel(null)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  zIndex: 20,
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Close"
              >
                ✕
              </button>

              {/* Clean 9:16 Embedded Video */}
              <iframe
                src={`https://www.youtube.com/embed/${activeModalReel.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={activeModalReel.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
