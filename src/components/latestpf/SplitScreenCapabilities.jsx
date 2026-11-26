import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   SPLIT SCREEN CAPABILITIES — FRAMER "CYPHER" SIGNATURE INSPIRATION
   Original Framer inspiration: https://splitscreenmenu.framer.website
   Luxury Split-Screen Capabilities Showcase with Interactive Cross-Fade
   50/50 Desktop Split · 100% Mobile Responsive · 120fps Transitions
   ============================================================ */

export const CAPABILITIES_DATA = [
  {
    id: "research",
    num: "01",
    label: "Brand Research",
    fullTitle: "Onboarding, Brand & Competitor Research",
    tagline: "Step 01 · After Client Onboarding",
    desc: "Right after client onboarding, we study your brand positioning, target audience, and your top competitors—identifying what content formats, hooks, and angles actually win attention in your market.",
    pills: ["Client Onboarding", "Brand Deep-Dive", "Competitor Analysis", "Winning Hook Audit"],
    metric: "Data-Backed Direction",
    image: "https://framerusercontent.com/images/BzVJrV1HjzRIlc4tslCEbycng.jpg?width=1920&height=2400",
    accentColor: "#FF4D1A",
    bgTint: "rgba(255, 77, 26, 0.08)",
  },
  {
    id: "scripts",
    num: "02",
    label: "Reels Plan & Scripts",
    fullTitle: "Content Planning & Shot-by-Shot Scripts",
    tagline: "Step 02 · Planned & Scripted Before Shoot",
    desc: "We map out your entire Reels calendar and write word-for-word scripts with 3-second scroll-stopping hooks. Only after you review and approve the plan and scripts do we move to shooting.",
    pills: ["Monthly Reels Plan", "3s Viral Hooks", "Full Scripts", "Approved Before Shoot"],
    metric: "100% Scripted Clarity",
    image: "https://framerusercontent.com/images/irWN0Fqau08U8NXvzqFv5iSQo.jpg?width=1920&height=2400",
    accentColor: "#2B47FC",
    bgTint: "rgba(43, 71, 252, 0.08)",
  },
  {
    id: "shoot",
    num: "03",
    label: "On-Location Shoot",
    fullTitle: "Directed 4K Cinema Shoot",
    tagline: "Step 03 · Executing Approved Scripts",
    desc: "With locked scripts in hand, our Hyderabad crew arrives on-location with Sony Alpha 4K cinema cameras, wireless lapel mics, and studio lighting—directing every line and frame effortlessly.",
    pills: ["Sony Alpha 4K Rigs", "Wireless Lapel Mics", "Studio Lighting", "On-Location Direction"],
    metric: "100% In-House Crew",
    image: "https://framerusercontent.com/images/hDqqf7LxUh74RyCEXs9g1vELag.jpg?width=1920&height=2400",
    accentColor: "#FFE27A",
    bgTint: "rgba(255, 226, 122, 0.08)",
  },
  {
    id: "post-production",
    num: "04",
    label: "Post-Production",
    fullTitle: "High-Retention Editing, Color & Sound",
    tagline: "Step 04 · Final Edit & Delivery",
    desc: "Our in-house post-production team transforms raw footage into thumb-stopping Reels and brand films—complete with pacing cuts, kinetic subtitles, S-Log3 color grading, and crisp sound design.",
    pills: ["Retention Editing", "Kinetic Captions", "S-Log3 Color Grade", "Sound Foley & Mix"],
    metric: "48h First-Cut Turnaround",
    image: "https://framerusercontent.com/images/9RpbV8pnSwDnw05IYONWBS1w.jpg?width=1920&height=2400",
    accentColor: "#CFF26A",
    bgTint: "rgba(207, 242, 106, 0.08)",
  },
];

export default function SplitScreenCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Check if touch device to prevent stuck hover states
  const isTouchRef = useRef(false);
  useEffect(() => {
    isTouchRef.current =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
  }, []);

  const displayedIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const activeItem = CAPABILITIES_DATA[displayedIndex] || CAPABILITIES_DATA[0];

  // Preload all 5 luxury images on mount for instant 0-latency switching
  useEffect(() => {
    CAPABILITIES_DATA.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (isTouchRef.current) return;
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    if (isTouchRef.current) return;
    setHoveredIndex(null);
  };

  const handleItemSelect = (index) => {
    setActiveIndex(index);
    setHoveredIndex(null);
  };

  const whatsappUrl = (capTitle) =>
    `https://wa.me/918341928526?text=${encodeURIComponent(
      `Hi Story Builder team, I'm interested in your ${capTitle} service from the Things We Do section.`
    )}`;

  return (
    <div className="split-cap-root">
      {/* Scope CSS with pure media queries so responsiveness works independent of JS state */}
      <style>{`
        .split-cap-root {
          width: 100%;
          max-width: 100%;
          border-radius: 36px;
          overflow: hidden;
          background: #08090C;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 32px 80px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(0, 0, 0, 0.9);
          box-sizing: border-box;
          position: relative;
        }
        .split-cap-flex {
          display: flex;
          flex-direction: row;
          min-height: 640px;
          width: 100%;
          box-sizing: border-box;
        }
        .split-cap-left {
          flex: 0 0 52%;
          width: 52%;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          padding: clamp(32px, 4vw, 56px);
          background: #0A0B0E;
          position: relative;
          z-index: 2;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
        .split-cap-right {
          flex: 0 0 48%;
          width: 48%;
          position: relative;
          min-height: 100%;
          background: #050608;
          overflow: hidden;
          box-sizing: border-box;
        }
        .split-cap-header {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          margin-bottom: clamp(24px, 3.5vw, 44px);
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
          flex-wrap: wrap;
        }
        .split-cap-title {
          font-size: clamp(30px, 3.5vw, 50px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.035em;
          transition: color 0.25s ease, transform 0.25s ease;
          display: inline-block;
          word-break: break-word;
        }
        .split-cap-footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justifyContent: space-between;
          gap: 12px;
          margin-top: clamp(24px, 3.5vw, 40px);
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Fluid Mobile & Tablet Breakpoint */
        @media (max-width: 880px) {
          .split-cap-root {
            border-radius: 22px;
          }
          .split-cap-flex {
            flex-direction: column-reverse !important;
            min-height: auto !important;
          }
          .split-cap-left {
            flex: 1 1 100% !important;
            width: 100% !important;
            padding: 20px 16px 24px !important;
            border-right: none !important;
          }
          .split-cap-right {
            flex: 0 0 250px !important;
            width: 100% !important;
            height: 250px !important;
            min-height: 250px !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
          .split-cap-title {
            font-size: clamp(22px, 6vw, 30px) !important;
          }
          .split-cap-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
            margin-bottom: 18px !important;
            padding-bottom: 12px !important;
          }
          .split-cap-footer {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-top: 20px !important;
            padding-top: 14px !important;
          }
        }
        @keyframes splitFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="split-cap-flex">
        {/* ============================================================
            LEFT PANEL: EDITORIAL NAVIGATION & CAPABILITY DETAILS
            ============================================================ */}
        <div className="split-cap-left">
          {/* Top Bar: Brand Identifier & Coordinates */}
          <div className="split-cap-header">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: activeItem.accentColor,
                  display: "inline-block",
                  boxShadow: `0 0 10px ${activeItem.accentColor}`,
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                THE STORY BUILDER · CAPABILITIES
              </span>
            </div>

            <span
              style={{
                fontSize: 10.5,
                fontFamily: "monospace",
                color: "rgba(255, 255, 255, 0.45)",
                letterSpacing: "0.06em",
              }}
            >
              HYD · 17.3850° N, 78.4867° E
            </span>
          </div>

          {/* Center Navigation List (Large Editorial Typography) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {CAPABILITIES_DATA.map((item, index) => {
              const isSelected = index === displayedIndex;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleItemSelect(index)}
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: 14,
                    background: isSelected ? "rgba(255, 255, 255, 0.04)" : "transparent",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {/* Row: Title + Number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 12,
                      userSelect: "none",
                    }}
                  >
                    <span
                      className="split-cap-title"
                      style={{
                        color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.32)",
                        transform: isSelected ? "translateX(4px)" : "none",
                      }}
                    >
                      {item.label}
                    </span>

                    <span
                      style={{
                        fontSize: 13,
                        fontFamily: "monospace",
                        fontWeight: isSelected ? 800 : 400,
                        letterSpacing: "0.04em",
                        color: isSelected ? item.accentColor : "rgba(255, 255, 255, 0.28)",
                        transition: "color 0.25s ease",
                        flexShrink: 0,
                      }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Expandable Active Capability Drawer */}
                  {isSelected && (
                    <div
                      style={{
                        marginTop: 12,
                        marginBottom: 4,
                        padding: "14px 16px",
                        borderRadius: 14,
                        background: item.bgTint,
                        border: `1px solid ${item.accentColor}33`,
                        boxShadow: `0 10px 24px -8px ${item.accentColor}18`,
                        animation: "splitFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 6,
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: 800,
                            color: item.accentColor,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.fullTitle}
                        </span>

                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: 999,
                            background: "rgba(255, 255, 255, 0.12)",
                            color: "#FFFFFF",
                          }}
                        >
                          {item.metric}
                        </span>
                      </div>

                      <p
                        style={{
                          margin: "0 0 10px",
                          fontSize: 13,
                          lineHeight: 1.45,
                          color: "rgba(255, 255, 255, 0.78)",
                          fontWeight: 400,
                        }}
                      >
                        {item.desc}
                      </p>

                      {/* Pill Tags */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 5,
                          marginBottom: 12,
                        }}
                      >
                        {item.pills.map((pill, pIdx) => (
                          <span
                            key={pIdx}
                            style={{
                              fontSize: 10.5,
                              fontWeight: 600,
                              padding: "3px 9px",
                              borderRadius: 999,
                              background: "rgba(255, 255, 255, 0.08)",
                              color: "rgba(255, 255, 255, 0.9)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>

                      {/* Quick Action CTA */}
                      <a
                        href={whatsappUrl(item.fullTitle)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 11.5,
                          fontWeight: 800,
                          color: "#111111",
                          background: item.accentColor,
                          padding: "6px 14px",
                          borderRadius: 999,
                          textDecoration: "none",
                          boxShadow: `0 4px 12px ${item.accentColor}44`,
                          transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        <span>Book this Pipeline on WhatsApp</span>
                        <span>↗</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Bar: Contact & Direct Actions */}
          <div className="split-cap-footer">
            <a
              href="mailto:hello@thestorybuilder.in"
              style={{
                fontSize: 12.5,
                color: "rgba(255, 255, 255, 0.65)",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.65)")}
            >
              hello@thestorybuilder.in
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <a
                href="#brief"
                style={{
                  fontSize: 11.5,
                  color: "rgba(255, 255, 255, 0.5)",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")}
              >
                Book a Shoot
              </a>
              <a
                href={whatsappUrl("General Production")}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 11.5,
                  color: "#FF4D1A",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                WhatsApp ↗
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT PANEL: DYNAMIC FULL-BLEED ARCHITECTURAL VISUAL
            ============================================================ */}
        <div
          className="split-cap-right"
          onClick={() => {
            // Tapping visual cycles to next capability on mobile
            setActiveIndex((prev) => (prev + 1) % CAPABILITIES_DATA.length);
          }}
          style={{ cursor: "pointer" }}
        >
          {/* Layered Cross-Fading Images */}
          {CAPABILITIES_DATA.map((item, index) => {
            const isVisible = index === displayedIndex;

            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scale(1)" : "scale(1.05)",
                  transition:
                    "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: "none",
                }}
              >
                <img
                  src={item.image}
                  alt={item.fullTitle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Subtle Cinematic Vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(8,9,12,0.2) 0%, transparent 40%, rgba(8,9,12,0.65) 100%)",
                  }}
                />
              </div>
            );
          })}

          {/* Floating Architectural Badge (Bottom Right) */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              zIndex: 3,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: 999,
              padding: "5px 12px",
              display: "flex",
              alignItems: "center",
              gap: 7,
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.5)",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: activeItem.accentColor,
                display: "inline-block",
                boxShadow: `0 0 8px ${activeItem.accentColor}`,
              }}
            />
            <span
              style={{
                fontSize: 10.5,
                fontFamily: "monospace",
                color: "#FFFFFF",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {activeItem.num} / {activeItem.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
