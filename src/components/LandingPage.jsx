import { useLayoutEffect, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../utils/tracking";

const EXIT_STORAGE_KEY = "tsb_landing_exit_dismissed";
const EXIT_COOLDOWN_DAYS = 3;

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
  "Live in 7 days — no drawn-out timelines or hidden costs",
  "Conversion-focused copy and design baked in — clear CTAs, sharp positioning, real outcomes",
  "Mobile-optimised, fast-loading, and search-friendly from day one",
];

const testimonials = [
  {
    quote: "Got more inquiries in the first month than the whole previous year. Best business decision we've made.",
    brand: "Legacy Solar",
    type: "Built from scratch",
    initial: "L",
    color: "#f76b3a",
  },
  {
    quote: "The old site was hurting us more than helping. New one is fast, mobile-first, and memberships went up within weeks.",
    brand: "Star Fitness Studio",
    type: "Full redesign",
    initial: "S",
    color: "#facc15",
  },
  {
    quote: "Site shipped in 12 days. Looks sharper than competitor sites that cost 3× more. Money well spent.",
    brand: "WafflesHub",
    type: "Built from scratch",
    initial: "W",
    color: "#60a5fa",
  },
  {
    quote: "Finally, a website that actually converts. Bookings started coming in within days of launch.",
    brand: "Siolim Cafe",
    type: "Built from scratch",
    initial: "S",
    color: "#4ade80",
  },
  {
    quote: "No nonsense. Clear plan, clean execution. The site is exactly what the brand needed — refined, conversion-ready.",
    brand: "The White Closet",
    type: "Built from scratch",
    initial: "W",
    color: "#a78bfa",
  },
  {
    quote: "Best part — we own everything. Code, content, accounts. No vendor lock-in like with bigger agencies.",
    brand: "Unbent Martial Fitness",
    type: "Built from scratch",
    initial: "U",
    color: "#fb923c",
  },
  {
    quote: "Live in 7 days, exactly as promised. Communication was tight, the result was sharper than we expected.",
    brand: "Chess Academy",
    type: "Built from scratch",
    initial: "C",
    color: "#f472b6",
  },
  {
    quote: "Honest audit first, clear plan second. Worth the conversation even if you don't end up hiring them.",
    brand: "SevAction Foundation",
    type: "Built from scratch",
    initial: "S",
    color: "#22d3ee",
  },
];

const stats = [
  { value: "10+",   label: "WEBSITES LAUNCHED" },
  { value: "7d",    label: "BUILD TIME" },
  { value: "100%",  label: "MOBILE-RESPONSIVE" },
  { value: "5★",    label: "CLIENT RATING" },
];

const projectShowcase = [
  { img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80", title: "Legacy Solar",          tag: "Solar · Lead Gen",         url: "https://legacysolar.in" },
  { img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80", title: "WafflesHub",            tag: "F&B · D2C",                url: "https://waffleshub.com/" },
  { img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80", title: "Chess Academy",        tag: "EdTech · AI",              url: "https://chessacademy-next-js-chirag-client.vercel.app/" },
  { img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80", title: "Unbent Martial Fitness", tag: "Fitness · Brand",          url: "https://unbentmartialfitness.com" },
  { img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80", title: "DigitalWithChirag",    tag: "Personal Brand",           url: "https://www.digitalwithchirag.com/" },
  { img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80", title: "Siolim Cafe",            tag: "Hospitality · Local SEO",  url: "https://siolimcafe.vercel.app/" },
  { img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80", title: "SevAction Foundation", tag: "Non-Profit · Donations",   url: "https://sevactionfoundation.in/" },
  { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", title: "The White Closet",     tag: "Interior Design",          url: "https://the-white-closet.vercel.app/" },
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
    q: "Is the quote really free?",
    a: "Yes — the call where we scope out your website, give you a real timeline, and lock in a final price is 100% free. You only pay once you choose to move forward with the actual build.",
  },
  {
    q: "Do I have to buy the website after our call?",
    a: "No. You'll walk away with a clear plan and a real number whether you go with us or not. We're only the right fit if you actually need a partner — and the call helps both sides figure that out fast.",
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
    a: "7 days. We don't drag projects out — kickoff to launch in a single week, with daily progress shared so you always know where it stands. We'll confirm the exact timeline on the call before anything starts.",
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

const SocialIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const MapPinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6 12 13 2 6" />
  </svg>
);

const FormsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="13" y2="16" />
  </svg>
);

const AnalyticsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const bonusFeatures = [
  {
    Icon: WhatsAppIcon,
    title: "WhatsApp Lead Capture",
    desc: "Pre-wired chat button on every page — leads land straight on your phone, not in some inbox you'll never check.",
    color: "#25d366",
  },
  {
    Icon: SocialIcon,
    title: "Social Media Integration",
    desc: "Instagram, Facebook, LinkedIn — all linked and share-ready. Open Graph metadata done so your links look sharp when posted.",
    color: "#e1306c",
  },
  {
    Icon: MapPinIcon,
    title: "Google My Business Setup",
    desc: "Pinned on Google Maps, 'near me' search ready, photos and business info filled in properly so customers find you locally.",
    color: "#4285f4",
  },
  {
    Icon: FormsIcon,
    title: "Lead-Optimised Forms",
    desc: "Conversion-tuned capture forms in the right spots — the site doesn't just sit there, it actively brings leads in.",
    color: "#f76b3a",
  },
  {
    Icon: MailIcon,
    title: "Lead Alerts to Gmail",
    desc: "Every form submission pings your inbox in real time. No missed leads, no checking dashboards — just follow up fast.",
    color: "#ea4335",
  },
  {
    Icon: AnalyticsIcon,
    title: "Analytics & Visitor Tracking",
    desc: "Google Analytics + behaviour tracking pre-installed. See where every visitor comes from and what they actually do.",
    color: "#7c3aed",
  },
];

function ProjectPreviewModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8,8,8,.72)",
        backdropFilter: "blur(5px)",
        zIndex: 310,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 18, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 18, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          background: "#fff",
          borderRadius: 20,
          maxWidth: 580,
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 28px 88px rgba(0,0,0,.5)",
          position: "relative",
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: 18,
            background: "rgba(255,255,255,.92)",
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            color: "#333",
            zIndex: 2,
            lineHeight: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,.15)",
          }}
        >×</button>

        <div style={{
          aspectRatio: "16 / 10",
          overflow: "hidden",
          background: "#eee",
        }}>
          <img
            src={project.img}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{
            fontSize: 11,
            color: "#f76b3a",
            letterSpacing: 1.5,
            fontWeight: 800,
            marginBottom: 6,
            textTransform: "uppercase",
          }}>
            {project.tag}
          </div>

          <h3 style={{
            fontSize: 24,
            fontWeight: 900,
            color: "#0e0e0e",
            margin: 0,
            marginBottom: 16,
            letterSpacing: -0.5,
          }}>
            {project.title}
          </h3>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-track="landing_project_visit"
            onClick={() => trackEvent("landing_project_visit", { title: project.title })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(180deg, #ff9558 0%, #f76b3a 100%)",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: 0.4,
              textDecoration: "none",
              boxShadow: "0 8px 22px rgba(247,107,58,.32)",
            }}
          >
            Visit Live Site
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 15L15 5M15 5H8M15 5v7" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InlineCTA({ track, label, mode = "call" }) {
  const isChat = mode === "chat";
  return (
    <motion.a
      href={isChat ? WA_HREF : TEL_HREF}
      target={isChat ? "_blank" : undefined}
      rel={isChat ? "noopener noreferrer" : undefined}
      data-track={track}
      onClick={() => trackEvent(track)}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: isChat
          ? "linear-gradient(180deg, #2ee06f 0%, #1bb558 100%)"
          : "linear-gradient(180deg, #ff9558 0%, #f76b3a 100%)",
        color: "#fff",
        padding: "16px 32px",
        borderRadius: 12,
        fontWeight: 900,
        fontSize: 15,
        letterSpacing: 0.5,
        textDecoration: "none",
        boxShadow: isChat
          ? "0 10px 26px rgba(34,197,94,.32)"
          : "0 10px 26px rgba(247,107,58,.32)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
      }}
    >
      {isChat ? <WhatsAppIcon size={18} /> : <PhoneIcon size={18} />}
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

function ExitIntentModal({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose("escape"); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;
    setSubmitting(true);

    const msg =
      `Hi! I saw your landing page and want to get a website built.\n\n` +
      `Name: ${name.trim()}\n` +
      `Phone: ${phone.trim()}\n` +
      `Website for: ${purpose.trim() || "(not specified)"}\n\n` +
      `Please send me a quote.`;
    const url = `https://wa.me/918341928526?text=${encodeURIComponent(msg)}`;

    trackEvent("landing_exit_form_submitted", { name, phone, purpose });
    try { localStorage.setItem(EXIT_STORAGE_KEY, String(Date.now())); } catch {}
    window.open(url, "_blank", "noopener,noreferrer");
    onClose("submitted");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClose("backdrop")}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8,8,8,.65)",
        backdropFilter: "blur(4px)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-title"
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "32px 28px 28px",
          maxWidth: 460,
          width: "100%",
          position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,.45)",
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => onClose("close_button")}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            background: "rgba(0,0,0,.06)",
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#333",
            lineHeight: 1,
          }}
        >×</button>

        <div style={{
          fontSize: 11,
          letterSpacing: 2,
          fontWeight: 800,
          color: "#f76b3a",
          marginBottom: 8,
        }}>
          🛑 WAIT — BEFORE YOU GO
        </div>

        <h3 id="exit-title" style={{
          fontSize: 24,
          fontWeight: 900,
          color: "#0e0e0e",
          margin: 0,
          letterSpacing: -0.5,
          lineHeight: 1.2,
        }}>
          Get a free website quote.<br />
          <span style={{ color: "#f76b3a" }}>WhatsApped to you within an hour.</span>
        </h3>

        <p style={{
          fontSize: 14,
          color: "#555",
          margin: "12px 0 20px",
          lineHeight: 1.55,
        }}>
          Just your name, number, and what the site is for. We&apos;ll send a real quote
          on WhatsApp — no pitch, no commitment.
        </p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            style={{
              padding: "13px 14px",
              fontSize: 15,
              border: "1.5px solid rgba(0,0,0,.12)",
              borderRadius: 10,
              outline: "none",
              fontFamily: "inherit",
              color: "#0e0e0e",
              background: "#fafafa",
            }}
          />
          <input
            type="tel"
            placeholder="Phone number (+91…)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            inputMode="tel"
            style={{
              padding: "13px 14px",
              fontSize: 15,
              border: "1.5px solid rgba(0,0,0,.12)",
              borderRadius: 10,
              outline: "none",
              fontFamily: "inherit",
              color: "#0e0e0e",
              background: "#fafafa",
            }}
          />
          <input
            type="text"
            placeholder="What's the website for? (e.g. café, gym, store)"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            style={{
              padding: "13px 14px",
              fontSize: 15,
              border: "1.5px solid rgba(0,0,0,.12)",
              borderRadius: 10,
              outline: "none",
              fontFamily: "inherit",
              color: "#0e0e0e",
              background: "#fafafa",
            }}
          />
          <button
            type="submit"
            disabled={submitting || !name.trim() || !phone.trim()}
            style={{
              marginTop: 6,
              background: "linear-gradient(180deg, #2ee06f 0%, #1bb558 100%)",
              color: "#fff",
              padding: "15px 24px",
              borderRadius: 10,
              border: "none",
              fontWeight: 900,
              fontSize: 15,
              letterSpacing: 0.5,
              cursor: submitting || !name.trim() || !phone.trim() ? "not-allowed" : "pointer",
              opacity: submitting || !name.trim() || !phone.trim() ? 0.6 : 1,
              boxShadow: "0 10px 26px rgba(34,197,94,.32)",
              transition: "transform 0.15s ease, opacity 0.15s ease",
            }}
          >
            {submitting ? "SENDING…" : "SEND MY QUOTE REQUEST"}
          </button>
        </form>

        <p style={{
          fontSize: 12.5,
          color: "#888",
          margin: "16px 0 0",
          textAlign: "center",
        }}>
          Or call us directly · <a href="tel:+918341928526" style={{ color: "#1bb558", fontWeight: 700, textDecoration: "none" }}>+91 83419 28526</a>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(-1);
  const [exitOpen, setExitOpen] = useState(false);
  const [exitShown, setExitShown] = useState(false);
  const [previewProject, setPreviewProject] = useState(null);

  // Exit-intent trigger: desktop=mouseleave to top, mobile=45s timer
  useEffect(() => {
    try {
      const v = localStorage.getItem(EXIT_STORAGE_KEY);
      if (v && Date.now() - parseInt(v, 10) < EXIT_COOLDOWN_DAYS * 24 * 60 * 60 * 1000) {
        return;
      }
    } catch {}

    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer:coarse)").matches || window.innerWidth < 760);

    let timer = null;

    const trigger = (reason) => {
      if (exitShown) return;
      setExitShown(true);
      setExitOpen(true);
      trackEvent("landing_exit_intent_shown", { reason });
    };

    const onMouseLeave = (e) => {
      if (e.clientY <= 0) trigger("mouse_top");
    };

    if (isMobile) {
      timer = setTimeout(() => trigger("mobile_45s"), 45000);
    } else {
      document.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timer) clearTimeout(timer);
    };
  }, [exitShown]);

  const closeExit = (reason) => {
    try { localStorage.setItem(EXIT_STORAGE_KEY, String(Date.now())); } catch {}
    setExitOpen(false);
    trackEvent("landing_exit_intent_dismissed", { reason });
  };

  useLayoutEffect(() => {
    const prevBodyBg = document.body.style.background;
    const prevHtmlBg = document.documentElement.style.background;
    document.body.style.background = BG;
    document.documentElement.style.background = BG;

    // SEO meta tags scoped to /landing — restored when the user leaves
    const prevTitle = document.title;
    const TITLE = "Website Design Hyderabad — Live in 7 Days | The Story Builder";
    document.title = TITLE;

    const setMeta = (selector, value) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const prev = el.getAttribute("content");
      el.setAttribute("content", value);
      return { el, prev };
    };

    const DESC =
      "Website designer in Hyderabad — get a custom website built in 7 days. Website design, web development, redesigns and ecommerce sites for businesses across Hyderabad, Telangana and India. Free quote.";

    const desc      = setMeta('meta[name="description"]', DESC);
    const ogTitle   = setMeta('meta[property="og:title"]',       TITLE);
    const ogDesc    = setMeta('meta[property="og:description"]', DESC);
    const twTitle   = setMeta('meta[name="twitter:title"]',      TITLE);
    const twDesc    = setMeta('meta[name="twitter:description"]', DESC);
    const keywords  = setMeta('meta[name="keywords"]',
      "website design hyderabad, web design hyderabad, web design company hyderabad, website development hyderabad, website designers in hyderabad, website developers in hyderabad, web designers in hyderabad, web developers in hyderabad, web design and development company in hyderabad, website design and development company in hyderabad, website designing company in hyderabad, website designing company in hyderabad india, website creators in hyderabad, website makers in hyderabad, best website designers in hyderabad, top website designers in hyderabad, best web design company in hyderabad, best website design company in hyderabad, top web design companies in hyderabad, top website design companies in hyderabad, top 10 web design companies in hyderabad, web design services hyderabad, web design agency in hyderabad, ecommerce website development hyderabad, ecommerce website design hyderabad, ecommerce website development company in hyderabad, web development services in hyderabad, website designing services in hyderabad, website designers hyderabad telangana, branding agency hyderabad, website designer near me, web designers near me, website design near me, web design near me, website design company near me, web design companies near me, website development company near me, web design company, website design company, website development company, web development company, web design and development company, website design and development company, website redesign service, website redesign company, website redesign agency, best website redesign services, web redesign service, site redesign, business website design, business website development, business website company, modern business website design, restaurant website design, restaurant web design, restaurant website designer, restaurant website design company, restaurant homepage design, corporate website design, corporate website development, ecommerce website, custom website design, custom website for business, website design for small business, website for small business, website maker for small business, small business website design, web design for small businesses, best website design for small business, responsive web design, web design and development, new website, website maker, landing page design"
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
    <div style={{ background: BG, color: INK, minHeight: "100vh", paddingTop: 42 }}>
      {/* ============ TOP RED URGENCY BAR (sticky, clickable -> phone dialer) ============ */}
      <motion.a
        href={TEL_HREF}
        data-track="landing_top_bar_call"
        onClick={() => trackEvent("landing_top_bar_call")}
        initial={{ y: -42 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "linear-gradient(180deg, #ef4444 0%, #dc2626 100%)",
          color: "#fff",
          padding: "11px 16px",
          textAlign: "center",
          fontSize: 13.5,
          fontWeight: 700,
          letterSpacing: 0.3,
          textDecoration: "none",
          boxShadow: "0 2px 10px rgba(220,38,38,.35)",
          display: "block",
          lineHeight: 1.3,
        }}
      >
        <span style={{ marginRight: 6 }}>🚀</span>
        <span className="lp-top-bar-text">LIMITED — Get Your Website Built · Live in 7 Days · Tap to Start</span>
      </motion.a>

      <style>{`
        @media (max-width: 640px) {
          .lp-sticky { justify-content: center !important; gap: 0 !important; padding: 10px 14px !important; }
          .lp-sticky-left { display: none !important; }
          .lp-sticky-button { padding: 16px 28px !important; font-size: 14px !important; }
        }
        @media (max-width: 600px) {
          .lp-stat-cell { border-right: none !important; border-bottom: 1px dashed rgba(0,0,0,.08); padding-top: 14px !important; padding-bottom: 14px !important; }
          .lp-stat-cell:last-child { border-bottom: none !important; }
          .lp-hero-card { padding: 50px 22px 36px !important; }
          .lp-about-h2 { font-size: 28px !important; }
        }
        @media (max-width: 768px) {
          .lp-photo-founder { max-width: 220px !important; }
          .lp-photo-about   { max-width: 260px !important; }
        }
        @media (max-width: 480px) {
          .lp-hero-pill { font-size: 14px !important; padding: 14px 22px !important; }
          .lp-section-pad { padding-left: 16px !important; padding-right: 16px !important; }
          .lp-top-bar-text { font-size: 12px !important; }
          .lp-photo-founder { max-width: 190px !important; }
          .lp-photo-about   { max-width: 220px !important; }
        }
      `}</style>

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
              GET A WEBSITE THAT<br />
              BRINGS REAL CUSTOMERS<br />
              LIVE IN 7 DAYS
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
              Whether you need your first website or a full redesign — we ship high-converting sites that turn visitors into paying customers. Live in 7 days. Get your free quote and timeline today.
            </p>

            <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <InlineCTA track="landing_hero_cta" label="START MY WEBSITE" />
            </div>
            <p style={{
              fontSize: 13,
              color: INK_SOFT,
              marginTop: 12,
              marginBottom: 0,
            }}>
              Free quote · Live in 7 days · No commitment
            </p>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-track="landing_hero_whatsapp"
              onClick={() => trackEvent("landing_hero_whatsapp")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 14,
                fontSize: 13.5,
                color: "#1bb558",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: 0.2,
              }}
            >
              <WhatsAppIcon size={14} />
              Or chat with us on WhatsApp →
            </a>
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
              className="lp-photo-founder"
              src="/shiva-landing.webp"
              alt="Shiva Shankar, founder of The Story Builder"
              loading="lazy"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = "1";
                  e.currentTarget.src = "/shiva.webp";
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
                fontSize: 11,
                color: "rgba(255,255,255,.45)",
                marginTop: 4,
                letterSpacing: 0.8,
              }}>
                Hyderabad · India
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
                Let&apos;s get your website{" "}
                <span style={{ color: ORANGE }}>live &amp; bringing customers</span>
                <br />
                in 7 days flat.
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
                    7
                  </div>
                  <div style={{
                    fontSize: 10.5,
                    color: "rgba(255,255,255,.55)",
                    letterSpacing: 1,
                    marginTop: 4,
                    fontWeight: 600,
                  }}>
                    DAYS TO BUILD
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
              What You Get
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
                className="lp-stat-cell"
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
            <InlineCTA track="landing_whats_included_cta" label="START MY WEBSITE" />
            <p style={{
              fontSize: 13,
              color: INK_SOFT,
              marginTop: 12,
              marginBottom: 0,
            }}>
              Free quote · Live in 7 days · No commitment
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ BONUS — Lead Engine integrations included with every website ============ */}
      <section style={{
        padding: "60px 20px 70px",
        background: "linear-gradient(180deg, #ede8db 0%, #f5f2eb 100%)",
        borderTop: "1px solid rgba(0,0,0,.06)",
        borderBottom: "1px solid rgba(0,0,0,.06)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Bonus value sticker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 22,
            }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(180deg, #ff9558 0%, #f76b3a 100%)",
              color: "#fff",
              padding: "10px 22px",
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 800,
              letterSpacing: 1.5,
              boxShadow: "0 8px 22px rgba(247,107,58,.32)",
            }}>
              <span>🎁</span>
              <span>BONUS INCLUDED · WORTH ₹15,000</span>
            </div>
          </motion.div>

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            style={{ textAlign: "center", marginBottom: 36 }}
          >
            <h2 style={{
              fontSize: "clamp(26px, 3.8vw, 40px)",
              fontWeight: 900,
              color: INK,
              letterSpacing: -0.7,
              margin: 0,
              marginBottom: 10,
              lineHeight: 1.2,
            }}>
              It&apos;s not just a website.<br />
              It&apos;s a <em style={{ color: ORANGE, fontStyle: "normal" }}>lead engine.</em>
            </h2>
            <p style={{
              fontSize: 16,
              color: INK_SOFT,
              margin: 0,
              maxWidth: 620,
              marginInline: "auto",
              lineHeight: 1.6,
            }}>
              Every site we build comes pre-wired with these integrations — no bolt-ons, no extras to pay for later. The website doesn&apos;t just sit there. It works.
            </p>
          </motion.div>

          {/* Bonus feature cards (5, auto-fit grid) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}>
            {bonusFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,.06)",
                  borderRadius: 16,
                  padding: "24px 22px",
                  boxShadow: "0 6px 22px rgba(0,0,0,.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: f.color,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 6px 18px ${f.color}33`,
                }}>
                  <f.Icon size={24} />
                </div>
                <h3 style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: INK,
                  margin: 0,
                  letterSpacing: -0.2,
                  lineHeight: 1.25,
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize: 14,
                  color: INK_SOFT,
                  margin: 0,
                  lineHeight: 1.55,
                  flex: 1,
                }}>
                  {f.desc}
                </p>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  color: f.color,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  marginTop: "auto",
                }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    background: f.color,
                  }} />
                  Included Free
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing CTA below the bonus grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginTop: 40 }}
          >
            <InlineCTA track="landing_bonus_cta" label="START MY WEBSITE" />
            <p style={{
              fontSize: 12.5,
              color: INK_SOFT,
              marginTop: 12,
              marginBottom: 0,
              letterSpacing: 0.3,
            }}>
              Bonus integrations included with every build · Worth ~₹15,000
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ PROJECT SHOWCASE — static 2-row grid, click to preview ============ */}
      <section style={{ padding: "40px 20px 50px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
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
            <p style={{
              fontSize: 13,
              color: INK_SOFT,
              marginTop: 8,
              marginBottom: 0,
            }}>
              Tap any card to preview the live site.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}>
            {projectShowcase.map((p) => (
              <motion.div
                key={p.title}
                onClick={() => {
                  setPreviewProject(p);
                  trackEvent("landing_project_card_click", { title: p.title });
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  cursor: "pointer",
                  background: "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,.06)",
                  boxShadow: "0 4px 14px rgba(0,0,0,.05)",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div style={{
                  aspectRatio: "4 / 3",
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
                <div style={{ padding: "10px 12px 12px" }}>
                  <div style={{
                    fontSize: 9.5,
                    color: ORANGE,
                    letterSpacing: 1,
                    marginBottom: 3,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}>
                    {p.tag}
                  </div>
                  <div style={{
                    fontSize: 13.5,
                    fontWeight: 800,
                    color: INK,
                    lineHeight: 1.25,
                    letterSpacing: -0.2,
                  }}>
                    {p.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                Shiva founded <strong>The Story Builder</strong> in
                <strong>Hyderabad</strong> after watching the same pattern repeat
                — businesses spending lakhs on websites that look great but never
                bring customers. Since then, the studio has shipped <strong>10+
                high-converting websites</strong> for ambitious businesses in
                Hyderabad, across India and beyond — most live in 7 days flat,
                all built around one question: <em>does this actually turn visitors
                into paying customers?</em>
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
                className="lp-photo-about"
                src="/shiva-about.webp"
                alt="Shiva Shankar, founder of The Story Builder"
                loading="lazy"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = "1";
                    e.currentTarget.src = "/shiva-landing.webp";
                  }
                }}
                style={{
                  width: "100%",
                  maxWidth: 380,
                  height: "auto",
                  display: "block",
                  clipPath: "polygon(0 0, 100% 0, 100% 92%, 90% 92%, 90% 100%, 0 100%)",
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
                Chat with us on WhatsApp — we usually reply within an hour.
              </div>
            </div>
            <InlineCTA mode="chat" track="landing_faq_whatsapp" label="CHAT ON WHATSAPP" />
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS MARQUEE — right-to-left, opposite of projects ============ */}
      <section style={{ padding: "20px 0 60px" }}>
        <div style={{ textAlign: "center", padding: "0 20px 26px" }}>
          <p style={{
            fontSize: 12,
            color: INK_SOFT,
            letterSpacing: 2.5,
            margin: 0,
            marginBottom: 8,
            fontWeight: 700,
          }}>
            WHAT CLIENTS SAY
          </p>
          <h3 style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 900,
            color: INK,
            letterSpacing: -0.5,
            margin: 0,
          }}>
            Honest words from honest businesses.
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
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{
              display: "flex",
              gap: 20,
              width: "max-content",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                style={{
                  width: 320,
                  flexShrink: 0,
                  background: "#fff",
                  borderRadius: 14,
                  padding: "22px 24px",
                  border: "1px solid rgba(0,0,0,.06)",
                  boxShadow: "0 6px 22px rgba(0,0,0,.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  minHeight: 200,
                }}
              >
                {/* 5 stars */}
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill={ORANGE}>
                      <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: INK,
                  margin: 0,
                  flex: 1,
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Brand + project type */}
                <div style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  paddingTop: 12,
                  borderTop: "1px solid rgba(0,0,0,.06)",
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: t.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 16,
                    flexShrink: 0,
                    letterSpacing: -0.5,
                  }}>
                    {t.initial}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: INK,
                      lineHeight: 1.2,
                      letterSpacing: -0.2,
                    }}>
                      {t.brand}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: ORANGE,
                      marginTop: 4,
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}>
                      {t.type}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            You Can Keep Wondering Why Your Website Isn&apos;t Bringing Customers.{" "}
            <span style={{ color: ORANGE }}>Or You Can Have a New One Live In 7 Days.</span>
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
            Free quote. Real timeline. Live in 7 days. No drawn-out projects, no hidden costs.
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
            Free quote. Pay only if you choose to move forward.
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
                background: "linear-gradient(180deg, #ff9558 0%, #f76b3a 100%)",
                color: "#fff",
                padding: "20px 48px",
                borderRadius: 12,
                fontWeight: 900,
                fontSize: 17,
                letterSpacing: 0.6,
                textDecoration: "none",
                boxShadow: "0 12px 32px rgba(247,107,58,.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <PhoneIcon size={20} />
              START MY WEBSITE
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
            <span><span style={{ color: ORANGE, marginRight: 6 }}>●</span>Live in 7 days</span>
            <span><span style={{ color: ORANGE, marginRight: 6 }}>●</span>Free quote</span>
            <span><span style={{ color: ORANGE, marginRight: 6 }}>●</span>No commitment</span>
          </motion.div>
        </div>
      </section>

      {/* ============ STICKY FLOATING CTA PILL — rounded, centred, breathing room from edges ============ */}
      <div className="lp-sticky" style={{
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
        <div className="lp-sticky-left" style={{
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
              Get your website live in 7 days — new build or full redesign.
            </div>
            <div style={{
              color: "rgba(255,255,255,.6)",
              fontSize: 13,
              marginTop: 3,
              lineHeight: 1.3,
            }}>
              Free quote · No commitment · Real timeline.
            </div>
          </div>
        </div>

        {/* RIGHT — big green phone-call CTA */}
        <motion.a
          className="lp-sticky-button"
          href={TEL_HREF}
          data-track="landing_sticky_call"
          onClick={() => trackEvent("landing_sticky_call")}
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "linear-gradient(180deg, #ff9558 0%, #f76b3a 100%)",
            color: "#fff",
            padding: "17px 32px",
            borderRadius: 10,
            fontWeight: 900,
            textDecoration: "none",
            fontSize: 15,
            letterSpacing: 0.6,
            boxShadow: "0 8px 24px rgba(247,107,58,.38)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <PhoneIcon size={18} />
          START MY WEBSITE
        </motion.a>
      </div>

      {/* ============ EXIT-INTENT LEAD-CAPTURE MODAL ============ */}
      <AnimatePresence>
        {exitOpen && <ExitIntentModal onClose={closeExit} />}
      </AnimatePresence>

      {/* ============ PROJECT PREVIEW MODAL ============ */}
      <AnimatePresence>
        {previewProject && (
          <ProjectPreviewModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
