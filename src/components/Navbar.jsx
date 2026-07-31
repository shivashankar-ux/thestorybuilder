import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import MagneticButton from "./common/MagneticButton";

const ease = [0.16, 1, 0.3, 1];

export default function Navbar({ page, setPage }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Sync theme cleanup
  useEffect(() => {
    localStorage.removeItem("theme");
    document.documentElement.removeAttribute("data-theme");
  }, []);

  // Scroll listener for active section & header blur
  useEffect(() => {
    if (page !== "home") {
      setScrolled(true);
      setActiveNav(
        page === "contact" ? "contact" :
        page === "services" ? "services" :
        page === "pricing"  ? "pricing"  : ""
      );
      return;
    }
    setActiveNav("home");
    const sections = ["home", "about", "process", "projects", "contact"];

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          let cur = "home";
          sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 90) cur = id;
          });
          setActiveNav(cur);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  // Keyboard trap inside mobile menu
  useEffect(() => {
    if (!menuOpen) return;

    const focusableSelector =
      'a, button, [tabindex]:not([tabindex="-1"])';

    const trapFocus = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (!menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll(focusableSelector)
      ).filter((el) => !el.disabled && el.offsetParent !== null);

      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trapFocus);
    // Move focus into the menu on open
    setTimeout(() => menuRef.current?.querySelector("a, button")?.focus(), 100);

    return () => document.removeEventListener("keydown", trapFocus);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const handleNav = useCallback((dest, e) => {
    if (e?.preventDefault) e.preventDefault();
    setMenuOpen(false);
    if (dest === "contact") {
      setPage("contact");
    } else if (dest === "services") {
      setPage("services");
    } else if (dest === "pricing") {
      setPage("pricing");
    } else if (dest === "home") {
      setPage("home");
    } else if (page === "home") {
      scrollTo(dest);
    } else {
      setPage({ page: "home", scrollTo: dest });
    }
  }, [page, scrollTo, setPage]);

  const navItems = [
    { id: "home",     label: "Home",     href: "/" },
    { id: "services", label: "Services", href: "/services" },
    { id: "process",  label: "Process",  href: "#process" },
    { id: "projects", label: "Work",     href: "#projects" },
    { id: "contact",  label: "Contact",  href: "/contact" },
  ];

  // Stagger variants for mobile menu links
  const menuItemVariants = {
    hidden:  { opacity: 0, y: 32, filter: "blur(4px)" },
    visible: (i) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { delay: i * 0.06 + 0.1, duration: 0.5, ease },
    }),
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} aria-hidden="true" />

      <header
        className={`header${scrolled ? " scrolled" : ""}`}
        id="header"
        role="banner"
      >
        <motion.div
          className="nav-inner"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: scrolled
              ? "rgba(9, 10, 15, 0.9)"
              : "rgba(18, 20, 29, 0.8)",
            borderColor: scrolled
              ? "rgba(245, 158, 11, 0.22)"
              : "rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            className="logo"
            onClick={(e) => handleNav("home", e)}
            aria-label="The Story Builder — home"
            style={{
              background: "none", border: "none",
              color: "#FFFDF9", whiteSpace: "nowrap",
              cursor: "pointer", textDecoration: "none",
            }}
          >
            <span style={{ color: "var(--gold-accent, #FACC15)" }}>The </span>
            Story Builder
          </a>

          {/* Desktop nav */}
          <nav
            className="nav-links"
            style={{ position: "relative" }}
            role="navigation"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`nl${isActive ? " active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => handleNav(item.id, e)}
                  style={{
                    background: "none", border: "none",
                    position: "relative", padding: "6px 14px",
                    cursor: "pointer", zIndex: 1,
                    textDecoration: "none", display: "inline-block",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      style={{
                        position: "absolute", inset: 0,
                        backgroundColor: "rgba(245, 158, 11, 0.13)",
                        borderRadius: "100px",
                        border: "1px solid rgba(245, 158, 11, 0.28)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <MagneticButton distance={0.3}>
            <a
              href="/contact"
              className="nav-cta"
              onClick={(e) => handleNav("contact", e)}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              Let's Talk
            </a>
          </MagneticButton>

          {/* Burger */}
          <button
            ref={burgerRef}
            className={`burger${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </motion.div>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="mob-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            {/* Backdrop blur layer */}
            <motion.div
              className="mob-overlay-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Nav links */}
            <nav
              className="mob-nav"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className={`mob-link-xl${activeNav === item.id ? " active" : ""}`}
                  aria-current={activeNav === item.id ? "page" : undefined}
                  onClick={(e) => handleNav(item.id, e)}
                  custom={i}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ textDecoration: "none" }}
                >
                  <span className="mob-link-num">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="/contact"
                className="btn btn-gold mob-cta-xl"
                onClick={(e) => handleNav("contact", e)}
                custom={navItems.length}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ textDecoration: "none", marginTop: "clamp(24px,5vw,40px)" }}
              >
                Book a Strategy Call →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
