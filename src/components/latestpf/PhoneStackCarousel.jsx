import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   PHONE STACK CAROUSEL — FRAMER MARKETPLACE INSPIRATION
   Realistic iPhone Mockup in Center + Overlapping Fanned Stack
   Left & Right with 120fps Smooth Transitions & Touch Gestures
   ============================================================ */

export default function PhoneStackCarousel({
  reels = [],
  onSelectReel,
  isMobile = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const activeVideoRef = useRef(null);

  const n = reels.length;

  const nextSlide = useCallback(() => {
    if (n === 0) return;
    setCurrentIndex((prev) => (prev + 1) % n);
  }, [n]);

  const prevSlide = useCallback(() => {
    if (n === 0) return;
    setCurrentIndex((prev) => (prev - 1 + n) % n);
  }, [n]);

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX) > 45) {
      if (touchDeltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsSwiping(false);
  };

  // Keyboard arrow keys navigation when focused
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!reels || reels.length === 0) return null;

  const activeReel = reels[currentIndex];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        overflow: "hidden",
        paddingTop: isMobile ? 10 : 20,
        paddingBottom: isMobile ? 20 : 30,
      }}
    >
      {/* 1. MAIN PHONE STACK STAGE */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          height: isMobile ? "490px" : "clamp(500px, 62vh, 620px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1200,
        }}
      >
        {reels.map((reel, index) => {
          // Circular relative offset from current center
          let offset = index - currentIndex;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          // Calculate transforms matching the Framer Marketplace screenshot
          let translateX = 0;
          let scale = 1;
          let zIndex = 30;
          let opacity = 1;
          let rotateY = 0;

          if (isMobile) {
            // Mobile Stack: Center phone with left & right cards peeking out
            if (isCenter) {
              translateX = 0;
              scale = 1;
              zIndex = 40;
              opacity = 1;
            } else if (offset === -1) {
              translateX = -85;
              scale = 0.88;
              zIndex = 25;
              opacity = 0.88;
            } else if (offset === 1) {
              translateX = 85;
              scale = 0.88;
              zIndex = 25;
              opacity = 0.88;
            } else {
              translateX = offset > 0 ? 160 : -160;
              scale = 0.75;
              zIndex = 10;
              opacity = 0;
            }
          } else {
            // Desktop Stack: Fanned out horizontally with clean overlapping depth
            if (isCenter) {
              translateX = 0;
              scale = 1;
              zIndex = 50;
              opacity = 1;
            } else if (absOffset === 1) {
              translateX = offset * 185;
              scale = 0.90;
              zIndex = 35;
              opacity = 0.95;
              rotateY = offset * -2;
            } else if (absOffset === 2) {
              translateX = offset * 330;
              scale = 0.82;
              zIndex = 25;
              opacity = 0.85;
              rotateY = offset * -4;
            } else if (absOffset === 3) {
              translateX = offset * 455;
              scale = 0.74;
              zIndex = 15;
              opacity = 0.65;
              rotateY = offset * -5;
            } else {
              translateX = offset > 0 ? 560 : -560;
              scale = 0.65;
              zIndex = 5;
              opacity = 0;
            }
          }

          const cardWidth = isMobile ? 240 : 270;
          const cardHeight = isMobile ? 470 : 540;

          return (
            <div
              key={reel.id || index}
              onClick={() => {
                if (!isCenter) {
                  setCurrentIndex(index);
                } else if (onSelectReel) {
                  onSelectReel(reel);
                }
              }}
              style={{
                position: "absolute",
                width: cardWidth,
                height: cardHeight,
                transform: `translateX(calc(-50% + ${translateX}px)) scale(${scale}) rotateY(${rotateY}deg)`,
                left: "50%",
                zIndex,
                opacity,
                cursor: isCenter ? "pointer" : "pointer",
                transition: isSwiping
                  ? "none"
                  : "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.48s ease, box-shadow 0.48s ease",
                pointerEvents: absOffset > (isMobile ? 1 : 3) ? "none" : "auto",
                borderRadius: isCenter ? (isMobile ? 38 : 46) : (isMobile ? 22 : 28),
                boxShadow: isCenter
                  ? "0 30px 80px -15px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.12)"
                  : "0 18px 45px -10px rgba(0, 0, 0, 0.22)",
                overflow: "hidden",
                background: "#000000",
                willChange: "transform, opacity",
              }}
            >
              {/* IF IT'S THE CENTER ITEM: REALISTIC IPHONE PRO MOCKUP FRAME */}
              {isCenter ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: isMobile ? 38 : 46,
                    padding: isMobile ? "8px" : "10px",
                    boxSizing: "border-box",
                    background: "linear-gradient(145deg, #2D333B 0%, #15181E 50%, #0D0F12 100%)",
                    boxShadow: "inset 0 0 0 1.5px rgba(255, 255, 255, 0.22)",
                  }}
                >
                  {/* Inner Screen Container */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: isMobile ? 30 : 36,
                      overflow: "hidden",
                      background: "#000000",
                    }}
                  >
                    {/* Active Reel Video Playing */}
                    <video
                      ref={activeVideoRef}
                      src={reel.videoSrc}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Subtle Screen Vignette */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.85) 100%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* iPhone Dynamic Island */}
                    <div
                      style={{
                        position: "absolute",
                        top: isMobile ? 8 : 10,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: isMobile ? 74 : 86,
                        height: isMobile ? 20 : 23,
                        background: "#000000",
                        borderRadius: 999,
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 8px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* Camera Lens Dot */}
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          background: "#1A1A24",
                          boxShadow: "inset 0 0 2px #3A4454",
                          display: "inline-block",
                        }}
                      />
                      {/* Sensor Dot */}
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 999,
                          background: "#0D1117",
                          display: "inline-block",
                        }}
                      />
                    </div>

                    {/* Audio Mute/Unmute Quick Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      style={{
                        position: "absolute",
                        top: isMobile ? 10 : 12,
                        right: isMobile ? 10 : 12,
                        background: "rgba(0, 0, 0, 0.65)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        color: "#FFFFFF",
                        borderRadius: 999,
                        padding: "4px 8px",
                        fontSize: 10,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        cursor: "pointer",
                        zIndex: 15,
                      }}
                    >
                      <span>{isMuted ? "🔇" : "🔊"}</span>
                      <span>{isMuted ? "Muted" : "Sound"}</span>
                    </button>

                    {/* Category Tag (Top Left) */}
                    <div
                      style={{
                        position: "absolute",
                        top: isMobile ? 10 : 12,
                        left: isMobile ? 10 : 12,
                        background: "rgba(255, 255, 255, 0.94)",
                        color: "#111111",
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        borderRadius: 999,
                        letterSpacing: "0.04em",
                        zIndex: 15,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                      }}
                    >
                      {reel.tag}
                    </div>

                    {/* Tap to Open Full Cut Overlay Hint */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: isMobile ? 22 : 26,
                        left: 12,
                        right: 12,
                        color: "#FFFFFF",
                        zIndex: 15,
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? 13 : 15,
                          fontWeight: 800,
                          lineHeight: 1.2,
                          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {reel.name}
                      </div>
                      <div
                        style={{
                          fontSize: isMobile ? 11 : 12,
                          color: "rgba(255,255,255,0.8)",
                          marginTop: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span>{reel.client}</span>
                        <span>•</span>
                        <span style={{ color: "#FF4D1A", fontWeight: 700 }}>
                          {reel.stats}
                        </span>
                      </div>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        background: "rgba(255, 255, 255, 0.92)",
                        color: "#111111",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        paddingLeft: 3,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                        pointerEvents: "none",
                        zIndex: 15,
                      }}
                    >
                      ▶
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: isMobile ? 90 : 105,
                        height: 4,
                        background: "rgba(255, 255, 255, 0.65)",
                        borderRadius: 999,
                        zIndex: 15,
                      }}
                    />
                  </div>
                </div>
              ) : (
                /* SIDE CARDS IN THE STACK (ROUNDED POSTER / VIDEO PREVIEW) */
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: isMobile ? 22 : 28,
                    overflow: "hidden",
                    background: "#111111",
                  }}
                >
                  <video
                    src={reel.videoSrc}
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "brightness(0.85) contrast(1.05)",
                    }}
                  />
                  {/* Dark Vignette Overlay on Background Cards */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Category Pill on Side Cards */}
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: "rgba(0, 0, 0, 0.65)",
                      color: "#FFFFFF",
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 999,
                    }}
                  >
                    {reel.tag}
                  </div>

                  {/* Mini Caption */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 10,
                      right: 10,
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {reel.client}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* 2. FLOATING LEFT & RIGHT ARROWS */}
        <button
          onClick={prevSlide}
          aria-label="Previous Reel"
          style={{
            position: "absolute",
            left: isMobile ? 8 : "clamp(12px, 4vw, 40px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? 40 : 50,
            height: isMobile ? 40 : 50,
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(17, 17, 17, 0.08)",
            color: "#111111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? 18 : 22,
            boxShadow: "0 8px 24px rgba(17, 17, 17, 0.16)",
            cursor: "pointer",
            zIndex: 60,
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Reel"
          style={{
            position: "absolute",
            right: isMobile ? 8 : "clamp(12px, 4vw, 40px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? 40 : 50,
            height: isMobile ? 40 : 50,
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(17, 17, 17, 0.08)",
            color: "#111111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? 18 : 22,
            boxShadow: "0 8px 24px rgba(17, 17, 17, 0.16)",
            cursor: "pointer",
            zIndex: 60,
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
        >
          →
        </button>
      </div>

      {/* 3. ACTIVE REEL INFORMATION & ACTION CONTROLS */}
      <div
        style={{
          marginTop: isMobile ? 14 : 22,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          textAlign: "center",
          maxWidth: 480,
          padding: "0 16px",
        }}
      >
        {/* Meta Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              background: "#FF4D1A",
              color: "#FFFFFF",
              padding: "4px 10px",
              borderRadius: 999,
            }}
          >
            {activeReel.tag}
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(17, 17, 17, 0.6)",
            }}
          >
            {activeReel.client}
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#111111",
              background: "rgba(17, 17, 17, 0.06)",
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            {activeReel.stats}
          </span>
        </div>

        {/* Big Clean Title */}
        <h4
          style={{
            margin: 0,
            fontSize: isMobile ? "20px" : "24px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#111111",
          }}
        >
          {activeReel.name}
        </h4>

        {/* CTA Button: Watch Full Cut Modal */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <button
            onClick={() => onSelectReel && onSelectReel(activeReel)}
            style={{
              background: "#111111",
              color: "#FFFFFF",
              border: "none",
              fontSize: isMobile ? 12 : 13,
              fontWeight: 700,
              padding: isMobile ? "9px 18px" : "11px 22px",
              borderRadius: 999,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 6px 18px rgba(17, 17, 17, 0.16)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Watch Full Cut With Sound ↗
          </button>
        </div>

        {/* 4. PAGINATION PILLS (8 REELS) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 8,
          }}
        >
          {reels.map((_, dotIdx) => {
            const isActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to reel ${dotIdx + 1}`}
                style={{
                  border: "none",
                  padding: 0,
                  width: isActive ? 24 : 7,
                  height: 7,
                  borderRadius: 999,
                  background: isActive ? "#FF4D1A" : "rgba(17, 17, 17, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
