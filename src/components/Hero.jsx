import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createTyped } from "../utils/typed";

const ease = [0.4, 0, 0.2, 1];

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const proofClients = [
  { l: "L", color: "#facc15" },
  { l: "S", color: "#f472b6" },
  { l: "W", color: "#60a5fa" },
  { l: "C", color: "#4ade80" },
  { l: "U", color: "#fb923c" },
];

const showcaseCards = [
  {
    id: 1,
    badge: "TRAIL",
    title: "Rotating Image Trail",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    angle: -6,
    offsetY: 8,
  },
  {
    id: 2,
    badge: "CARDS",
    title: "Dropping Card Stack",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    angle: -2,
    offsetY: 0,
  },
  {
    id: 3,
    badge: "PIXEL",
    title: "Pixel Transition",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    angle: 3,
    offsetY: 4,
  },
  {
    id: 4,
    badge: "GROWTH",
    title: "AI Growth Engine",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
    angle: 7,
    offsetY: 12,
  },
];

const StarIcon = () => (
  <span className="star-accent" aria-hidden="true">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
    </svg>
  </span>
);

const StarRow = () => (
  <span className="proof-stars" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#facc15">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" />
      </svg>
    ))}
  </span>
);

export default function Hero({ setPage }) {
  const typedRef = useRef(null);

  useEffect(() => {
    const t = createTyped(typedRef.current, {
      strings: [
        "Performance Marketer.",
        "SEO Specialist.",
        "Paid Ads Strategist.",
        "Brand Builder.",
        "Growth Partner.",
      ],
      typeSpeed: 58, backSpeed: 32, backDelay: 1800,
      startDelay: 600, loop: true, smartBackspace: true,
    });
    return () => t.destroy();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
        <div className="dots" />
      </div>

      <motion.div
        className="hero-body"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div className="avail" variants={rise}>
          <span className="pulse-dot" /> Now onboarding clients for 2026
        </motion.div>

        <motion.h1 className="hero-title" variants={rise}>
          Built to <StarIcon /> outperform.
          <br />
          <span className="gold-name">The Story Builder</span>
        </motion.h1>

        <motion.p className="hero-role" variants={rise}>
          We're your <span ref={typedRef} />
        </motion.p>

        <motion.p className="hero-sub" variants={rise}>
          A full-service agency building <span className="hero-pill">high-converting websites</span>, scaling <span className="hero-pill">paid ads</span> that actually pay back, and shipping <span className="hero-pill">AI systems</span> built to outperform.
        </motion.p>

        <motion.div className="hero-ctas" variants={rise}>
          <motion.button
            className="btn btn-gold btn-lg"
            data-track="hero_get_in_touch"
            onClick={() => window.open("https://intake-form-thestorybuilder.vercel.app/", "_blank")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Strategy Call
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
          <motion.button
            className="btn btn-ghost btn-lg"
            data-track="hero_view_work"
            onClick={() => scrollTo("projects")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            See Our Work ↓
          </motion.button>
        </motion.div>

        <motion.div className="hero-proof" variants={rise}>
          <span className="proof-avatars" aria-hidden="true">
            {proofClients.map((c, i) => (
              <span
                key={i}
                className="proof-avatar"
                style={{ background: c.color, zIndex: proofClients.length - i }}
              >
                {c.l}
              </span>
            ))}
          </span>
          <span className="proof-meta">
            <StarRow />
            <strong>10+ happy clients</strong> across India &amp; Global
          </span>
        </motion.div>

        {/* Interactive Curved Showcase Arc ("See Our Work") */}
        <motion.div className="hero-arc-container" variants={rise}>
          <div className="hero-arc-header">
            <span className="hero-arc-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Featured Showcase Arc
            </span>
          </div>

          <div className="hero-arc-grid">
            {showcaseCards.map((card) => (
              <motion.div
                key={card.id}
                className="hero-arc-card"
                style={{
                  transform: `rotate(${card.angle}deg) translateY(${card.offsetY}px)`,
                }}
                whileHover={{
                  scale: 1.07,
                  rotate: 0,
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => scrollTo("projects")}
                title={`View ${card.title}`}
              >
                <div className="hero-arc-card-inner">
                  <span className="hero-arc-badge">{card.badge}</span>
                  <img
                    src={card.img}
                    alt={card.title}
                    className="hero-arc-card-img"
                    loading="lazy"
                  />
                  <div className="hero-arc-overlay">
                    <span className="hero-arc-label">{card.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="scroll-hint" aria-hidden="true">
        <div className="sh-track"><div className="sh-bar" /></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
