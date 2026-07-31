import { motion } from "framer-motion";
import GlowCard from "./common/GlowCard";
import MagneticButton from "./common/MagneticButton";
import SplitText from "./common/SplitText";
import ScrollReveal from "./common/ScrollReveal";

const services = [
  {
    id: 1,
    title: "Performance Marketing",
    desc: "Meta & Google ads engineered for ROAS, scalable customer acquisition, and zero wasted ad spend.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14l4-4 4 4 5-5" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9h4v4" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Social Media Marketing",
    desc: "Organic content, strategic community building, and viral campaigns that turn audiences into advocates.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="18" cy="5" r="3" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="12" r="3" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="19" r="3" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Web Development",
    desc: "Mobile-first, lightning-fast React & Vite websites crafted for maximum conversion and Awwwards-level design.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="#facc15" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Brand Strategy",
    desc: "Distinct positioning, tone-of-voice, and visual identity that make your business the irresistible market choice.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" stroke="#facc15" strokeWidth="1.75" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function About({ setPage }) {
  return (
    <section className="about" id="about" aria-label="About The Story Builder agency">
      <div className="wrap">
        <ScrollReveal direction="up" distance={20}>
          <span className="tag">About the Agency</span>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal direction="right" distance={30} className="about-left">
            <h2 className="sec-h">
              <SplitText text="We build brands that grow in a measurable way." splitBy="words" />
            </h2>
            <p className="muted">
              <strong className="lead">Full-service digital agency</strong> for ambitious founders and scaling enterprises. We combine conversion-focused engineering with aggressive paid media and creative storytelling to move real revenue figures.
            </p>
            <p className="muted">
              <strong className="lead">Revenue first, vanity metrics never.</strong> Every strategy starts by establishing concrete targets: ROI, lower CPA, higher LTV. We iterate rapidly and maintain total transparency through full dashboard tracking.
            </p>
            <MagneticButton distance={0.3}>
              <button
                className="btn btn-gold"
                onClick={() => setPage("contact")}
                style={{ marginTop: 24, cursor: "pointer" }}
                aria-label="Work with The Story Builder agency"
              >
                Work With Us
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </MagneticButton>
          </ScrollReveal>

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
                  <div className="sk-ico" aria-hidden="true">{skill.icon}</div>
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
