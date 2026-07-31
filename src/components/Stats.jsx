import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlowCard from "./common/GlowCard";

const stats = [
  { value: 10, suffix: "+", label: "Brands launched" },
  { value: 3.4, suffix: "x", label: "Avg ROAS delivered" },
];

function CountUp({ end, prefix = "", suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = end * eased;
      setVal(Number.isInteger(end) ? Math.round(v) : Math.round(v * 10) / 10);
      if (t < 1) requestAnimationFrame(tick);
    };
    const anim = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(anim);
  }, [isInView, end, duration]);

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
    <section className="stats-bar" aria-label="Agency results at a glance" style={{ padding: "40px 0" }}>
      <div className="wrap">
        <motion.div
          className="stats-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          style={{ gap: "24px" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <GlowCard className="stat-cell" style={{ padding: "32px 24px", textAlign: "center" }}>
                <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                <span className="stat-label" style={{ marginTop: "8px", display: "block" }}>{s.label}</span>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
