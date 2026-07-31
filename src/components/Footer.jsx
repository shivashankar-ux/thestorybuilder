import { motion } from "framer-motion";
import MagneticButton from "./common/MagneticButton";

export default function Footer({ setPage }) {
  const scrollTo = (id) => {
    if (window.location.hash !== "#home") setPage("home");
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
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="footer-inner">
        <button
          className="logo"
          onClick={() => setPage("home")}
          style={{
            background: "none",
            border: "none",
            fontFamily: "var(--fd)",
            fontSize: 22,
            fontWeight: 800,
            color: "var(--text)",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "var(--gold)" }}>The </span>Story Builder
        </button>

        <p className="foot-copy">© 2026 The Story Builder. All rights reserved.</p>

        <nav className="foot-nav" style={{ alignItems: "center", display: "flex", gap: "20px" }}>
          <button onClick={() => scrollTo("about")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
            About
          </button>
          <button onClick={() => scrollTo("projects")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
            Projects
          </button>
          <button onClick={() => setPage("contact")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
            Contact
          </button>

          <MagneticButton distance={0.4}>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              style={{
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "var(--gold)",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              ↑
            </button>
          </MagneticButton>
        </nav>
      </div>
    </motion.footer>
  );
}
