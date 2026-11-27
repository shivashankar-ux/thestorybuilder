import React, { useEffect, useRef, useState, useCallback } from "react";

/* ============================================================
   INFINITY GALLERY — SEAMLESS INFINITE MASONRY CANVAS
   Inspired by Framer InfinityGallery (InfinityGallery-hryzWj)
   2D Seamless Tiling · Cursor Drift + Touch Drag Inertia + Auto-Scroll
   Zero React Re-renders in rAF · IntersectionObserver Gated
   Click Any Cover Card to Play Full Video with Sound in Lightbox
   ============================================================ */

export default function InfinityGallery({
  items = [],
  isMobile = false,
  autoSpeedX = -0.35,
  autoSpeedY = -0.18,
  tiltDeg = -4,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const inViewRef = useRef(false);

  // Physics state in refs for 120fps butter-smooth GPU updates
  const offsetRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: autoSpeedX, y: autoSpeedY });
  const cursorVelRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const lastDragRef = useRef({ x: 0, y: 0, t: 0 });

  const [activeLightboxIdx, setActiveLightboxIdx] = useState(null);

  const cols = isMobile ? 3 : 5;
  const cardW = isMobile ? 148 : 220;
  const gap = isMobile ? 12 : 18;
  const colStep = cardW + gap;
  const tileW = cols * colStep;

  // Build balanced masonry columns from items
  const columns = React.useMemo(() => {
    if (!items.length) return [];
    const arr = Array.from({ length: cols }, () => []);
    const heights = [220, 275, 245, 290, 230];
    // Repeat items enough times per column for rich vertical height
    const minPerCol = isMobile ? 3 : 3;
    const totalNeeded = cols * minPerCol;
    for (let i = 0; i < totalNeeded; i++) {
      const item = items[i % items.length];
      const colIdx = i % cols;
      const h = isMobile
        ? Math.round(heights[(i + colIdx) % heights.length] * 0.72)
        : heights[(i + colIdx) % heights.length];
      arr[colIdx].push({
        ...item,
        origIndex: i % items.length,
        cardH: h,
      });
    }
    return arr;
  }, [items, cols, isMobile]);

  // Compute tileH from tallest column
  const tileH = React.useMemo(() => {
    if (!columns.length) return 600;
    let maxH = 0;
    for (const col of columns) {
      let h = 0;
      for (const c of col) h += c.cardH + gap;
      if (h > maxH) maxH = h;
    }
    return maxH || 600;
  }, [columns, gap]);

  // Normalize modulo cleanly for seamless wrapping
  const wrapMod = (val, mod) => ((val % mod) + mod) % mod;

  // IntersectionObserver + 120fps rAF physics loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let alive = true;
    let lastT = 0;

    const tick = (now) => {
      rafRef.current = null;
      if (!alive || !inViewRef.current || prefersReducedMotion) return;

      const dt = lastT ? Math.min((now - lastT) / 16.6667, 2.5) : 1;
      lastT = now;

      if (!isDraggingRef.current) {
        const targetVx = isHoveringRef.current ? cursorVelRef.current.x : autoSpeedX;
        const targetVy = isHoveringRef.current ? cursorVelRef.current.y : autoSpeedY;

        velRef.current.x += (targetVx - velRef.current.x) * 0.08 * dt;
        velRef.current.y += (targetVy - velRef.current.y) * 0.08 * dt;

        offsetRef.current.x += velRef.current.x * dt;
        offsetRef.current.y += velRef.current.y * dt;
      }

      const wx = -wrapMod(-offsetRef.current.x, tileW);
      const wy = -wrapMod(-offsetRef.current.y, tileH);

      if (canvasRef.current) {
        canvasRef.current.style.transform = `translate3d(${wx.toFixed(2)}px, ${wy.toFixed(2)}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!rafRef.current && alive && inViewRef.current && !prefersReducedMotion) {
        lastT = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (inViewRef.current) {
          startLoop();
        } else if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { rootMargin: "150px" }
    );
    io.observe(el);

    return () => {
      alive = false;
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tileW, tileH, autoSpeedX, autoSpeedY]);

  // Cursor-based drift on desktop (deadzone near center, smooth speed toward edges)
  const handleMouseMove = (e) => {
    if (isMobile || isDraggingRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    const dead = 0.14;
    const dx = Math.abs(nx) < dead ? 0 : (nx - Math.sign(nx) * dead) / (1 - dead);
    const dy = Math.abs(ny) < dead ? 0 : (ny - Math.sign(ny) * dead) / (1 - dead);
    cursorVelRef.current = { x: -dx * 2.4, y: -dy * 1.8 };
  };

  // Pointer drag + inertia
  const handlePointerDown = (e) => {
    if (e.target.closest("button[data-lightbox-btn]")) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offsetRef.current.x,
      oy: offsetRef.current.y,
    };
    lastDragRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.hypot(dx, dy) > 6) {
      hasDraggedRef.current = true;
    }

    offsetRef.current.x = dragStartRef.current.ox + dx;
    offsetRef.current.y = dragStartRef.current.oy + dy;

    const now = performance.now();
    const dt = Math.max(1, now - lastDragRef.current.t);
    velRef.current.x = ((e.clientX - lastDragRef.current.x) / dt) * 16;
    velRef.current.y = ((e.clientY - lastDragRef.current.y) / dt) * 16;
    lastDragRef.current = { x: e.clientX, y: e.clientY, t: now };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (activeLightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActiveLightboxIdx(null);
      else if (e.key === "ArrowRight") setActiveLightboxIdx((i) => (i + 1) % items.length);
      else if (e.key === "ArrowLeft") setActiveLightboxIdx((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeLightboxIdx, items.length]);

  const openLightbox = useCallback((idx) => {
    if (hasDraggedRef.current) return;
    setActiveLightboxIdx(idx);
  }, []);

  if (!items.length) return null;

  const activeItem = activeLightboxIdx !== null ? items[activeLightboxIdx] : null;

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          isDraggingRef.current = false;
        }}
        onMouseMove={handleMouseMove}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? 390 : 540,
          borderRadius: isMobile ? 22 : 36,
          overflow: "hidden",
          background: "#0B0C10",
          border: "2px solid rgba(17, 17, 17, 0.14)",
          boxShadow: "0 28px 65px -15px rgba(0, 0, 0, 0.42)",
          cursor: "grab",
          userSelect: "none",
          touchAction: "pan-y",
        }}
      >
        {/* Tilted Seamless 2x2 Tiled Infinite Masonry Grid */}
        <div
          style={{
            position: "absolute",
            inset: isMobile ? "-15%" : "-22%",
            transform: `rotate(${tiltDeg}deg)`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <div
            ref={canvasRef}
            style={{
              position: "relative",
              width: tileW * 2,
              height: tileH * 2,
              willChange: "transform",
            }}
          >
            {/* 2x2 Seamless Tile Matrix (Covers infinite wrap cleanly) */}
            {[0, 1].map((ty) =>
              [0, 1].map((tx) => (
                <div
                  key={`${tx}-${ty}`}
                  style={{
                    position: "absolute",
                    left: tx * tileW,
                    top: ty * tileH,
                    width: tileW,
                    height: tileH,
                    display: "flex",
                    gap,
                  }}
                >
                  {columns.map((col, colIdx) => (
                    <div
                      key={colIdx}
                      style={{
                        width: cardW,
                        display: "flex",
                        flexDirection: "column",
                        gap,
                        paddingTop: colIdx % 2 === 1 ? (isMobile ? 28 : 48) : 0,
                      }}
                    >
                      {col.map((card, rowIdx) => (
                        <div
                          key={`${colIdx}-${rowIdx}`}
                          onClick={() => openLightbox(card.origIndex)}
                          style={{
                            position: "relative",
                            width: cardW,
                            height: card.cardH,
                            borderRadius: isMobile ? 14 : 18,
                            overflow: "hidden",
                            background: "#16181E",
                            flexShrink: 0,
                            cursor: "pointer",
                            boxShadow: "0 12px 26px rgba(0, 0, 0, 0.35)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          {card.poster ? (
                            <img
                              src={card.poster}
                              alt={card.name}
                              loading="lazy"
                              decoding="async"
                              draggable={false}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          ) : (
                            <video
                              src={`${card.videoSrc}#t=0.5`}
                              muted
                              playsInline
                              preload="metadata"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                pointerEvents: "none",
                              }}
                            />
                          )}

                          {/* Bottom Gradient + Title + Play Icon */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(to bottom, transparent 48%, rgba(0, 0, 0, 0.82) 100%)",
                              pointerEvents: "none",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: 10,
                              left: 10,
                              right: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 6,
                              pointerEvents: "none",
                            }}
                          >
                            <div style={{ minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: isMobile ? 9 : 10,
                                  fontWeight: 800,
                                  color: "#CEF237",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {card.tag}
                              </div>
                              <div
                                style={{
                                  fontSize: isMobile ? 11 : 12.5,
                                  fontWeight: 700,
                                  color: "#FFFFFF",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {card.name}
                              </div>
                            </div>
                            <div
                              style={{
                                width: isMobile ? 24 : 28,
                                height: isMobile ? 24 : 28,
                                borderRadius: 999,
                                background: "#FF4D1A",
                                color: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: isMobile ? 9 : 10,
                                paddingLeft: 2,
                                flexShrink: 0,
                              }}
                            >
                              ▶
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Soft Edge Vignettes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 45%, rgba(8, 9, 12, 0.65) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Floating Top Pill */}
        <div
          style={{
            position: "absolute",
            top: isMobile ? 12 : 18,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            pointerEvents: "none",
            background: "rgba(11, 12, 16, 0.78)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: 999,
            padding: isMobile ? "6px 14px" : "7px 18px",
            color: "#FFFFFF",
            fontSize: isMobile ? 10.5 : 12,
            fontWeight: 700,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          {isMobile
            ? "✦ Drag to explore · Tap any reel to play"
            : "✦ Move cursor or drag to explore · Click any cover to watch"}
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX VIDEO PLAYER (PLAYS FULL CUT WITH SOUND) */}
      {activeItem && (
        <div
          onClick={() => setActiveLightboxIdx(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(5, 6, 8, 0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(380px, 92vw)",
              background: "#111216",
              borderRadius: 24,
              border: "1px solid rgba(255, 255, 255, 0.16)",
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(0, 0, 0, 0.65)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: "#FF4D1A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {activeItem.tag}
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF" }}>
                  {activeItem.name}
                </div>
              </div>
              <button
                type="button"
                data-lightbox-btn="true"
                onClick={() => setActiveLightboxIdx(null)}
                aria-label="Close video player"
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "none",
                  color: "#FFFFFF",
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                ✕
              </button>
            </div>

            {/* 9:16 Video Player */}
            <div style={{ position: "relative", aspectRatio: "9 / 16", background: "#000000" }}>
              <video
                key={activeItem.videoSrc}
                src={activeItem.videoSrc}
                poster={activeItem.poster}
                controls
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Prev / Next Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <button
                type="button"
                data-lightbox-btn="true"
                onClick={() => setActiveLightboxIdx((i) => (i - 1 + items.length) % items.length)}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  color: "#FFFFFF",
                  padding: "7px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                ← Prev
              </button>
              <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.6)", fontWeight: 600 }}>
                {activeLightboxIdx + 1} / {items.length}
              </span>
              <button
                type="button"
                data-lightbox-btn="true"
                onClick={() => setActiveLightboxIdx((i) => (i + 1) % items.length)}
                style={{
                  background: "#FF4D1A",
                  border: "none",
                  color: "#FFFFFF",
                  padding: "7px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
