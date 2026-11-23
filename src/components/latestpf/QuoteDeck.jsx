import React, { useEffect, useRef, useState } from "react";

const srcOf = (v) => (typeof v === "string" ? v : v && typeof v === "object" ? v.src || "" : "");

const FAN = [
  { x: 0, y: 0, r: 0 },
  { x: 26, y: 14, r: 4.5 },
  { x: -24, y: 26, r: -5.5 },
  { x: 40, y: 36, r: 8 },
  { x: -36, y: 44, r: -9 },
];
const TILT = [-1.6, 1.4, -1.0, 1.8, -1.2, 1.1];

const DEFAULT_ITEMS = [
  {
    quote: "Working with The Story Builder on our personal brand series was transformative. They directed the shoot, kept pacing razor-sharp, and the video quality was indistinguishable from an international film.",
    name: "Jaya Daga",
    role: "Founder & Coach",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    color: "#F59E0B",
    ink: "#0F172A",
  },
  {
    quote: "The gym walkthrough and dynamic member workout reels they produced drove insane traction on Instagram. Filled our membership quota in two weeks flat.",
    name: "Icons Gym",
    role: "Management Team",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    color: "#1E293B",
    ink: "#F8FAFC",
  },
  {
    quote: "They captured the true soul and warmth of our learning environment with sensitivity and cinematic grace. The feedback from parents has been phenomenal.",
    name: "Vision Rainbow",
    role: "Learning Center & School",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
    color: "#059669",
    ink: "#FFFFFF",
  },
  {
    quote: "The ad creatives and short hooks they cut for our performance campaigns doubled our click-through rate and slashed customer acquisition cost.",
    name: "Digital Medha Advertising",
    role: "Agency Partner",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80",
    color: "#D97706",
    ink: "#0F172A",
  },
  {
    quote: "From lighting on shoot day to the final sound design and color grading, everything was top-tier. Pacing was snappy and retention was through the roof.",
    name: "Veto Gym Showcase",
    role: "Commercial Client",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80",
    color: "#0F172A",
    ink: "#F3F4F6",
  },
];

export default function QuoteDeck({
  items = DEFAULT_ITEMS,
  autoplay = 6,
  quoteFont = "Space Grotesk, sans-serif",
  bodyFont = "Plus Jakarta Sans, sans-serif",
  quoteSize = 24,
  buttonColor = "#F59E0B",
  buttonInk = "#0B0D12",
  lineColor = "rgba(255,255,255,0.2)",
  counterColor = "#F3F4F6",
  style = {},
}) {
  const list = items && items.length ? items : DEFAULT_ITEMS;
  const n = list.length;
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(720);
  const [order, setOrder] = useState(() => list.map((_, i) => i));
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [flying, setFlying] = useState(null);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const drag = useRef({ startX: 0, lastX: 0, lastT: 0, vel: 0, moved: false });
  const busy = useRef(false);

  useEffect(() => {
    if (order.length !== n) setOrder(list.map((_, i) => i));
  }, [n]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((ents) => {
      const w = ents[0] ? ents[0].contentRect.width : 0;
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    const io = new IntersectionObserver((ents) => setInView(!!(ents[0] && ents[0].isIntersecting)), { threshold: 0.25 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const flyOff = (dir) => {
    if (busy.current || n < 2) return;
    busy.current = true;
    const top = order[0];
    setFlying({ idx: top, dir });
    setDragX(0);
    window.setTimeout(() => {
      setOrder((o) => o.slice(1).concat(o[0]));
      setFlying(null);
      window.setTimeout(() => (busy.current = false), 120);
    }, 420);
  };

  const prev = () => {
    if (busy.current || n < 2) return;
    busy.current = true;
    setOrder((o) => [o[o.length - 1]].concat(o.slice(0, -1)));
    window.setTimeout(() => (busy.current = false), 450);
  };

  useEffect(() => {
    if (!autoplay || autoplay <= 0 || !inView || hover || dragging) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setTimeout(() => flyOff(1), autoplay * 1000);
    return () => window.clearTimeout(t);
  }, [order, autoplay, inView, hover, dragging]);

  const onDown = (e) => {
    if (busy.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, lastX: e.clientX, lastT: performance.now(), vel: 0, moved: false };
    setDragging(true);
  };

  const onMove = (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - drag.current.startX;
    const dt = Math.max(1, now - drag.current.lastT);
    drag.current.vel = (e.clientX - drag.current.lastX) / dt;
    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    setDragX(dx);
  };

  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    const v = drag.current.vel;
    if (Math.abs(dragX) > 110 || Math.abs(v) > 0.7) flyOff(dragX + v * 100 >= 0 ? 1 : -1);
    else setDragX(0);
  };

  const compact = width < 560;
  const cardW = compact ? Math.min(width - 24, 420) : Math.min(680, width - 28);
  const cardH = compact ? 380 : 320;
  const deckH = cardH + 70;
  const qFont = {
    fontFamily: quoteFont,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  };
  const bFont = {
    fontFamily: bodyFont,
    fontWeight: 500,
  };
  const qSize = compact ? Math.max(16, Math.round(quoteSize * 0.78)) : quoteSize;

  const cardStyle = (idx) => {
    const depth = order.indexOf(idx);
    const f = FAN[Math.min(depth, FAN.length - 1)];
    const tilt = TILT[idx % TILT.length];
    let tf = "";
    let transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease";
    let opacity = depth > 4 ? 0 : 1;
    if (flying && flying.idx === idx) {
      tf = "translate(" + flying.dir * (width * 0.9 + 200) + "px, -60px) rotate(" + flying.dir * 26 + "deg)";
      transition = "transform 0.45s cubic-bezier(0.55, 0, 0.75, 0.3), opacity 0.45s ease";
      opacity = 0;
    } else if (depth === 0) {
      tf = "translate(" + dragX + "px, " + Math.abs(dragX) * -0.06 + "px) rotate(" + (tilt + dragX * 0.045) + "deg)";
      if (dragging) transition = "none";
    } else {
      tf = "translate(" + f.x + "px, " + f.y + "px) rotate(" + (f.r + tilt) + "deg) scale(" + (1 - depth * 0.035) + ")";
    }
    return {
      position: "absolute",
      left: "50%",
      top: 0,
      width: cardW,
      height: cardH,
      marginLeft: -cardW / 2,
      transform: tf,
      transformOrigin: "50% 80%",
      transition,
      opacity,
      zIndex: flying && flying.idx === idx ? 50 : n - depth,
      borderRadius: 22,
      background: list[idx].color,
      color: list[idx].ink,
      boxShadow: depth === 0 ? "0 30px 60px -20px rgba(0,0,0,0.6), 0 8px 18px -6px rgba(0,0,0,0.3)" : "0 14px 30px -14px rgba(0,0,0,0.4)",
      overflow: "hidden",
      display: "flex",
      flexDirection: compact ? "column" : "row",
      padding: 18,
      gap: compact ? 14 : 24,
      boxSizing: "border-box",
      cursor: depth === 0 ? (dragging ? "grabbing" : "grab") : "default",
      touchAction: depth === 0 ? "pan-y" : "auto",
      userSelect: "none",
      pointerEvents: depth === 0 ? "auto" : "none",
      border: "1px solid rgba(255,255,255,0.12)",
    };
  };

  const top = order[0] ?? 0;
  const pad = (k) => (k < 10 ? "0" + k : String(k));
  const roundBtn = (filled) => ({
    width: 52,
    height: 52,
    borderRadius: 999,
    border: filled ? "none" : "1.5px solid " + lineColor,
    background: filled ? buttonColor : "transparent",
    color: filled ? buttonInk : counterColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.2s",
  });

  const arrow = (dir) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ transform: dir < 0 ? "scaleX(-1)" : undefined }}>
      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", ...style }}
    >
      <div style={{ position: "relative", width: "100%", height: deckH, flexShrink: 0 }} aria-live="polite">
        {list.map((it, idx) => {
          const src = srcOf(it.image);
          const depth = order.indexOf(idx);
          return (
            <figure
              key={idx}
              style={cardStyle(idx)}
              aria-hidden={depth !== 0}
              onPointerDown={depth === 0 ? onDown : undefined}
              onPointerMove={depth === 0 ? onMove : undefined}
              onPointerUp={depth === 0 ? onUp : undefined}
              onPointerCancel={depth === 0 ? onUp : undefined}
            >
              <div
                style={{
                  flex: compact ? "0 0 auto" : "0 0 34%",
                  height: compact ? 120 : "100%",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "rgba(0,0,0,0.15)",
                }}
              >
                {src ? (
                  <img
                    src={src}
                    alt={it.name}
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 25%", display: "block" }}
                  />
                ) : null}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: compact ? "0 4px" : "12px 14px 10px 0", minWidth: 0 }}>
                <blockquote style={{ margin: 0, ...qFont, fontSize: qSize, lineHeight: 1.25 }}>
                  <span style={{ display: "block", fontSize: qSize * 2, lineHeight: 0.6, height: qSize * 0.9, opacity: 0.85 }}>“</span>
                  {it.quote}
                </blockquote>
                <figcaption style={{ ...bFont, display: "flex", flexDirection: "column", gap: 2, marginTop: 14 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{it.name}</span>
                  <span style={{ fontSize: 14, opacity: 0.75 }}>{it.role}</span>
                </figcaption>
              </div>
            </figure>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20, ...bFont, color: counterColor }}>
        <button type="button" aria-label="Previous testimonial" onClick={prev} style={roundBtn(false)}>
          {arrow(-1)}
        </button>
        <span style={{ fontSize: 15, fontVariantNumeric: "tabular-nums", minWidth: 64, textAlign: "center", fontFamily: "var(--font-mono, monospace)" }}>
          {pad(top + 1)} / {pad(n)}
        </span>
        <button type="button" aria-label="Next testimonial" onClick={() => flyOff(1)} style={roundBtn(true)}>
          {arrow(1)}
        </button>
      </div>
    </div>
  );
}
