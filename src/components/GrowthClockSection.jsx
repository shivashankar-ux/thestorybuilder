import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const growthPillars = [
  {
    icon: "⚡",
    title: "7-Day High-Speed Delivery",
    desc: "We build and launch high-converting, mobile-perfect websites in just 7 days — zero bloated timelines.",
  },
  {
    icon: "🎯",
    title: "ROAS-Focused Paid Ads",
    desc: "Targeted Meta & Google ad campaigns engineered to deliver positive return on ad spend from week one.",
  },
  {
    icon: "🤖",
    title: "AI Lead Capture & Automation",
    desc: "Pre-wired WhatsApp & instant AI lead alerts so no prospect is ever left waiting.",
  },
  {
    icon: "📈",
    title: "SEO & Search Dominance",
    desc: "Technical SEO and local search foundations built in so your business ranks where customers look.",
  },
];

export default function GrowthClockSection({ setPage }) {
  const [secDeg, setSecDeg] = useState(90);
  const [minDeg, setMinDeg] = useState(90);
  const [hourDeg, setHourDeg] = useState(90);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const mins = now.getMinutes();
      const hour = now.getHours();

      const secondsDegrees = (seconds / 60) * 360 + 90;
      const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
      const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;

      setSecDeg(secondsDegrees);
      setMinDeg(minsDegrees);
      setHourDeg(hourDegrees);
      setTimeString(now.toLocaleTimeString("en-US", { hour12: true }));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="growth-clock-section" id="growth">
      <div className="scramble-bg" aria-hidden="true">
        <div className="scramble-orb o-left" />
        <div className="scramble-orb o-right" />
        <div className="scramble-grid-dots" />
      </div>

      <div className="wrap">
        <div className="growth-header text-center">
          <span className="tag">TIMELY EXECUTION & RESULTS</span>
          <h2 className="sec-h">
            Every second counts.
            <br />
            <span className="gold">Here&apos;s how we help you grow your business.</span>
          </h2>
          <p className="muted max-w-2xl mx-auto">
            While your competitors wait months for strategy, we ship, scale, and optimize in real time.
          </p>
        </div>

        <div className="growth-grid">
          {/* Left Column - Live Brand Clock */}
          <motion.div
            className="growth-clock-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="clock-badge">
              <span className="pulse-dot" /> LIVE TIME · {timeString || "12:00:00 AM"}
            </div>

            <div className="brand-clock">
              <div className="outer-clock-face">
                <div className="marking marking-one" />
                <div className="marking marking-two" />
                <div className="marking marking-three" />
                <div className="marking marking-four" />
              </div>

              <div className="inner-clock-face">
                <div
                  className="hand hour-hand"
                  style={{ transform: `rotate(${hourDeg}deg)` }}
                />
                <div
                  className="hand min-hand"
                  style={{ transform: `rotate(${minDeg}deg)` }}
                />
                <div
                  className="hand second-hand"
                  style={{ transform: `rotate(${secDeg}deg)` }}
                />
              </div>
            </div>

            <div className="clock-footer">
              <strong>Time is Revenue.</strong> Let&apos;s put yours to work.
            </div>
          </motion.div>

          {/* Right Column - 4 Growth Pillars */}
          <div className="growth-pillars-grid">
            {growthPillars.map((p, idx) => (
              <motion.div
                key={idx}
                className="pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="pillar-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="growth-cta text-center">
          <button
            className="btn btn-gold btn-lg"
            onClick={() => setPage("contact")}
            data-track="growth_clock_cta"
          >
            Start Growing Your Business Today
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
