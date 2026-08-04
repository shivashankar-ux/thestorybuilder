import { useEffect } from "react";
import Services3DDeck from "./Services3DDeck";

export default function Services({ setPage }) {
  useEffect(() => {
    const els = document.querySelectorAll(".sr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="services-section"
      id="what-we-do"
      style={{
        borderTop: "none",
        paddingTop: "clamp(90px, 12vw, 130px)",
        paddingBottom: "40px",
        scrollMarginTop: "80px",
      }}
    >
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span className="tag sr">What We Do</span>
          <h2 className="sec-h sr" style={{ marginBottom: "16px" }}>
            Services engineered for <em>growth.</em>
          </h2>
          <p className="muted sr" style={{ maxWidth: "600px", margin: "0 auto" }}>
            We provide a complete suite of digital services designed to elevate your brand and drive measurable results.
          </p>
        </div>
      </div>

      <Services3DDeck setPage={setPage} />
    </section>
  );
}


