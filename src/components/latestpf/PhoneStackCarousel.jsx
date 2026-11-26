import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   PHONE STACK CAROUSEL — 120FPS ZERO-RE-RENDER GPU CAROUSEL
   Ultra-realistic iPhone 16 Pro Center Frame + Overlapping Stack
   Direct DOM transform updates in rAF · 1:1 Finger Tracking
   Plays Inside iPhone Only · Prominent Mute/Unmute Toggle
   ============================================================ */

export default function PhoneStackCarousel({
  reels = [],
  isMobile = false,
}) {
  const n = reels.length;

  // Continuous physics state stored in refs for zero-React-overhead 120fps GPU updates
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
  const lastActiveIdxRef = useRef(0);

  // Only re-render React when the center reel index changes or mute/view toggles
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef(null);
  const cardRefs = useRef({});
  const videoRefs = useRef({});

  // Swipe sensitivity (tuned for effortless, fast thumb flicks)
  const dragDistancePerSlide = isMobile ? 145 : 230;

  // Viewport intersection observer to freeze off-screen decoding
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Compute card transform & opacity directly on DOM nodes (zero virtual DOM diffing)
  const applyTransforms = useCallback(
    (progress) => {
      if (!n) return;
      const maxVisible = isMobile ? 2.1 : 3.8;

      for (let index = 0; index < n; index++) {
        const el = cardRefs.current[index];
        if (!el) continue;

        let offset = index - (progress % n);
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

        let opacity = 1;
        if (absOffset > maxVisible - 1) {
          opacity = Math.max(0, 1 - (absOffset - (maxVisible - 1)));
        }

        el.style.transform = `translate3d(calc(-50% + ${translateX.toFixed(2)}px), 0, 0) scale(${scale.toFixed(4)})`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = opacity.toFixed(3);
        el.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
        el.style.pointerEvents = opacity <= 0.01 ? "none" : "auto";
      }

      const norm = ((Math.round(progress) % n) + n) % n;
      if (norm !== lastActiveIdxRef.current) {
        lastActiveIdxRef.current = norm;
        setActiveIndex(norm);
      }
    },
    [n, isMobile]
  );

  // Initial layout pass when n or isMobile changes
  useEffect(() => {
    applyTransforms(progressRef.current);
  }, [applyTransforms]);

  // 1. CONTINUOUS PHYSICS LOOP (1:1 DRAG + BUTTERY 120FPS SPRING SNAP)
  const startPhysicsLoop = useCallback(() => {
    if (animFrameRef.current) return;

    const tick = () => {
      const current = progressRef.current;
      const target = targetProgressRef.current;
      const isDragging = isDraggingRef.current;

      if (isDragging) {
        // 1:1 instant finger/mouse tracking with zero lag
        progressRef.current = target;
        applyTransforms(target);
        animFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      const diff = target - current;
      if (Math.abs(diff) > 0.0005) {
        progressRef.current = current + diff * 0.24;
        applyTransforms(progressRef.current);
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = target;
        applyTransforms(target);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [applyTransforms]);

  // 2. VIDEO PLAYBACK & AUDIO MANAGEMENT (ONLY ACTIVE CENTER VIDEO PLAYS)
  useEffect(() => {
    const activeVid = videoRefs.current[activeIndex];
    if (activeVid) {
      activeVid.defaultMuted = true;
      activeVid.muted = isMuted;
      activeVid.volume = 1.0;
      activeVid.playsInline = true;
      activeVid.setAttribute("playsinline", "");
      activeVid.setAttribute("webkit-playsinline", "");

      if (isInView) {
        const playPromise = activeVid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            activeVid.muted = true;
            activeVid.play().catch(() => {});
          });
        }
      } else {
        activeVid.pause();
      }
    }

    Object.keys(videoRefs.current).forEach((key) => {
      const idx = Number(key);
      if (idx !== activeIndex) {
        const otherVid = videoRefs.current[idx];
        if (otherVid) {
          otherVid.pause();
        }
      }
    });
  }, [activeIndex, isMuted, isInView]);

  const setupVideoRef = (el, idx) => {
    if (el) {
      videoRefs.current[idx] = el;
      el.defaultMuted = true;
      el.muted = idx === activeIndex ? isMuted : true;
      el.playsInline = true;
      el.setAttribute("playsinline", "");
      el.setAttribute("webkit-playsinline", "");
      if (idx === activeIndex && isInView) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    } else {
      delete videoRefs.current[idx];
    }
  };

  // 3. MOUSE DRAG GESTURES (1:1 ZERO-DELAY)
  const handleMouseDown = (e) => {
    if (e.target.closest("button") || e.target.closest("a")) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsDraggingState(true);
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = progressRef.current;
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

      const flickMomentum = velocityRef.current * 185;
      const projected = targetProgressRef.current - flickMomentum / dragDistancePerSlide;
      targetProgressRef.current = Math.round(projected);
      startPhysicsLoop();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // 4. TOUCH SWIPE GESTURES (MOBILE 1:1 INSTANT TRACKING)
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    if (e.target.closest("button") || e.target.closest("a")) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsDraggingState(true);
    dragStartXRef.current = e.touches[0].clientX;
    dragStartYRef.current = e.touches[0].clientY;
    dragStartProgressRef.current = progressRef.current;
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

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 6) {
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

    const flickMomentum = velocityRef.current * 185;
    const projected = targetProgressRef.current - flickMomentum / dragDistancePerSlide;
    targetProgressRef.current = Math.round(projected);
    startPhysicsLoop();
  };

  // 5. HORIZONTAL TRACKPAD / WHEEL SCROLLING
  const handleWheel = (e) => {
    const delta = Math.abs(e.deltaX) > 4 ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (Math.abs(delta) < 3) return;

    if (e.cancelable) e.preventDefault();

    targetProgressRef.current += delta * 0.0028;
    startPhysicsLoop();

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      targetProgressRef.current = Math.round(targetProgressRef.current);
      startPhysicsLoop();
    }, 110);
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

  // Helper to get real video poster (no personal fallback photos)
  const getPoster = (reel) => {
    if (reel.poster) return reel.poster;
    if (reel.videoSrc?.includes("cloudinary.com") && reel.videoSrc?.endsWith(".mp4")) {
      return reel.videoSrc.replace(".mp4", ".jpg").replace("/upload/", "/upload/so_0/");
    }
    return undefined;
  };

  return (
    <div
      ref={containerRef}
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
          const isCenter = index === activeIndex;
          const posterUrl = getPoster(reel);

          return (
            <div
              key={reel.id || index}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
                else delete cardRefs.current[index];
              }}
              onClick={() => {
                if (hasDraggedRef.current) return;

                if (!isCenter) {
                  let diff = index - activeIndex;
                  if (diff > n / 2) diff -= n;
                  if (diff < -n / 2) diff += n;
                  targetProgressRef.current = Math.round(progressRef.current) + diff;
                  startPhysicsLoop();
                } else {
                  setIsMuted((prev) => !prev);
                }
              }}
              style={{
                position: "absolute",
                width: cardWidth,
                height: cardHeight,
                left: "50%",
                transform: "translate3d(-50%, 0, 0)",
                zIndex: 10,
                borderRadius: isMobile ? 24 : 32,
                overflow: "hidden",
                boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.35)",
                background: "#0E1013",
                cursor: "pointer",
                willChange: "transform, opacity",
              }}
            >
              {/* COVER IMAGE (Cloudinary thumbnail) OR FIRST VIDEO FRAME (#t=0.5) FOR LOCAL MP4S */}
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={reel.name}
                  loading={isCenter ? "eager" : "lazy"}
                  draggable={false}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    zIndex: 1,
                  }}
                />
              ) : (
                <video
                  src={`${reel.videoSrc}#t=0.5`}
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* ACTIVE VIDEO ELEMENT — ONLY MOUNTED ON THE CENTER CARD FOR ZERO DECODER LAG */}
              {isCenter && isInView && (
                <video
                  ref={(el) => setupVideoRef(el, index)}
                  src={reel.videoSrc}
                  poster={posterUrl}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  onCanPlay={(e) => {
                    if (isCenter && isInView) {
                      e.currentTarget.muted = isMuted;
                      e.currentTarget.play().catch(() => {});
                    } else {
                      e.currentTarget.pause();
                    }
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    zIndex: 2,
                  }}
                />
              )}

              {/* Subtle dim overlay on side cards (cheaper than CSS filter) */}
              {!isCenter && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.14)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />
              )}

              {/* Subtle Top & Bottom Vignette on Center Card for Mute Icon Visibility */}
              {isCenter && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 22%, transparent 80%, rgba(0,0,0,0.35) 100%)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* 2. STATIONARY ULTRA-REALISTIC IPHONE 16 PRO HARDWARE BEZEL OVERLAY */}
        <div
          style={{
            position: "absolute",
            width: phoneWidth,
            height: phoneHeight,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 80,
            pointerEvents: "none",
            borderRadius: isMobile ? 32 : 40,
            border: `${isMobile ? 6 : 8}px solid #121417`,
            boxShadow:
              "0 0 0 1.5px #2E323B, 0 30px 65px -10px rgba(0, 0, 0, 0.52), inset 0 0 10px rgba(0, 0, 0, 0.65)",
            boxSizing: "border-box",
          }}
        >
          {/* Titanium Side Buttons */}
          <div style={{ position: "absolute", left: -10, top: 84, width: 2.5, height: 22, background: "#2E323B", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: -10, top: 118, width: 2.5, height: 38, background: "#2E323B", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: -10, top: 164, width: 2.5, height: 38, background: "#2E323B", borderRadius: 2 }} />
          <div style={{ position: "absolute", right: -10, top: 132, width: 2.5, height: 56, background: "#2E323B", borderRadius: 2 }} />

          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 10 : 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? 76 : 94,
              height: isMobile ? 21 : 25,
              background: "#000000",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 7,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: 999, background: "#141824", boxShadow: "inset 0 0 2px #2B47FC" }} />
          </div>

          {/* MUTE / UNMUTE SYMBOL BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted((prev) => !prev);
            }}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            title={isMuted ? "Tap to Unmute" : "Tap to Mute"}
            style={{
              position: "absolute",
              top: isMobile ? 10 : 14,
              right: isMobile ? 10 : 14,
              pointerEvents: "auto",
              background: isMuted ? "rgba(0, 0, 0, 0.65)" : "#FF4D1A",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              width: isMobile ? 32 : 36,
              height: isMobile ? 32 : 36,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
              transition: "background 0.2s ease, transform 0.15s ease",
              zIndex: 90,
            }}
          >
            {isMuted ? (
              <svg width={isMobile ? "15" : "17"} height={isMobile ? "15" : "17"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width={isMobile ? "15" : "17"} height={isMobile ? "15" : "17"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          {/* Bottom Home Indicator Bar */}
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? 6 : 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? 86 : 110,
              height: 4,
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.85)",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>
      </div>

      {/* 3. MINIMAL STATUS HINT & DOTS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          marginTop: isMobile ? 8 : 14,
        }}
      >
        <div
          onClick={() => setIsMuted((prev) => !prev)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: isMobile ? 11.5 : 13,
            fontWeight: 700,
            color: "#111111",
            background: "rgba(17, 17, 17, 0.06)",
            padding: "6px 14px",
            borderRadius: 999,
            cursor: "pointer",
          }}
        >
          <span>{isMuted ? "🔇 Tap video or icon for sound" : "🔊 Sound On · Swipe left or right"}</span>
        </div>

        {/* Dot Indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {reels.map((_, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                aria-label={`View reel ${i + 1}`}
                onClick={() => {
                  let diff = i - activeIndex;
                  if (diff > n / 2) diff -= n;
                  if (diff < -n / 2) diff += n;
                  targetProgressRef.current = Math.round(progressRef.current) + diff;
                  startPhysicsLoop();
                }}
                style={{
                  width: active ? 22 : 7,
                  height: 7,
                  borderRadius: 999,
                  background: active ? "#FF4D1A" : "rgba(17, 17, 17, 0.2)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
