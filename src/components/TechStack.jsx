import { motion } from "framer-motion";

const tools = [
  { name: "Meta Ads",       cat: "Performance Marketing", color: "#0668E1", letter: "M" },
  { name: "Google Ads",     cat: "Performance Marketing", color: "#4285F4", letter: "G" },
  { name: "GA4",            cat: "Analytics",             color: "#F9AB00", letter: "A" },
  { name: "Looker Studio",  cat: "Analytics",             color: "#4285F4", letter: "L" },
  { name: "Search Console", cat: "SEO",                   color: "#458CF5", letter: "S" },
  { name: "Ahrefs",         cat: "SEO",                   color: "#0D74D9", letter: "A" },
  { name: "Figma",          cat: "Design",                color: "#F24E1E", letter: "F" },
  { name: "React · Next.js",cat: "Web Development",       color: "#61DAFB", letter: "R" },
  { name: "Vercel",         cat: "Hosting & Infra",       color: "#ffffff", letter: "V" },
  { name: "Zapier",         cat: "Automation",            color: "#FF4F00", letter: "Z" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function TechStack() {
  return (
    <section className="tech-stack" id="stack">
      <div className="wrap">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <span className="tag">Our Stack</span>
          <h2 className="sec-h">
            Built on tools the<br /><em>best brands</em> trust.
          </h2>
          <p className="muted" style={{ maxWidth: 620, marginBottom: 48 }}>
            We don't reinvent wheels — we wire together the same tools top brands use,
            then layer our process on top. Every campaign is measurable, every dashboard is live.
          </p>
        </motion.div>

        <motion.div
          className="stack-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
        >
          {tools.map((t) => (
            <motion.div
              key={t.name}
              className="stack-card"
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className="stack-icon"
                style={{
                  background: t.color,
                  color: t.color === "#ffffff" ? "#000" : "#fff",
                  boxShadow: `0 6px 22px ${t.color}33`,
                }}
                aria-hidden="true"
              >
                {t.letter}
              </div>
              <div className="stack-text">
                <div className="stack-name">{t.name}</div>
                <div className="stack-cat">{t.cat}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
