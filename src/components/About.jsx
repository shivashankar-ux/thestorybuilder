import { useEffect } from "react";

// 🔑 DATA IN REACT: Instead of writing HTML cards by hand,
// we store data in arrays/objects and loop over them.
// Want to add a new skill? Just add one object to the array!

const skills = [
  {
    id: 1,
    title: "UI/UX Design",
    desc: "Intuitive interfaces with stunning visual design",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Web Development",
    desc: "Clean, performant code for modern browsers",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Responsive Design",
    desc: "Pixel-perfect across all devices and screens",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#facc15" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "SEO & Performance",
    desc: "Fast-loading sites that rank and convert",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#facc15" strokeWidth="1.5"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#facc15" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export default function About({ setPage }) {
  // Scroll reveal — same IntersectionObserver logic as before
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
        <span className="tag sr">About Me</span>
        <div className="about-grid">
          <div className="about-left sr sl">
            <h2 className="sec-h">
              Crafting digital<br /><em>experiences</em><br />that leave a mark.
            </h2>
            <p className="muted">
              I'm Shiva — a web designer and entrepreneur passionate about building modern, clean websites
              that help businesses establish a powerful online presence. Every pixel is intentional, every
              interaction purposeful.
            </p>
            <p className="muted">
              From concept to deployment, I handle the full journey — blending strong design instincts
              with solid development skills to deliver work that's both beautiful and functional.
            </p>
            <button className="btn btn-gold" onClick={() => setPage("contact")} style={{ marginTop: 24 }}>
              Work With Me
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* 🔑 .map() — renders one <div class="sk"> per skill object */}
          <div className="skill-grid sr">
            {skills.map((skill) => (
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
