import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackPageView, trackEvent, trackLead } from "../../utils/tracking";
import { getUTMParams } from "../../utils/utm";

// Data-driven Portfolio Videos
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
  { id: "reels_shorts", label: "Reels / Shorts (9:16)", desc: "Vertical videos for IG, TikTok & YT Shorts", icon: "📱" },
  { id: "podcast_clips", label: "Podcast Clips", desc: "Short nuggets extracted from audio/video podcasts", icon: "🎙️" },
  { id: "youtube_long", label: "YouTube Videos (16:9)", desc: "Full long-form videos, vlogs & tutorials", icon: "🎬" },
  { id: "video_ads", label: "Direct Response Video Ads", desc: "High-converting paid ad creatives for Meta & TikTok", icon: "⚡" },
  { id: "personal_brand", label: "Personal Brand Content", desc: "Authority talking-head & breakdown videos", icon: "👑" },
  { id: "other", label: "Custom Mixed Plan", desc: "Tailored combination of long & short-form video content", icon: "✨" },
];

// Monthly Volume Options
const VOLUME_OPTIONS = [
  { id: "4_videos", title: "4 VIDEOS / MO", subtitle: "Getting Started", count: "4", estSavings: "Save $2,500/mo" },
  { id: "8_videos", title: "8 VIDEOS / MO", subtitle: "Consistent Growth", count: "8", popular: true, estSavings: "Save $4,200/mo" },
  { id: "12_videos", title: "12 VIDEOS / MO", subtitle: "High Authority", count: "12", estSavings: "Save $5,500/mo" },
  { id: "20_plus", title: "20+ VIDEOS / MO", subtitle: "Agency / Enterprise", count: "20+", estSavings: "Save $8,000/mo" },
  { id: "not_sure", title: "NOT SURE YET", subtitle: "Custom Recommendation", count: "Custom", estSavings: "Tailored Quote" },
];

// Business Types
const BUSINESS_TYPES = [
  "Coach / Mentor",
  "Consultant / Advisor",
  "Creator / Influencer",
  "Personal Brand",
  "Podcaster",
  "Real Estate Professional",
  "Agency Owner",
  "E-Commerce / D2C Brand",
  "B2B SaaS / Tech Founder",
  "Other Business",
];

// Edit Services Cards
const EDIT_SERVICES_CARDS = [
  { title: "Short-Form Reels", icon: "⚡", desc: "9:16 vertical videos with scroll-stopping hooks, kinetic subtitles, sound effects, and fast-paced visual cuts for Instagram & TikTok." },
  { title: "YouTube Shorts", icon: "🚀", desc: "High-retention vertical short videos engineered to perform under YouTube's algorithm and convert viewers into channel subscribers." },
  { title: "Podcast Clips", icon: "🎙️", desc: "Micro-content extracted from audio and video podcast episodes featuring clean multi-camera switches, audio cleaning, and animated captions." },
  { title: "Long-form YouTube", icon: "🎬", desc: "Comprehensive horizontal video editing with custom intro hooks, lower thirds, screen shares, B-roll overlays, and chapter marker cuts." },
  { title: "Talking-head Videos", icon: "🗣️", desc: "Polished authority content for thought leaders with awkward pauses cut out, motion graphic popups, and crisp audio leveling." },
  { title: "Social Media Content", icon: "📲", desc: "Platform-native video edits designed specifically for LinkedIn, Twitter/X, Instagram feeds, and Facebook video posts." },
  { title: "Video Ads", icon: "🔥", desc: "High-ROAS Direct Response ad creatives crafted for Meta Ads, TikTok Ads, and YouTube PMax campaigns to maximize click-through rates." },
  { title: "Personal Brand Content", icon: "👑", desc: "Signature-style video edits that reinforce your visual identity, voice, and positioning to build audience trust and authority." },
];

// Target Audience Cards
const TARGET_AUDIENCE_CARDS = [
  { role: "COACHES", badge: "AUTHORITY", text: "Turn your expertise and client case studies into consistent, authority-building short-form content that fills your calendar with qualified leads." },
  { role: "CONSULTANTS", badge: "POSITIONING", text: "Turn client conversations, presentations, and industry insights into high-end polished content for LinkedIn and YouTube." },
  { role: "PERSONAL BRANDS", badge: "SCALE", text: "Stay visible across every major video platform daily without spending 15+ hours every week sitting inside video editing software." },
  { role: "PODCASTERS", badge: "VIRAL CLIPS", text: "Extract 5 to 10 viral clip nuggets from every single podcast episode to cross-promote your show on short-form platforms." },
  { role: "REAL ESTATE", badge: "LISTINGS", text: "Turn property walkthroughs, market updates, and personal brand footage into sleek, high-converting video content that buyers love." },
  { role: "AGENCIES", badge: "WHITE-LABEL", text: "Extend your video delivery bandwidth instantly without the payroll overhead of hiring, training, and managing full-time in-house editors." },
];

// FAQ Items
const FAQ_ITEMS = [
  {
    q: "Do you work with clients in the US?",
    a: "Yes! Over 80% of our client base is located across the US and Canada. We operate with seamless async workflows (Google Drive, Frame.io, Slack/WhatsApp) and dedicated US-friendly hours for project communication and file delivery.",
  },
  {
    q: "Do I need to provide the raw footage?",
    a: "Yes. You record raw footage on your phone, camera, or podcast setup. Once uploaded to our shared Drive or Frame.io link, our editing team handles 100% of the cutting, kinetic captions, sound FX, B-roll, color grading, and final exports.",
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
    q: "Can you work with agencies on a white-label basis?",
    a: "Yes! We offer white-label video editing partnerships for marketing agencies, social media managers, and creative directors looking for a reliable execution team without payroll overhead.",
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
    location: "Austin, TX",
    text: "Before working with them, I had 40GB of raw podcast footage sitting on my hard drive that I never had time to touch. Now I drop raw files into Drive and get 8 scroll-stopping Reels back every week. My inbound leads have doubled.",
    rating: 5,
    avatar: "👨🏽‍💼",
  },
  {
    name: "Elena Rostova",
    role: "Real Estate Broker & Founder",
    location: "Miami, FL",
    text: "Finding reliable freelance editors was a nightmare until I found this team. The turnaround is clockwork, the captions look super high-end, and I saved over $5,000/month compared to hiring a full-time editor.",
    rating: 5,
    avatar: "👩🏼‍💼",
  },
  {
    name: "David Sterling",
    role: "Agency Principal",
    location: "Chicago, IL",
    text: "We white-label their editing team for 6 of our agency's retainers. They handle short-form reels and YouTube shorts seamlessly. Extremely dependable and high-converting quality.",
    rating: 5,
    avatar: "👨🏻‍💻",
  },
];

export default function USVideoEditingLandingPage({ setPage }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // State Management
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [baMode, setBaMode] = useState("after");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // ROI Calculator State
  const [calcVolume, setCalcVolume] = useState(12);

  // Qualification Form Multi-step State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    content_types: ["reels_shorts"],
    monthly_volume: "8",
    business_type: "Coach / Mentor",
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

  const filteredPortfolio =
    activeCategory === "ALL"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const handleContentTypeToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.content_types.includes(id);
      if (exists) {
        if (prev.content_types.length === 1) return prev;
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
    setCurrentStep(3);
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
      utm_source: utmParams.utm_source || "direct",
      utm_medium: utmParams.utm_medium || "none",
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
      trackLead({
        content_name: "US Video Editing Quote Request",
        monthly_volume: formData.monthly_volume,
        business_type: formData.business_type,
      });

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

  // ROI Math
  const inHouseCost = 5500;
  const freelancerCost = 2800;
  const tsbCost = Math.round(calcVolume * 65);
  const monthlySavings = inHouseCost - tsbCost;

  return (
    <div
      style={{
        background: "#050811",
        color: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Dynamic Background Glow Orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -160,
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          maxWidth: 1300,
          height: 700,
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.22), rgba(59, 130, 246, 0.12) 40%, rgba(6, 182, 212, 0.05) 65%, transparent 80%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 1400,
          right: "-15%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.14), transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 3200,
          left: "-10%",
          width: 550,
          height: 550,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Sticky Header Navigation */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(5, 8, 17, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "16px 24px",
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 17,
                color: "#FFFFFF",
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
              }}
            >
              ▶
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 18,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                }}
              >
                TheStoryBuilder <span style={{ color: "#38BDF8", fontSize: 12, fontWeight: 700 }}>US</span>
              </span>
              <span style={{ fontSize: 10, color: "#64748B", fontWeight: 600 }}>RECURRING VIDEO EDITING</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button
              onClick={() => scrollToSection("quote-form")}
              data-track="header-cta"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                color: "#FFFFFF",
                border: "none",
                padding: "10px 22px",
                borderRadius: 99,
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                transition: "transform 0.2s, boxShadow 0.2s",
              }}
            >
              Get Custom Quote →
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1 — HERO                                                          */}
      {/* ========================================================================= */}
      <section
        style={{
          paddingTop: "70px",
          paddingBottom: "90px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 52,
              alignItems: "center",
            }}
          >
            {/* Left Column Copy */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 16px",
                  borderRadius: 99,
                  background: "rgba(99, 102, 241, 0.12)",
                  border: "1px solid rgba(99, 102, 241, 0.35)",
                  color: "#818CF8",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  marginBottom: 24,
                  textTransform: "uppercase",
                  boxShadow: "0 4px 14px rgba(99, 102, 241, 0.15)",
                }}
              >
                <span>🇺🇸</span> US-FOCUSED RECURRING VIDEO EDITING STUDIO
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.4rem)",
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  color: "#F8FAFC",
                  margin: "0 0 24px 0",
                }}
              >
                Your Content Team, Without Hiring an{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #60A5FA 0%, #818CF8 40%, #C084FC 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  In-House Editor.
                </span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(1.1rem, 1.9vw, 1.3rem)",
                  color: "#94A3B8",
                  lineHeight: 1.6,
                  margin: "0 0 36px 0",
                  maxWidth: 600,
                }}
              >
                Send us your raw footage. We turn it into polished, high-converting vertical Reels & long-form YouTube content — delivered in 48 hours without the $65,000/yr in-house overhead.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
                <button
                  onClick={() => scrollToSection("quote-form")}
                  data-track="hero-cta"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    padding: "18px 36px",
                    borderRadius: 99,
                    fontSize: 16,
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(37, 99, 235, 0.5)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Get Custom Editing Quote →
                </button>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  data-track="hero-secondary-cta"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#E2E8F0",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    padding: "18px 30px",
                    borderRadius: 99,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Watch Video Edits ▶
                </button>
              </div>

              {/* Trust Indicators */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  fontSize: 13,
                  color: "#64748B",
                  fontWeight: 600,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#10B981", fontWeight: 900 }}>✓</span> 48-Hour Turnaround
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#10B981", fontWeight: 900 }}>✓</span> Unlimited Revisions
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#10B981", fontWeight: 900 }}>✓</span> Dedicated US Brand Kit
                </div>
              </div>
            </div>

            {/* Right Interactive Studio Canvas Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.75)",
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
                <span style={{ fontSize: 11, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.1em" }}>
                  TIMELINE PREVIEW — RAW TO REEL
                </span>
                <span style={{ fontSize: 11, color: "#38BDF8", fontWeight: 800 }}>48H SLA</span>
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
                    border: "1px solid rgba(99, 102, 241, 0.35)",
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
                        fontSize: 15,
                        fontWeight: 900,
                        padding: "4px 10px",
                        borderRadius: 6,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.6)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      "STOP WASTING 15+ HOURS EDITING..."
                    </span>
                  </div>

                  {/* Audio Waveform & Feature Pills */}
                  <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
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
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 10, color: "#64748B", width: 45, fontWeight: 700 }}>V1 CUTS</span>
                    <div style={{ flex: 1, display: "flex", gap: 4 }}>
                      <div style={{ flex: 2, height: 14, background: "#3B82F6", borderRadius: 4 }} />
                      <div style={{ flex: 3, height: 14, background: "#6366F1", borderRadius: 4 }} />
                      <div style={{ flex: 2, height: 14, background: "#8B5CF6", borderRadius: 4 }} />
                    </div>
                  </div>
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
          padding: "90px 24px",
          background: "#080C16",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
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
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 16px 0",
                lineHeight: 1.15,
                color: "#F8FAFC",
              }}
            >
              Your Content Doesn't Need More Ideas. <br />
              <span style={{ color: "#94A3B8" }}>It Needs Execution.</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, maxWidth: 640, margin: "0 auto" }}>
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
                title: "Footage sitting on your drive",
                desc: "Hours of great recordings gathered during podcasts, speeches, or walkthroughs never make it to social media.",
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
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  padding: 28,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#F1F5F9", margin: "0 0 10px 0" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.08))",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: 24,
              padding: "28px 36px",
              maxWidth: 740,
              margin: "0 auto",
            }}
          >
            <span style={{ fontSize: 19, fontWeight: 900, color: "#818CF8" }}>
              That's where we come in.
            </span>
            <p style={{ margin: "8px 0 0 0", color: "#CBD5E1", fontSize: 15, lineHeight: 1.6 }}>
              You focus on recording your expertise. We handle 100% of the cutting, kinetic captions, sound design, color grading, and delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — INTERACTIVE ROI CALCULATOR                                   */}
      {/* ========================================================================= */}
      <section id="roi-calculator" style={{ padding: "90px 24px", background: "#050811" }}>
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
              FINANCIAL ROI COMPARISON
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 16px 0",
                color: "#F8FAFC",
              }}
            >
              How Much Do You Save vs. In-House Hiring?
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16 }}>
              Drag the slider below to calculate your estimated monthly & annual savings.
            </p>
          </div>

          {/* Slider Control Container */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 24,
              padding: "36px 32px",
              maxWidth: 860,
              margin: "0 auto",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#E2E8F0" }}>
                  Monthly Video Volume Target:
                </span>
                <span style={{ fontSize: 24, fontWeight: 900, color: "#38BDF8" }}>
                  {calcVolume} Videos / Month
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                step="2"
                value={calcVolume}
                onChange={(e) => setCalcVolume(parseInt(e.target.value, 10))}
                style={{
                  width: "100%",
                  height: 10,
                  accentColor: "#3B82F6",
                  cursor: "pointer",
                  borderRadius: 5,
                }}
              />
            </div>

            {/* Comparison Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
              }}
            >
              <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.25)", borderRadius: 16, padding: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#FCA5A5" }}>IN-HOUSE US EDITOR</span>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#EF4444", margin: "8px 0" }}>
                  ${inHouseCost.toLocaleString()}/mo
                </div>
                <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>
                  $66,000/yr salary + health benefits, equipment & software.
                </p>
              </div>

              <div style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", borderRadius: 16, padding: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#FDE68A" }}>US FREELANCERS</span>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#F59E0B", margin: "8px 0" }}>
                  ${freelancerCost.toLocaleString()}/mo
                </div>
                <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>
                  Inconsistent delivery, ghosting risk & managing multiple freelancers.
                </p>
              </div>

              <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "2px solid #10B981", borderRadius: 16, padding: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#6EE7B7" }}>THE STORY BUILDER</span>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#10B981", margin: "8px 0" }}>
                  ${tsbCost.toLocaleString()}/mo
                </div>
                <p style={{ fontSize: 12, color: "#CBD5E1", margin: 0 }}>
                  48h SLA, dedicated brand kit, zero management overhead.
                </p>
              </div>
            </div>

            {/* Total Savings Highlight */}
            <div
              style={{
                marginTop: 28,
                padding: 20,
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.15))",
                borderRadius: 16,
                border: "1px solid rgba(16, 185, 129, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#6EE7B7" }}>ESTIMATED ANNUAL SAVINGS</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF" }}>
                  ${(monthlySavings * 12).toLocaleString()} / Year
                </div>
              </div>
              <button
                onClick={() => handleSelectVolumeCard(`${calcVolume}`)}
                style={{
                  background: "#10B981",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 99,
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
                }}
              >
                Claim This Plan →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — PORTFOLIO / PROOF                                            */}
      {/* ========================================================================= */}
      <section
        id="portfolio"
        style={{
          padding: "90px 24px",
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
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
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

      {/* Video Modal Player Lightbox */}
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
      {/* SECTION 5 — BEFORE / AFTER INTERACTIVE COMPARISON                         */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 24px", background: "#0B0F17" }}>
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
              alignItems: "center",
            }}
          >
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

            <div
              style={{
                background: "linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.9))",
                border: baMode === "after" ? "2px solid #10B981" : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 24,
                padding: 28,
                opacity: baMode === "after" ? 1 : 0.65,
                boxShadow: baMode === "after" ? "0 15px 40px rgba(16, 185, 129, 0.2)" : "none",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#10B981" }}>POLISHED EDIT</span>
                <span style={{ fontSize: 12, color: "#38BDF8", fontWeight: 700 }}>High Retention</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "✓ Tight jump cuts & awkward pause removal",
                  "✓ Animated Hormozi kinetic captions with custom brand colors",
                  "✓ Multi-band audio EQ, noise reduction & sound FX popups",
                  "✓ Relevant HD B-roll overlays & screen-share callouts",
                  "✓ Cinematic color grade tailored to your brand identity",
                  "✓ High retention, platform-native vertical video export",
                ].map((item, i) => (
                  <li key={i} style={{ color: "#F8FAFC", fontSize: 14, lineHeight: 1.5, fontWeight: 600 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — EDIT SERVICES & TARGET AUDIENCE                              */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 24px", background: "#050811" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#38BDF8",
                textTransform: "uppercase",
              }}
            >
              EDITING CAPABILITIES
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 16px 0",
                color: "#F8FAFC",
              }}
            >
              What We Edit For Your Business
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
              End-to-end editing capabilities across every major content format.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
              marginBottom: 80,
            }}
          >
            {EDIT_SERVICES_CARDS.map((card, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(15, 23, 42, 0.65)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  padding: 28,
                  transition: "transform 0.2s",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{card.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#F8FAFC", margin: "0 0 10px 0" }}>
                  {card.title}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Target Audience */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#C084FC",
                textTransform: "uppercase",
              }}
            >
              BUILT FOR GROWTH
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                margin: "12px 0 12px 0",
                color: "#F8FAFC",
              }}
            >
              Who We Work With
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {TARGET_AUDIENCE_CARDS.map((card, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      background: "rgba(192, 132, 252, 0.12)",
                      border: "1px solid rgba(192, 132, 252, 0.3)",
                      color: "#C084FC",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    {card.badge}
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "#F8FAFC", margin: "14px 0 10px 0" }}>
                    {card.role}
                  </h3>
                  <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — INTERACTIVE MULTI-STEP QUALIFICATION FORM                    */}
      {/* ========================================================================= */}
      <section
        id="quote-form"
        style={{
          padding: "90px 24px",
          background: "#070B14",
          borderTop: "1px solid rgba(255,255,255,0.08)",
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
              CUSTOM QUOTE BUILDER
            </span>
            <h2
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                fontWeight: 900,
                margin: "12px 0 12px 0",
                color: "#F8FAFC",
              }}
            >
              Get Your Custom Video Editing Proposal
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16 }}>
              Complete the quick 60-second questionnaire to get an exact custom quote tailored to your content schedule.
            </p>
          </div>

          {/* Form Container */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 24,
              padding: "36px 32px",
              boxShadow: "0 25px 70px rgba(0,0,0,0.6)",
            }}
          >
            {/* Step Progress Bar */}
            {!formSubmitted && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, color: "#64748B", marginBottom: 10 }}>
                  <span>STEP {currentStep} OF 5</span>
                  <span>{currentStep === 1 ? "Content Type" : currentStep === 2 ? "Monthly Volume" : currentStep === 3 ? "Business Category" : currentStep === 4 ? "Contact Details" : "Notes"}</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${(currentStep / 5) * 100}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #6366F1, #3B82F6, #10B981)",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            )}

            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: "#F8FAFC", margin: "0 0 12px 0" }}>
                  Quote Request Received!
                </h3>
                <p style={{ color: "#94A3B8", fontSize: 16, maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>! We've received your details for <strong>{formData.monthly_volume} videos/month</strong>. Our senior editor will review your requirements and reach out via email/WhatsApp within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setCurrentStep(1);
                  }}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    color: "#F8FAFC",
                    padding: "12px 28px",
                    borderRadius: 99,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitLeadForm}>
                {/* Honeypot field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                />

                {/* STEP 1 — Content Types */}
                {currentStep === 1 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#F8FAFC", margin: "0 0 6px 0" }}>
                      What video formats do you need edited?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, margin: "0 0 24px 0" }}>
                      Select all that apply to your content strategy.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 28 }}>
                      {CONTENT_TYPE_OPTIONS.map((opt) => {
                        const selected = formData.content_types.includes(opt.id);
                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleContentTypeToggle(opt.id)}
                            style={{
                              background: selected ? "rgba(99, 102, 241, 0.15)" : "rgba(255,255,255,0.03)",
                              border: selected ? "2px solid #6366F1" : "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 16,
                              padding: 16,
                              cursor: "pointer",
                              display: "flex",
                              gap: 12,
                              alignItems: "flex-start",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <span style={{ fontSize: 24 }}>{opt.icon}</span>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 800, color: "#F8FAFC" }}>{opt.label}</div>
                              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{opt.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2 — Monthly Volume */}
                {currentStep === 2 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#F8FAFC", margin: "0 0 6px 0" }}>
                      How many videos do you want to publish per month?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, margin: "0 0 24px 0" }}>
                      Choose your monthly content target.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
                      {VOLUME_OPTIONS.map((vol) => {
                        const selected = formData.monthly_volume === vol.count;
                        return (
                          <div
                            key={vol.id}
                            onClick={() => setFormData({ ...formData, monthly_volume: vol.count })}
                            style={{
                              background: selected ? "rgba(59, 130, 246, 0.18)" : "rgba(255,255,255,0.03)",
                              border: selected ? "2px solid #3B82F6" : "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 16,
                              padding: 20,
                              cursor: "pointer",
                              position: "relative",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {vol.popular && (
                              <span style={{ position: "absolute", top: 12, right: 12, background: "#3B82F6", color: "#FFF", fontSize: 10, fontWeight: 900, padding: "2px 6px", borderRadius: 4 }}>
                                MOST POPULAR
                              </span>
                            )}
                            <div style={{ fontSize: 16, fontWeight: 900, color: "#F8FAFC" }}>{vol.title}</div>
                            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{vol.subtitle}</div>
                            <div style={{ fontSize: 12, color: "#10B981", fontWeight: 700, marginTop: 8 }}>{vol.estSavings}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3 — Business Category */}
                {currentStep === 3 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#F8FAFC", margin: "0 0 6px 0" }}>
                      What best describes your business role?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, margin: "0 0 24px 0" }}>
                      Helps us match you with editors specialized in your industry.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
                      {BUSINESS_TYPES.map((bt) => {
                        const selected = formData.business_type === bt;
                        return (
                          <button
                            key={bt}
                            type="button"
                            onClick={() => setFormData({ ...formData, business_type: bt })}
                            style={{
                              background: selected ? "linear-gradient(135deg, #6366F1, #3B82F6)" : "rgba(255,255,255,0.04)",
                              color: selected ? "#FFFFFF" : "#CBD5E1",
                              border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
                              padding: "14px 16px",
                              borderRadius: 12,
                              fontWeight: 700,
                              fontSize: 13,
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            {selected ? "✓ " : ""}{bt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4 — Contact Info */}
                {currentStep === 4 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#F8FAFC", margin: "0 0 6px 0" }}>
                      Where should we send your custom proposal?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, margin: "0 0 24px 0" }}>
                      We respect your privacy. Zero spam guaranteed.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 800, color: "#CBD5E1", display: "block", marginBottom: 6 }}>
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Marcus Vance"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          style={{
                            width: "100%",
                            background: "rgba(5, 8, 17, 0.9)",
                            border: "1px solid rgba(255,255,255,0.14)",
                            borderRadius: 12,
                            padding: "14px 16px",
                            color: "#FFFFFF",
                            fontSize: 15,
                          }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 800, color: "#CBD5E1", display: "block", marginBottom: 6 }}>
                            EMAIL ADDRESS *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="marcus@vancegroup.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{
                              width: "100%",
                              background: "rgba(5, 8, 17, 0.9)",
                              border: "1px solid rgba(255,255,255,0.14)",
                              borderRadius: 12,
                              padding: "14px 16px",
                              color: "#FFFFFF",
                              fontSize: 15,
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 800, color: "#CBD5E1", display: "block", marginBottom: 6 }}>
                            PHONE / WHATSAPP *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+1 (512) 890-1234"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{
                              width: "100%",
                              background: "rgba(5, 8, 17, 0.9)",
                              border: "1px solid rgba(255,255,255,0.14)",
                              borderRadius: 12,
                              padding: "14px 16px",
                              color: "#FFFFFF",
                              fontSize: 15,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: 12, fontWeight: 800, color: "#CBD5E1", display: "block", marginBottom: 6 }}>
                          COMPANY / BRAND NAME (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          placeholder="Vance Leadership Group"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          style={{
                            width: "100%",
                            background: "rgba(5, 8, 17, 0.9)",
                            border: "1px solid rgba(255,255,255,0.14)",
                            borderRadius: 12,
                            padding: "14px 16px",
                            color: "#FFFFFF",
                            fontSize: 15,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5 — Additional Notes */}
                {currentStep === 5 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#F8FAFC", margin: "0 0 6px 0" }}>
                      Any specific goals or style preferences?
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: 14, margin: "0 0 24px 0" }}>
                      Share links to reference videos you love or details about your current raw footage setup.
                    </p>

                    <div style={{ marginBottom: 28 }}>
                      <textarea
                        rows={4}
                        placeholder="e.g. We record a weekly podcast in Austin and want 8 Hormozi-style Reels with green/gold subtitles delivered every month..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: "100%",
                          background: "rgba(5, 8, 17, 0.9)",
                          border: "1px solid rgba(255,255,255,0.14)",
                          borderRadius: 12,
                          padding: "14px 16px",
                          color: "#FFFFFF",
                          fontSize: 15,
                          lineHeight: 1.5,
                        }}
                      />
                    </div>
                  </div>
                )}

                {formError && (
                  <div style={{ color: "#F87171", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
                    ⚠️ {formError}
                  </div>
                )}

                {/* Navigation Controls */}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "#CBD5E1",
                        border: "1px solid rgba(255,255,255,0.12)",
                        padding: "14px 24px",
                        borderRadius: 99,
                        fontWeight: 700,
                        fontSize: 14,
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
                        fontWeight: 800,
                        fontSize: 15,
                        cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
                      }}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      style={{
                        background: "linear-gradient(135deg, #10B981, #059669)",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "14px 36px",
                        borderRadius: 99,
                        fontWeight: 900,
                        fontSize: 16,
                        cursor: formSubmitting ? "not-allowed" : "pointer",
                        boxShadow: "0 8px 24px rgba(16, 185, 129, 0.4)",
                      }}
                    >
                      {formSubmitting ? "Submitting..." : "Submit Proposal Request 🚀"}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — TESTIMONIALS & FAQ                                           */}
      {/* ========================================================================= */}
      <section style={{ padding: "90px 24px", background: "#050811" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#F59E0B",
                textTransform: "uppercase",
              }}
            >
              CLIENT REVIEWS
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                margin: "12px 0 16px 0",
                color: "#F8FAFC",
              }}
            >
              Trusted by Founders & Creators Across North America
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
              marginBottom: 90,
            }}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 23, 42, 0.65)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 24,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ color: "#F59E0B", fontSize: 16, marginBottom: 14 }}>
                    {"★".repeat(t.rating)}
                  </div>
                  <p style={{ color: "#CBD5E1", fontSize: 15, lineHeight: 1.6, fontStyle: "italic", margin: "0 0 24px 0" }}>
                    "{t.text}"
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 32 }}>{t.avatar}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#F8FAFC" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#38BDF8", fontWeight: 700 }}>{t.role}</div>
                    <div style={{ fontSize: 11, color: "#64748B" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <h3 style={{ textAlign: "center", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, marginBottom: 36, color: "#F8FAFC" }}>
              Frequently Asked Questions
            </h3>

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
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      style={{
                        width: "100%",
                        background: "none",
                        border: 0,
                        color: "#F8FAFC",
                        padding: 22,
                        fontSize: 16,
                        fontWeight: 800,
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
                      <p style={{ padding: "0 22px 22px", color: "#94A3B8", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal US Funnel Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#03060D",
          padding: "48px 24px 32px",
          color: "#64748B",
          fontSize: 13,
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
              marginBottom: 32,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 13,
                    color: "#FFFFFF",
                  }}
                >
                  ▶
                </span>
                <span style={{ fontWeight: 900, fontSize: 16, color: "#F8FAFC", letterSpacing: "-0.02em" }}>
                  TheStoryBuilder <span style={{ color: "#38BDF8", fontSize: 11 }}>US</span>
                </span>
              </div>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: 13, maxWidth: 440, lineHeight: 1.5 }}>
                Recurring video editing & short-form content production built for US creators, coaches, brands, and marketing agencies.
              </p>
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setPage && setPage("privacy")}
                style={{ background: "none", border: "none", color: "#94A3B8", fontSize: 13, cursor: "pointer", padding: 0 }}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setPage && setPage("terms")}
                style={{ background: "none", border: "none", color: "#94A3B8", fontSize: 13, cursor: "pointer", padding: 0 }}
              >
                Terms & Conditions
              </button>
              <button
                type="button"
                onClick={() => setPage && setPage("cookies")}
                style={{ background: "none", border: "none", color: "#94A3B8", fontSize: 13, cursor: "pointer", padding: 0 }}
              >
                Cookie Policy
              </button>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 12,
              color: "#64748B",
            }}
          >
            <p style={{ margin: 0 }}>© 2026 The Story Builder Video Services. All rights reserved.</p>
            <p style={{ margin: 0, color: "#475569" }}>US Content Team & Recurring Video Production</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
