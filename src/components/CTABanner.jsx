import { motion } from "framer-motion";
import { trackEvent } from "../utils/tracking";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function CTABanner({ setPage }) {
  return (
    <section className="cta-banner" id="contact">
      <div className="wrap">
        <motion.div
          className="cta-banner-inner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          <motion.h2 className="cta-banner-h" variants={item}>
            Let's grow your<br />
            <span className="cta-gold">brand together.</span>
          </motion.h2>

          <motion.p className="cta-banner-sub" variants={item}>
            Tell us where you are and where you want to be. We'll map the path in 48 hours.
          </motion.p>

          <motion.div className="cta-banner-row" variants={item}>
            <div className="cta-cell">
              <span className="cta-cell-label">Email</span>
              <a
                className="cta-cell-link"
                href="mailto:shivashankar.7991@gmail.com"
                data-track="cta_banner_email"
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
              >
                +91 83419 28526
              </a>
            </div>
          </motion.div>

          <motion.div className="cta-banner-actions" variants={item}>
            <button
              className="btn btn-gold btn-lg"
              data-track="cta_banner_main"
              onClick={() => setPage("contact")}
            >
              Start a Project
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              className="btn btn-ghost btn-lg"
              href="https://wa.me/918341928526?text=Hi%2C%20I%20saw%20your%20site"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_banner_wa_btn")}
            >
              Message on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
