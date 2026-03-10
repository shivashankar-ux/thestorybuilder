import { useEffect, useRef } from "react";

// 🔑 setPage is passed as a PROP so this component can navigate
export default function Hero({ setPage }) {
  const typedRef = useRef(null);

  useEffect(() => {
    // Typed.js is loaded via CDN in index.html — same as before.
    // We wait for it to be available on window.
    if (!window.Typed) return;
    const t = new window.Typed(typedRef.current, {
      strings: ["Web Designer.", "Web Developer.", "UI/UX Designer.", "Freelancer.", "Brand Builder."],
      typeSpeed: 58, backSpeed: 32, backDelay: 1800,
      startDelay: 600, loop: true, smartBackspace: true,
    });
    return () => t.destroy(); // cleanup on unmount
  }, []);

  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
        <div className="dots" />
      </div>

      <div className="hero-body">
        <div className="avail fi" style={{ "--i": 0 }}>
          <span className="pulse-dot" /> Available for freelance work
        </div>

        <h1 className="hero-title fi" style={{ "--i": 1 }}>
          Hello, I'm<br /><span className="gold-name">Shiva</span>
        </h1>

        <p className="hero-role fi" style={{ "--i": 2 }}>
          I'm a <span ref={typedRef} />
        </p>

        <p className="hero-sub fi" style={{ "--i": 3 }}>
          I craft modern, high-performance websites that help businesses and startups stand out online.
        </p>

        <div className="hero-ctas fi" style={{ "--i": 4 }}>
          {/* 🔑 onClick with arrow function — a clean one-liner handler */}
          <button className="btn btn-gold" onClick={() => scrollTo("projects")}>
            View My Work
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* 🔑 Navigating to another "page" — we call setPage, no href needed */}
          <button className="btn btn-ghost" onClick={() => setPage("contact")}>
            Get In Touch
          </button>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <div className="sh-track"><div className="sh-bar" /></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
