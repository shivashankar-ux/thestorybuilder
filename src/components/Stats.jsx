import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Brands launched" },
  { value: 5, suffix: "M+", prefix: "₹", label: "Ad spend managed" },
  { value: 3.4, suffix: "x", label: "Avg ROAS delivered" },
  { value: 4, suffix: "+", label: "Countries served" },
];

function CountUp({ end, prefix = "", suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const v = end * eased;
              setVal(Number.isInteger(end) ? Math.round(v) : Math.round(v * 10) / 10);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="stat-num">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats-bar" aria-label="Agency results at a glance">
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-cell" key={i}>
              <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
