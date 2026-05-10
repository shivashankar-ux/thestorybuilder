import { useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "They didn't just build a website — they engineered a lead engine. Our solar enquiries doubled in the first quarter and our cost per lead is the lowest it's ever been.",
    name: "Founder",
    role: "Legacy Solar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&q=80&auto=format&fit=crop&crop=faces",
    accent: "Lead generation",
  },
  {
    id: 2,
    quote:
      "Strategy first, execution next, reporting always. The Story Builder feels like an in-house growth team — not a vendor. Best agency we've worked with, hands down.",
    name: "Director",
    role: "Chess Academy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&q=80&auto=format&fit=crop&crop=faces",
    accent: "Funnel design",
  },
  {
    id: 3,
    quote:
      "Honest reporting, sharp creative, fast turnaround. They cut our ad waste by 40% in month one and we've been scaling ever since.",
    name: "Founder",
    role: "The White Closet",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&q=80&auto=format&fit=crop&crop=faces",
    accent: "Performance ads",
  },
];

const StarRow = () => (
  <div className="stars" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#facc15">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  useEffect(() => {
    const els = document.querySelectorAll(".testimonials .sr");
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
    <section className="testimonials" id="testimonials">
      <div className="wrap">
        <span className="tag sr">Client Words</span>
        <h2 className="sec-h sr">
          What founders say<br />about <em>working with us</em>
        </h2>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <article
              key={t.id}
              className="testi-card sr"
              style={{ "--i": `${i * 0.1}s` }}
            >
              <svg className="quote-mark" width="34" height="34" viewBox="0 0 24 24" fill="#facc15" aria-hidden="true">
                <path d="M7 7h4v4H8v3a3 3 0 0 0 3 3v2a5 5 0 0 1-5-5V8a1 1 0 0 1 1-1zm9 0h4v4h-3v3a3 3 0 0 0 3 3v2a5 5 0 0 1-5-5V8a1 1 0 0 1 1-1z" />
              </svg>
              <StarRow />
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-foot">
                <img className="testi-avatar" src={t.avatar} alt={t.role} loading="lazy" />
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
                <span className="testi-accent">{t.accent}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
