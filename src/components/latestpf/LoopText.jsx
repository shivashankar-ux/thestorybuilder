import React, { useEffect, useMemo, useRef, useState } from "react";

const VB_W = 1000;
const VB_H = 520;

function buildPath(vertical) {
  // lemniscate of Bernoulli, closed, drawn as a smooth polyline
  const a = 430;
  const cx = VB_W / 2;
  const cy = VB_H / 2;
  const steps = 360;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 + Math.PI / 2;
    const s = Math.sin(t);
    const c = Math.cos(t);
    const den = 1 + s * s;
    const u = (a * c) / den;
    const w = (a * s * c * 1.18) / den;
    const x = vertical ? VB_H / 2 + w : cx + u;
    const y = vertical ? VB_W / 2 + u : cy + w;
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d + "Z";
}

export default function LoopText({
  text = "Let’s twist something new ✦ hello@thestorybuilder.in ✦ One Crew One Brief ✦ ",
  href = "",
  bandColor = "#FF4D1A",
  textColor = "#111111",
  fontFamily = '"Bricolage Grotesque", sans-serif',
  fontWeight = 700,
  fontSize = 34,
  bandWidth = 66,
  speed = 60,
  hoverBoost = 3,
  scrollBoost = 1,
  direction = "forward",
  orientation = "auto",
  style = {},
}) {
  const rootRef = useRef(null);
  const Tag = href ? "a" : "div";
  const [tall, setTall] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((ents) => {
      const r = ents[0] && ents[0].contentRect;
      if (r && r.width > 0) setTall(r.height > r.width * 1.15);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const vertical = orientation === "vertical" || (orientation === "auto" && tall);
  const d = useMemo(() => buildPath(vertical), [vertical]);
  const pathRef = useRef(null);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const [pid] = useState(() => "loop_" + Math.random().toString(36).substring(2, 9));
  const unit = text && text.trim().length ? text : "Shot by One Crew ✦ Cut by the Same Team ✦ ";
  const [layout, setLayout] = useState({ count: 12, spacing: 0, unitLen: 0, total: 0 });
  const hoverRef = useRef(false);
  const propsRef = useRef({});
  propsRef.current = { hoverBoost, speed, direction, scrollBoost };

  const fontStyle = {
    fontFamily,
    fontWeight,
    fontStyle: "normal",
  };

  useEffect(() => {
    const path = pathRef.current;
    const m = measureRef.current;
    if (!path || !m) return;
    const fit = () => {
      const total = path.getTotalLength();
      const natural = m.getComputedTextLength();
      if (!natural || !total) return;
      const count = Math.max(1, Math.round(total / natural));
      const unitLen = total / count;
      const chars = Math.max(1, Array.from(unit).length);
      const spacing = (unitLen - natural) / chars;
      setLayout({ count, spacing, unitLen, total });
    };
    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit).catch(() => {});
    const t = window.setTimeout(fit, 400);
    return () => window.clearTimeout(t);
  }, [unit, fontSize, fontFamily, fontWeight, vertical]);

  useEffect(() => {
    if (!layout.unitLen) return;
    const tp = textPathRef.current;
    if (!tp) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let offset = 0;
    let boost = 1;
    let scrollVel = 0;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      scrollVel += Math.abs(y - lastY) * 0.02 * (propsRef.current.scrollBoost ?? 1);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = (now) => {
      const p = propsRef.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = hoverRef.current ? Math.max(1, p.hoverBoost ?? 3) : 1;
      boost += (target - boost) * 0.06;
      scrollVel *= 0.92;
      const v = reduce ? 0 : (p.speed ?? 60) * (boost + Math.min(4, scrollVel));
      const dir = p.direction === "reverse" ? 1 : -1;
      offset += dir * v * dt;
      const u = layout.unitLen;
      offset = ((offset % u) + u) % u;
      tp.setAttribute("startOffset", String(offset - u));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [layout.unitLen]);

  const repeated = useMemo(() => {
    let s = "";
    for (let i = 0; i < layout.count + 1; i++) s += unit;
    return s;
  }, [unit, layout.count]);

  return (
    <Tag
      ref={rootRef}
      href={href || undefined}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
        minWidth: 120,
        minHeight: 120,
        textDecoration: "none",
        cursor: href ? "pointer" : "default",
        ...style,
      }}
    >
      <svg
        viewBox={vertical ? "0 0 " + VB_H + " " + VB_W : "0 0 " + VB_W + " " + VB_H}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", overflow: "visible" }}
        aria-label={unit}
        role="img"
      >
        <defs>
          <path id={pid} ref={pathRef} d={d} />
        </defs>
        <path d={d} fill="none" stroke={bandColor} strokeWidth={bandWidth} strokeLinejoin="round" />
        <text ref={measureRef} style={{ ...fontStyle, fontSize, visibility: "hidden" }} x={-9999} y={-9999}>
          {unit}
        </text>
        <text
          fill={textColor}
          dominantBaseline="central"
          style={{ ...fontStyle, fontSize, letterSpacing: layout.spacing + "px", whiteSpace: "pre" }}
        >
          <textPath ref={textPathRef} href={"#" + pid} startOffset={-layout.unitLen}>
            {repeated}
          </textPath>
        </text>
      </svg>
    </Tag>
  );
}
