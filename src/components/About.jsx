import { motion } from "framer-motion";
import GlowCard from "./common/GlowCard";
import MagneticButton from "./common/MagneticButton";

const services = [
  {
    id: 1,
    title: "Performance Marketing",
    desc: "Meta & Google ads engineered for ROAS, not vanity metrics",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14l4-4 4 4 5-5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9h4v4" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Social Media Marketing",
    desc: "Organic content, community building, and social campaigns that keep your brand top-of-mind",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="18" cy="5" r="3" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="12" r="3" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="19" r="3" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Web Development",
    desc: "Mobile-first, lightning-fast websites that convert",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Brand Strategy",
    desc: "Positioning and identity that makes you the obvious choice",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" stroke="#facc15" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function About({ setPage }) {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <motion.span
          className="tag"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About the Agency
        </motion.span>

        <div className="about-grid">
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="sec-h">
              We build brands<br /><em>that grow</em><br />in a measurable way.
            </h2>
            <p className="muted">
              <strong className="lead">Full-service digital marketing</strong> for founders and growing brands across India and beyond. We pair strategy with execution — websites, paid media, social media, and brand systems that move real numbers, not just impressions.
            </p>
            <p className="muted">
              <strong className="lead">Revenue first, vanity metrics never.</strong> Every engagement starts with the same question: what does success look like in revenue? From there we reverse-engineer the funnel, ship fast, and report honestly.
            </p>
            <MagneticButton distance={0.3}>
              <button className="btn btn-gold" onClick={() => setPage("contact")} style={{ marginTop: 24, cursor: "pointer" }}>
                Work With Us
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="skill-grid"
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
            {services.map((skill) => (
              <motion.div
                key={skill.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <GlowCard className="sk" style={{ height: "100%", padding: "24px 20px" }}>
                  <div className="sk-ico">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
