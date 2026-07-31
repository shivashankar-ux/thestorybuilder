import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../utils/tracking";
import GlowCard from "./common/GlowCard";
import MagneticButton from "./common/MagneticButton";
import SplitText from "./common/SplitText";

const faqs = [
  {
    q: "How long does a typical engagement take to show results?",
    a: "Most clients see meaningful traction inside 30–60 days. We ship the website / landing pages in week 1–3, launch ads in week 2–4, and the SEO compounding shows up from month 2 onwards. Honest expectation-setting up front beats inflated promises.",
  },
  {
    q: "Do you work with our existing brand and website?",
    a: "Absolutely. About half our engagements start with an existing site or brand identity that just needs sharper positioning and a better funnel. We don't rebuild for the sake of rebuilding — only when it's actually the bottleneck.",
  },
  {
    q: "What makes your process different from a typical agency?",
    a: "Three things. (1) Every engagement is tied to revenue, not vanity metrics. (2) You own everything — accounts, dashboards, creatives, code. No vendor lock-in. (3) We publish a transparent Looker Studio dashboard so you see the same numbers we see, every day.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Most clients move into a monthly retainer after the initial build — paid ad management, SEO, CRO sprints, monthly reporting. Some hand over the keys and run it themselves; we're equally happy with either.",
  },
  {
    q: "How transparent is your reporting?",
    a: "Brutally. We publish a live Looker Studio dashboard you can open any time. Weekly written updates explain what changed and why. Monthly retros cover what worked, what didn't, and what's next. Same numbers we'd show ourselves.",
  },
  {
    q: "How do you handle confidentiality and IP?",
    a: "Standard NDAs on request, signed before any sensitive data is shared. All deliverables (code, designs, ad creatives, accounts) belong to you the moment they're produced — written into every engagement letter.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function FAQItem({ q, a, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-btn-${index}`;

  return (
    <motion.div
      className={`faq-item${isOpen ? " open" : ""}`}
      variants={cardVariants}
    >
      <button
        id={buttonId}
        className="faq-q"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          const next = isOpen ? -1 : index;
          setOpenIndex(next);
          if (next !== -1) trackEvent("faq_opened", { q });
        }}
        style={{ cursor: "pointer" }}
      >
        <span className="faq-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="faq-q-text">{q}</span>
        <motion.span
          className="faq-icon"
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function FAQ({ setPage }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq" id="faq" aria-label="Frequently asked questions">
      <div className="wrap">
        <div className="faq-layout">
          <div className="faq-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="tag">FAQ</span>
              <h2 className="sec-h">
                <SplitText text="Your questions, answered." splitBy="words" />
              </h2>
            </motion.div>

            <motion.div
              className="faq-list"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={list}
            >
              {faqs.map((f, i) => (
                <FAQItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  index={i}
                  openIndex={openIndex}
                  setOpenIndex={setOpenIndex}
                />
              ))}
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard className="faq-discover" style={{ padding: "32px", textAlign: "center" }}>
              <div className="faq-discover-avatar" aria-hidden="true" style={{ margin: "0 auto 16px" }}>
                <span>TSB</span>
              </div>
              <p className="faq-discover-eyebrow">Still not sure?</p>
              <h3 className="faq-discover-title">Book a free discovery call.</h3>
              <p className="faq-discover-sub">
                No pitch, no pressure. Just a straight conversation about your business and whether we're the right fit.
              </p>
              <MagneticButton distance={0.3}>
                <button
                  className="btn btn-gold faq-discover-cta"
                  data-track="faq_discovery_click"
                  onClick={() => setPage("contact")}
                  style={{ cursor: "pointer", width: "100%", justifyContent: "center" }}
                  aria-label="Schedule a free discovery call with The Story Builder"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 6h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Schedule Now
                </button>
              </MagneticButton>
              <span className="faq-discover-pill" style={{ marginTop: "12px", display: "inline-block" }}>cal · 30 min</span>
            </GlowCard>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
