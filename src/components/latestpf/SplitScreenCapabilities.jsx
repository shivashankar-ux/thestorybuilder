import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   SPLIT SCREEN CAPABILITIES — FRAMER "CYPHER" SIGNATURE INSPIRATION
   Original Framer inspiration: https://splitscreenmenu.framer.website
   Luxury Split-Screen Capabilities Showcase with Interactive Cross-Fade
   50/50 Desktop Split · 120fps Transitions · Mobile-Optimized Stack
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

export default function SplitScreenCapabilities({ isMobile = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const displayedIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const activeItem = CAPABILITIES_DATA[displayedIndex] || CAPABILITIES_DATA[0];

  // Preload all 5 luxury images on mount for instant 0-latency switching
  useEffect(() => {
    CAPABILITIES_DATA.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  const whatsappUrl = (capTitle) =>
    `https://wa.me/918341928526?text=${encodeURIComponent(
      `Hi Story Builder team, I'm interested in your ${capTitle} service from the Things We Do section.`
    )}`;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: isMobile ? 22 : 36,
        overflow: "hidden",
        background: "#08090C",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 32px 80px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(0, 0, 0, 0.9)",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "row",
          minHeight: isMobile ? "auto" : 640,
        }}
      >
        {/* ============================================================
            LEFT PANEL: EDITORIAL NAVIGATION & CAPABILITY DETAILS
            ============================================================ */}
        <div
          style={{
            flex: isMobile ? "1 1 auto" : "0 0 52%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: isMobile ? "24px 20px 28px" : "clamp(36px, 4.5vw, 56px)",
            background: "#0A0B0E",
            position: "relative",
            zIndex: 2,
            boxSizing: "border-box",
            borderRight: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Top Bar: Brand Identifier & Coordinates */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: isMobile ? 24 : "clamp(28px, 3.5vw, 44px)",
              paddingBottom: 16,
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: activeItem.accentColor,
                  display: "inline-block",
                  boxShadow: `0 0 12px ${activeItem.accentColor}`,
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                THE STORY BUILDER · CAPABILITIES
              </span>
            </div>

            <span
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                color: "rgba(255, 255, 255, 0.45)",
                letterSpacing: "0.08em",
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
              gap: isMobile ? 14 : "clamp(12px, 1.8vw, 22px)",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {CAPABILITIES_DATA.map((item, index) => {
              const isSelected = index === displayedIndex;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setActiveIndex(index);
                    setHoveredIndex(null);
                  }}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Row: Title + Number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 16,
                      userSelect: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: isMobile
                          ? "clamp(26px, 7.5vw, 34px)"
                          : "clamp(34px, 3.8vw, 52px)",
                        fontWeight: isSelected ? 800 : 400,
                        lineHeight: 1.05,
                        letterSpacing: "-0.035em",
                        color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.32)",
                        transition: "color 0.25s ease, transform 0.25s ease",
                        display: "inline-block",
                        transform: isSelected && !isMobile ? "translateX(6px)" : "none",
                      }}
                    >
                      {item.label}
                    </span>

                    <span
                      style={{
                        fontSize: isMobile ? 12 : 14,
                        fontFamily: "monospace",
                        fontWeight: isSelected ? 800 : 400,
                        letterSpacing: "0.04em",
                        color: isSelected ? activeItem.accentColor : "rgba(255, 255, 255, 0.28)",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Expandable Active Capability Drawer */}
                  {isSelected && (
                    <div
                      style={{
                        marginTop: 14,
                        marginBottom: 6,
                        padding: isMobile ? "14px 16px" : "18px 22px",
                        borderRadius: 16,
                        background: item.bgTint,
                        border: `1px solid ${item.accentColor}33`,
                        boxShadow: `0 12px 28px -8px ${item.accentColor}18`,
                        animation: "splitFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: item.accentColor,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.fullTitle}
                        </span>

                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "3px 9px",
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
                          margin: "0 0 12px",
                          fontSize: isMobile ? 13 : 14,
                          lineHeight: 1.5,
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
                          gap: 6,
                          marginBottom: 14,
                        }}
                      >
                        {item.pills.map((pill, pIdx) => (
                          <span
                            key={pIdx}
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              padding: "4px 10px",
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
                          gap: 8,
                          fontSize: 12,
                          fontWeight: 800,
                          color: "#111111",
                          background: item.accentColor,
                          padding: "7px 16px",
                          borderRadius: 999,
                          textDecoration: "none",
                          boxShadow: `0 4px 14px ${item.accentColor}44`,
                          transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: isMobile ? 24 : "clamp(28px, 3.5vw, 40px)",
              paddingTop: 16,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <a
              href="mailto:hello@thestorybuilder.in"
              style={{
                fontSize: 13,
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

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a
                href="#order"
                style={{
                  fontSize: 12,
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
                  fontSize: 12,
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
          style={{
            flex: isMobile ? "0 0 280px" : "0 0 48%",
            position: "relative",
            minHeight: isMobile ? 280 : "100%",
            background: "#050608",
            overflow: "hidden",
            boxSizing: "border-box",
            borderBottom: isMobile ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          }}
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
                  transform: isVisible ? "scale(1)" : "scale(1.06)",
                  transition:
                    "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
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
                      "linear-gradient(to bottom, rgba(8,9,12,0.3) 0%, transparent 40%, rgba(8,9,12,0.7) 100%)",
                  }}
                />
              </div>
            );
          })}

          {/* Floating Architectural Badge (Bottom Right) */}
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? 14 : 24,
              right: isMobile ? 14 : 24,
              zIndex: 3,
              background: "rgba(0, 0, 0, 0.72)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: 999,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
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
                fontSize: 11,
                fontFamily: "monospace",
                color: "#FFFFFF",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {activeItem.num} / {activeItem.label}
            </span>
          </div>
        </div>
      </div>

      {/* Global CSS for Keyframe Animations */}
      <style>{`
        @keyframes splitFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
