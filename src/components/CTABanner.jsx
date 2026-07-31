import { motion } from "framer-motion";
import { trackEvent } from "../utils/tracking";
import GlowCard from "./common/GlowCard";
import MagneticButton from "./common/MagneticButton";
import SplitText from "./common/SplitText";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function CTABanner({ setPage }) {
  return (
    <section className="cta-banner" id="contact" aria-label="Call to action section">
      <div className="wrap">
        <GlowCard style={{ padding: "clamp(36px, 6vw, 64px) clamp(24px, 5vw, 48px)" }}>
          <motion.div
            className="cta-banner-inner"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            style={{ textAlign: "center" }}
          >
            <motion.h2 className="cta-banner-h" variants={item} style={{ fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "var(--fd)", fontWeight: 800, lineHeight: 1.15 }}>
              <SplitText text="Let's grow your brand together." splitBy="words" />
            </motion.h2>

            <motion.p className="cta-banner-sub" variants={item} style={{ margin: "16px auto 36px", maxWidth: "540px", color: "var(--muted)" }}>
              Tell us where you are and where you want to be. We'll map a custom revenue growth path within 48 hours.
            </motion.p>

            <motion.div className="cta-banner-row" variants={item} style={{ margin: "0 0 40px" }}>
              <div className="cta-cell">
                <span className="cta-cell-label">Email</span>
                <a
                  className="cta-cell-link"
                  href="mailto:shivashankar.7991@gmail.com"
                  data-track="cta_banner_email"
                  aria-label="Email shivashankar.7991@gmail.com"
                >
                  shivashankar.7991@gmail.com
                </a>
              </div>
              <div className="cta-cell">
                <span className="cta-cell-label">Book a Call</span>
                <button
                  className="cta-cell-link cta-cell-btn"
                  data-track="cta_banner_book"
                  onClick={() => setPage("contact")}
                  style={{ cursor: "pointer", background: "none", border: "none" }}
                  aria-label="Schedule a call"
                >
                  Schedule now →
                </button>
              </div>
              <div className="cta-cell">
                <span className="cta-cell-label">WhatsApp</span>
                <a
                  className="cta-cell-link"
                  href="https://wa.me/918341928526?text=Hi%2C%20I%20saw%20your%20site%20and%20want%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta_banner_whatsapp"
                  aria-label="Chat on WhatsApp +91 83419 28526"
                >
                  +91 83419 28526
                </a>
              </div>
            </motion.div>

            <motion.div className="cta-banner-actions" variants={item} style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <MagneticButton distance={0.3}>
                <button
                  className="btn btn-gold btn-lg"
                  data-track="cta_banner_main"
                  onClick={() => setPage("contact")}
                  style={{ cursor: "pointer" }}
                  aria-label="Start a project with The Story Builder"
                >
                  Start a Project
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </MagneticButton>

              <MagneticButton distance={0.3}>
                <a
                  className="btn btn-ghost btn-lg"
                  href="https://wa.me/918341928526?text=Hi%2C%20I%20saw%20your%20site"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("cta_banner_wa_btn")}
                  aria-label="Message The Story Builder on WhatsApp"
                >
                  Message on WhatsApp
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </GlowCard>
      </div>
    </section>
  );
}
