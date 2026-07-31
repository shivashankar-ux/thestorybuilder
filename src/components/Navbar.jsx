import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import MagneticButton from "./common/MagneticButton";

export default function Navbar({ page, setPage }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    localStorage.removeItem("theme");
    document.documentElement.removeAttribute("data-theme");
  }, []);

  useEffect(() => {
    if (page !== "home") {
      setScrolled(true);
      setActiveNav(page === "contact" ? "contact" : (page === "services" ? "services" : (page === "pricing" ? "pricing" : "")));
      return;
    }
    setActiveNav("home");
    const sections = ["home", "about", "process", "projects", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let cur = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 90) cur = id;
      });
      setActiveNav(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleNav = (dest) => {
    if (dest === "contact") {
      setPage("contact");
      setMenuOpen(false);
    } else if (dest === "services") {
      setPage("services");
      setMenuOpen(false);
    } else if (dest === "pricing") {
      setPage("pricing");
      setMenuOpen(false);
    } else if (dest === "home") {
      setPage("home");
      setMenuOpen(false);
    } else if (page === "home") {
      scrollTo(dest);
    } else {
      setPage({ page: "home", scrollTo: dest });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home",     label: "Home" },
    { id: "services", label: "Services" },
    { id: "process",  label: "Process" },
    { id: "projects", label: "Work" },
    { id: "contact",  label: "Contact" },
  ];

  return (
    <>
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
        <motion.div
          className="nav-inner"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: scrolled ? "rgba(9, 10, 15, 0.85)" : "rgba(18, 20, 29, 0.75)",
            borderColor: scrolled ? "rgba(245, 158, 11, 0.25)" : "rgba(255, 255, 255, 0.12)",
          }}
        >
          <button
            className="logo"
            onClick={() => handleNav("home")}
            style={{ background: "none", border: "none", color: "#FFFDF9", whiteSpace: "nowrap", cursor: "pointer" }}
          >
            <span>The </span>Story Builder
          </button>

          <nav className="nav-links" style={{ position: "relative" }}>
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  className={`nl${isActive ? " active" : ""}`}
                  onClick={() => handleNav(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    position: "relative",
                    padding: "6px 14px",
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(245, 158, 11, 0.15)",
                        borderRadius: "100px",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          <MagneticButton distance={0.3}>
            <button className="nav-cta" onClick={() => handleNav("contact")} style={{ cursor: "pointer" }}>
              Let's Talk
            </button>
          </MagneticButton>

          <button
            className={`burger${menuOpen ? " open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </motion.div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mob-menu open"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  className="mob-link"
                  onClick={() => handleNav(item.id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  style={{ background: "none", border: "none", textAlign: "left", width: "100%", cursor: "pointer" }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                className="btn btn-gold mob-cta"
                onClick={() => handleNav("contact")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Let's Talk
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
