import { useState, useEffect } from "react";

export default function Navbar({ page, setPage }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [dark,      setDark]      = useState(() => {
    // Remember user's preference from localStorage
    return localStorage.getItem("theme") !== "light";
  });

  // Apply theme to <html> element whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (page !== "home") {
      setScrolled(true);
      setActiveNav("contact");
      return;
    }
    setActiveNav("home");
    const sections = ["home", "about", "projects", "contact"];
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
    } else if (page === "home") {
      scrollTo(dest);
    } else {
      setPage("home");
    }
  };

  const navItems = [
    { id: "home",     label: "Home" },
    { id: "about",    label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact",  label: "Contact" },
  ];

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
      <div className="nav-inner">

        <button className="logo" onClick={() => handleNav("home")}
          style={{ background:"none", border:"none", color:"var(--text)" }}>
          <span>S</span>hiva
        </button>

        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nl${activeNav === item.id ? " active" : ""}`}
              onClick={() => handleNav(item.id)}
              style={{ background:"none", border:"none" }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? (
            /* Sun icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            /* Moon icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <button className="nav-cta" onClick={() => handleNav("contact")}>
          Let's Talk
        </button>

        <button
          className={`burger${menuOpen ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="mob-menu open">
          {navItems.map((item) => (
            <button key={item.id} className="mob-link" onClick={() => handleNav(item.id)}
              style={{ background:"none", border:"none", textAlign:"left", width:"100%" }}>
              {item.label}
            </button>
          ))}
          {/* Theme toggle in mobile menu too */}
          <button
            className="mob-theme-toggle"
            onClick={() => setDark(!dark)}
          >
            {dark ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Switch to Light Mode
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Switch to Dark Mode
              </>
            )}
          </button>
          <button className="btn btn-gold mob-cta" onClick={() => handleNav("contact")}>
            Let's Talk
          </button>
        </div>
      )}
    </header>
  );
}