import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reelsData = [
  {
    id: "QAL6E6fy1f0",
    title: "Brand Identity & Strategy Reel",
    desc: "High-impact visual story and brand positioning reel.",
  },
  {
    id: "1EwM31QxnKk",
    title: "Growth Strategy Case Study",
    desc: "High-converting growth funnels and performance marketing.",
  },
  {
    id: "_aVoaZbyXJQ",
    title: "Meta & Performance Ad Breakdown",
    desc: "High-converting ad script & video creative framework.",
  },
  {
    id: "rVUkWK8lRmw",
    title: "Web Development & UI Showcase",
    desc: "High-performance, mobile-first website design.",
  },
  {
    id: "VdsrsWmmhiw",
    title: "Brand Identity Behind The Scenes",
    desc: "Distinct visual identities and typography systems.",
  },
  {
    id: "k-bJd1yYk1A",
    title: "Social Media Campaign Results",
    desc: "Data-driven Meta ad creative strategy.",
  },
  {
    id: "wDfOBIsFCUE",
    title: "Creative SEO & Organic Growth",
    desc: "Organic search strategies and viral short-form video.",
  },
];

export default function ReelsSection() {
  const [activeModalReel, setActiveModalReel] = useState(null);

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
                marginBottom: "10px",
                border: "1px solid rgba(217,119,6,0.2)",
              }}
            >
              🎬 Watch Our Portfolio Reels
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
        </div>

        {/* Bulletproof HD Video Poster Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {reelsData.map((reel) => {
            const thumbnailUrl = `https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`;

            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "#0F172A",
                  aspectRatio: "9 / 16",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
                  border: "2px solid var(--border)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 24px 48px rgba(217,119,6,0.28)";
                  e.currentTarget.style.borderColor = "var(--gold, #D97706)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.14)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
                onClick={() => setActiveModalReel(reel)}
              >
                {/* Real HD YouTube Cover Image (100% reliable, never blocked) */}
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

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.1) 45%, rgba(15,23,42,0.85) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Pulsing Glowing Play Button */}
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
                      background: "var(--gold, #D97706)",
                      boxShadow: "0 0 30px rgba(217, 119, 6, 0.85)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: "22px",
                      paddingLeft: "3px",
                    }}
                  >
                    ▶
                  </div>
                </div>

                {/* Card Action Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    zIndex: 3,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(10px)",
                      color: "#FFFFFF",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      padding: "8px 16px",
                      borderRadius: "100px",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                    }}
                  >
                    ▶ Watch Reel
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Video Player Modal */}
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
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                  width: "40px",
                  height: "40px",
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

              {/* Poster Header */}
              <div style={{ position: "relative", aspectRatio: "9 / 12", width: "100%", background: "#000" }}>
                <img
                  src={`https://i.ytimg.com/vi/${activeModalReel.id}/hqdefault.jpg`}
                  alt={activeModalReel.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(15,23,42,0.9) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                  }}
                >
                  <h3 style={{ margin: "0 0 6px 0", fontSize: "20px", fontWeight: 800 }}>
                    {activeModalReel.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                    {activeModalReel.desc}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", background: "#0F172A" }}>
                <a
                  href={`https://youtube.com/shorts/${activeModalReel.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px",
                    borderRadius: "100px",
                    fontSize: "15px",
                    fontWeight: 800,
                    textDecoration: "none",
                    width: "100%",
                    boxShadow: "0 6px 20px rgba(217, 119, 6, 0.4)",
                  }}
                >
                  ▶ Watch Full Reel on YouTube Shorts ↗
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModalReel(null)}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    padding: "10px",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
