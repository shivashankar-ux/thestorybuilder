import { motion } from "framer-motion";
import GlowCard from "./common/GlowCard";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive into your business, market, and numbers. What's the real bottleneck — traffic, conversion, retention, or pricing? No assumptions.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "A 90-day growth plan tied to revenue. Channels picked deliberately, KPIs defined upfront, budget mapped to each lever.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We ship — websites, funnels, ad creatives, content, automation. Built fast but never sloppy. Launch beats perfection.",
  },
  {
    num: "04",
    title: "Launch & Optimise",
    desc: "Live campaigns, real spend, real data. Daily monitoring, weekly tweaks, monthly retros. Compounding wins, not vanity sprints.",
  },
  {
    num: "05",
    title: "Report Honestly",
    desc: "Transparent dashboards. What worked, what didn't, what's next. We tell you the same numbers we'd tell ourselves.",
  },
];

export default function Process() {
  return (
    <section className="process" id="process" style={{ padding: "100px 0" }}>
      <div className="wrap">
        <motion.span
          className="tag"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How We Work
        </motion.span>

        <motion.h2
          className="sec-h"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          A repeatable system,<br />not <em>guesswork.</em>
        </motion.h2>

        <motion.p
          className="muted"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ maxWidth: 620, marginBottom: 56 }}
        >
          Five steps from kickoff to compounding growth. Same process for a ₹50k ad budget or a ₹50L one — only the lever sizes change.
        </motion.p>

        <motion.div
          className="process-grid"
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
          {steps.map((s) => (
            <motion.div
              key={s.num}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <GlowCard className="process-step" style={{ height: "100%", padding: "28px 24px" }}>
                <span className="process-num" style={{ color: "var(--gold)", fontFamily: "var(--font-accent)", fontSize: "28px", fontWeight: 800 }}>{s.num}</span>
                <h3 className="process-title" style={{ margin: "12px 0 8px" }}>{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
