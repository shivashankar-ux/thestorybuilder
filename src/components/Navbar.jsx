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
    const sections = ["home", "about", "process", "projects", "reels", "contact"];
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
    } else if (dest === "faq") {
      setPage("faq");
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
    { id: "home",     label: "Home",     href: "/" },
    { id: "services", label: "Services", href: "/services" },
    { id: "pricing",  label: "Pricing",  href: "/pricing" },
    { id: "projects", label: "Work",     href: "/#projects" },
    { id: "reels",    label: "Reels",    href: "/#reels" },
    { id: "faq",      label: "FAQ",      href: "/faq" },
    { id: "contact",  label: "Contact",  href: "/contact" },
  ];

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
      <div className="nav-inner">

        <a className="logo" href="/" onClick={(e) => { e.preventDefault(); handleNav("home"); }}
          style={{ background:"none", border:"none", color:"#FFFDF9", whiteSpace: "nowrap", textDecoration: "none" }}>
          <span>The </span>Story Builder
        </a>

        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nl${activeNav === item.id ? " active" : ""}`}
              onClick={(e) => { e.preventDefault(); handleNav(item.id); }}
              style={{ background:"none", border:"none", textDecoration: "none" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="/contact" onClick={(e) => { e.preventDefault(); handleNav("contact"); }} style={{ textDecoration: "none" }}>
          Let's Talk
        </a>

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
            <a key={item.id} href={item.href} className="mob-link" onClick={(e) => { e.preventDefault(); handleNav(item.id); }}
              style={{ background:"none", border:"none", textAlign:"left", width:"100%", textDecoration: "none", display: "block" }}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-gold mob-cta" href="/contact" onClick={(e) => { e.preventDefault(); handleNav("contact"); }} style={{ textDecoration: "none" }}>
            Let's Talk
          </a>
        </div>
      )}
    </header>
  );
}
