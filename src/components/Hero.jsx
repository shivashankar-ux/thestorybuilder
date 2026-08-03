import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import MagneticButton from "./common/MagneticButton";
import GlowCard from "./common/GlowCard";
import MorphingShapes from "./MorphingShapes";

const ease = [0.16, 1, 0.3, 1];

// Client roles that cycle with smooth AnimatePresence (no typed.js dependency)
const roles = [
  "Performance Marketer.",
  "SEO Specialist.",
  "Paid Ads Strategist.",
  "Brand Builder.",
  "Growth Partner.",
];

const proofClients = [
  { l: "L", color: "#facc15" },
  { l: "S", color: "#f472b6" },
  { l: "W", color: "#60a5fa" },
  { l: "C", color: "#4ade80" },
  { l: "U", color: "#fb923c" },
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

// Headline word reveal — stagger each word
const HeroHeadline = () => {
  const words = ["Built", "to", "outperform."];
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };
  const word = {
    hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
    show: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.65, ease },
    },
  };

  return (
    <h1 className="hero-title" aria-label="Built to outperform. The Story Builder">
      <motion.span
        variants={container}
        initial="hidden"
        animate="show"
        aria-hidden="true"
        style={{ display: "inline" }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={word}
            style={{ display: "inline-block", marginRight: i < words.length - 1 ? "0.28em" : 0 }}
          >
            {i === 1 ? (
              <>{w}&nbsp;<StarIcon /></>
            ) : (
              w
            )}
          </motion.span>
        ))}
      </motion.span>
      <br />
      <motion.span
        className="gold-name"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.65, ease }}
      >
        The Story Builder
      </motion.span>
    </h1>
  );
};

// AnimatePresence-driven role cycler — no library needed
function RoleCycler() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="role-cycler"
      aria-live="polite"
      aria-atomic="true"
      style={{ display: "inline-block", position: "relative" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease }}
          style={{ display: "inline-block" }}
        >
          {roles[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero({ setPage }) {
  const heroRef = useRef(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const bgY       = useTransform(scrollY, [0, 600], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.95]);

  // Mouse tilt tracking
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  return (
    <section
      className="hero"
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      aria-label="Hero section"
    >
      {/* Parallax ambient background */}
      <motion.div className="hero-bg" style={{ y: bgY }} aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="orb o3" />
        <div className="dots" />
      </motion.div>

      <div className="hero-container" style={{ perspective: 1200, width: "100%" }}>
        <motion.div
          className="hero-body"
          style={{ rotateX, rotateY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Availability badge */}
          <motion.div
            className="avail"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="pulse-dot" />
            Now onboarding clients for 2026
          </motion.div>

          {/* Animated headline — word by word */}
          <HeroHeadline />

          {/* Role cycler — replaces typed.js */}
          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            We're your <RoleCycler />
          </motion.p>

          {/* Sub-headline */}
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            A full-service agency building{" "}
            <span className="hero-pill">high-converting websites</span>, scaling{" "}
            <span className="hero-pill">paid ads</span> that actually pay back,
            and shipping{" "}
            <span className="hero-pill">AI systems</span> built to outperform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <MagneticButton distance={0.35}>
              <button
                className="btn btn-gold btn-lg"
                data-track="hero_get_in_touch"
                onClick={() =>
                  window.open(
                    "https://intake-form-thestorybuilder.vercel.app/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                Book a Strategy Call
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </MagneticButton>

            <MagneticButton distance={0.35}>
              <button
                className="btn btn-ghost btn-lg"
                data-track="hero_view_work"
                onClick={() => scrollTo("projects")}
                style={{ cursor: "pointer" }}
              >
                See Our Work ↓
              </button>
            </MagneticButton>
          </motion.div>

          {/* Social proof card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <GlowCard
              className="hero-proof-card"
              style={{ padding: "12px 20px", display: "inline-block" }}
              enableTilt={false}
            >
              <div className="hero-proof" style={{ margin: 0 }}>
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
              </div>
            </GlowCard>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" aria-hidden="true">
        <div className="sh-track">
          <div className="sh-bar" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
