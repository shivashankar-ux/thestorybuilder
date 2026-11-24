import React, { useEffect, useRef } from "react";

const srcOf = (v) => (typeof v === "string" ? v : v && typeof v === "object" ? v.src || "" : "");

/**
 * ImageTrail
 * Photos pop out of the cursor as it moves across the area, then drift and fade.
 * Place it behind your content; pointer-events are set to none.
 */
export default function ImageTrail({
  images = [],
  size = 200,
  spacing = 80,
  lifetime = 1.1,
  rotation = 12,
  radius = 14,
  style = {},
}) {
  const ref = useRef(null);
  const propsRef = useRef({ images, size, spacing, lifetime, rotation, radius });
  propsRef.current = { images, size, spacing, lifetime, rotation, radius };
  const list = (images || []).map(srcOf).filter(Boolean);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Mobile / touch optimization: do not attach pointer listeners or spawn DOM nodes on touch screens
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window);
    if (isTouch) return;

    // Preload images
    list.forEach((src) => {
      const i = new Image();
      i.src = src;
    });

    let lastX = -9999;
    let lastY = -9999;
    let idx = 0;
    let z = 1;

    const onMove = (e) => {
      const p = propsRef.current;
      const imgs = (p.images || []).map(srcOf).filter(Boolean);
      if (!imgs.length) return;
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        lastX = -9999;
        return;
      }
      const d = Math.hypot(x - lastX, y - lastY);
      if (d < (p.spacing ?? 80)) return;
      const dx = lastX < -999 ? 0 : x - lastX;
      const dy = lastY < -999 ? 0 : y - lastY;
      lastX = x;
      lastY = y;
      const s = p.size ?? 200;
      const el = document.createElement("div");
      const src = imgs[idx++ % imgs.length];
      const rot = (Math.random() * 2 - 1) * (p.rotation ?? 12);

      el.style.cssText = `position:absolute;left:${x - s * 0.5}px;top:${y - s * 0.65}px;width:${s}px;height:${s * 1.3}px;border-radius:${p.radius ?? 14}px;background:url("${src}") center/cover no-repeat;pointer-events:none;z-index:${z++};will-change:transform,opacity;box-shadow:0 24px 48px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.18)`;
      host.appendChild(el);
      const life = (p.lifetime ?? 1.1) * 1000;
      const anim = el.animate(
        [
          { transform: `translate(0px,0px) scale(0.35) rotate(${rot * 0.3}deg)`, opacity: 0 },
          { transform: `translate(${dx * 0.15}px,${dy * 0.15}px) scale(1) rotate(${rot}deg)`, opacity: 0.95, offset: 0.22 },
          { transform: `translate(${dx * 0.5}px,${dy * 0.5 + 40}px) scale(0.9) rotate(${rot * 1.3}deg)`, opacity: 0.9, offset: 0.7 },
          { transform: `translate(${dx * 0.6}px,${dy * 0.6 + 80}px) scale(0.6) rotate(${rot * 1.5}deg)`, opacity: 0 },
        ],
        { duration: life, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
      );
      anim.onfinish = () => el.remove();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      while (host && host.firstChild) host.removeChild(host.firstChild);
    };
  }, [list.join("|")]);

  const base = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    isolation: "isolate",
    ...style,
  };

  return <div ref={ref} style={base} />;
}
