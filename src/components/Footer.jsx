import { motion } from "framer-motion";
import MagneticButton from "./common/MagneticButton";

export default function Footer({ setPage }) {
  const scrollTo = (id) => {
    if (window.location.pathname !== "/") setPage("home");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="footer-section"
      role="contentinfo"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="wrap">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col brand-col">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); setPage("home"); }}
              className="logo footer-logo"
              aria-label="The Story Builder — Home"
            >
              <span style={{ color: "var(--gold)" }}>The </span>Story Builder
            </a>
            <p className="footer-tagline">
              A full-service digital agency building high-converting web experiences, performance paid ad campaigns, and AI integration for scaling brands.
            </p>
            <div className="footer-socials">
              <a
                href="https://wa.me/918341928526"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-icon"
              >
                WA
              </a>
              <a
                href="mailto:shivashankar.7991@gmail.com"
                aria-label="Email Us"
                className="social-icon"
              >
                EM
              </a>
              <a
                href="https://legacysolar.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Legacy Solar"
                className="social-icon"
              >
                WEB
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-list">
              <li>
                <button type="button" onClick={() => setPage("home")} className="footer-link">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage("services")} className="footer-link">
                  Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage("pricing")} className="footer-link">
                  Pricing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo("projects")} className="footer-link">
                  Selected Work
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage("contact")} className="footer-link">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Capabilities</h4>
            <ul className="footer-list">
              <li><span className="footer-text">Performance Marketing</span></li>
              <li><span className="footer-text">Social Media Management</span></li>
              <li><span className="footer-text">Full-Stack Web Engineering</span></li>
              <li><span className="footer-text">Brand &amp; Positioning Strategy</span></li>
              <li><span className="footer-text">AI Automation &amp; Tools</span></li>
            </ul>
          </div>

          {/* Col 4: Get in Touch */}
          <div className="footer-col">
            <h4 className="footer-heading">Get in Touch</h4>
            <p className="footer-contact-item">
              <strong>Location:</strong> Hyderabad, India &amp; Remote
            </p>
            <p className="footer-contact-item">
              <strong>Email:</strong><br />
              <a href="mailto:shivashankar.7991@gmail.com" className="footer-link">
                shivashankar.7991@gmail.com
              </a>
            </p>
            <p className="footer-contact-item">
              <strong>WhatsApp:</strong><br />
              <a href="https://wa.me/918341928526" target="_blank" rel="noopener noreferrer" className="footer-link">
                +91 83419 28526
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="foot-copy">© 2026 The Story Builder. All rights reserved.</p>
          <div className="footer-bottom-right">
            <MagneticButton distance={0.4}>
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top of page"
                className="scroll-top-btn"
              >
                ↑ <span style={{ fontSize: "12px", marginLeft: "4px", fontWeight: 700 }}>TOP</span>
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
