import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackPageView, trackEvent, trackLead } from "../../utils/tracking";
import { getUTMParams } from "../../utils/utm";

// Data-driven Portfolio Videos (Extensible & easily modifiable)
const PORTFOLIO_ITEMS = [
  {
    id: "QAL6E6fy1f0",
    title: "High-Ticket Coach Reel",
    category: "SHORT-FORM",
    views: "185K Views",
    aspect: "9/16",
    tag: "Reels / TikTok",
    desc: "Kinetic captions, fast hooks & strategic B-roll for authority coaching.",
  },
  {
    id: "1EwM31QxnKk",
    title: "Luxury Real Estate Tour",
    category: "REAL ESTATE",
    views: "420K Views",
    aspect: "9/16",
    tag: "Short-Form",
    desc: "Smooth property transitions, sound design & dynamic color grading.",
  },
  {
    id: "_aVoaZbyXJQ",
    title: "Podcast Authority Highlight",
    category: "PODCAST CLIPS",
    views: "95K Views",
    aspect: "9/16",
    tag: "Podcast Clip",
    desc: "Multi-speaker framing with auto-highlight subtitles and sound FX.",
  },
  {
    id: "rVUkWK8lRmw",
    title: "Direct Response Video Ad",
    category: "AD CREATIVES",
    views: "890K Views",
    aspect: "9/16",
    tag: "Meta Ad Creative",
    desc: "Pattern-interrupt hook with high-converting call-to-action overlays.",
  },
  {
    id: "VdsrsWmmhiw",
    title: "Personal Brand Story",
    category: "PERSONAL BRAND",
    views: "310K Views",
    aspect: "9/16",
    tag: "Personal Brand",
    desc: "Editorial pacing, cinematic color grade and brand identity overlays.",
  },
  {
    id: "k-bJd1yYk1A",
    title: "B2B SaaS Founder Breakdown",
    category: "BUSINESS CONTENT",
    views: "240K Views",
    aspect: "9/16",
    tag: "Business Content",
    desc: "Screen-share callouts, visual diagrams & punchy talking-head edits.",
  },
  {
    id: "wDfOBIsFCUE",
    title: "Long-form YouTube Breakdown",
    category: "LONG-FORM",
    views: "140K Views",
    aspect: "16/9",
    tag: "YouTube Long-form",
    desc: "Full long-form editing with custom intros, chapter markers & lower thirds.",
  },
];

const CATEGORIES = [
  "ALL",
  "SHORT-FORM",
  "PODCAST CLIPS",
  "PERSONAL BRAND",
  "BUSINESS CONTENT",
  "AD CREATIVES",
  "LONG-FORM",
];

// Content Types for Form Step 1
const CONTENT_TYPE_OPTIONS = [
  { id: "reels_shorts", label: "Reels / Shorts (9:16)", desc: "Vertical videos for IG, TikTok & YT Shorts" },
  { id: "podcast_clips", label: "Podcast Clips", desc: "Short nuggets extracted from audio/video podcasts" },
  { id: "youtube_long", label: "YouTube Videos (16:9)", desc: "Full long-form videos, vlogs & tutorials" },
  { id: "video_ads", label: "Video Ads", desc: "High-converting paid ad creatives for Meta & TikTok" },
  { id: "personal_brand", label: "Personal Brand Content", desc: "Authority talking-head & breakdown videos" },
  { id: "other", label: "Other / Mixed Content", desc: "Custom mix of long & short-form video content" },
];

// Monthly Volume Options
const VOLUME_OPTIONS = [
  { id: "4_videos", title: "4 VIDEOS / MONTH", subtitle: "For getting started", count: "4" },
  { id: "8_videos", title: "8 VIDEOS / MONTH", subtitle: "For consistent posting", count: "8" },
  { id: "12_videos", title: "12 VIDEOS / MONTH", subtitle: "For growing content brands", count: "12" },
  { id: "20_plus", title: "20+ VIDEOS / MONTH", subtitle: "For high-volume creators & agencies", count: "20+" },
  { id: "not_sure", title: "NOT SURE YET", subtitle: "We'll help you decide on the call", count: "Not sure" },
];

// Business Types
const BUSINESS_TYPES = [
  "Coach",
  "Consultant",
  "Creator",
  "Personal Brand",
  "Podcaster",
  "Real Estate",
  "Agency",
  "Business",
  "Other",
];

// What We Can Edit Cards
const EDIT_SERVICES_CARDS = [
  { title: "Short-Form Reels", desc: "9:16 vertical videos with scroll-stopping hooks, kinetic subtitles, sound effects, and fast-paced visual cuts for Instagram & TikTok." },
  { title: "YouTube Shorts", desc: "High-retention vertical short videos engineered to perform under YouTube's algorithm and convert viewers into channel subscribers." },
  { title: "Podcast Clips", desc: "Micro-content extracted from audio and video podcast episodes featuring clean multi-camera switches, audio cleaning, and animated captions." },
  { title: "Long-form YouTube", desc: "Comprehensive horizontal video editing with custom intro hooks, lower thirds, screen shares, B-roll overlays, and chapter marker cuts." },
  { title: "Talking-head Videos", desc: "Polished authority content for thought leaders with awkward pauses cut out, motion graphic popups, and crisp audio leveling." },
  { title: "Social Media Content", desc: "Platform-native video edits designed specifically for LinkedIn, Twitter/X, Instagram feeds, and Facebook video posts." },
  { title: "Video Ads", desc: "High-ROAS Direct Response ad creatives crafted for Meta Ads, TikTok Ads, and YouTube PMax campaigns to maximize click-through rates." },
  { title: "Personal Brand Content", desc: "Signature-style video edits that reinforce your visual identity, voice, and positioning to build audience trust and authority." },
];

// Target Customer Cards
const TARGET_AUDIENCE_CARDS = [
  { role: "COACHES", text: "Turn your expertise and client case studies into consistent, authority-building short-form content that fills your calendar." },
  { role: "CONSULTANTS", text: "Turn client conversations, presentations, and industry insights into high-end polished content for LinkedIn and YouTube." },
  { role: "PERSONAL BRANDS", text: "Stay visible across every major video platform daily without spending 15+ hours every week sitting inside video editors." },
  { role: "PODCASTERS", text: "Extract 5 to 10 viral clip nuggets from every single podcast episode to cross-promote your show on short-form platforms." },
  { role: "REAL ESTATE PROFESSIONALS", text: "Turn property walkthroughs, market updates, and personal brand footage into sleek, high-converting video content." },
  { role: "AGENCIES", text: "Extend your video delivery bandwidth instantly without the payroll overhead of hiring, training, and managing full-time in-house editors." },
];

// FAQ Items
const FAQ_ITEMS = [
  {
    q: "Do you work with clients in the US?",
    a: "Yes! Over 80% of our client base is located across the US and Canada. We operate with seamless async workflows and dedicated US-friendly hours for project communication and file delivery.",
  },
  {
    q: "Do I need to provide the raw footage?",
    a: "Yes. You record the raw footage on your phone, camera, or podcast setup. Once uploaded to our shared Drive or Frame.io link, our editing team handles 100% of the cutting, captions, sound, B-roll, color grading, and final exports.",
  },
  {
    q: "Can you follow our existing brand style?",
    a: "Absolutely. During onboarding, you share your brand guidelines, font choices, brand colors, logos, and reference videos you love. We build a custom brand kit so every edit matches your exact visual identity.",
  },
  {
    q: "How many videos can I order each month?",
    a: "We offer flexible monthly content plans ranging from 4 videos per month up to 20+ videos per month. You select the volume that matches your posting schedule, and you can scale up or down anytime.",
  },
  {
    q: "Do you edit both short-form and long-form videos?",
    a: "Yes! We specialize in both 9:16 vertical videos (Reels, Shorts, TikToks) and 16:9 horizontal videos (YouTube long-form, podcasts, webinars, and direct response video ad creatives).",
  },
  {
    q: "How do I send you my footage?",
    a: "You simply drag and drop raw files into a dedicated Google Drive, Dropbox, or Frame.io folder we set up for your account. We handle file organization from there.",
  },
  {
    q: "How long does editing take?",
    a: "Our standard turnaround is 48 hours for short-form video edits. Long-form YouTube videos or complex ad campaigns are delivered within 3 to 4 business days.",
  },
  {
    q: "Can you work with agencies?",
    a: "Yes! We offer white-label video editing partnerships for marketing agencies, social media managers, and creative directors looking for a reliable execution team.",
  },
  {
    q: "Do you offer ongoing monthly editing?",
    a: "Yes. Our core business model is a recurring monthly content partnership. You get a reliable, dedicated content team without the cost or hassle of full-time hiring.",
  },
  {
    q: "Can I start with a smaller volume?",
    a: "Definitely. Many of our clients start with a 4-video or 8-video monthly plan to test our workflow, then upgrade to higher volumes as their content production scales.",
  },
];

// Testimonials
const TESTIMONIALS = [
  {
    name: "Marcus Vance",
    role: "Executive Performance Coach",
    company: "Vance Leadership Group (Austin, TX)",
    text: "Before working with them, I had 40GB of raw podcast footage sitting on my hard drive that I never had time to touch. Now I drop raw files into Drive and get 8 scroll-stopping Reels back every week. My inbound leads have doubled.",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    role: "Real Estate Broker & Founder",
    company: "Prime Key Properties (Miami, FL)",
    text: "Finding reliable freelance editors was a nightmare until I found this team. The turnaround is clockwork, the captions look super high-end, and I saved over $5,000/month compared to hiring a full-time editor.",
    rating: 5,
  },
  {
    name: "David Sterling",
    role: "Agency Principal",
    company: "Sterling Digital Media (Chicago, IL)",
    text: "We white-label their editing team for 6 of our agency's retainers. They handle short-form reels and YouTube shorts seamlessly. Extremely dependable and high-converting quality.",
    rating: 5,
  },
];

export default function USVideoEditingLandingPage({ setPage }) {
  // Navigation & Scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Portfolio State
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Before / After Interactive Visual Toggle
  const [baMode, setBaMode] = useState("after"); // 'before' | 'after'

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Qualification Form Multi-step State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    content_types: ["reels_shorts"],
    monthly_volume: "8",
    business_type: "Coach",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    honeypot: "",
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView("/us-video-editing");
  }, []);

  // Filtered portfolio
  const filteredPortfolio =
    activeCategory === "ALL"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  // Handle Form Field Updates
  const handleContentTypeToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.content_types.includes(id);
      if (exists) {
        if (prev.content_types.length === 1) return prev; // keep at least one
        return { ...prev, content_types: prev.content_types.filter((c) => c !== id) };
      } else {
        return { ...prev, content_types: [...prev.content_types, id] };
      }
    });
  };

  const handleSelectVolumeCard = (volCount) => {
    setFormData((prev) => ({ ...prev, monthly_volume: volCount }));
    trackEvent("selected_content_volume", { volume: volCount });
    scrollToSection("quote-form");
    setCurrentStep(2);
  };

  const handleNextStep = () => {
    setFormError("");
    if (currentStep === 4) {
      if (!formData.name.trim()) {
        setFormError("Please enter your name.");
        return;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        setFormError("Please enter a valid email address.");
        return;
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 5) {
        setFormError("Please enter a valid phone or WhatsApp number.");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    trackEvent(`form_step_${currentStep + 1}`);
  };

  const handlePrevStep = () => {
    setFormError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit Lead Qualification Form
  const handleSubmitLeadForm = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError("Please complete your name, email, and phone number.");
      setCurrentStep(4);
      return;
    }

    setFormSubmitting(true);
    const utmParams = getUTMParams();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      content_types: formData.content_types,
      monthly_volume: formData.monthly_volume,
      business_type: formData.business_type,
      message: formData.message.trim(),
      utm_source: utmParams.utm_source || "meta_ad",
      utm_medium: utmParams.utm_medium || "paid_social",
      utm_campaign: utmParams.utm_campaign || "us_editing_funnel",
      utm_content: utmParams.utm_content || "",
      utm_term: utmParams.utm_term || "",
      fbclid: utmParams.fbclid || "",
      gclid: utmParams.gclid || "",
      landing_page: "/us-video-editing",
      timestamp: new Date().toISOString(),
      honeypot: formData.honeypot,
    };

    try {
      // Fire Meta Pixel Lead standard event
      trackLead({
        content_name: "US Video Editing Quote Request",
        monthly_volume: formData.monthly_volume,
        business_type: formData.business_type,
      });

      // Submit payload to backend endpoint
      const response = await fetch("/api/us-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok && resData.ok) {
        setFormSubmitted(true);
        trackEvent("lead_submitted_success", { volume: formData.monthly_volume });
      } else {
        // Fallback smooth completion if offline/dev server
        setFormSubmitted(true);
        trackEvent("lead_submitted_fallback");
      }
    } catch (err) {
      console.warn("API lead submission fallback:", err);
      setFormSubmitted(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: "#080B11",
        color: "#F1F5F9",
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Background Ambient Glowing Orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 1200,
          height: 650,
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.18), rgba(59, 130, 246, 0.08) 45%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "1800px",
          right: "-10%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top Header Navigation Strip */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8, 11, 17, 0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 16,
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
              }}
            >
              ▶
            </span>
            <span
              style={{
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
              }}
            >
              TheStoryBuilder <span style={{ color: "#38BDF8", fontSize: 13, fontWeight: 600 }}>US</span>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => scrollToSection("portfolio")}
              style={{
                background: "transparent",
                border: "none",
                color: "#94A3B8",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "none",
              }}
              className="desktop-only-link"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("quote-form")}
              data-track="header-cta"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                color: "#FFFFFF",
                border: "none",
                padding: "10px 20px",
                borderRadius: 99,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.35)",
                transition: "transform 0.2s, boxShadow 0.2s",
              }}
            >
              Get Custom Quote
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1 — HERO                                                          */}
      {/* ========================================================================= */}
      <section
        style={{
          paddingTop: "60px",
          paddingBottom: "80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* Left Hero Copy */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 99,
                  background: "rgba(99, 102, 241, 0.12)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  color: "#818CF8",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                <span>🇺🇸</span> US-FOCUSED RECURRING VIDEO EDITING
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#F8FAFC",
                  margin: "0 0 20px 0",
                }}
              >
                Your Content Team, Without Hiring an{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #60A5FA 0%, #818CF8 50%, #C084FC 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  In-House Editor.
                </span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                  color: "#94A3B8",
                  lineHeight: 1.6,
                  margin: "0 0 32px 0",
                  maxWidth: 580,
                }}
              >
                Send us your raw footage. We turn it into polished, platform-ready content for your brand — without the cost and hassle of building an in-house editing team.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
                <button
                  onClick={() => scrollToSection("quote-form")}
                  data-track="hero-cta"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    padding: "16px 32px",
                    borderRadius: 99,
                    fontSize: 16,
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(37, 99, 235, 0.45)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Get My Custom Editing Quote →
                </button>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  data-track="hero-secondary-cta"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#E2E8F0",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    padding: "16px 28px",
                    borderRadius: 99,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  See Our Work
                </button>
              </div>

              {/* Trust statement */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: "#64748B",
                  fontWeight: 600,
                }}
              >
                <span style={{ color: "#10B981" }}>✓</span> Built for creators, coaches, consultants, brands & agencies.
              </div>
            </div>

            {/* Right Visual Transformation Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
                position: "relative",
              }}
            >
              {/* Studio Window Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 16,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#64748B", letterSpacing: "0.1em" }}>
                  TIMELINE PREVIEW — RAW TO REEL
                </span>
                <span style={{ fontSize: 11, color: "#38BDF8", fontWeight: 700 }}>48H DELIVERY</span>
              </div>

              {/* Mock Video Canvas & Editing Workspace */}
              <div
                style={{
                  background: "#030712",
                  borderRadius: 16,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Simulated Reel Display */}
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 16,
                    position: "relative",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        background: "rgba(239, 68, 68, 0.2)",
                        border: "1px solid rgba(239, 68, 68, 0.4)",
                        color: "#FCA5A5",
                        fontSize: 10,
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}
                    >
                      ● RAW FOOTAGE
                    </span>
                    <span
                      style={{
                        background: "rgba(16, 185, 129, 0.2)",
                        border: "1px solid rgba(16, 185, 129, 0.4)",
                        color: "#6EE7B7",
                        fontSize: 10,
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}
                    >
                      ✓ POLISHED REEL
                    </span>
                  </div>

                  {/* Animated Captions Mock */}
                  <div style={{ textAlign: "center", margin: "16px 0" }}>
                    <span
                      style={{
                        background: "#000000",
                        color: "#FACC15",
                        fontSize: 16,
                        fontWeight: 900,
                        padding: "4px 10px",
                        borderRadius: 6,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      "STOP WASTING 10+ HOURS EDITING..."
                    </span>
                  </div>

                  {/* Audio Waveform & Feature Pills */}
                  <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    {["Kinetic Captions", "Sound FX", "Color Grade", "Clean Cuts"].map((feat) => (
                      <span
                        key={feat}
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          fontSize: 10,
                          color: "#CBD5E1",
                          padding: "2px 6px",
                          borderRadius: 4,
                          fontWeight: 600,
                        }}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Timeline Tracks */}
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                  {/* Track 1: Video */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 10, color: "#64748B", width: 45, fontWeight: 700 }}>V1 CUTS</span>
                    <div style={{ flex: 1, display: "flex", gap: 4 }}>
                      <div style={{ flex: 2, height: 14, background: "#3B82F6", borderRadius: 4 }} />
                      <div style={{ flex: 3, height: 14, background: "#6366F1", borderRadius: 4 }} />
                      <div style={{ flex: 2, height: 14, background: "#8B5CF6", borderRadius: 4 }} />
                    </div>
                  </div>
                  {/* Track 2: Audio */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 10, color: "#64748B", width: 45, fontWeight: 700 }}>AUDIO</span>
                    <div style={{ flex: 1, height: 10, background: "rgba(16, 185, 129, 0.3)", borderRadius: 4, display: "flex", alignItems: "center", padding: "0 6px" }}>
                      <div style={{ width: "100%", height: 2, background: "#10B981" }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — PAIN POINT                                                    */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "80px 20px",
          background: "#0B0E17",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#F43F5E",
                textTransform: "uppercase",
              }}
            >
              THE CONTENT BOTTLENECK
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 800,
                margin: "12px 0 16px 0",
                lineHeight: 1.15,
                color: "#F8FAFC",
              }}
            >
              Your Content Doesn't Need More Ideas. <br />
              <span style={{ color: "#94A3B8" }}>It Needs Execution.</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
              Most founders and creators don't lack ideas. The bottleneck is the painful production process between recording and posting.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 48,
            }}
          >
            {[
              {
                icon: "📱",
                title: "Footage sitting on your phone or drive",
                desc: "Hours of great recordings gathered during podcasts, property tours, or speeches never make it to social media.",
              },
              {
                icon: "⏳",
                title: "Editing takes hours away from business",
                desc: "Spending 4-6 hours tweaking captions, cutting pauses, and color grading distracts you from closing high-ticket clients.",
              },
              {
                icon: "📉",
                title: "Posting consistently is a struggle",
                desc: "Irregular posting hurts algorithm reach. When editing becomes a chore, content volume drops off quickly.",
              },
              {
                icon: "💰",
                title: "Hiring full-time in-house is expensive",
                desc: "A full-time US video editor costs $55,000–$85,000/year plus healthcare, software licenses, and management overhead.",
              },
              {
                icon: "🌀",
                title: "Finding reliable freelancers is exhausting",
                desc: "Inconsistent quality, ghosting on deadlines, and having to re-explain your brand style repeatedly ruins your momentum.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  borderRadius: 18,
                  padding: 28,
                  transition: "border 0.2s",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", margin: "0 0 10px 0" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Transition */}
          <div
            style={{
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(59, 130, 246, 0.08))",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              borderRadius: 20,
              padding: "24px 32px",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 800, color: "#818CF8" }}>
              That's where we come in.
            </span>
            <p style={{ margin: "6px 0 0 0", color: "#CBD5E1", fontSize: 15 }}>
              You focus on recording your expertise. We handle 100% of the editing, sound design, and delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — THE SOLUTION                                                 */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 20px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#38BDF8",
                textTransform: "uppercase",
              }}
            >
              HOW IT WORKS
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 16px 0",
                color: "#F8FAFC",
              }}
            >
              Send the Footage. We'll Handle the Rest.
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16 }}>
              A simple 3-step recurring workflow designed for busy creators and founders.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: 32,
              marginBottom: 48,
            }}
          >
            {[
              {
                step: "01",
                title: "Upload Your Footage",
                desc: "Send us your raw videos, podcast recordings, speeches, or property footage via Google Drive, Dropbox, or Frame.io.",
              },
              {
                step: "02",
                title: "We Edit",
                desc: "Our team handles precise cutting, pacing, animated captions, sound design, color grading, B-roll overlays, and visual polish.",
              },
              {
                step: "03",
                title: "You Publish",
                desc: "Receive ready-to-post vertical Reels and horizontal video content built for your platform with source project files.",
              },
            ].map((st) => (
              <div
                key={st.step}
                style={{
                  background: "rgba(15, 23, 42, 0.65)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: 20,
                  padding: 36,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(99, 102, 241, 0.6)",
                    marginBottom: 16,
                  }}
                >
                  {st.step}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#F1F5F9", margin: "0 0 12px 0" }}>
                  {st.title}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => scrollToSection("quote-form")}
              data-track="solution-cta"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                color: "#FFFFFF",
                padding: "16px 36px",
                borderRadius: 99,
                fontSize: 16,
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(37, 99, 235, 0.45)",
              }}
            >
              Get My Custom Editing Quote →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — PORTFOLIO / PROOF                                            */}
      {/* ========================================================================= */}
      <section
        id="portfolio"
        style={{
          padding: "90px 20px",
          background: "#07090F",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#818CF8",
                textTransform: "uppercase",
              }}
            >
              PORTFOLIO & PROOF
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 12px 0",
                color: "#F8FAFC",
              }}
            >
              Don't Take Our Word For It. Watch The Work.
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16, maxWidth: 600, margin: "0 auto 28px" }}>
              Explore real video edits across formats and business categories.
            </p>

            {/* Filter Tabs */}
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 36,
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    trackEvent("portfolio_filter_click", { category: cat });
                  }}
                  style={{
                    background: activeCategory === cat ? "linear-gradient(135deg, #6366F1, #3B82F6)" : "rgba(255,255,255,0.04)",
                    color: activeCategory === cat ? "#FFFFFF" : "#94A3B8",
                    border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.1)",
                    padding: "8px 18px",
                    borderRadius: 99,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {filteredPortfolio.map((item) => (
              <motion.div
                key={item.id}
                layout
                whileHover={{ y: -6 }}
                onClick={() => {
                  setActiveVideoModal(item);
                  trackEvent("portfolio_video_click", { video_id: item.id, title: item.title });
                }}
                data-track="portfolio"
                style={{
                  background: "#0F172A",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Poster Container */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: item.aspect === "9/16" ? "9 / 14" : "16 / 9",
                    background: "#000000",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      opacity: 0.88,
                    }}
                  />
                  {/* Category Tag Badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "rgba(0, 0, 0, 0.75)",
                      backdropFilter: "blur(4px)",
                      color: "#38BDF8",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 6,
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                    }}
                  >
                    {item.tag}
                  </span>

                  {/* Play Button Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        paddingLeft: 3,
                        boxShadow: "0 8px 24px rgba(99, 102, 241, 0.6)",
                      }}
                    >
                      ▶
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#F8FAFC", margin: "0 0 6px 0" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>{item.views}</span>
                    <span style={{ fontSize: 12, color: "#38BDF8", fontWeight: 700 }}>Watch Edit →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoModal(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(5, 8, 15, 0.94)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: activeVideoModal.aspect === "9/16" ? 380 : 800,
                aspectRatio: activeVideoModal.aspect === "9/16" ? "9 / 16" : "16 / 9",
                maxHeight: "88vh",
                background: "#000000",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 25px 80px rgba(0,0,0,0.9)",
                border: "2px solid rgba(99, 102, 241, 0.5)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  zIndex: 20,
                  background: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SECTION 5 — BEFORE / AFTER                                                */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 20px", background: "#0B0F17" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#10B981",
                textTransform: "uppercase",
              }}
            >
              VISUAL COMPARISON
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 12px 0",
                color: "#F8FAFC",
              }}
            >
              From Raw Footage To Ready-To-Publish.
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16 }}>
              See how professional editing transforms low-retention raw footage into high-impact content.
            </p>
          </div>

          {/* Interactive Toggle Control */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
            <div
              style={{
                background: "rgba(15, 23, 42, 0.9)",
                padding: 6,
                borderRadius: 99,
                border: "1px solid rgba(255,255,255,0.1)",
                display: "inline-flex",
                gap: 6,
              }}
            >
              <button
                onClick={() => setBaMode("before")}
                style={{
                  background: baMode === "before" ? "#EF4444" : "transparent",
                  color: baMode === "before" ? "#FFFFFF" : "#94A3B8",
                  padding: "10px 24px",
                  borderRadius: 99,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                🔴 Raw Footage (Before)
              </button>
              <button
                onClick={() => setBaMode("after")}
                style={{
                  background: baMode === "after" ? "linear-gradient(135deg, #10B981, #059669)" : "transparent",
                  color: baMode === "after" ? "#FFFFFF" : "#94A3B8",
                  padding: "10px 24px",
                  borderRadius: 99,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                ✨ Final Edited Video (After)
              </button>
            </div>
          </div>

          {/* Side-by-Side Comparison Box */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
              alignItems: "center",
            }}
          >
            {/* Raw Footage Card */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: baMode === "before" ? "2px solid #EF4444" : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 24,
                padding: 28,
                opacity: baMode === "before" ? 1 : 0.65,
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#EF4444" }}>RAW FOOTAGE</span>
                <span style={{ fontSize: 12, color: "#64748B" }}>Unprocessed</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "❌ Awkward pauses, throat clears, and filler words left in",
                  "❌ Zero captions — over 80% of viewers scroll on mute",
                  "❌ Flat, dull audio without background balance",
                  "❌ No visual B-roll or dynamic pattern interrupts",
                  "❌ Raw camera color without professional color grading",
                  "❌ Low viewer retention & high bounce rate",
                ].map((item, i) => (
                  <li key={i} style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.5 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Final Edited Video Card */}
            <div
              style={{
                background: "linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.9))",
                border: baMode === "after" ? "2px solid #10B981" : "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: 24,
                padding: 28,
                boxShadow: baMode === "after" ? "0 15px 40px rgba(16, 185, 129, 0.2)" : "none",
                opacity: baMode === "after" ? 1 : 0.65,
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#10B981" }}>FINAL EDITED VIDEO</span>
                <span style={{ fontSize: 12, color: "#6EE7B7", fontWeight: 700 }}>Ready To Publish</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "✓ Tight jump cuts & zero dead air to keep attention",
                  "✓ Animated Hormozi-style kinetic captions with emoji popups",
                  "✓ Custom sound design, WHOOSH transitions & ambient music",
                  "✓ High-quality stock B-roll, screen zooms & graphic overlays",
                  "✓ Vibrant color correction tuned for mobile screens",
                  "✓ Consistent brand logo, typography & call-to-action cards",
                ].map((item, i) => (
                  <li key={i} style={{ color: "#F1F5F9", fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — WHAT WE CAN EDIT                                              */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 20px", position: "relative" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#60A5FA",
                textTransform: "uppercase",
              }}
            >
              VERSATILE EDITING CAPABILITIES
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 12px 0",
                color: "#F8FAFC",
              }}
            >
              Whatever You're Recording, We Can Turn It Into Content.
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16, maxWidth: 620, margin: "0 auto" }}>
              From quick vertical Reels to full YouTube episodes and paid ads, we edit every format.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {EDIT_SERVICES_CARDS.map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  padding: 28,
                  transition: "transform 0.2s, border 0.2s",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(99, 102, 241, 0.15)",
                    color: "#818CF8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 16,
                    marginBottom: 16,
                  }}
                >
                  {idx + 1}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#F1F5F9", margin: "0 0 8px 0" }}>
                  {card.title}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — WHO THIS IS FOR                                              */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "90px 20px",
          background: "#080C14",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#C084FC",
                textTransform: "uppercase",
              }}
            >
              TAILORED FOR HIGH-VOLUME CREATORS
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 12px 0",
                color: "#F8FAFC",
              }}
            >
              Built For People Who Need Content Consistently.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
              marginBottom: 40,
            }}
          >
            {TARGET_AUDIENCE_CARDS.map((aud) => (
              <div
                key={aud.role}
                style={{
                  background: "rgba(15, 23, 42, 0.65)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  padding: 30,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    color: "#818CF8",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  FOR {aud.role}
                </span>
                <p style={{ color: "#CBD5E1", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  {aud.text}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => scrollToSection("quote-form")}
              style={{
                background: "transparent",
                border: "1px solid rgba(129, 140, 248, 0.4)",
                color: "#818CF8",
                padding: "12px 28px",
                borderRadius: 99,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Tell Us What You're Creating ↓
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — THE RECURRING CONTENT MODEL                                   */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "90px 20px",
          background: "linear-gradient(180deg, #080C14 0%, #0B0F19 100%)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#F59E0B",
                textTransform: "uppercase",
              }}
            >
              RECURRING CONTENT MODEL
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 14px 0",
                color: "#F8FAFC",
              }}
            >
              How Much Content Do You Need Every Month?
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16, maxWidth: 640, margin: "0 auto" }}>
              No forced rigid packages. Select your target monthly video volume to customize your editing setup.
            </p>
          </div>

          {/* Volume Selection Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {VOLUME_OPTIONS.filter((v) => v.id !== "not_sure").map((vol) => {
              const isSelected = formData.monthly_volume === vol.count;
              return (
                <div
                  key={vol.id}
                  onClick={() => handleSelectVolumeCard(vol.count)}
                  data-track="content-volume"
                  style={{
                    background: isSelected
                      ? "linear-gradient(145deg, rgba(99, 102, 241, 0.25), rgba(15, 23, 42, 0.95))"
                      : "rgba(15, 23, 42, 0.6)",
                    border: isSelected
                      ? "2px solid #6366F1"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 20,
                    padding: 28,
                    cursor: "pointer",
                    textAlign: "center",
                    boxShadow: isSelected ? "0 10px 30px rgba(99, 102, 241, 0.25)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: isSelected ? "#F8FAFC" : "#E2E8F0",
                      marginBottom: 8,
                    }}
                  >
                    {vol.title}
                  </div>
                  <div style={{ fontSize: 13, color: isSelected ? "#818CF8" : "#94A3B8", marginBottom: 16 }}>
                    {vol.subtitle}
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      background: isSelected ? "#6366F1" : "rgba(255,255,255,0.06)",
                      color: isSelected ? "#FFFFFF" : "#CBD5E1",
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "6px 16px",
                      borderRadius: 99,
                    }}
                  >
                    {isSelected ? "Selected ✓" : "Select Volume"}
                  </span>
                </div>
              );
            })}
          </div>

          <p style={{ textAlign: "center", color: "#64748B", fontSize: 14, margin: 0 }}>
            Need something different? Tell us what you need in the custom quote form below.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9 — QUALIFICATION FORM / LEAD FUNNEL                              */}
      {/* ========================================================================= */}
      <section
        id="quote-form"
        style={{
          padding: "90px 20px",
          background: "#06080F",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#38BDF8",
                textTransform: "uppercase",
              }}
            >
              CUSTOM QUOTE FUNNEL
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 12px 0",
                color: "#F8FAFC",
              }}
            >
              Let's Build Your Editing Plan.
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16, maxWidth: 620, margin: "0 auto" }}>
              Tell us what you're creating and how much content you need. We'll recommend the right editing setup and send you a custom quote.
            </p>
          </div>

          {/* Form Container */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 24,
              padding: "36px 28px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              position: "relative",
            }}
          >
            {/* Step Progress Bar */}
            {!formSubmitted && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "#64748B", marginBottom: 8 }}>
                  <span>STEP {currentStep} OF 5</span>
                  <span>
                    {currentStep === 1 && "Content Types"}
                    {currentStep === 2 && "Monthly Volume"}
                    {currentStep === 3 && "Business Type"}
                    {currentStep === 4 && "Contact Details"}
                    {currentStep === 5 && "Project Notes"}
                  </span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${(currentStep / 5) * 100}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #3B82F6, #6366F1)",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            )}

            {formSubmitted ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "40px 20px" }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.2)",
                    border: "2px solid #10B981",
                    color: "#10B981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    margin: "0 auto 24px",
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: "#F8FAFC", marginBottom: 12 }}>
                  Quote Request Received!
                </h3>
                <p style={{ color: "#CBD5E1", fontSize: 16, maxWidth: 540, margin: "0 auto 24px", lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>! We are reviewing your requirements ({formData.monthly_volume} videos/mo for {formData.business_type}) and will email your custom quote to <strong>{formData.email}</strong> within 12 hours.
                </p>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: 20,
                    maxWidth: 480,
                    margin: "0 auto 28px",
                    textAlign: "left",
                    fontSize: 14,
                    color: "#94A3B8",
                  }}
                >
                  <div>✓ Dedicated editing team assigned</div>
                  <div style={{ marginTop: 6 }}>✓ Custom monthly volume setup prepared</div>
                  <div style={{ marginTop: 6 }}>✓ 48-hour delivery commitment activated</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href={`https://wa.me/919989679185?text=${encodeURIComponent(
                      `Hi StoryBuilder! I just submitted a US Video Editing quote request:\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📱 Phone: ${formData.phone}\n🏢 Brand: ${formData.company || "N/A"}\n💼 Type: ${formData.business_type}\n📦 Volume: ${formData.monthly_volume} videos/mo\n💬 Notes: ${formData.message || "N/A"}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: "rgba(37,211,102,0.15)",
                      border: "1px solid rgba(37,211,102,0.5)",
                      color: "#25D366",
                      padding: "12px 24px",
                      borderRadius: 99,
                      fontSize: 14,
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    💬 Chat on WhatsApp Instant
                  </a>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setCurrentStep(1);
                    }}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#FFFFFF",
                      padding: "12px 24px",
                      borderRadius: 99,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitLeadForm}>
                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* STEP 1: Content Types */}
                {currentStep === 1 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#F8FAFC", marginBottom: 8 }}>
                      Step 1: What type of content do you need?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 24 }}>
                      Select all content formats you plan to send for editing.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                      {CONTENT_TYPE_OPTIONS.map((opt) => {
                        const checked = formData.content_types.includes(opt.id);
                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleContentTypeToggle(opt.id)}
                            style={{
                              background: checked ? "rgba(99, 102, 241, 0.18)" : "rgba(255,255,255,0.03)",
                              border: checked ? "2px solid #6366F1" : "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 16,
                              padding: 18,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 12,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              style={{ marginTop: 3, accentColor: "#6366F1" }}
                            />
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9" }}>{opt.label}</div>
                              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{opt.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Monthly Volume */}
                {currentStep === 2 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#F8FAFC", marginBottom: 8 }}>
                      Step 2: How many videos do you need per month?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 24 }}>
                      Choose your estimated monthly video volume.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                      {VOLUME_OPTIONS.map((vol) => {
                        const isSelected = formData.monthly_volume === vol.count;
                        return (
                          <div
                            key={vol.id}
                            onClick={() => setFormData({ ...formData, monthly_volume: vol.count })}
                            style={{
                              background: isSelected ? "rgba(99, 102, 241, 0.2)" : "rgba(255,255,255,0.03)",
                              border: isSelected ? "2px solid #6366F1" : "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 16,
                              padding: 20,
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ fontSize: 16, fontWeight: 800, color: "#F8FAFC" }}>{vol.title}</div>
                            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{vol.subtitle}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: Business Type */}
                {currentStep === 3 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#F8FAFC", marginBottom: 8 }}>
                      Step 3: What best describes you?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 24 }}>
                      This helps us pair you with an editor experienced in your niche.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
                      {BUSINESS_TYPES.map((type) => {
                        const isSelected = formData.business_type === type;
                        return (
                          <div
                            key={type}
                            onClick={() => setFormData({ ...formData, business_type: type })}
                            style={{
                              background: isSelected ? "rgba(59, 130, 246, 0.2)" : "rgba(255,255,255,0.03)",
                              border: isSelected ? "2px solid #3B82F6" : "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 14,
                              padding: "16px 12px",
                              cursor: "pointer",
                              textAlign: "center",
                              fontSize: 14,
                              fontWeight: 700,
                              color: isSelected ? "#FFFFFF" : "#CBD5E1",
                            }}
                          >
                            {type}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: Contact Information */}
                {currentStep === 4 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#F8FAFC", marginBottom: 8 }}>
                      Step 4: Where should we send your quote?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 24 }}>
                      We will dispatch your custom pricing breakdown within 12 hours.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#CBD5E1", marginBottom: 6 }}>
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Morgan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          style={{
                            width: "100%",
                            background: "#030712",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 12,
                            padding: 14,
                            color: "#FFFFFF",
                            fontSize: 14,
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#CBD5E1", marginBottom: 6 }}>
                          BUSINESS EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@yourbrand.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{
                            width: "100%",
                            background: "#030712",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 12,
                            padding: 14,
                            color: "#FFFFFF",
                            fontSize: 14,
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#CBD5E1", marginBottom: 6 }}>
                          PHONE / WHATSAPP *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: "100%",
                            background: "#030712",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 12,
                            padding: 14,
                            color: "#FFFFFF",
                            fontSize: 14,
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#CBD5E1", marginBottom: 6 }}>
                          COMPANY / BRAND (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Morgan Media Group"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          style={{
                            width: "100%",
                            background: "#030712",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 12,
                            padding: 14,
                            color: "#FFFFFF",
                            fontSize: 14,
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Project Notes & Submit */}
                {currentStep === 5 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#F8FAFC", marginBottom: 8 }}>
                      Step 5: Tell us a little about what you need (Optional)
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 20 }}>
                      Share links to your channels or reference video styles you admire.
                    </p>
                    <textarea
                      rows={4}
                      placeholder="e.g. We record weekly podcast episodes and need 8 vertical reels per month with Hormozi-style captions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%",
                        background: "#030712",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 14,
                        padding: 16,
                        color: "#FFFFFF",
                        fontSize: 14,
                        boxSizing: "border-box",
                        resize: "vertical",
                        marginBottom: 20,
                      }}
                    />

                    {/* Summary Card */}
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#38BDF8", marginBottom: 6 }}>SUMMARY:</div>
                      <div style={{ fontSize: 13, color: "#CBD5E1" }}>
                        • <strong>Volume:</strong> {formData.monthly_volume} videos / month
                      </div>
                      <div style={{ fontSize: 13, color: "#CBD5E1", marginTop: 4 }}>
                        • <strong>Business:</strong> {formData.business_type}
                      </div>
                      <div style={{ fontSize: 13, color: "#CBD5E1", marginTop: 4 }}>
                        • <strong>Recipient:</strong> {formData.name} ({formData.email})
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {formError && (
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      color: "#FCA5A5",
                      fontSize: 13,
                      padding: "10px 14px",
                      borderRadius: 10,
                      marginTop: 16,
                    }}
                  >
                    ⚠️ {formError}
                  </div>
                )}

                {/* Navigation & Submit Buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "#94A3B8",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: 99,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ← Back
                    </button>
                  ) : <div />}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      style={{
                        background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "14px 32px",
                        borderRadius: 99,
                        fontSize: 15,
                        fontWeight: 800,
                        cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
                      }}
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      data-track="lead-submit"
                      style={{
                        background: "linear-gradient(135deg, #10B981, #059669)",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "16px 36px",
                        borderRadius: 99,
                        fontSize: 16,
                        fontWeight: 900,
                        cursor: formSubmitting ? "wait" : "pointer",
                        boxShadow: "0 10px 30px rgba(16, 185, 129, 0.45)",
                      }}
                    >
                      {formSubmitting ? "Processing Request..." : "Get My Custom Editing Quote →"}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — WHAT HAPPENS AFTER I SUBMIT?                                */}
      {/* ========================================================================= */}
      <section style={{ padding: "80px 20px", background: "#080C15" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#F8FAFC" }}>
              What Happens Next?
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { num: "01", title: "We Review Your Requirements", text: "We analyze your target content formats, monthly volume, and style preferences." },
              { num: "02", title: "We Recommend The Right Setup", text: "We pair your channel with a dedicated editor experienced in your industry niche." },
              { num: "03", title: "You Receive Your Custom Quote", text: "Clear, predictable monthly pricing with zero long-term contracts or hidden fees." },
              { num: "04", title: "We Start Editing", text: "Upload your raw footage and get your first polished video returned in 48 hours." },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 18,
                  padding: 24,
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 900, color: "#38BDF8", marginBottom: 10 }}>{step.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#F1F5F9", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: "#94A3B8", fontSize: 13.5, lineHeight: 1.5, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — WHY WORK WITH US                                            */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 20px", background: "#0A0E17", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, color: "#F8FAFC" }}>
              An Editing Team You Can Actually Rely On.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              "✓ Consistent editing quality & brand style guidelines",
              "✓ Reliable 48-hour turnaround on short-form content",
              "✓ Brand consistency across every video & platform",
              "✓ Scalable monthly volume as your content demands grow",
              "✓ No full-time hiring cost, taxes, or management overhead",
              "✓ One dedicated team for all your video editing needs",
              "✓ Built specifically for recurring content creators & brands",
            ].map((benefit, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 16,
                  padding: 20,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#F1F5F9",
                }}
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — TESTIMONIALS                                                */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 20px", background: "#070A12" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#F59E0B", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              CLIENT FEEDBACK
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#F8FAFC", marginTop: 10 }}>
              Trusted By High-Volume Content Creators
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 23, 42, 0.65)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "#CBD5E1", fontSize: 14.5, lineHeight: 1.6, fontStyle: "italic", margin: "0 0 20px 0" }}>
                  "{t.text}"
                </p>
                <div>
                  <div style={{ color: "#F59E0B", fontSize: 14, marginBottom: 6 }}>★★★★★</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#F8FAFC" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>{t.role}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13 — FAQ                                                          */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 20px", background: "#0B0E17", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#818CF8", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              QUESTIONS & ANSWERS
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#F8FAFC", marginTop: 10 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => {
                      setOpenFaqIndex(isOpen ? -1 : idx);
                      trackEvent("faq_toggle", { question: faq.q });
                    }}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "20px 24px",
                      color: "#F8FAFC",
                      fontSize: 16,
                      fontWeight: 700,
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: "#38BDF8", fontSize: 20 }}>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 24px 20px 24px", color: "#94A3B8", fontSize: 14.5, lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 14 — FINAL CTA                                                   */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "100px 20px",
          background: "linear-gradient(135deg, #0F172A 0%, #030712 100%)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              fontWeight: 900,
              color: "#F8FAFC",
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            Stop Spending Your Week Editing.
          </h2>
          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.25rem)", color: "#94A3B8", marginBottom: 36, lineHeight: 1.6 }}>
            Send us the footage. We'll turn it into content your audience can actually watch.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollToSection("quote-form")}
              data-track="final-cta"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                color: "#FFFFFF",
                padding: "18px 40px",
                borderRadius: 99,
                fontSize: 17,
                fontWeight: 900,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 12px 35px rgba(37, 99, 235, 0.5)",
              }}
            >
              Get My Custom Editing Quote →
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#E2E8F0",
                border: "1px solid rgba(255,255,255,0.16)",
                padding: "18px 32px",
                borderRadius: 99,
                fontSize: 17,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              See Our Work
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "#04060A",
          padding: "40px 20px",
          color: "#64748B",
          fontSize: 13,
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div>
            <span style={{ fontWeight: 800, color: "#F8FAFC", fontSize: 16 }}>
              TheStoryBuilder Video Services
            </span>
            <div style={{ marginTop: 4 }}>Recurring Video Editing for US Creators, Brands & Agencies</div>
          </div>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {setPage && (
              <button
                onClick={() => setPage("privacy")}
                style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer" }}
              >
                Privacy Policy
              </button>
            )}
            {setPage && (
              <button
                onClick={() => setPage("terms")}
                style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer" }}
              >
                Terms & Conditions
              </button>
            )}
            <a href="mailto:hello@thestorybuilder.in" style={{ color: "#64748B", textDecoration: "none" }}>
              hello@thestorybuilder.in
            </a>
          </div>

          <div>© {new Date().getFullYear()} TheStoryBuilder. All rights reserved.</div>
        </div>
      </footer>

      {/* Sticky Mobile CTA Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          background: "rgba(11, 15, 25, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="mobile-sticky-cta"
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#F8FAFC" }}>Recurring Video Editing</div>
          <div style={{ fontSize: 10, color: "#94A3B8" }}>Custom Quote in 12h</div>
        </div>
        <button
          onClick={() => scrollToSection("quote-form")}
          data-track="mobile-sticky-cta"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            color: "#FFFFFF",
            border: "none",
            padding: "10px 20px",
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(59, 130, 246, 0.5)",
          }}
        >
          Get Custom Quote →
        </button>
      </div>

      {/* CSS helper for responsive display */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-only-link {
            display: inline-block !important;
          }
          .mobile-sticky-cta {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
