import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createTyped } from "../utils/typed";
import { trackEvent } from "../utils/tracking";

const WA_HREF =
  "https://wa.me/918341928526?text=" +
  encodeURIComponent("Hi! I saw your ad and want to get my business online.");

const ease = [0.4, 0, 0.2, 1];
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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

const StarRow = () => (
  <span className="proof-stars" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#facc15">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" />
      </svg>
    ))}
  </span>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.05 0C5.5 0 .15 5.35.15 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.35-1.65a11.85 11.85 0 0 0 5.7 1.45h.01c6.55 0 11.9-5.35 11.9-11.9 0-3.18-1.24-6.17-3.46-8.4zM12.05 21.6h-.01a9.7 9.7 0 0 1-4.95-1.35l-.36-.21-3.77.98 1.01-3.67-.23-.38a9.7 9.7 0 0 1-1.5-5.17c0-5.39 4.4-9.78 9.81-9.78 2.62 0 5.07 1.02 6.92 2.86a9.7 9.7 0 0 1 2.87 6.93c0 5.39-4.39 9.79-9.79 9.79zm5.36-7.34c-.29-.15-1.74-.86-2-.96-.27-.1-.46-.15-.66.15s-.76.96-.93 1.16-.34.22-.63.07c-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.57-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.04 2.81 1.19 3c.15.19 2.05 3.13 4.97 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.74-.71 1.99-1.4.24-.69.24-1.27.17-1.4-.07-.13-.27-.2-.56-.34z"/>
  </svg>
);

export default function LandingHero() {
  const typedRef = useRef(null);

  useEffect(() => {
    const t = createTyped(typedRef.current, {
      strings: ["websites.", "ad campaigns.", "SEO.", "funnels.", "brands."],
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
          Get your business<br />
          <span className="gold-name">online &amp; growing.</span>
        </motion.h1>

        <motion.p className="hero-role" variants={rise}>
          High-converting <span ref={typedRef} />
        </motion.p>

        <motion.p className="hero-sub" variants={rise}>
          We design, ship and run performance-tuned websites and ads for ambitious
          founders. Real numbers, real revenue — not vanity metrics.
        </motion.p>

        <motion.div className="hero-ctas" variants={rise}>
          <motion.a
            className="btn btn-wa"
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-track="landing_hero_whatsapp"
            onClick={() => trackEvent("landing_hero_whatsapp")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon />
            Chat with us on WhatsApp
          </motion.a>
          <motion.button
            className="btn btn-ghost"
            data-track="landing_hero_view_work"
            onClick={() => scrollTo("projects")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            See Our Work
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
            <strong>10+ happy clients</strong> across India &amp; abroad
          </span>
        </motion.div>
      </motion.div>

      <div className="scroll-hint" aria-hidden="true">
        <div className="sh-track"><div className="sh-bar" /></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
