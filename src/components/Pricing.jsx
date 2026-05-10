import { useEffect } from "react";

const tiers = [
  {
    id: "starter",
    name: "Starter Spark",
    priceINR: "₹35,000",
    priceUSD: "$420",
    cadence: "/month",
    blurb: "For early-stage businesses ready to test paid growth.",
    features: [
      "Landing page or 5-page website",
      "Meta Ads management (up to ₹50k spend)",
      "Pixel + conversion tracking setup",
      "Weekly performance report",
      "Email + WhatsApp support",
    ],
    cta: "Start Small",
    track: "pricing_starter",
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth Engine",
    priceINR: "₹85,000",
    priceUSD: "$1,020",
    cadence: "/month",
    blurb: "Our most-picked plan — for brands ready to scale predictably.",
    features: [
      "Full website (up to 12 pages) + ongoing edits",
      "Meta + Google Ads (up to ₹3L combined spend)",
      "On-page SEO + monthly content",
      "Funnel + landing-page CRO sprints",
      "Bi-weekly strategy calls",
      "Custom Looker Studio dashboard",
    ],
    cta: "Scale Predictably",
    track: "pricing_growth",
    highlight: true,
  },
  {
    id: "scale",
    name: "Scale Partner",
    priceINR: "Custom",
    priceUSD: "Custom",
    cadence: "engagement",
    blurb: "For 7-figure brands ready to dominate their category.",
    features: [
      "Multi-channel ad strategy (Meta, Google, YouTube)",
      "Programmatic SEO + content engine",
      "Brand strategy + creative direction",
      "Funnel architecture + automation",
      "Dedicated growth team",
      "Weekly war-room calls",
    ],
    cta: "Talk to Founder",
    track: "pricing_scale",
    highlight: false,
  },
];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 13l4 4L19 7"
      stroke="#facc15"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Pricing({ setPage }) {
  useEffect(() => {
    const els = document.querySelectorAll(".pricing .sr");
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
    <section className="pricing" id="pricing">
      <div className="wrap">
        <span className="tag sr">Transparent Pricing</span>
        <h2 className="sec-h sr">
          Plans built around<br /><em>real outcomes.</em>
        </h2>
        <p className="muted sr" style={{ maxWidth: 620, marginBottom: 48 }}>
          No hidden fees, no setup charges, no 12-month lock-ins. INR for India,
          USD shown for international clients — all engagements month-to-month.
        </p>

        <div className="pricing-grid">
          {tiers.map((t, i) => (
            <article
              key={t.id}
              className={`tier-card sr${t.highlight ? " tier-highlight" : ""}`}
              style={{ "--i": `${i * 0.08}s` }}
            >
              {t.highlight && <span className="tier-badge">Most Popular</span>}
              <h3 className="tier-name">{t.name}</h3>
              <div className="tier-price">
                <span className="tier-inr">{t.priceINR}</span>
                <span className="tier-cadence">{t.cadence}</span>
              </div>
              <div className="tier-usd">~{t.priceUSD} USD</div>
              <p className="tier-blurb">{t.blurb}</p>

              <ul className="tier-features">
                {t.features.map((f) => (
                  <li key={f}><Check /> <span>{f}</span></li>
                ))}
              </ul>

              <button
                className={`btn ${t.highlight ? "btn-gold" : "btn-ghost"} tier-cta`}
                data-track={t.track}
                onClick={() => setPage("contact")}
              >
                {t.cta}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </article>
          ))}
        </div>

        <p className="pricing-note muted sr">
          Need something different? <button className="link-btn" onClick={() => setPage("contact")}>Tell us about your project</button> and we'll build a custom plan in 48 hours.
        </p>
      </div>
    </section>
  );
}
