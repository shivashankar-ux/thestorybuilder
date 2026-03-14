// 🔑 DATA DRIVEN UI: All project info lives here as a JS array.
// To add a new project — just add a new object. Zero HTML editing needed!

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
    url: "https://star-fitness-studio-builder-k2bboxtdk0nymikd.hostingersite.com",
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
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80",
    alt: "Unbent Martial Fitness website",
    tag: "Martial Arts · 2026",
    title: "Unbent Martial Fitness",
    desc: "Bold, high-energy website for a martial arts fitness brand — built to inspire action and drive sign-ups.",
    tech: ["Web Design", "UI/UX", "Responsive"],
    url: "https://unbentmartialfitness.com",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
    alt: "DigitalWithChirag website",
    tag: "Digital Marketing · 2026",
    title: "DigitalWithChirag",
    desc: "Personal brand website for a digital marketer — designed to build authority, attract clients and convert visitors.",
    tech: ["Web Design", "Personal Brand", "Responsive"],
    url: "https://digitalwithchirag.vercel.app/",
  },
];

// Arrow SVG reused in multiple places — stored as a variable
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 🔑 COMPONENT INSIDE COMPONENT: ProjectCard is its own component.
// It takes a `project` prop and renders one card. Clean and reusable.
function ProjectCard({ project }) {
  return (
    <article className="card sr" style={{ "--i": `${project.id * 0.1}s` }}>
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
            {/* 🔑 Nested .map() — loop inside a loop! */}
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

export default function Projects({ setPage }) {
  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <span className="tag sr">Portfolio</span>
        <div className="proj-header sr">
          <h2 className="sec-h">Selected <em>Work</em></h2>
          <p className="muted">A curated look at what I've built</p>
        </div>

        <div className="proj-grid">
          {/* 🔑 Render all project cards with one .map() call */}
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* CTA card — hardcoded since it's unique */}
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
      </div>
    </section>
  );
}