import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   PHONE STACK CAROUSEL — MINIMALIST FRAMER INSPIRATION
   Ultra-realistic iPhone 16 Pro Center Frame + Overlapping Stack
   Pure Video · Zero Text Clutter · 120fps Gesture Drag/Swipe Physics
   Plays Inside iPhone Only (No Modal) · Prominent Mute/Unmute Toggle
   ============================================================ */

export default function PhoneStackCarousel({
  reels = [],
  isMobile = false,
}) {
  const n = reels.length;

  // Continuous physics state stored in refs for 120fps GPU performance
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const animFrameRef = useRef(null);
  const wheelTimeoutRef = useRef(null);

  // Active React render state updated via requestAnimationFrame
  const [renderProgress, setRenderProgress] = useState(0);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // References to all video DOM elements
  const videoRefs = useRef({});

  // Mobile-adaptive drag sensitivity
  const dragDistancePerSlide = isMobile ? 180 : 300;

  // Active integer slide index normalized into [0, n - 1]
  const activeNormalizedIndex = ((Math.round(renderProgress) % n) + n) % n;

  // 1. CONTINUOUS PHYSICS ANIMATION LOOP (SPRING LERP AT 120FPS)
  const startPhysicsLoop = useCallback(() => {
    if (animFrameRef.current) return;

    const tick = () => {
      const current = progressRef.current;
      const target = targetProgressRef.current;
      const isDragging = isDraggingRef.current;

      const lerpFactor = isDragging ? 0.45 : 0.15;
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

  // 2. VIDEO PLAYBACK & AUDIO MANAGEMENT (ENSURES NEVER BLACK ON MOBILE)
  useEffect(() => {
    // 1. Configure the active center reel video
    const activeVid = videoRefs.current[activeNormalizedIndex];
    if (activeVid) {
      activeVid.defaultMuted = true;
      activeVid.muted = isMuted;
      activeVid.volume = 1.0;
      activeVid.playsInline = true;
      activeVid.setAttribute("playsinline", "");
      activeVid.setAttribute("webkit-playsinline", "");

      const playPromise = activeVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser audio policy blocked unmuted play, fallback to muted to prevent black screen
          activeVid.muted = true;
          activeVid.play().catch(() => {});
        });
      }
    }

    // 2. Ensure all other non-center videos are muted and playing smoothly
    reels.forEach((_, idx) => {
      if (idx !== activeNormalizedIndex) {
        const otherVid = videoRefs.current[idx];
        if (otherVid) {
          otherVid.muted = true;
          otherVid.playsInline = true;
          otherVid.setAttribute("playsinline", "");
          otherVid.setAttribute("webkit-playsinline", "");
          otherVid.play().catch(() => {});
        }
      }
    });
  }, [activeNormalizedIndex, isMuted, reels]);

  // Initial setup for all video elements on mount
  const setupVideoRef = (el, idx) => {
    if (el) {
      videoRefs.current[idx] = el;
      el.defaultMuted = true;
      el.muted = idx === activeNormalizedIndex ? isMuted : true;
      el.playsInline = true;
      el.setAttribute("playsinline", "");
      el.setAttribute("webkit-playsinline", "");
      el.play().catch(() => {});
    }
  };

  // 3. MOUSE DRAG GESTURES (LEFT TO RIGHT / RIGHT TO LEFT)
  const handleMouseDown = (e) => {
    if (e.target.closest("button") || e.target.closest("a")) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsDraggingState(true);
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = targetProgressRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = moveEvent.clientX - dragStartXRef.current;

      if (Math.abs(deltaX) > 6) {
        hasDraggedRef.current = true;
      }

      const now = performance.now();
      const dt = Math.max(1, now - lastDragTimeRef.current);
      const dx = moveEvent.clientX - lastDragXRef.current;

      velocityRef.current = dx / dt;
      lastDragXRef.current = moveEvent.clientX;
      lastDragTimeRef.current = now;

      targetProgressRef.current = dragStartProgressRef.current - deltaX / dragDistancePerSlide;
      startPhysicsLoop();
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDraggingState(false);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      const flickMomentum = velocityRef.current * 140;
      const projected = targetProgressRef.current - flickMomentum / dragDistancePerSlide;
      targetProgressRef.current = Math.round(projected);
      startPhysicsLoop();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // 4. TOUCH SWIPE GESTURES (MOBILE)
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    if (e.target.closest("button") || e.target.closest("a")) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
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

    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }

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

  // 5. HORIZONTAL TRACKPAD / WHEEL SCROLLING
  const handleWheel = (e) => {
    const delta = Math.abs(e.deltaX) > 4 ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (Math.abs(delta) < 3) return;

    if (e.cancelable) e.preventDefault();

    targetProgressRef.current += delta * 0.0022;
    startPhysicsLoop();

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      targetProgressRef.current = Math.round(targetProgressRef.current);
      startPhysicsLoop();
    }, 150);
  };

  // 6. KEYBOARD ARROWS
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

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  if (!reels || reels.length === 0) return null;

  // Dimensions
  const cardWidth = isMobile ? 220 : 272;
  const cardHeight = isMobile ? 440 : 544;
  const phoneWidth = isMobile ? 230 : 284;
  const phoneHeight = isMobile ? 452 : 558;

  // Helper to get poster fallback
  const getPoster = (reel) => {
    if (reel.poster) return reel.poster;
    if (reel.videoSrc?.includes("cloudinary.com") && reel.videoSrc?.endsWith(".mp4")) {
      return reel.videoSrc.replace(".mp4", ".jpg").replace("/upload/", "/upload/so_0/");
    }
    return undefined;
  };

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
        paddingTop: isMobile ? 6 : 20,
        paddingBottom: isMobile ? 16 : 28,
      }}
    >
      {/* 1. MAIN PHONE STACK STAGE */}
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
          height: isMobile ? 465 : 570,
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
          let offset = index - (renderProgress % n);
          while (offset > n / 2) offset -= n;
          while (offset < -n / 2) offset += n;

          const absOffset = Math.abs(offset);
          const sign = Math.sign(offset);

          let translateX = 0;
          if (isMobile) {
            if (absOffset <= 1) {
              translateX = sign * absOffset * 84;
            } else {
              translateX = sign * (84 + (absOffset - 1) * 72);
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

          const scale = Math.max(0.72, 1 - absOffset * (isMobile ? 0.075 : 0.082));
          const zIndex = Math.max(1, Math.round(50 - absOffset * 10));

          const maxVisible = isMobile ? 2.1 : 3.8;
          let opacity = 1;
          if (absOffset > maxVisible - 1) {
            opacity = Math.max(0, 1 - (absOffset - (maxVisible - 1)));
          }

          if (opacity <= 0.01) return null;

          const isCenter = absOffset < 0.5;

          return (
            <div
              key={reel.id || index}
              onClick={() => {
                if (hasDraggedRef.current) return;

                if (absOffset >= 0.4) {
                  // Glide side card into center
                  targetProgressRef.current = Math.round(renderProgress) + Math.round(offset);
                  startPhysicsLoop();
                } else {
                  // Tap center reel to toggle sound directly inside the iPhone
                  setIsMuted((prev) => !prev);
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
                  ? "0 28px 70px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.08)"
                  : "0 18px 42px -10px rgba(0, 0, 0, 0.25)",
                background: "#0E1013",
                cursor: "pointer",
                willChange: "transform, opacity",
                transition: isDraggingState
                  ? "none"
                  : "box-shadow 0.3s ease, border-radius 0.3s ease",
              }}
            >
              {/* VIDEO ELEMENT — EXPLICIT PLAYBACK INLINE */}
              <video
                ref={(el) => setupVideoRef(el, index)}
                src={reel.videoSrc}
                poster={getPoster(reel)}
                autoPlay
                muted={isCenter ? isMuted : true}
                loop
                playsInline
                preload="auto"
                onCanPlay={(e) => {
                  e.currentTarget.muted = isCenter ? isMuted : true;
                  e.currentTarget.play().catch(() => {});
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: isCenter ? "none" : "brightness(0.88) contrast(1.03)",
                }}
              />
            </div>
          );
        })}

        {/* 2. REALISTIC IPHONE 16 PRO FIXED CENTER FRAME (CLEAN & MINIMALIST) */}
        <div
          onClick={() => {
            if (!hasDraggedRef.current) {
              // Tapping anywhere on the iPhone frame toggles sound!
              setIsMuted((prev) => !prev);
            }
          }}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: phoneWidth,
            height: phoneHeight,
            zIndex: 55,
            cursor: isDraggingState ? "grabbing" : "pointer",
            borderRadius: isMobile ? 36 : 46,
            boxSizing: "border-box",
            border: isMobile ? "5.5px solid #1C1E22" : "7px solid #1B1D21",
            boxShadow:
              "inset 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 0 0 2.5px rgba(0, 0, 0, 0.85), 0 32px 80px -15px rgba(0, 0, 0, 0.45)",
            pointerEvents: "auto",
          }}
        >
          {/* HARDWARE BUTTONS (LEFT SIDE: ACTION + VOLUME BUTTONS) */}
          <div
            style={{
              position: "absolute",
              left: isMobile ? -8 : -10.5,
              top: isMobile ? 65 : 78,
              width: 3,
              height: isMobile ? 20 : 24,
              background: "#2D3035",
              borderRadius: "2px 0 0 2px",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: isMobile ? -8 : -10.5,
              top: isMobile ? 98 : 118,
              width: 3,
              height: isMobile ? 36 : 44,
              background: "#2D3035",
              borderRadius: "2px 0 0 2px",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: isMobile ? -8 : -10.5,
              top: isMobile ? 144 : 172,
              width: 3,
              height: isMobile ? 36 : 44,
              background: "#2D3035",
              borderRadius: "2px 0 0 2px",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
            }}
          />

          {/* HARDWARE BUTTONS (RIGHT SIDE: POWER BUTTON + CAMERA CONTROL) */}
          <div
            style={{
              position: "absolute",
              right: isMobile ? -8 : -10.5,
              top: isMobile ? 95 : 112,
              width: 3,
              height: isMobile ? 52 : 64,
              background: "#2D3035",
              borderRadius: "0 2px 2px 0",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: isMobile ? -7.5 : -10,
              bottom: isMobile ? 95 : 120,
              width: 2.5,
              height: isMobile ? 28 : 34,
              background: "#24262A",
              borderRadius: "0 2px 2px 0",
            }}
          />

          {/* TOP EARPIECE MICRO-SPEAKER SLIT */}
          <div
            style={{
              position: "absolute",
              top: 3,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? 36 : 42,
              height: 2,
              background: "#090A0C",
              borderRadius: 999,
            }}
          />

          {/* DYNAMIC ISLAND PILL */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 7 : 9,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? 68 : 84,
              height: isMobile ? 20 : 24,
              background: "#000000",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.7)",
              pointerEvents: "none",
            }}
          >
            {/* Front Camera Lens with Sapphire Blue Reflection */}
            <span
              style={{
                width: isMobile ? 7 : 8,
                height: isMobile ? 7 : 8,
                borderRadius: 999,
                background: "radial-gradient(circle at 35% 35%, #253347 0%, #07090E 75%)",
                display: "inline-block",
              }}
            />
            {/* Ambient Sensor */}
            <span
              style={{
                width: 4.5,
                height: 4.5,
                borderRadius: 999,
                background: "#0D1117",
                display: "inline-block",
              }}
            />
          </div>

          {/* PROMINENT MUTE / UNMUTE SYMBOL BUTTON (TOP RIGHT) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted((prev) => !prev);
            }}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            style={{
              position: "absolute",
              top: isMobile ? 10 : 14,
              right: isMobile ? 10 : 14,
              zIndex: 70,
              background: isMuted ? "rgba(0, 0, 0, 0.72)" : "#FF4D1A",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: isMuted
                ? "1px solid rgba(255, 255, 255, 0.28)"
                : "1px solid rgba(255, 255, 255, 0.45)",
              color: "#FFFFFF",
              borderRadius: 999,
              padding: isMobile ? "5px 10px" : "6px 12px",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: isMobile ? 11 : 12,
              fontWeight: 800,
              cursor: "pointer",
              pointerEvents: "auto",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.45)",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span style={{ fontSize: isMobile ? 12 : 14 }}>{isMuted ? "🔇" : "🔊"}</span>
            <span>{isMuted ? "Sound Off" : "Sound On"}</span>
          </button>

          {/* BOTTOM IOS HOME INDICATOR BAR */}
          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? 84 : 106,
              height: 3.5,
              background: "rgba(255, 255, 255, 0.75)",
              borderRadius: 999,
              boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* 3. MINIMALIST CONTROLS: SUBTLE HINT & PAGINATION PILLS */}
      <div
        style={{
          marginTop: isMobile ? 10 : 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Clean Interactive Sound Toggle Hint */}
        <div
          onClick={() => setIsMuted((prev) => !prev)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: isMobile ? 11 : 12,
            fontWeight: 700,
            color: isMuted ? "rgba(17, 17, 17, 0.65)" : "#FF4D1A",
            background: isMuted ? "rgba(17, 17, 17, 0.05)" : "rgba(255, 77, 26, 0.1)",
            padding: "5px 14px",
            borderRadius: 999,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <span>{isMuted ? "🔇" : "🔊"}</span>
          <span>{isMuted ? "Tap iPhone or button to unmute sound" : "Sound is playing inside iPhone · Tap to mute"}</span>
        </div>

        {/* 8 INTERACTIVE PAGINATION PILLS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
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
