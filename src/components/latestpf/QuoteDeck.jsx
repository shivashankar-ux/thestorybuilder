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
    quote: "They turned our personal brand into cinematic reels that stop people mid-scroll. Our engagement and inbound coaching inquiries tripled before the month even ended.",
    name: "Jaya Daga",
    role: "Founder & Author, Authority Coaching",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    color: "#FFE27A",
    ink: "#111111",
  },
  {
    quote: "Pretzel doesn’t do safe. The gym walkthrough and dynamic member workout reels they produced drove insane traction on Instagram. Filled our membership quota in two weeks flat.",
    name: "Icons Gym",
    role: "Management Team, Hyderabad",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
    color: "#2D46F0",
    ink: "#FFFFFF",
  },
  {
    quote: "Four weeks, one campaign, three times the engagement. Their ad creatives outperformed every other video format we ran on Meta. The retention hooks and sound design made all the difference.",
    name: "Digital Medha",
    role: "Growth Head, Performance Agency",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    color: "#CFF26A",
    ink: "#111111",
  },
  {
    quote: "They captured the true soul and warmth of our learning environment with sensitivity and cinematic grace. They think like strategists and play like artists.",
    name: "Vision Rainbow",
    role: "Creative Director, School & Hub",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
    color: "#FF4D1A",
    ink: "#FFFFFF",
  },
];

export default function QuoteDeck({
  items = DEFAULT_ITEMS,
  autoplay = 6,
  quoteFont = "Bricolage Grotesque, sans-serif",
  bodyFont = "Plus Jakarta Sans, sans-serif",
  quoteSize = 26,
  buttonColor = "#FF4D1A",
  buttonInk = "#FFFFFF",
  lineColor = "rgba(17,17,17,0.18)",
  counterColor = "#111111",
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
  const cardW = compact ? Math.min(width - 20, 390) : Math.min(680, width - 28);
  const cardH = compact ? 260 : 310;
  const deckH = cardH + 54;
  const qFont = {
    fontFamily: quoteFont,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  };
  const bFont = {
    fontFamily: bodyFont,
    fontWeight: 500,
  };
  const qSize = compact ? 14 : quoteSize;

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
      borderRadius: compact ? 20 : 22,
      background: list[idx].color,
      color: list[idx].ink,
      boxShadow: depth === 0 ? "0 20px 45px -12px rgba(17,17,17,0.35)" : "0 10px 22px -10px rgba(17,17,17,0.2)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: compact ? "20px 18px" : "26px 30px",
      gap: compact ? 12 : 16,
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

  const renderClientIcon = (iconType, inkColor) => {
    const stroke = inkColor || "#111111";
    switch (iconType) {
      case "fitness":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 6.5L17.5 17.5M3.5 9.5L9.5 3.5M14.5 20.5L20.5 14.5M2 12l2-2m16 4l2-2" />
          </svg>
        );
      case "growth":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l6-6 4 4 8-8M17 7h4v4" />
          </svg>
        );
      case "education":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10L12 5 2 10l10 5 10-5z" />
            <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 10l4.55-2.27A1 1 0 0 1 21 8.62v6.76a1 1 0 0 1-1.45.89L15 14v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2z" />
          </svg>
        );
    }
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", ...style }}
    >
      <div style={{ position: "relative", width: "100%", height: deckH, flexShrink: 0 }} aria-live="polite">
        {list.map((it, idx) => {
          const depth = order.indexOf(idx);
          const textLen = (it.quote || "").length;
          const adaptiveFontSize = textLen > 165 ? Math.max(15, qSize - 3.5) : Math.max(16, qSize - 1.5);
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
              {/* Top Bar: Suitable Category Icon + 5-Star Rating */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: it.ink === "#FFFFFF" ? "rgba(255,255,255,0.14)" : "rgba(17,17,17,0.08)",
                      border: it.ink === "#FFFFFF" ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(17,17,17,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {renderClientIcon(it.icon, it.ink)}
                  </div>
                  <span style={{ fontSize: 13, letterSpacing: "0.08em", opacity: 0.9 }} aria-label="5 out of 5 stars">
                    ★★★★★
                  </span>
                </div>
                <span style={{ ...qFont, fontSize: 38, lineHeight: 0.7, opacity: 0.35, userSelect: "none" }}>
                  “
                </span>
              </div>

              {/* Clean Full-Width Client Feedback Quote */}
              <blockquote
                style={{
                  margin: 0,
                  ...qFont,
                  fontSize: compact ? Math.min(18, adaptiveFontSize) : adaptiveFontSize,
                  lineHeight: 1.32,
                  fontWeight: 600,
                }}
              >
                {it.quote}
              </blockquote>

              {/* Author Footer */}
              <figcaption style={{ ...bFont, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, paddingTop: 10, borderTop: it.ink === "#FFFFFF" ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(17,17,17,0.1)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 16, fontWeight: 800 }}>{it.name}</span>
                  <span style={{ fontSize: 13, opacity: 0.78, fontWeight: 500 }}>{it.role}</span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: it.ink === "#FFFFFF" ? "rgba(255,255,255,0.14)" : "rgba(17,17,17,0.08)",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✓ Verified Client
                </span>
              </figcaption>
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
