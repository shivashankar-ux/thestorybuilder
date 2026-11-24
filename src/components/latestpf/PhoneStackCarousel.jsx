import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   PHONE STACK CAROUSEL — FRAMER MARKETPLACE INSPIRATION
   Ultra-realistic iPhone 16 Pro Center Frame + Overlapping Stack
   Continuous 120fps Drag/Swipe/Scroll Physics with Zero Arrow Buttons
   ============================================================ */

export default function PhoneStackCarousel({
  reels = [],
  onSelectReel,
  isMobile = false,
}) {
  const n = reels.length;

  // Continuous physics state stored in refs to prevent React state overhead during drag
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const animFrameRef = useRef(null);
  const wheelTimeoutRef = useRef(null);

  // Active React render state (updated continuously via requestAnimationFrame)
  const [renderProgress, setRenderProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isDraggingState, setIsDraggingState] = useState(false);

  // References to video elements
  const videoRefs = useRef({});

  // Sensitivity settings
  const dragDistancePerSlide = isMobile ? 220 : 320;

  // 1. CONTINUOUS PHYSICS ANIMATION LOOP (SPRING LERP AT 120FPS)
  const startPhysicsLoop = useCallback(() => {
    if (animFrameRef.current) return;

    const tick = () => {
      const current = progressRef.current;
      const target = targetProgressRef.current;
      const isDragging = isDraggingRef.current;

      // Fast tracking while dragging, buttery spring inertia when settling
      const lerpFactor = isDragging ? 0.42 : 0.14;
      const diff = target - current;

      if (Math.abs(diff) > 0.0002 || isDragging) {
        progressRef.current = current + diff * lerpFactor;
        setRenderProgress(progressRef.current);
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = target;
        setRenderProgress(target);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  // 2. MOUSE DRAG GESTURES (LEFT TO RIGHT / RIGHT TO LEFT)
  const handleMouseDown = (e) => {
    // Ignore clicks on buttons/interactive elements
    if (e.target.closest("button") || e.target.closest("a")) return;

    isDraggingRef.current = true;
    setIsDraggingState(true);
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = targetProgressRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = moveEvent.clientX - dragStartXRef.current;
      const now = performance.now();
      const dt = Math.max(1, now - lastDragTimeRef.current);
      const dx = moveEvent.clientX - lastDragXRef.current;

      velocityRef.current = dx / dt;
      lastDragXRef.current = moveEvent.clientX;
      lastDragTimeRef.current = now;

      // Invert delta: dragging left increases progress (next reel), dragging right decreases (prev reel)
      targetProgressRef.current = dragStartProgressRef.current - deltaX / dragDistancePerSlide;
      startPhysicsLoop();
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDraggingState(false);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      // Apply velocity momentum flick
      const flickMomentum = velocityRef.current * 140;
      const projected = targetProgressRef.current - flickMomentum / dragDistancePerSlide;

      // Snap to nearest integer slide
      targetProgressRef.current = Math.round(projected);
      startPhysicsLoop();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // 3. TOUCH SWIPE GESTURES (MOBILE / TOUCHSCREENS)
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    if (e.target.closest("button") || e.target.closest("a")) return;

    isDraggingRef.current = true;
    setIsDraggingState(true);
    dragStartXRef.current = e.touches[0].clientX;
    dragStartYRef.current = e.touches[0].clientY;
    dragStartProgressRef.current = targetProgressRef.current;
    lastDragXRef.current = e.touches[0].clientX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    const deltaX = clientX - dragStartXRef.current;
    const deltaY = clientY - dragStartYRef.current;

    // Prevent vertical page scroll if horizontal swipe is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      if (e.cancelable) e.preventDefault();
    }

    const now = performance.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);
    const dx = clientX - lastDragXRef.current;

    velocityRef.current = dx / dt;
    lastDragXRef.current = clientX;
    lastDragTimeRef.current = now;

    targetProgressRef.current = dragStartProgressRef.current - deltaX / dragDistancePerSlide;
    startPhysicsLoop();
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDraggingState(false);

    const flickMomentum = velocityRef.current * 130;
    const projected = targetProgressRef.current - flickMomentum / dragDistancePerSlide;
    targetProgressRef.current = Math.round(projected);
    startPhysicsLoop();
  };

  // 4. HORIZONTAL TRACKPAD / MOUSE WHEEL SCROLLING
  const handleWheel = (e) => {
    // Detect horizontal trackpad swipe or shift+wheel
    const delta = Math.abs(e.deltaX) > 4 ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (Math.abs(delta) < 3) return;

    // Prevent horizontal page bounce
    if (e.cancelable) e.preventDefault();

    targetProgressRef.current += delta * 0.0022;
    startPhysicsLoop();

    // Debounced auto-snap to nearest slide after wheel scrolling stops
    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      targetProgressRef.current = Math.round(targetProgressRef.current);
      startPhysicsLoop();
    }, 160);
  };

  // 5. KEYBOARD ARROW NAVIGATION
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        targetProgressRef.current = Math.round(targetProgressRef.current) - 1;
        startPhysicsLoop();
      } else if (e.key === "ArrowRight") {
        targetProgressRef.current = Math.round(targetProgressRef.current) + 1;
        startPhysicsLoop();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startPhysicsLoop]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  if (!reels || reels.length === 0) return null;

  // Active integer slide index normalized into [0, n - 1]
  const activeNormalizedIndex = ((Math.round(renderProgress) % n) + n) % n;
  const activeReel = reels[activeNormalizedIndex];

  // Card & Phone Dimensions matching Framer Marketplace
  const cardWidth = isMobile ? 240 : 272;
  const cardHeight = isMobile ? 470 : 540;
  const phoneWidth = isMobile ? 250 : 284;
  const phoneHeight = isMobile ? 486 : 558;

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
        paddingTop: isMobile ? 12 : 24,
        paddingBottom: isMobile ? 24 : 36,
      }}
    >
      {/* 1. MAIN PHONE STACK CAROUSEL STAGE */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1240,
          height: isMobile ? 500 : 580,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1200,
          cursor: isDraggingState ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
      >
        {/* CARDS STACKED IN PERSPECTIVE HORIZONTALLY */}
        {reels.map((reel, index) => {
          // Circular relative offset from continuous progress
          let offset = index - (renderProgress % n);
          while (offset > n / 2) offset -= n;
          while (offset < -n / 2) offset += n;

          const absOffset = Math.abs(offset);
          const sign = Math.sign(offset);

          // Calculate continuous horizontal translateX
          let translateX = 0;
          if (isMobile) {
            if (absOffset <= 1) {
              translateX = sign * absOffset * 115;
            } else if (absOffset <= 2) {
              translateX = sign * (115 + (absOffset - 1) * 95);
            } else {
              translateX = sign * (210 + (absOffset - 2) * 80);
            }
          } else {
            if (absOffset <= 1) {
              translateX = sign * absOffset * 175;
            } else if (absOffset <= 2) {
              translateX = sign * (175 + (absOffset - 1) * 145);
            } else if (absOffset <= 3) {
              translateX = sign * (320 + (absOffset - 2) * 130);
            } else {
              translateX = sign * (450 + (absOffset - 3) * 110);
            }
          }

          // Scale curve: center is 1.0, gently scaling down to 0.72 outward
          const scale = Math.max(0.68, 1 - absOffset * 0.082);

          // Stacking depth: center is 50, decreasing outward
          const zIndex = Math.max(1, Math.round(50 - absOffset * 10));

          // Opacity fadeout: outside visible range
          const maxVisible = isMobile ? 2.2 : 3.8;
          let opacity = 1;
          if (absOffset > maxVisible - 1) {
            opacity = Math.max(0, 1 - (absOffset - (maxVisible - 1)));
          }

          // Only render if visible
          if (opacity <= 0.01) return null;

          const isCenter = absOffset < 0.5;

          return (
            <div
              key={reel.id || index}
              onClick={() => {
                // If user clicks a side card, glide it to the center
                if (absOffset >= 0.4) {
                  targetProgressRef.current = Math.round(renderProgress) + Math.round(offset);
                  startPhysicsLoop();
                } else if (onSelectReel) {
                  // If user clicks the active center reel, open full cut modal
                  onSelectReel(reel);
                }
              }}
              style={{
                position: "absolute",
                width: cardWidth,
                height: cardHeight,
                left: "50%",
                transform: `translate3d(calc(-50% + ${translateX}px), 0, 0) scale(${scale})`,
                zIndex,
                opacity,
                borderRadius: isMobile ? 24 : 32,
                overflow: "hidden",
                boxShadow: isCenter
                  ? "0 28px 70px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.1)"
                  : "0 20px 48px -10px rgba(0, 0, 0, 0.28)",
                background: "#0E1013",
                cursor: isCenter ? "pointer" : "pointer",
                willChange: "transform, opacity",
                transition: isDraggingState
                  ? "none"
                  : "box-shadow 0.3s ease, border-radius 0.3s ease",
              }}
            >
              {/* VIDEO PLAYER PREVIEW */}
              <video
                ref={(el) => (videoRefs.current[reel.id || index] = el)}
                src={reel.videoSrc}
                autoPlay
                muted={isCenter ? isMuted : true}
                loop
                playsInline
                preload={absOffset <= 2 ? "auto" : "none"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: isCenter ? "none" : "brightness(0.85) contrast(1.05)",
                }}
              />

              {/* CINEMATIC VIGNETTE OVERLAY */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.85) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* SIDE CARD PREVIEW LABELS (WHEN NOT CENTERED) */}
              {!isCenter && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "rgba(0, 0, 0, 0.65)",
                      backdropFilter: "blur(6px)",
                      color: "#FFFFFF",
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 999,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {reel.tag}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      left: 12,
                      right: 12,
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                    }}
                  >
                    {reel.name}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* 2. ULTRA-REALISTIC IPHONE 16 PRO FIXED CENTER FRAME OVERLAY */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: phoneWidth,
            height: phoneHeight,
            zIndex: 55,
            pointerEvents: "none", // Let clicks/drags pass directly to carousel
            borderRadius: isMobile ? 38 : 46,
            boxSizing: "border-box",
            // Dark Natural Titanium finish with fine specular bevel
            border: isMobile
              ? "6px solid #1C1E22"
              : "7.5px solid #1B1D21",
            boxShadow:
              "inset 0 0 0 1px rgba(255, 255, 255, 0.22), inset 0 0 0 3px rgba(0, 0, 0, 0.85), 0 32px 80px -15px rgba(0, 0, 0, 0.45)",
          }}
        >
          {/* HARDWARE BUTTONS (LEFT SIDE: ACTION BUTTON + VOLUME UP/DOWN) */}
          <div
            style={{
              position: "absolute",
              left: isMobile ? -9 : -11,
              top: 75,
              width: 3.5,
              height: 24,
              background: "#2D3035",
              borderRadius: "2px 0 0 2px",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: isMobile ? -9 : -11,
              top: 115,
              width: 3.5,
              height: 44,
              background: "#2D3035",
              borderRadius: "2px 0 0 2px",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: isMobile ? -9 : -11,
              top: 170,
              width: 3.5,
              height: 44,
              background: "#2D3035",
              borderRadius: "2px 0 0 2px",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
            }}
          />

          {/* HARDWARE BUTTONS (RIGHT SIDE: POWER BUTTON + CAMERA CONTROL) */}
          <div
            style={{
              position: "absolute",
              right: isMobile ? -9 : -11,
              top: 110,
              width: 3.5,
              height: 64,
              background: "#2D3035",
              borderRadius: "0 2px 2px 0",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
            }}
          />
          {/* iPhone 16 Pro Camera Control Button (Recessed Sapphire Glass) */}
          <div
            style={{
              position: "absolute",
              right: isMobile ? -8.5 : -10.5,
              bottom: 120,
              width: 3,
              height: 36,
              background: "#24262A",
              borderRadius: "0 2px 2px 0",
              boxShadow: "inset 0 0 2px rgba(0,0,0,0.8)",
            }}
          />

          {/* TOP EARPIECE MICRO-SPEAKER SLIT */}
          <div
            style={{
              position: "absolute",
              top: 3,
              left: "50%",
              transform: "translateX(-50%)",
              width: 44,
              height: 2.5,
              background: "#090A0C",
              borderRadius: 999,
            }}
          />

          {/* DYNAMIC ISLAND PILL */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 8 : 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? 74 : 86,
              height: isMobile ? 22 : 25,
              background: "#000000",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.7)",
              pointerEvents: "auto",
            }}
          >
            {/* Front Camera Lens with Sapphire Blue Reflection */}
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "radial-gradient(circle at 35% 35%, #253347 0%, #07090E 75%)",
                boxShadow: "inset 0 0 1px #3A4A64",
                display: "inline-block",
              }}
            />
            {/* Ambient Sensor */}
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

          {/* PHONE SCREEN OVERLAYS: AUDIO TOGGLE (TOP RIGHT) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted((prev) => !prev);
            }}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            style={{
              position: "absolute",
              top: isMobile ? 10 : 12,
              right: isMobile ? 10 : 12,
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              borderRadius: 999,
              padding: "4px 8px",
              fontSize: 10,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              pointerEvents: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span>{isMuted ? "🔇" : "🔊"}</span>
            <span>{isMuted ? "Muted" : "Sound"}</span>
          </button>

          {/* CATEGORY TAG (TOP LEFT) */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 10 : 12,
              left: isMobile ? 10 : 12,
              background: "#FF4D1A",
              color: "#FFFFFF",
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: 999,
              letterSpacing: "0.04em",
              boxShadow: "0 2px 8px rgba(255, 77, 26, 0.35)",
            }}
          >
            {activeReel.tag}
          </div>

          {/* SCREEN BOTTOM CAPTION & STATS OVERLAY */}
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? 22 : 26,
              left: 12,
              right: 12,
              color: "#FFFFFF",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? 13 : 15,
                fontWeight: 800,
                lineHeight: 1.2,
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeReel.name}
            </div>
            <div
              style={{
                fontSize: isMobile ? 11 : 12,
                color: "rgba(255,255,255,0.85)",
                marginTop: 3,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{activeReel.client}</span>
              <span>•</span>
              <span style={{ color: "#FFE27A", fontWeight: 700 }}>
                {activeReel.stats}
              </span>
            </div>
          </div>

          {/* CENTER PLAY BUTTON HINT */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 46,
              height: 46,
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.92)",
              color: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              paddingLeft: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
              pointerEvents: "none",
            }}
          >
            ▶
          </div>

          {/* BOTTOM IOS HOME INDICATOR BAR */}
          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? 96 : 110,
              height: 4,
              background: "rgba(255, 255, 255, 0.75)",
              borderRadius: 999,
              boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      </div>

      {/* 3. FLUID INTERACTION HINT & METADATA (NO ARROWS — PURE GESTURE EXPERIENCE) */}
      <div
        style={{
          marginTop: isMobile ? 14 : 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          textAlign: "center",
          maxWidth: 520,
          padding: "0 16px",
        }}
      >
        {/* Subtle Gesture Guidance Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(17, 17, 17, 0.55)",
            background: "rgba(17, 17, 17, 0.05)",
            padding: "4px 12px",
            borderRadius: 999,
            letterSpacing: "0.02em",
          }}
        >
          <span>←</span>
          <span>Drag or scroll left / right to explore reels</span>
          <span>→</span>
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

        {/* Watch Full Cut Button */}
        <button
          onClick={() => onSelectReel && onSelectReel(activeReel)}
          style={{
            background: "#111111",
            color: "#FFFFFF",
            border: "none",
            fontSize: isMobile ? 12 : 13,
            fontWeight: 700,
            padding: isMobile ? "9px 20px" : "11px 24px",
            borderRadius: 999,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            boxShadow: "0 6px 20px rgba(17, 17, 17, 0.16)",
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Watch Full Cut With Sound ↗
        </button>

        {/* 4. INTERACTIVE PAGINATION PILLS (8 REELS) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 6,
          }}
        >
          {reels.map((_, dotIdx) => {
            const isActive = dotIdx === activeNormalizedIndex;
            return (
              <button
                key={dotIdx}
                onClick={() => {
                  targetProgressRef.current =
                    Math.round(renderProgress) +
                    ((((dotIdx - activeNormalizedIndex) % n) + n * 1.5) % n) -
                    n * 0.5;
                  startPhysicsLoop();
                }}
                aria-label={`Go to reel ${dotIdx + 1}`}
                style={{
                  border: "none",
                  padding: 0,
                  width: isActive ? 26 : 7,
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
