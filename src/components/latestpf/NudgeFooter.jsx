import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useId,
  startTransition,
} from "react";

/* ============================================================
   NUDGE FOOTER — FRAMER MARKETPLACE INSPIRATION
   Original Framer module: https://framer.com/m/NudgeFooter-Y0uGHD.js@76mGJqpDgCzgbOFqtUEb
   Interactive wordmark with independently cursor-repelled decorations
   and spring physics simulation at 120fps
   ============================================================ */

const FRUIT = {
  lime: "https://framerusercontent.com/images/zf3p2YtdYvNjgQVP9QsSY26bTTs.png",
  blackberry:
    "https://framerusercontent.com/images/soDF4CgD8xr1iJWfCqsEhZqpUQ.png",
  cherries:
    "https://framerusercontent.com/images/vn7N5s6lo4EyCkWPvJbLd5lpRk.png",
  blueberry:
    "https://framerusercontent.com/images/9rw5N16JmhnigyccaacBNchr2A4.png",
  strawberry:
    "https://framerusercontent.com/images/XL9Cvv9IQHEhP0ytOYu6bwfynEg.png",
};

export const DEFAULT_NUDGE_ITEMS = [
  {
    name: "Lime",
    kind: "image",
    image: { src: FRUIT.lime },
    x: 9,
    y: 66,
    size: 21,
    rotation: -8,
    layer: "back",
    mobileX: 6,
    mobileY: 64,
    mobileSize: 30,
    response: 0.85,
  },
  {
    name: "Blackberry",
    kind: "image",
    image: { src: FRUIT.blackberry },
    x: 21,
    y: 87,
    size: 12,
    rotation: 18,
    layer: "front",
    mobileX: 17,
    mobileY: 84,
    mobileSize: 18,
    response: 1,
  },
  {
    name: "Cherries",
    kind: "image",
    image: { src: FRUIT.cherries },
    x: 47,
    y: 35,
    size: 28,
    rotation: -12,
    layer: "back",
    mobileX: 51,
    mobileY: 31,
    mobileSize: 44,
    response: 1.1,
  },
  {
    name: "Blueberry",
    kind: "image",
    image: { src: FRUIT.blueberry },
    x: 65,
    y: 70,
    size: 10,
    rotation: 10,
    layer: "front",
    mobileX: 65,
    mobileY: 76,
    mobileSize: 16,
    response: 1.25,
  },
  {
    name: "Strawberry",
    kind: "image",
    image: { src: FRUIT.strawberry },
    x: 89,
    y: 76,
    size: 19,
    rotation: 8,
    layer: "back",
    mobileX: 95,
    mobileY: 70,
    mobileSize: 32,
    response: 0.95,
  },
  {
    name: "Story First",
    kind: "badge",
    text: "STORY\nFIRST.",
    color: "#FF4D1A",
    ink: "#FFFFFF",
    x: 9,
    y: 73,
    size: 9,
    rotation: -12,
    layer: "front",
    mobileX: 10,
    mobileY: 66,
    mobileSize: 15,
    response: 1.15,
  },
  {
    name: "Shot in Hyderabad",
    kind: "badge",
    text: "SHOT IN\nHYD",
    color: "#FFE27A",
    ink: "#111111",
    x: 27,
    y: 29,
    size: 9,
    rotation: 11,
    layer: "front",
    mobileX: 21,
    mobileY: 21,
    mobileSize: 14,
    response: 1.2,
  },
  {
    name: "Stop the scroll",
    kind: "badge",
    text: "STOP\nTHE SCROLL",
    color: "#CFF26A",
    ink: "#111111",
    x: 88,
    y: 60,
    size: 8.5,
    rotation: 12,
    layer: "front",
    mobileX: 87,
    mobileY: 50,
    mobileSize: 14,
    response: 1.1,
  },
];

// Flower SVG path geometry with 10 petals
const FLOWER =
  Array.from({ length: 144 }, (_, i) => {
    const a = (i / 144) * Math.PI * 2;
    const r = 44 + 5 * Math.cos(a * 10);
    return `${i ? "L" : "M"}${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ") + " Z";

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const numeric = (n, fallback) => (Number.isFinite(n) ? n : fallback);

export default function NudgeFooter({
  wordmark = "The Story Builder",
  logo,
  useLogo = false,
  font: selectedFont = {},
  color = "#FF4D1A",
  aspectRatio = 2.6,
  mobileRatio = 1.65,
  decorations = DEFAULT_NUDGE_ITEMS,
  enabled = true,
  radius = 190,
  distance = 120,
  stiffness = 115,
  damping = 15,
  twist = 17,
  shadow = true,
  style = {},
}) {
  const font = {
    fontFamily:
      '"Bricolage Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: 800,
    letterSpacing: "-0.05em",
    ...selectedFont,
  };

  const scopeId = useId().replace(/:/g, "_");
  const root = useRef(null);
  const measure = useRef(null);
  const elements = useRef([]);
  const [fontSize, setFontSize] = useState(null);
  const [compact, setCompact] = useState(false);
  const [failedLogo, setFailedLogo] = useState(null);

  const items = useMemo(() => {
    return (decorations ?? []).slice(0, 16).map((item, index) => {
      const demo =
        DEFAULT_NUDGE_ITEMS.find((original) => original.name === item.name) ??
        DEFAULT_NUDGE_ITEMS[index];
      return item.kind !== "badge" && !item.image?.src && demo?.kind === "image" && demo.image
        ? { ...item, image: demo.image }
        : item;
    });
  }, [decorations]);

  const fixedHeight =
    typeof style?.height === "number" ||
    (typeof style?.height === "string" &&
      style.height.trim() !== "" &&
      !["auto", "fit-content", "max-content", "min-content"].includes(
        style.height.trim()
      ));

  // Dynamic font-size auto-fitting based on natural width measurement
  useEffect(() => {
    const host = root.current;
    if (!host || !measure.current) return;
    let disposed = false;

    const resize = () => {
      if (disposed || !root.current || !measure.current) return;
      const width = root.current.clientWidth;
      startTransition(() => setCompact(width <= 600));

      const natural = measure.current.offsetWidth;
      if (width > 0 && natural > 0) {
        const size = ((width * 0.96) / natural) * 100;
        startTransition(() => setFontSize(size));
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    observer.observe(measure.current);
    if (document.fonts?.ready) {
      document.fonts.ready.then(resize);
    }

    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [wordmark, font.fontFamily, font.fontWeight, font.fontStyle, font.letterSpacing]);

  // Spring repulsion physics simulation on pointer move
  useEffect(() => {
    const host = root.current;
    if (!host || !enabled || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const bodies = items.map(() => ({
      x: 0,
      y: 0,
      r: 0,
      vx: 0,
      vy: 0,
      vr: 0,
    }));
    let pointer = null;
    let raf = 0,
      last = 0,
      inView = true,
      disposed = false;

    const allowed = () =>
      !disposed && !reduced.matches && fine.matches && inView && !document.hidden;

    const paint = (i) => {
      const body = bodies[i];
      const node = elements.current[i];
      if (node) {
        node.style.transform = `translate(-50%, -50%) translate3d(${body.x.toFixed(
          3
        )}px,${body.y.toFixed(3)}px,0) rotate(${
          numeric(items[i].rotation, 0) + body.r
        }deg)`;
      }
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      pointer = null;
      bodies.forEach((b, i) => {
        b.x = b.y = b.r = b.vx = b.vy = b.vr = 0;
        paint(i);
      });
    };

    const tick = (now) => {
      raf = 0;
      if (!allowed()) {
        reset();
        return;
      }
      const dt = last ? clamp((now - last) / 1000, 1 / 240, 1 / 30) : 1 / 60;
      last = now;
      const width = host.clientWidth,
        height = host.clientHeight;
      const mobile = width <= 600;
      const scale = clamp(width / 1200, 0.4, 1.5);
      let moving = false;

      bodies.forEach((b, i) => {
        const item = items[i];
        let tx = 0,
          ty = 0,
          tr = 0;

        if (pointer && !(mobile && item.hideOnMobile)) {
          const x = (width * numeric(mobile ? item.mobileX ?? item.x : item.x, 50)) / 100;
          const y = (height * numeric(mobile ? item.mobileY ?? item.y : item.y, 50)) / 100;
          let dx = x - pointer.x,
            dy = y - pointer.y;
          const len = Math.hypot(dx, dy);
          const range = Math.max(1, radius * scale);

          if (len < range) {
            if (len < 0.1) {
              dx = Math.cos(i * 2.4);
              dy = Math.sin(i * 2.4);
            }
            const divisor = len < 0.1 ? 1 : len;
            const force =
              Math.pow(1 - len / range, 1.35) *
              distance *
              scale *
              clamp(numeric(item.response, 1), 0, 3);
            tx = (dx / divisor) * force;
            ty = (dy / divisor) * force;
            tr = clamp((tx - ty * 0.25) / Math.max(1, distance * scale), -1, 1) * twist;
          }
        }

        const spring = clamp(stiffness, 20, 300);
        const friction = Math.exp(-clamp(damping, 5, 40) * dt);

        b.vx = (b.vx + (tx - b.x) * spring * dt) * friction;
        b.vy = (b.vy + (ty - b.y) * spring * dt) * friction;
        b.vr = (b.vr + (tr - b.r) * spring * dt) * friction;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.r += b.vr * dt;

        if (
          Math.abs(tx - b.x) +
            Math.abs(ty - b.y) +
            Math.abs(tr - b.r) +
            Math.abs(b.vx) +
            Math.abs(b.vy) +
            Math.abs(b.vr) >
          0.08
        ) {
          moving = true;
        } else {
          b.x = tx;
          b.y = ty;
          b.r = tr;
          b.vx = b.vy = b.vr = 0;
        }
        paint(i);
      });

      if (moving) raf = requestAnimationFrame(tick);
      else last = 0;
    };

    const wake = () => {
      if (allowed() && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const move = (event) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointer = {
        x: ((event.clientX - rect.left) * host.clientWidth) / rect.width,
        y: ((event.clientY - rect.top) * host.clientHeight) / rect.height,
      };
      wake();
    };

    const leave = () => {
      pointer = null;
      wake();
    };

    const preference = () => {
      reset();
    };

    const viewport = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) reset();
    });

    viewport.observe(host);
    const resizeObserver = new ResizeObserver(reset);
    resizeObserver.observe(host);

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointercancel", leave);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", reset);
    reduced.addEventListener("change", preference);
    fine.addEventListener("change", preference);

    return () => {
      disposed = true;
      reset();
      viewport.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointercancel", leave);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", reset);
      reduced.removeEventListener("change", preference);
      fine.removeEventListener("change", preference);
    };
  }, [enabled, items, radius, distance, stiffness, damping, twist]);

  return (
    <div
      ref={root}
      className="nudge-footer-root"
      data-nudge-footer=""
      data-nudge-scope={scopeId}
      style={{
        ...style,
        width: "100%",
        height: fixedHeight ? style?.height : "auto",
        position: "relative",
        aspectRatio: fixedHeight ? undefined : compact ? mobileRatio : aspectRatio,
        background: "transparent",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <style>{`
        [data-nudge-scope="${scopeId}"] { container-type:inline-size; container-name:nudge-footer; }
        [data-nudge-scope="${scopeId}"] .nudge-piece { position:absolute; left:var(--nx); top:var(--ny); width:var(--ns); pointer-events:none; }
        [data-nudge-scope="${scopeId}"] .nudge-piece img { display:block; width:100%; height:auto; user-select:none; }
        [data-nudge-scope="${scopeId}"] .nudge-badge { display:block; width:100%; aspect-ratio:1; position:relative; }
        [data-nudge-scope="${scopeId}"] .nudge-badge-copy { position:absolute; inset:16%; display:flex; align-items:center; justify-content:center; text-align:center; font-family:"Bricolage Grotesque", Arial, sans-serif; font-weight:800; font-size:var(--nbf); line-height:1.04; letter-spacing:-0.035em; white-space:pre-line; }
        @container nudge-footer (max-width:650px) {
            [data-nudge-scope="${scopeId}"] .nudge-piece { left:var(--nmx); top:var(--nmy); width:var(--nms); }
            [data-nudge-scope="${scopeId}"] .nudge-mobile-hidden { display:none; }
            [data-nudge-scope="${scopeId}"] .nudge-badge-copy { font-size:var(--nmbf); }
            [data-nudge-scope="${scopeId}"] [data-nudge-wordmark] { font-size: min(10.2cqw, 38px) !important; max-width: 96% !important; }
        }
        @media (max-width: 768px) {
            .nudge-footer-root { overflow: hidden !important; max-width: 100vw !important; }
            [data-nudge-scope="${scopeId}"] [data-nudge-wordmark] { font-size: min(10.2cqw, 38px) !important; max-width: 96% !important; }
        }
        @media (prefers-reduced-motion:reduce) { [data-nudge-scope="${scopeId}"] .nudge-piece { will-change:auto; } }
      `}</style>

      {/* Hidden element for measuring natural font width */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <span
          ref={measure}
          style={{
            ...font,
            position: "absolute",
            display: "block",
            visibility: "hidden",
            whiteSpace: "pre",
            fontSize: 100,
            lineHeight: 1,
            width: "max-content",
          }}
        >
          {wordmark || "The Story Builder"}
        </span>
      </div>

      {/* Main Giant Wordmark or Logo */}
      {useLogo && logo?.src && failedLogo !== logo.src ? (
        <img
          onError={() => setFailedLogo(logo.src)}
          src={logo.src}
          alt={logo.alt || wordmark}
          draggable={false}
          style={{
            position: "absolute",
            width: "96%",
            height: "66%",
            objectFit: "contain",
            bottom: "1%",
            left: "2%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ) : (
        <div
          data-nudge-wordmark=""
          style={{
            ...font,
            position: "absolute",
            bottom: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            color,
            fontSize: fontSize ? `${fontSize}px` : "clamp(24px, 10.5cqw, 24cqw)",
            whiteSpace: "nowrap",
            lineHeight: 1.1,
            width: "max-content",
            maxWidth: "96%",
            zIndex: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {wordmark || "The Story Builder"}
        </div>
      )}

      {/* Floating Repelled Items (Fruit Cutouts & Flower Badges) */}
      {items.map((item, i) => {
        const size = numeric(item.size, 12);
        const vars = {
          "--nx": `${numeric(item.x, 50)}%`,
          "--ny": `${numeric(item.y, 50)}%`,
          "--ns": `${size}%`,
          "--nmx": `${numeric(item.mobileX ?? item.x, 50)}%`,
          "--nmy": `${numeric(item.mobileY ?? item.y, 50)}%`,
          "--nms": `${numeric(item.mobileSize ?? item.size, 12)}%`,
          "--nbf": `${size * 0.14}cqw`,
          "--nmbf": `${numeric(item.mobileSize ?? item.size, 12) * 0.14}cqw`,
        };

        return (
          <div
            key={i}
            ref={(el) => {
              elements.current[i] = el;
            }}
            className={`nudge-piece${item.hideOnMobile ? " nudge-mobile-hidden" : ""}`}
            aria-hidden="true"
            data-nudge-piece={item.name || i}
            style={{
              ...vars,
              zIndex: item.layer === "back" ? 0 : 2,
              transform: `translate(-50%,-50%) rotate(${numeric(
                item.rotation,
                0
              )}deg)`,
              filter: shadow
                ? "drop-shadow(7px 10px 14px rgba(0, 0, 0, 0.4))"
                : undefined,
            }}
          >
            {item.kind === "badge" ? (
              <div className="nudge-badge">
                <svg
                  viewBox="0 0 100 100"
                  style={{ width: "100%", height: "100%", display: "block" }}
                >
                  <path d={FLOWER} fill={item.color || "#FFCA67"} />
                </svg>
                <div
                  className="nudge-badge-copy"
                  style={{ color: item.ink || "#111111" }}
                >
                  {item.text || "STAY\nPLAYFUL"}
                </div>
              </div>
            ) : item.image?.src ? (
              <img
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes={`${size}vw`}
                alt=""
                draggable={false}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
