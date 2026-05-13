import { useEffect } from "react";

const services = [
  {
    id: 1,
    title: "Performance Marketing",
    desc: "Meta & Google ads engineered for ROAS, not vanity metrics",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14l4-4 4 4 5-5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9h4v4" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "SEO & Content",
    desc: "Inbound traffic that compounds — built on real search intent",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 21l-4.3-4.3" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Web Development",
    desc: "Mobile-first, lightning-fast websites that convert",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Brand Strategy",
    desc: "Positioning and identity that makes you the obvious choice",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" stroke="#facc15" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function About({ setPage }) {
  useEffect(() => {
    const els = document.querySelectorAll(".sr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="about" id="about">
      <div className="wrap">
        <span className="tag sr">About the Agency</span>
        <div className="about-grid">
          <div className="about-left sr sl">
            <h2 className="sec-h">
              We build brands<br /><em>that grow</em><br />in a measurable way.
            </h2>
            <p className="muted">
              <strong className="lead">Full-service digital marketing</strong> for founders and growing brands across India and beyond. We pair strategy with execution — websites, paid media, SEO and brand systems that move real numbers, not just impressions.
            </p>
            <p className="muted">
              <strong className="lead">Revenue first, vanity metrics never.</strong> Every engagement starts with the same question: what does success look like in revenue? From there we reverse-engineer the funnel, ship fast, and report honestly.
            </p>
            <button className="btn btn-gold" onClick={() => setPage("contact")} style={{ marginTop: 24 }}>
              Work With Us
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="skill-grid sr">
            {services.map((skill) => (
              <div className="sk" key={skill.id}>
                <div className="sk-ico">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
