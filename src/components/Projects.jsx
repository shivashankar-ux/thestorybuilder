import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    alt: "Legacy Solar website",
    tag: "Solar Energy · 2026",
    title: "Legacy Solar",
    desc: "Professional solar energy company website with modern UI and strong conversion focus.",
    tech: ["HTML/CSS", "JavaScript", "Responsive"],
    url: "https://legacysolar.in",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=80",
    alt: "Star Fitness Studio website",
    tag: "Fitness · 2026",
    title: "Star Fitness Studio",
    desc: "High-energy fitness studio site built to attract members and showcase classes beautifully.",
    tech: ["Web Design", "UI/UX", "Mobile-first"],
    url: "https://starfitnessstudio.in",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&q=80",
    alt: "WafflesHub website",
    tag: "Food & Lifestyle · 2026",
    title: "WafflesHub",
    desc: "Modern food brand website with a clean, appetizing design built to attract customers and drive orders.",
    tech: ["Web Design", "UI/UX", "Responsive"],
    url: "https://waffleshub.com/",
  },
  {
    id: 4,
    // Chess-specific image
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    alt: "Chess Academy website",
    tag: "Education · AI · 2026",
    title: "Chess Academy",
    desc: "A next-gen chess academy platform with AI-powered features, clean layouts, and student-first UX — built to inspire the next generation of players.",
    tech: ["Next.js", "AI Features", "Responsive"],
    url: "https://chessacademy-next-js-chirag-client.vercel.app/",
  },
  // hidden behind "More"
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80",
    alt: "Unbent Martial Fitness website",
    tag: "Martial Arts · 2026",
    title: "Unbent Martial Fitness",
    desc: "Bold, high-energy website for a martial arts fitness brand — built to inspire action and drive sign-ups.",
    tech: ["Web Design", "UI/UX", "Responsive"],
    url: "https://unbentmartialfitness.com",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
    alt: "DigitalWithChirag website",
    tag: "Digital Marketing · 2026",
    title: "DigitalWithChirag",
    desc: "Personal brand website for a digital marketer — designed to build authority, attract clients and convert visitors.",
    tech: ["Web Design", "Personal Brand", "Responsive"],
    url: "https://www.digitalwithchirag.com/",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    alt: "Siolim Cafe website",
    tag: "Cafe & Dining · 2026",
    title: "Siolim Cafe",
    desc: "Warm and inviting cafe website designed to showcase the menu, ambiance and drive footfall.",
    tech: ["Web Design", "UI/UX", "Responsive"],
    url: "https://siolimcafe.vercel.app/",
  },
];

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function ProjectCard({ project }) {
  return (
    <article className="card">
      <div className="card-img-wrap">
        <img src={project.img} alt={project.alt} loading="lazy" />
        <div className="card-overlay">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
            <ArrowIcon /> Visit Site
          </a>
        </div>
      </div>
      <div className="card-body">
        <span className="card-tag">{project.tag}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="card-foot">
          <div className="tech-tags">
            {project.tech.map((t) => <span key={t}>{t}</span>)}
          </div>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="ext-link" aria-label={`Visit ${project.title}`}>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

function AIVisionBlock() {
  return (
    <div className="ai-vision-block sr">
      <div className="ai-vision-inner">
        <div className="ai-vision-img">
          <img
            src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80"
            alt="AI Voice Agents"
            loading="lazy"
          />
          <div className="ai-vision-badge">
            <span className="pulse-dot" style={{ background: "#4ade80" }} /> Live & Active
          </div>
        </div>
        <div className="ai-vision-content">
          <span className="card-tag" style={{ marginBottom: 12 }}>AI Vision · New Work · 2026</span>
          <h3 className="ai-vision-title">AI Voice Agents</h3>
          <p className="muted" style={{ marginBottom: 16 }}>
            Expanding beyond web — now building intelligent AI voice receptionists for clinics,
            dental offices, and service businesses. Agents that answer calls, book appointments,
            and handle FAQs 24/7 without missing a beat.
          </p>
          <div className="ai-vision-tags">
            <span>Vapi</span>
            <span>n8n</span>
            <span>Twilio</span>
            <span>Google Calendar</span>
            <span>WhatsApp</span>
          </div>
          <p className="ai-vision-note">
            🚀 Currently in build phase — pilot launching soon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ setPage }) {
  const [showAll, setShowAll] = useState(false);
  const extraRef = useRef(null);

  // When "More" is clicked, show all and scroll smoothly to the newly revealed cards
  const handleShowMore = () => {
    setShowAll(true);
    // slight delay so DOM renders first
    setTimeout(() => {
      if (extraRef.current) {
        extraRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  // Re-run scroll reveal on extra cards after they appear
  useEffect(() => {
    if (!showAll) return;
    const els = document.querySelectorAll(".extra-card.sr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [showAll]);

  const visible = projects.slice(0, 4);
  const hidden  = projects.slice(4);

  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <span className="tag sr">Portfolio</span>
        <div className="proj-header sr">
          <h2 className="sec-h">Selected <em>Work</em></h2>
          <p className="muted">A curated look at what I've built</p>
        </div>

        <AIVisionBlock />

        <div className="proj-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* "More" card — only shown when not expanded */}
          {!showAll && (
            <article className="card card-more">
              <div className="more-inner">
                <div className="more-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="7" cy="14" r="2.5" fill="#facc15"/>
                    <circle cx="14" cy="14" r="2.5" fill="#facc15"/>
                    <circle cx="21" cy="14" r="2.5" fill="#facc15"/>
                  </svg>
                </div>
                <h3>{hidden.length} more projects</h3>
                <p>Including fitness brands, cafés, marketing sites and more.</p>
                <button className="btn btn-gold" onClick={handleShowMore}>
                  See All Work
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </article>
          )}

          {/* CTA card always visible */}
          <article className="card card-cta sr" style={{ "--i": "0.5s" }}>
            <div className="cta-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4v20M4 14h20" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Have a project in mind?</h3>
            <p>Let's collaborate and build something amazing together.</p>
            <button className="btn btn-gold" onClick={() => setPage("contact")}>
              Start a Project
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </article>
        </div>

        {/* Extra cards revealed on "More" */}
        {showAll && (
          <div className="proj-extra-grid" ref={extraRef}>
            {hidden.map((project, i) => (
              <div key={project.id} className="extra-card sr" style={{ "--i": `${i * 0.12}s` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}