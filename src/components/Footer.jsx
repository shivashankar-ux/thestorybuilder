export default function Footer({ setPage }) {
  const scrollTo = (id) => {
    if (window.location.hash !== "#home") setPage("home");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
    }, 50);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <button className="logo" onClick={() => setPage("home")}
style={{ background: "none", border: "none", fontFamily: "var(--fd)", fontSize: 22, fontWeight: 800, color: "var(--text)" }}>          <span style={{ color: "var(--gold)" }}>S</span>hiva
        </button>
        <p className="foot-copy">© 2026 Shiva. All rights reserved.</p>
        <nav className="foot-nav">
          <button onClick={() => scrollTo("about")}  style={{ background:"none", border:"none" }}>About</button>
          <button onClick={() => scrollTo("projects")} style={{ background:"none", border:"none" }}>Projects</button>
          <button onClick={() => setPage("contact")} style={{ background:"none", border:"none" }}>Contact</button>
        </nav>
      </div>
    </footer>
  );
}
