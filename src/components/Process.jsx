import { useEffect } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive into your business, market, and numbers. What's the real bottleneck — traffic, conversion, retention, or pricing? No assumptions.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "A 90-day growth plan tied to revenue. Channels picked deliberately, KPIs defined upfront, budget mapped to each lever.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We ship — websites, funnels, ad creatives, content, automation. Built fast but never sloppy. Launch beats perfection.",
  },
  {
    num: "04",
    title: "Launch & Optimise",
    desc: "Live campaigns, real spend, real data. Daily monitoring, weekly tweaks, monthly retros. Compounding wins, not vanity sprints.",
  },
  {
    num: "05",
    title: "Report Honestly",
    desc: "Transparent dashboards. What worked, what didn't, what's next. We tell you the same numbers we'd tell ourselves.",
  },
];

export default function Process() {
  useEffect(() => {
    const els = document.querySelectorAll(".process .sr");
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
    <section className="process" id="process">
      <div className="wrap">
        <span className="tag sr">How We Work</span>
        <h2 className="sec-h sr">
          A repeatable system,<br />not <em>guesswork.</em>
        </h2>
        <p className="muted sr" style={{ maxWidth: 620, marginBottom: 56 }}>
          Five steps from kickoff to compounding growth. Same process for a ₹50k ad budget or a ₹50L one — only the lever sizes change.
        </p>

        <div className="process-grid">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="process-step sr"
              style={{ "--i": `${i * 0.08}s` }}
            >
              <span className="process-num">{s.num}</span>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
