import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlowCard from "./common/GlowCard";

const stats = [
  { value: 10, suffix: "+", label: "Brands Scaled", sub: "Websites & performance campaigns" },
  { value: 3.4, suffix: "x", label: "Avg ROAS Delivered", sub: "Data-driven paid ads optimization" },
  { value: 99.8, suffix: "%", label: "Client Retention", sub: "Long-term growth partnerships" },
  { value: 25, prefix: "₹", suffix: "L+", label: "Ad Revenue Generated", sub: "Across e-commerce & B2B brands" },
];

function CountUp({ end, prefix = "", suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

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
    <section className="stats-bar" aria-label="Agency key metrics">
      <div className="wrap">
        <motion.div
          className="stats-grid-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <GlowCard className="stat-card-inner" enableTilt={false}>
                <div className="stat-card-body">
                  <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                  <span className="stat-card-title">{s.label}</span>
                  <span className="stat-card-sub">{s.sub}</span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
