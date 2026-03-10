import { useState, useEffect } from "react";

// 🔑 PROPS: Data passed INTO a component from its parent.
// App.jsx passes `page` (current page) and `setPage` (to navigate).
// Think of props like function arguments.

export default function Navbar({ page, setPage }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  // 🔑 useEffect with scroll listener
  useEffect(() => {
    if (page !== "home") {
      setScrolled(true); // contact page navbar is always "glass"
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
  }, [page]); // Re-runs whenever `page` changes

  // Smooth scroll to a section on the home page
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
    setMenuOpen(false);
  };

  // 🔑 EVENT HANDLER: Navigate or scroll depending on where we are
  const handleNav = (dest) => {
    if (dest === "contact") {
      setPage("contact");
      setMenuOpen(false);
    } else if (page === "home") {
      scrollTo(dest);
    } else {
      setPage("home");
      // After switching to home, scroll happens in App's useEffect
    }
  };

  const navItems = [
    { id: "home",     label: "Home" },
    { id: "about",    label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact",  label: "Contact" },
  ];

  return (
    // 🔑 className instead of class — JSX rule.
    // In HTML: class="header scrolled"
    // In JSX:  className={`header ${scrolled ? "scrolled" : ""}`}
    // The backtick string lets us put JS expressions inside ${}
    <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
      <div className="nav-inner">
        {/* 🔑 onClick — React's way to attach click handlers.
            In HTML: onclick="..."  In JSX: onClick={function} */}
       <button className="logo" onClick={() => handleNav("home")} 
  style={{ background:"none", border:"none", color:"var(--text)" }}>
  <span>S</span>hiva
</button>

        <nav className="nav-links">
          {/* 🔑 .map() — loops over an array and returns JSX for each item.
              This replaces writing 4 separate <a> tags by hand. */}
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
          <button className="btn btn-gold mob-cta" onClick={() => handleNav("contact")}>
            Let's Talk
          </button>
        </div>
      )}
    </header>
  );
}
