import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../utils/tracking";

const WA_HREF =
  "https://wa.me/918341928526?text=" +
  encodeURIComponent("Hi! I'd like to book the free 1:1 consultation to build a better website.");

const TEL_HREF = "tel:+918341928526";

const BG       = "#f5f2eb";
const CARD     = "#e8e3d8";
const INK      = "#0e0e0e";
const INK_SOFT = "#5b5b5b";
const ORANGE   = "#f76b3a";
const ORANGE_GRAD = "linear-gradient(180deg, #ff9558 0%, #f76b3a 100%)";

const benefits = [
  "A website designed and built to convert visitors into customers — not just look pretty",
  "Live in 14 days for most projects — no drawn-out timelines or hidden costs",
  "Conversion-focused copy and design baked in — clear CTAs, sharp positioning, real outcomes",
  "Mobile-optimised, fast-loading, and search-friendly from day one",
];

const stats = [
  { value: "10+",   label: "WEBSITES LAUNCHED" },
  { value: "14d",   label: "AVG BUILD TIME" },
  { value: "100%",  label: "MOBILE-RESPONSIVE" },
  { value: "5★",    label: "CLIENT RATING" },
];

const projectShowcase = [
  { img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80", title: "Legacy Solar",          tag: "Solar · Lead Gen" },
  { img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&q=80", title: "Star Fitness Studio",   tag: "Fitness · Local" },
  { img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80", title: "WafflesHub",            tag: "F&B · D2C" },
  { img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80", title: "Chess Academy",        tag: "EdTech · AI" },
  { img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80", title: "Unbent Martial Fitness", tag: "Fitness · Brand" },
  { img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80", title: "DigitalWithChirag",    tag: "Personal Brand" },
  { img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80", title: "Siolim Cafe",            tag: "Hospitality · Local SEO" },
  { img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80", title: "SevAction Foundation", tag: "Non-Profit · Donations" },
  { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", title: "The White Closet",     tag: "Interior Design" },
];

const whatYouGet = [
  {
    title: "Custom design built for your business",
    desc: "No templates. Every page designed around what your visitors actually need to do.",
  },
  {
    title: "Mobile, tablet, desktop — pixel-perfect",
    desc: "Looks just as sharp on a phone as it does on a laptop. Most of your visitors will be on mobile.",
  },
  {
    title: "Fast loading under 3 seconds",
    desc: "Optimised images, lazy loading, Core Web Vitals checked. Faster sites convert better and rank higher.",
  },
  {
    title: "Search-ready foundation",
    desc: "Meta tags, sitemap, semantic HTML, robots.txt — everything Google needs to find and index you.",
  },
  {
    title: "Conversion-focused copy & CTAs",
    desc: "Clear next step on every page so visitors don't wander off. Words written to sell, not just describe.",
  },
  {
    title: "WhatsApp + contact form built in",
    desc: "Pre-wired so leads come straight to your phone or inbox. No setup work on your end.",
  },
  {
    title: "Domain & hosting setup",
    desc: "We sort out the boring technical bits — DNS, SSL, hosting — so you don't have to figure them out.",
  },
  {
    title: "You own everything",
    desc: "Code, content, accounts — all handed over with a short training so you can update text yourself.",
  },
];

const faqs = [
  {
    q: "Is this really free?",
    a: "Yes — the 30-min strategy call has zero cost and zero commitment. We'll audit your current site or talk through your goals, and you'll leave with a clear plan whether you hire us or not.",
  },
  {
    q: "Do I have to hire you after the call?",
    a: "No. About half the people we talk to walk away with the plan and execute it themselves — we're only the right fit if you actually need a partner. The call helps both of us figure that out.",
  },
  {
    q: "I don't have a website yet — is this for me?",
    a: "Especially for you. We'll talk through what kind of website your business actually needs, what it should cost, and how fast it can ship. No assumptions, no upsells.",
  },
  {
    q: "I already have a website — can you redesign it?",
    a: "Yes — most of our work is redesigns. We'll audit what's not working (design, copy, conversion path, page speed, SEO) and map out exactly what to fix.",
  },
  {
    q: "How long does building or redesigning a website take?",
    a: "Live in 14 days for most projects. Bigger builds (e-commerce, multi-language, custom integrations) typically run 3–4 weeks. We'll quote a real timeline on the call, not a salesy one.",
  },
  {
    q: "What does a website cost?",
    a: "It depends on what you actually need — a 5-page brochure site, a lead-generation landing page, and an e-commerce store all sit at different price points. We'll give you a real, honest quote on the call — not a vague 'starts from' range or a high-pressure 'limited-time' offer.",
  },
];

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.05 0C5.5 0 .15 5.35.15 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.35-1.65a11.85 11.85 0 0 0 5.7 1.45h.01c6.55 0 11.9-5.35 11.9-11.9 0-3.18-1.24-6.17-3.46-8.4zM12.05 21.6h-.01a9.7 9.7 0 0 1-4.95-1.35l-.36-.21-3.77.98 1.01-3.67-.23-.38a9.7 9.7 0 0 1-1.5-5.17c0-5.39 4.4-9.78 9.81-9.78 2.62 0 5.07 1.02 6.92 2.86a9.7 9.7 0 0 1 2.87 6.93c0 5.39-4.39 9.79-9.79 9.79zm5.36-7.34c-.29-.15-1.74-.86-2-.96-.27-.1-.46-.15-.66.15s-.76.96-.93 1.16-.34.22-.63.07c-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.57-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.04 2.81 1.19 3c.15.19 2.05 3.13 4.97 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.74-.71 1.99-1.4.24-.69.24-1.27.17-1.4-.07-.13-.27-.2-.56-.34z"/>
  </svg>
);

const PhoneIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

function InlineCTA({ track, label }) {
  return (
    <motion.a
      href={TEL_HREF}
      data-track={track}
      onClick={() => trackEvent(track)}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: "linear-gradient(180deg, #2ee06f 0%, #1bb558 100%)",
        color: "#fff",
        padding: "16px 32px",
        borderRadius: 12,
        fontWeight: 900,
        fontSize: 15,
        letterSpacing: 0.5,
        textDecoration: "none",
        boxShadow: "0 10px 26px rgba(34,197,94,.32)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
      }}
    >
      <PhoneIcon size={18} />
      {label}
    </motion.a>
  );
}

function FAQItem({ q, a, isOpen, onToggle, isLast }) {
  return (
    <div style={{
      borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,.1)",
    }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          padding: "22px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: INK,
          fontSize: 17,
          fontWeight: 600,
          fontFamily: "inherit",
          letterSpacing: -0.1,
        }}
      >
        <span>{q}</span>
        <span
          aria-hidden="true"
          style={{
            color: ORANGE,
            fontSize: 26,
            fontWeight: 300,
            flexShrink: 0,
            marginLeft: 20,
            lineHeight: 1,
            transition: "transform 0.25s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >+</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              margin: 0,
              padding: "0 0 22px 0",
              fontSize: 15.5,
              color: INK_SOFT,
              lineHeight: 1.65,
              maxWidth: 760,
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(-1);

  useLayoutEffect(() => {
    const prevBodyBg = document.body.style.background;
    const prevHtmlBg = document.documentElement.style.background;
    document.body.style.background = BG;
    document.documentElement.style.background = BG;

    // SEO meta tags scoped to /landing — restored when the user leaves
    const prevTitle = document.title;
    document.title =
      "Website Design & Redesign for Small Businesses in India | The Story Builder";

    const setMeta = (selector, value) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const prev = el.getAttribute("content");
      el.setAttribute("content", value);
      return { el, prev };
    };

    const DESC =
      "Get a high-converting website built for your business — new build or full redesign. A website studio that designs sites built to turn visitors into customers. Free 30-min strategy call, no pitch, no commitment.";

    const desc      = setMeta('meta[name="description"]', DESC);
    const ogTitle   = setMeta('meta[property="og:title"]',       "Website Design & Redesign for Small Businesses in India | The Story Builder");
    const ogDesc    = setMeta('meta[property="og:description"]', DESC);
    const twTitle   = setMeta('meta[name="twitter:title"]',      "Website Design & Redesign for Small Businesses in India | The Story Builder");
    const twDesc    = setMeta('meta[name="twitter:description"]', DESC);
    const keywords  = setMeta('meta[name="keywords"]',
      "website design, website redesign, small business website, high-converting website, website for business, redo my website, website that brings customers, website design India, website design studio, business website, affordable website design, custom website design, web design India, website rebuild, landing page design"
    );

    return () => {
      document.body.style.background = prevBodyBg;
      document.documentElement.style.background = prevHtmlBg;
      document.title = prevTitle;
      [desc, ogTitle, ogDesc, twTitle, twDesc, keywords].forEach((m) => {
        if (m && m.prev !== null) m.el.setAttribute("content", m.prev);
      });
    };
  }, []);

  return (
    <div style={{ background: BG, color: INK, minHeight: "100vh" }}>

      {/* ============ HERO ============ */}
      <section style={{ padding: "70px 20px 30px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Orange announcement pill (overlaps card) */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: ORANGE_GRAD,
                color: "#fff",
                padding: "18px 32px",
                borderRadius: 14,
                fontWeight: 800,
                fontSize: 16,
                lineHeight: 1.45,
                textAlign: "center",
                boxShadow: "0 10px 28px rgba(247,107,58,.28)",
                maxWidth: 520,
                position: "relative",
                top: 28,
                zIndex: 2,
                letterSpacing: 0.3,
              }}
            >
              FREE WEBSITE STRATEGY CALL<br />
              NEW SITES &amp; REDESIGNS<br />
              THAT BRING REAL CUSTOMERS
            </motion.div>
          </div>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: CARD,
              borderRadius: 24,
              padding: "70px 30px 50px",
              textAlign: "center",
            }}
          >
            <h1 style={{
              fontSize: "clamp(28px, 4.4vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: INK,
              margin: 0,
              maxWidth: 760,
              marginInline: "auto",
              letterSpacing: -0.5,
            }}>
              Get a High-Converting Website<br />
              That Brings You <em style={{ color: ORANGE, fontStyle: "normal" }}>Real Customers</em>
            </h1>

            <div style={{
              height: 1,
              background: "rgba(0,0,0,.15)",
              margin: "32px auto",
              maxWidth: 220,
            }} />

            <p style={{
              fontSize: 17,
              color: INK_SOFT,
              margin: 0,
              maxWidth: 580,
              marginInline: "auto",
              lineHeight: 1.55,
            }}>
              Whether you don&apos;t have a website yet or your current one isn&apos;t bringing customers — book a free 30-min strategy call. We&apos;ll map out exactly what to build, redesign, or fix.
            </p>

            <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <InlineCTA track="landing_hero_cta" label="BOOK YOUR FREE CALL" />
            </div>
            <p style={{
              fontSize: 13,
              color: INK_SOFT,
              marginTop: 12,
              marginBottom: 0,
            }}>
              30 minutes · No pitch · No commitment
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ FOUNDER COMPOSITION — photo overlaps dark card ============ */}
      <section style={{ padding: "40px 20px 30px" }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 40,
          alignItems: "center",
        }}>

          {/* LEFT — Photo + dark card stacked, photo's lower body overlaps card top */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Photo — sized & in normal flow, negative margin pulls card up */}
            <img
              src="/shiva-landing.png"
              alt="Shiva Shankar, founder of The Story Builder"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = "1";
                  e.currentTarget.src = "/shiva.jpg";
                }
              }}
              style={{
                width: "100%",
                maxWidth: 300,
                height: "auto",
                display: "block",
                marginBottom: -80,
                position: "relative",
                zIndex: 2,
                filter: "drop-shadow(0 18px 28px rgba(0,0,0,.15))",
                pointerEvents: "none",
              }}
            />

            {/* Dark statement card — photo's lower 80px overlaps its top */}
            <div style={{
              background: "#0e0e0e",
              color: "#fff",
              padding: "100px 28px 26px",
              borderRadius: 18,
              width: "100%",
              maxWidth: 400,
              position: "relative",
              zIndex: 1,
              boxShadow: "0 18px 40px rgba(0,0,0,.18)",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: 11,
                color: "rgba(255,255,255,.55)",
                letterSpacing: 2,
                fontWeight: 700,
              }}>
                I&apos;LL BE YOUR STRATEGIST
              </div>
              <div style={{
                fontSize: 30,
                fontWeight: 900,
                color: ORANGE,
                lineHeight: 1,
                letterSpacing: -0.8,
                marginTop: 8,
              }}>
                SHIVA SHANKAR
              </div>
              <div style={{
                fontSize: 13,
                color: "rgba(255,255,255,.6)",
                marginTop: 6,
              }}>
                Founder · The Story Builder
              </div>
              <div style={{
                height: 1,
                background: "rgba(255,255,255,.12)",
                margin: "16px auto 14px",
                width: 60,
              }} />
              <div style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.3,
              }}>
                I&apos;ll tell you whether you need a{" "}
                <span style={{ color: ORANGE }}>new website, a redesign,</span>
                <br />
                or just a fix.
              </div>
              <div style={{
                display: "flex",
                gap: 28,
                marginTop: 18,
                justifyContent: "center",
              }}>
                <div>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#fff",
                    lineHeight: 1,
                    letterSpacing: -0.5,
                  }}>
                    10+
                  </div>
                  <div style={{
                    fontSize: 10.5,
                    color: "rgba(255,255,255,.55)",
                    letterSpacing: 1,
                    marginTop: 4,
                    fontWeight: 600,
                  }}>
                    BRANDS LAUNCHED
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#fff",
                    lineHeight: 1,
                    letterSpacing: -0.5,
                  }}>
                    14
                  </div>
                  <div style={{
                    fontSize: 10.5,
                    color: "rgba(255,255,255,.55)",
                    letterSpacing: 1,
                    marginTop: 4,
                    fontWeight: 600,
                  }}>
                    DAYS AVG BUILD
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — What Happens On The Call card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              background: "#fff",
              padding: "30px 32px",
              borderRadius: 18,
              border: "1px solid rgba(0,0,0,.06)",
              boxShadow: "0 6px 24px rgba(0,0,0,.06)",
            }}
          >
            <h3 style={{
              fontSize: 22,
              fontWeight: 800,
              color: INK,
              margin: 0,
              marginBottom: 18,
            }}>
              What Happens On The Call
            </h3>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              {benefits.map((b, i) => (
                <li key={i} style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  fontSize: 15.5,
                  color: INK,
                  lineHeight: 1.5,
                }}>
                  <span style={{
                    background: ORANGE,
                    color: "#fff",
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                    flexShrink: 0,
                    marginTop: 1,
                  }}>✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section style={{ padding: "10px 20px 30px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 8,
              padding: "28px 24px",
              background: "#fff",
              borderRadius: 18,
              border: "1px solid rgba(0,0,0,.06)",
              boxShadow: "0 4px 22px rgba(0,0,0,.05)",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: "4px 8px",
                  borderRight: i < stats.length - 1 ? "1px dashed rgba(0,0,0,.1)" : "none",
                }}
              >
                <div style={{
                  fontSize: "clamp(28px, 3.6vw, 38px)",
                  fontWeight: 900,
                  color: ORANGE,
                  lineHeight: 1,
                  letterSpacing: -1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 11,
                  color: INK_SOFT,
                  letterSpacing: 1.5,
                  marginTop: 8,
                  fontWeight: 700,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED IN YOUR WEBSITE — concrete deliverables ============ */}
      <section style={{ padding: "30px 20px 50px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: 36 }}
          >
            <h2 style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 900,
              color: INK,
              letterSpacing: -0.8,
              margin: 0,
              marginBottom: 10,
            }}>
              WHAT&apos;S INCLUDED IN YOUR WEBSITE
            </h2>
            <p style={{
              fontSize: 16,
              color: INK_SOFT,
              margin: 0,
              maxWidth: 580,
              marginInline: "auto",
              lineHeight: 1.55,
            }}>
              Every website we build comes with these — no upsells, no &quot;starter package&quot; tricks.
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
          }}>
            {whatYouGet.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,.06)",
                  borderRadius: 14,
                  padding: "22px 22px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  boxShadow: "0 2px 12px rgba(0,0,0,.03)",
                }}
              >
                <span style={{
                  background: ORANGE,
                  color: "#fff",
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 800,
                  flexShrink: 0,
                  marginTop: 2,
                }}>✓</span>
                <div>
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: INK,
                    margin: 0,
                    marginBottom: 5,
                    lineHeight: 1.3,
                    letterSpacing: -0.2,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: 14,
                    color: INK_SOFT,
                    margin: 0,
                    lineHeight: 1.55,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA after deliverables grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginTop: 40 }}
          >
            <InlineCTA track="landing_whats_included_cta" label="GET YOUR WEBSITE BUILT" />
            <p style={{
              fontSize: 13,
              color: INK_SOFT,
              marginTop: 12,
              marginBottom: 0,
            }}>
              Free 30-min call · Real quote · No pressure
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ PROJECT MARQUEE — left-to-right infinite scroll ============ */}
      <section style={{ padding: "30px 0 50px" }}>
        <div style={{ textAlign: "center", padding: "0 20px 26px" }}>
          <p style={{
            fontSize: 12,
            color: INK_SOFT,
            letterSpacing: 2.5,
            margin: 0,
            marginBottom: 8,
            fontWeight: 700,
          }}>
            WEBSITES WE&apos;VE BUILT
          </p>
          <h3 style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 900,
            color: INK,
            letterSpacing: -0.5,
            margin: 0,
          }}>
            Real businesses. Real websites. Real customers.
          </h3>
        </div>

        <div style={{ overflow: "hidden", position: "relative" }}>
          {/* fade edges */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 80,
            height: "100%",
            background: `linear-gradient(90deg, ${BG} 0%, transparent 100%)`,
            zIndex: 2,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 80,
            height: "100%",
            background: `linear-gradient(-90deg, ${BG} 0%, transparent 100%)`,
            zIndex: 2,
            pointerEvents: "none",
          }} />

          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{
              display: "flex",
              gap: 20,
              width: "max-content",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {[...projectShowcase, ...projectShowcase].map((p, i) => (
              <div
                key={i}
                style={{
                  width: 280,
                  flexShrink: 0,
                  background: "#fff",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,.06)",
                  boxShadow: "0 6px 22px rgba(0,0,0,.06)",
                }}
              >
                <div style={{
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  background: "#eee",
                }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ padding: "14px 18px 16px" }}>
                  <div style={{
                    fontSize: 11,
                    color: ORANGE,
                    letterSpacing: 1.2,
                    marginBottom: 5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}>
                    {p.tag}
                  </div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: INK,
                    lineHeight: 1.25,
                    letterSpacing: -0.2,
                  }}>
                    {p.title}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ ABOUT SHIVA SHANKAR — credibility section, Rajiv-style ============ */}
      <section style={{ padding: "60px 20px 70px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Section header */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "clamp(28px, 4.2vw, 44px)",
              fontWeight: 900,
              color: INK,
              letterSpacing: -0.8,
              margin: 0,
              marginBottom: 22,
            }}
          >
            ABOUT SHIVA SHANKAR
          </motion.h2>

          {/* Top divider */}
          <div style={{ height: 1, background: "rgba(0,0,0,.12)", marginBottom: 28 }} />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontSize: "clamp(20px, 2.4vw, 26px)",
              fontWeight: 500,
              color: INK,
              lineHeight: 1.35,
              margin: 0,
              marginBottom: 28,
              maxWidth: 720,
              letterSpacing: -0.2,
            }}
          >
            I&apos;m not here to sell you a website. I&apos;m here because most
            businesses are wasting money on sites that don&apos;t bring customers.
          </motion.p>

          {/* Bottom divider */}
          <div style={{ height: 1, background: "rgba(0,0,0,.12)", marginBottom: 40 }} />

          {/* 2-col body + photo */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 48,
            alignItems: "start",
          }}>
            {/* LEFT — body paragraphs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <p style={{
                fontSize: 16,
                color: INK,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 540,
              }}>
                Shiva founded <strong>The Story Builder</strong> after watching
                the same pattern repeat — businesses spending lakhs on websites
                that look great but never bring customers. Since then, the
                studio has shipped <strong>10+ high-converting websites</strong> for
                ambitious businesses across India and beyond — most live in
                under 14 days, all built around one question: <em>does this
                actually turn visitors into paying customers?</em>
              </p>
              <p style={{
                fontSize: 16,
                color: INK,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 540,
              }}>
                He says the things most web designers won&apos;t — that the problem
                usually isn&apos;t prettier visuals, it&apos;s a clearer conversion
                path. That a beautiful homepage without a clear next step is just
                an expensive brochure. That fast, mobile-friendly, search-ready
                basics matter more than flashy animations.
              </p>
              <p style={{
                fontSize: 16,
                color: INK,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 540,
              }}>
                You don&apos;t have to hire The Story Builder after this call.
                But you&apos;ll leave with a clearer picture of what&apos;s
                actually broken on your website — and exactly what it would
                take to fix it.
              </p>
            </motion.div>

            {/* RIGHT — photo (cropped chest-up, vertically centred in column) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/shiva-about.png"
                alt="Shiva Shankar, founder of The Story Builder"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = "1";
                    e.currentTarget.src = "/shiva-landing.png";
                  }
                }}
                style={{
                  width: "100%",
                  maxWidth: 340,
                  height: "auto",
                  display: "block",
                  clipPath: "inset(0 0 26% 0)",
                  filter: "drop-shadow(0 18px 28px rgba(0,0,0,.12))",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ FAQ — Honest Answers To Real Questions ============ */}
      <section style={{ padding: "30px 20px 60px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 900,
              color: INK,
              letterSpacing: -0.8,
              margin: 0,
              marginBottom: 36,
              textAlign: "center",
            }}
          >
            HONEST ANSWERS TO REAL QUESTIONS
          </motion.h2>

          <div style={{ borderTop: "1px solid rgba(0,0,0,.1)" }}>
            {faqs.map((f, i) => (
              <FAQItem
                key={i}
                q={f.q}
                a={f.a}
                isOpen={openFaq === i}
                onToggle={() => {
                  const next = openFaq === i ? -1 : i;
                  setOpenFaq(next);
                  if (next !== -1) trackEvent("landing_faq_opened", { q: f.q });
                }}
                isLast={i === faqs.length - 1}
              />
            ))}
          </div>

          {/* Soft CTA card after FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,.06)",
              borderRadius: 16,
              padding: "26px 28px",
              marginTop: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              boxShadow: "0 4px 18px rgba(0,0,0,.04)",
            }}
          >
            <div style={{ flex: "1 1 240px" }}>
              <div style={{
                fontWeight: 800,
                fontSize: 18,
                color: INK,
                lineHeight: 1.3,
              }}>
                Still have questions?
              </div>
              <div style={{
                fontSize: 14,
                color: INK_SOFT,
                marginTop: 6,
                lineHeight: 1.5,
              }}>
                Give us a call — we answer during business hours, IST.
              </div>
            </div>
            <InlineCTA track="landing_faq_cta" label="CALL US NOW" />
          </motion.div>
        </div>
      </section>

      {/* ============ DARK CLOSER — final pitch before sticky bar ============ */}
      <section style={{
        background: "#0a0a0a",
        padding: "80px 20px 130px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* subtle radial glow behind headline */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(247,107,58,.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: 880,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.25,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            You Can Keep Wondering Why Your Website<br />
            Isn&apos;t Bringing Customers.<br />
            <span style={{ color: ORANGE }}>Or You Can Find Out In 30 Minutes.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,.6)",
              margin: "26px auto 0",
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            No fluff. No hard sell. Just the most honest 30 minutes your website has ever had.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.12)",
              padding: "14px 28px",
              borderRadius: 12,
              marginTop: 32,
              color: "rgba(255,255,255,.88)",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            FREE — and a real, honest quote if you want one.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            style={{ marginTop: 36 }}
          >
            <motion.a
              href={TEL_HREF}
              data-track="landing_closer_call"
              onClick={() => trackEvent("landing_closer_call")}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "linear-gradient(180deg, #2ee06f 0%, #1bb558 100%)",
                color: "#fff",
                padding: "20px 48px",
                borderRadius: 12,
                fontWeight: 900,
                fontSize: 17,
                letterSpacing: 0.6,
                textDecoration: "none",
                boxShadow: "0 12px 32px rgba(34,197,94,.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <PhoneIcon size={20} />
              CALL FOR FREE 1:1
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px 28px",
              color: "rgba(255,255,255,.5)",
              fontSize: 13.5,
            }}
          >
            <span><span style={{ color: ORANGE, marginRight: 6 }}>●</span>30 mins</span>
            <span><span style={{ color: ORANGE, marginRight: 6 }}>●</span>Phone or video</span>
            <span><span style={{ color: ORANGE, marginRight: 6 }}>●</span>100% no commitment</span>
          </motion.div>
        </div>
      </section>

      {/* ============ STICKY FLOATING CTA PILL — rounded, centred, breathing room from edges ============ */}
      <div style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: 920,
        background: "#0f0f0f",
        padding: "12px 18px",
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 100,
        boxShadow: "0 18px 48px rgba(0,0,0,.45), 0 4px 14px rgba(0,0,0,.22)",
        gap: 18,
      }}>
        {/* LEFT — brand wordmark + divider + tagline */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flex: "1 1 auto",
          minWidth: 0,
        }}>
          {/* Brand wordmark */}
          <div style={{
            flexShrink: 0,
            borderRight: "1px solid rgba(255,255,255,.15)",
            paddingRight: 20,
          }}>
            <div style={{
              fontSize: 17,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: -0.3,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}>
              The Story Builder
            </div>
            <div style={{
              fontSize: 10,
              color: ORANGE,
              letterSpacing: 2.5,
              marginTop: 5,
              fontWeight: 800,
            }}>
              WEBSITE STUDIO
            </div>
          </div>

          {/* Tagline */}
          <div style={{ minWidth: 0 }}>
            <div style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              lineHeight: 1.3,
            }}>
              Free website strategy call — new site or full redesign.
            </div>
            <div style={{
              color: "rgba(255,255,255,.6)",
              fontSize: 13,
              marginTop: 3,
              lineHeight: 1.3,
            }}>
              30 minutes. No pitch. No commitment.
            </div>
          </div>
        </div>

        {/* RIGHT — big green phone-call CTA */}
        <motion.a
          href={TEL_HREF}
          data-track="landing_sticky_call"
          onClick={() => trackEvent("landing_sticky_call")}
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "linear-gradient(180deg, #2ee06f 0%, #1bb558 100%)",
            color: "#fff",
            padding: "17px 32px",
            borderRadius: 10,
            fontWeight: 900,
            textDecoration: "none",
            fontSize: 15,
            letterSpacing: 0.6,
            boxShadow: "0 8px 24px rgba(34,197,94,.38)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <PhoneIcon size={18} />
          CALL FOR FREE 1:1
        </motion.a>
      </div>
    </div>
  );
}
