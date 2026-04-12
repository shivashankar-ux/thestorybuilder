import { useEffect, useRef } from "react";

export default function Hero({ setPage }) {
  const typedRef = useRef(null);

  useEffect(() => {
    if (!window.Typed) return;
    const t = new window.Typed(typedRef.current, {
      strings: ["Web Designer.", "Web Developer.", "AI Builder.", "Voice Agent Creator.", "Brand Builder."],
      typeSpeed: 58, backSpeed: 32, backDelay: 1800,
      startDelay: 600, loop: true, smartBackspace: true,
    });
    return () => t.destroy();
  }, []);

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
          Hello, I'm<br /><span className="gold-name">The Story Builder</span>
        </h1>

        <p className="hero-role fi" style={{ "--i": 2 }}>
          I'm a <span ref={typedRef} />
        </p>

        <p className="hero-sub fi" style={{ "--i": 3 }}>
          I craft modern, high-performance websites and AI-powered experiences that help businesses and startups stand out online.
        </p>

        <div className="hero-ctas fi" style={{ "--i": 4 }}>
          <button className="btn btn-gold" onClick={() => scrollTo("projects")}>
            View My Work
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn-ghost" onClick={() => window.open("https://intake-form-thestorybuilder.vercel.app/", "_blank")}>
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
