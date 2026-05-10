import { useEffect } from "react";

const projects = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80",
    alt: "Legacy Solar website",
    tag: "Solar Energy · Lead Generation",
    title: "Legacy Solar",
    desc: "Conversion-focused website backed by paid search and SEO — built to capture high-intent solar leads and turn page visits into qualified consultations.",
    services: ["Web Development", "SEO", "Performance Marketing"],
    metric: "Lead-gen funnel",
    url: "https://legacysolar.in",
    caseSlug: "legacy-solar",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1200&q=80",
    alt: "Star Fitness Studio website",
    tag: "Fitness · Local Growth",
    title: "Star Fitness Studio",
    desc: "Mobile-first studio site engineered with local SEO and Meta ads to drive consistent membership sign-ups across the city.",
    services: ["Web Development", "Local SEO", "Meta Ads"],
    metric: "Membership growth",
    url: "https://starfitnessstudio.in",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=1200&q=80",
    alt: "WafflesHub website",
    tag: "Food & Beverage · D2C",
    title: "WafflesHub",
    desc: "Appetising D2C brand experience with an order-driven layout and Meta retargeting in place to keep customers coming back.",
    services: ["Brand Strategy", "Web Development", "Meta Ads"],
    metric: "Online orders",
    url: "https://waffleshub.com/",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&q=80",
    alt: "Chess Academy website",
    tag: "Education · AI",
    title: "Chess Academy",
    desc: "AI-powered education platform built on Next.js with a student-first funnel — clean acquisition flow, automated nurture, and conversion-led design.",
    services: ["Next.js Development", "Funnel Design", "AI Integration"],
    metric: "Student acquisition",
    url: "https://chessacademy-next-js-chirag-client.vercel.app/",
    caseSlug: "chess-academy",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&q=80",
    alt: "Unbent Martial Fitness website",
    tag: "Martial Arts · Performance Ads",
    title: "Unbent Martial Fitness",
    desc: "Bold, high-energy brand site paired with performance ad campaigns engineered to drive trial sign-ups and walk-ins.",
    services: ["Brand Strategy", "Web Development", "Paid Ads"],
    metric: "Trial sign-ups",
    url: "https://unbentmartialfitness.com",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80",
    alt: "DigitalWithChirag website",
    tag: "Personal Brand · Authority",
    title: "DigitalWithChirag",
    desc: "Personal brand experience built to position the founder as a category authority — credibility-led design plus content-led SEO for inbound clients.",
    services: ["Personal Branding", "Web Development", "Content SEO"],
    metric: "Inbound enquiries",
    url: "https://www.digitalwithchirag.com/",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
    alt: "Siolim Cafe website",
    tag: "Hospitality · Local SEO",
    title: "Siolim Cafe",
    desc: "Warm, mobile-first hospitality site optimised for Google Maps and 'near-me' search — designed to convert browsers into walk-in customers.",
    services: ["Web Development", "Local SEO", "Google Business"],
    metric: "Footfall growth",
    url: "https://siolimcafe.vercel.app/",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80",
    alt: "SevAction Foundation website",
    tag: "Non-Profit · Donations",
    title: "SevAction Foundation",
    desc: "Mission-driven non-profit website engineered to communicate impact and convert empathy into donations — clear story, clear ask, frictionless giving.",
    services: ["Web Development", "Donation Funnel", "Storytelling"],
    metric: "Donation conversions",
    url: "https://sevactionfoundation.in/",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80",
    alt: "The White Closet website",
    tag: "Fashion · D2C E-Commerce",
    title: "The White Closet",
    desc: "Elegant fashion D2C storefront built for the modern shopper — curated visual story, optimised product pages, and Meta ads tuned for ROAS.",
    services: ["E-Commerce", "Web Development", "Meta Ads"],
    metric: "Return on Ad Spend",
    url: "https://the-white-closet.vercel.app/",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=1200&q=80",
    alt: "CheckVsMate Academy website",
    tag: "Education · Coaching Funnel",
    title: "CheckVsMate Academy",
    desc: "Premium chess coaching platform with a multi-step enrolment funnel, parent-first messaging, and search-led acquisition for serious students.",
    services: ["Web Development", "Funnel Design", "SEO"],
    metric: "Course enrolments",
    url: "https://www.checkvsmateacademy.com/",
  },
];

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function ShowcaseRow({ project, index, navigate }) {
  const reversed = index % 2 === 1;
  return (
    <article
      className={`showcase-row sr ${reversed ? "reversed" : ""}`}
      style={{ "--i": `${index * 0.08}s` }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="showcase-media"
        aria-label={`Visit ${project.title}`}
      >
        <img src={project.img} alt={project.alt} loading="lazy" />
        <span className="showcase-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="showcase-hover">
          <span className="showcase-hover-btn">
            <ArrowIcon /> Visit Live Site
          </span>
        </div>
      </a>

      <div className="showcase-body">
        <span className="card-tag">{project.tag}</span>
        <h3 className="showcase-title">{project.title}</h3>
        <p className="showcase-desc">{project.desc}</p>

        <div className="showcase-services">
          {project.services.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>

        <div className="showcase-foot">
          <div className="showcase-metric">
            <span className="metric-dot" />
            <span>{project.metric}</span>
          </div>
          <div className="showcase-actions">
            {project.caseSlug && navigate && (
              <button
                type="button"
                className="showcase-link showcase-case"
                data-track={`case_${project.caseSlug}`}
                onClick={() => navigate({ page: "case", caseSlug: project.caseSlug })}
              >
                Read Case Study <ArrowIcon />
              </button>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="showcase-link"
            >
              View Live <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects({ setPage, navigate }) {
  useEffect(() => {
    const els = document.querySelectorAll(".projects .sr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <span className="tag sr">Selected Work</span>
        <div className="proj-header sr">
          <h2 className="sec-h">
            Brands we've helped <em>grow</em>
          </h2>
          <p className="muted">
            Performance marketing, SEO, and high-converting websites — built for measurable outcomes.
          </p>
        </div>

        <div className="showcase-list">
          {projects.map((project, i) => (
            <ShowcaseRow key={project.id} project={project} index={i} navigate={navigate} />
          ))}
        </div>

        <article className="card card-cta sr showcase-cta" style={{ "--i": "0.4s" }}>
          <div className="cta-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4v20M4 14h20" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <h3>Ready to be the next case study?</h3>
          <p>Tell us about your business — we'll map a growth plan in 48 hours.</p>
          <button className="btn btn-gold" data-track="projects_start_project" onClick={() => setPage("contact")}>
            Start a Project
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </article>
      </div>
    </section>
  );
}
