import { useEffect, useRef } from "react";
import { createTyped } from "../utils/typed";

export default function Hero({ setPage }) {
  const typedRef = useRef(null);

  useEffect(() => {
    const t = createTyped(typedRef.current, {
      strings: [
        "Performance Marketer.",
        "SEO Specialist.",
        "Paid Ads Strategist.",
        "Brand Builder.",
        "Growth Partner.",
      ],
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
          <span className="pulse-dot" /> Now onboarding clients for 2026
        </div>

        <h1 className="hero-title fi" style={{ "--i": 1 }}>
          Welcome to<br /><span className="gold-name">The Story Builder</span>
        </h1>

        <p className="hero-role fi" style={{ "--i": 2 }}>
          We're your <span ref={typedRef} />
        </p>

        <p className="hero-sub fi" style={{ "--i": 2.5 }}>
          A full-service digital marketing agency that builds brands, ships
          high-converting websites and runs ads that actually pay back.
        </p>

        <div className="hero-ctas fi" style={{ "--i": 3 }}>
          <button className="btn btn-gold" data-track="hero_view_work" onClick={() => scrollTo("projects")}>
            See Our Work
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn-ghost" data-track="hero_get_in_touch" onClick={() => window.open("https://intake-form-thestorybuilder.vercel.app/", "_blank")}>
            Book a Strategy Call
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
