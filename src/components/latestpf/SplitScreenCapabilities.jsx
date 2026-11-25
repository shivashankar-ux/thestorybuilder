import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   SPLIT SCREEN CAPABILITIES — FRAMER "CYPHER" SIGNATURE INSPIRATION
   Original Framer inspiration: https://splitscreenmenu.framer.website
   Luxury Split-Screen Capabilities Showcase with Interactive Cross-Fade
   50/50 Desktop Split · 100% Mobile Responsive · 120fps Transitions
   ============================================================ */

export const CAPABILITIES_DATA = [
  {
    id: "strategy",
    num: "01",
    label: "Strategy",
    fullTitle: "Viral Strategy & Scripting",
    tagline: "Hook Architecture & Audience Retention",
    desc: "Hook research, audience drop-off analysis, competitor angle deconstruction, and viral narrative scripts engineered to capture attention in the first 3 seconds and drive high-ticket conversion.",
    pills: ["3s Viral Hook Research", "Drop-Off Prevention", "Direct-Response Scripting", "Offer Angle Testing"],
    metric: "3.8x Avg Retention Lift",
    image: "https://framerusercontent.com/images/BzVJrV1HjzRIlc4tslCEbycng.jpg?width=1920&height=2400",
    accentColor: "#FF4D1A",
    bgTint: "rgba(255, 77, 26, 0.08)",
  },
  {
    id: "production",
    num: "02",
    label: "Production",
    fullTitle: "On-Location Cinema Shoot",
    tagline: "4K Sony Cinema Rig Filming in Hyderabad",
    desc: "Trained crew with Sony Alpha 4K cinema cameras, anamorphic & prime lenses, wireless lapel audio, and portable studio lighting. We direct everything on-location across Hyderabad while you run your business.",
    pills: ["Sony Alpha 4K Rigs", "Wireless Lapel Mics", "Studio Lighting Kit", "On-Location Director"],
    metric: "100% In-House Hyderabad Crew",
    image: "https://framerusercontent.com/images/hDqqf7LxUh74RyCEXs9g1vELag.jpg?width=1920&height=2400",
    accentColor: "#E0E0E0",
    bgTint: "rgba(255, 255, 255, 0.06)",
  },
  {
    id: "reels",
    num: "03",
    label: "Reels & Shorts",
    fullTitle: "High-Retention Kinetic Edits",
    tagline: "Thumb-Stopping Organic Social Growth",
    desc: "Kinetic animated typography, pattern-interrupt zoom cuts, speed ramps, and rhythmic sound foley engineered to stop the scroll on Instagram, YouTube Shorts, and LinkedIn feeds.",
    pills: ["Kinetic Subtitles", "Speed Ramping", "Pattern Interrupts", "9:16 Mobile Masters"],
    metric: "1.2M+ Views Generated",
    image: "https://framerusercontent.com/images/irWN0Fqau08U8NXvzqFv5iSQo.jpg?width=1920&height=2400",
    accentColor: "#2B47FC",
    bgTint: "rgba(43, 71, 252, 0.08)",
  },
  {
    id: "ads",
    num: "04",
    label: "Paid Video Ads",
    fullTitle: "Direct-Response Meta Creatives",
    tagline: "High-ROAS Meta & YouTube Campaigns",
    desc: "Conversion-focused paid ad creatives designed to scale profitably. Multi-hook variations, objection-handling narrative structures, and clear CTA overlays that lower CAC and drive inbound leads.",
    pills: ["Multi-Hook Variations", "Offer Framing", "CTA Motion Overlays", "Meta & YouTube Ready"],
    metric: "4.2x Average Client ROAS",
    image: "https://framerusercontent.com/images/A0dxHjRODA6zGTVW1E3oxN5Tgg8.jpg?width=1920&height=2387",
    accentColor: "#FFE27A",
    bgTint: "rgba(255, 226, 122, 0.08)",
  },
  {
    id: "post-production",
    num: "05",
    label: "Post-Production",
    fullTitle: "DaVinci Color & Sound Foley",
    tagline: "Hollywood-Grade S-Log3 Grade & Mixing",
    desc: "DaVinci Resolve S-Log3 cinema grading, precision vocal polish, room noise reduction, and cinematic low-end bass impact foley. Ready to publish with 2 revision rounds included.",
    pills: ["DaVinci S-Log3 LUTs", "Dialogue Cleanup", "Cinematic Bass Foley", "Multi-Ratio Export"],
    metric: "Cinema Film Finish",
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
