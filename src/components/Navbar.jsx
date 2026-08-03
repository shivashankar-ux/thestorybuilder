import { useState, useEffect } from "react";

export default function Navbar({ page, setPage }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeNav, setActiveNav] = useState("home");

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
    <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
      <div className="nav-inner">

        <button className="logo" onClick={() => handleNav("home")}
          style={{ background:"none", border:"none", color:"#FFFDF9", whiteSpace: "nowrap" }}>
          <span>The </span>Story Builder
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
