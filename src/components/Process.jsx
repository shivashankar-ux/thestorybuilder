import { motion } from "framer-motion";
import GlowCard from "./common/GlowCard";
import SplitText from "./common/SplitText";
import ScrollReveal from "./common/ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We analyze your audience, analytics, and funnel bottlenecks. We identify exactly where revenue is leaking before touching creative.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "A custom growth roadmap with clear channel allocation, positioning angles, ad budgets, and target ROAS milestones.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We construct high-converting web assets, performance ad campaigns, and automated follow-up flows ready for launch.",
  },
  {
    num: "04",
    title: "Scale",
    desc: "Live deployment with constant split-testing of hooks, landing pages, and audiences to maximize return on ad spend.",
  },
  {
    num: "05",
    title: "Transparent Reporting",
    desc: "Real-time dashboard access with honest weekly breakdowns of ROAS, net profit, and immediate strategic next steps.",
  },
];

export default function Process() {
  return (
    <section className="process" id="process" aria-label="Our 5-step agency methodology">
      <div className="wrap">
        <ScrollReveal direction="up" distance={20}>
          <span className="tag">How We Work</span>
        </ScrollReveal>

        <h2 className="sec-h">
          <SplitText text="A repeatable system, not guesswork." splitBy="words" />
        </h2>

        <ScrollReveal direction="up" distance={20} delay={0.15}>
          <p className="muted" style={{ maxWidth: 620, marginBottom: 56 }}>
            Five steps from kickoff to compounding growth. A proven, engineering-grade execution framework built for speed and ROI.
          </p>
        </ScrollReveal>

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
