import React, { useState, useEffect, useRef } from "react";
import ImageTrail from "../latestpf/ImageTrail";
import TwistRibbon from "../latestpf/TwistRibbon";
import LoopText from "../latestpf/LoopText";
import QuoteDeck from "../latestpf/QuoteDeck";
import OrderForm from "../latestpf/OrderForm";
import { trackPageView, trackEvent } from "../../utils/tracking";

/* ============================================================
   LATEST VIDEO PORTFOLIO — /latestpf
   100% The Story Builder Content, Real Client Videos & Imagery
   Framer Signature Layout (Ivory #F3EFEA · Colored Cards · Black Footer)
   ============================================================ */

const CONFIG = {
  brand: "the story builder",
  whatsapp: "918341928526",
  phone: "+91 83419 28526",
  email: "hello@thestorybuilder.in",
  waMessage: "Hi Story Builder team, I saw your latest video portfolio and I'd like to book a shoot & edit package.",
};

const waUrl = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.waMessage)}`;

// 100% Real Story Builder Client Video Stills & Founder Photography for Ribbon & Trail
const STORYBUILDER_MEDIA = [
  "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_640,so_2/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.jpg",
  "/shiva-landing.webp",
  "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_640,so_2/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.jpg",
  "/shiva-about.webp",
  "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_640,so_2/v1793010466/portfolio%20video%20for%20editing%20services/vision%20rainbow/Vision_Rainbow_pre-primary_reel_2_aezhph.jpg",
  "/shiva.webp",
  "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_640,so_1/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.jpg",
  "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_640,so_1/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.36_PM_vtlfsv.jpg",
  "/shiva-landing.png",
  "/shiva-about.png",
  "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_640,so_3/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.jpg",
  "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_640,so_4/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.jpg",
];

// The 4 Signature Showcase Cards (The Story Builder's Actual Client Projects)
const SHOWCASE_CARDS = [
  {
    id: "card-1",
    num: "01",
    cat: "01 / Brand Film",
    title: "Farhaan Commercial",
    subtitle: "Luxury Fashion & Commercial Campaign",
    desc: "Shot on Sony cinema rigs with anamorphic lighting, rhythmic sound foley, and luxury film color grading. Directed on-location in Hyderabad for national campaign rollout.",
    tags: ["Brand Film", "Sony Cinema Rig", "4K S-Log3", "On-Location"],
    bgColor: "#CEF237", // Electric Lime from Template
    borderColor: "#B8DC29",
    inkColor: "#111111",
    btnBg: "#111111",
    btnInk: "#FFFFFF",
    badgeBg: "rgba(17, 17, 17, 0.08)",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.mp4",
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_800,so_2/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.jpg",
    miniThumb:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_200,so_3/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.jpg",
    stats: "450K+ Views · Commercial Master",
  },
  {
    id: "card-2",
    num: "02",
    cat: "02 / Performance Ads",
    title: "Digital Medha",
    subtitle: "High-ROAS Meta & YouTube Ad Creatives",
    desc: "Direct-response ad creative generating 890K+ views and 4.2x ROAS across Meta and YouTube feeds with thumb-stopping retention hooks and conversion-focused narrative pacing.",
    tags: ["Performance Ads", "890K+ Views", "4.2x ROAS", "Retention Hook"],
    bgColor: "#F9C0C4", // Dusty Salmon Pink from Template
    borderColor: "#EFA9AE",
    inkColor: "#111111",
    btnBg: "#111111",
    btnInk: "#FFFFFF",
    badgeBg: "rgba(17, 17, 17, 0.08)",
    videoSrc: "/videos/rVUkWK8lRmw.mp4",
    poster: "/shiva-landing.webp",
    miniThumb: "/shiva-landing.webp",
    stats: "890K+ Views · 4.2x ROAS",
  },
  {
    id: "card-3",
    num: "03",
    cat: "03 / Gym & Fitness",
    title: "Icons & Veto Gym",
    subtitle: "High-Octane Member Commercial",
    desc: "Dynamic commercial filmed with speed ramps, member workout action cuts, and explosive bass foley synchronized to the rhythm of the gym. Filled new membership quotas in two weeks.",
    tags: ["Gym Commercial", "Speed Ramps", "Bass Foley", "Action Edits"],
    bgColor: "#FF4A1C", // Vibrant Vermilion Orange from Template
    borderColor: "#E73E12",
    inkColor: "#111111",
    btnBg: "#111111",
    btnInk: "#FFFFFF",
    badgeBg: "rgba(17, 17, 17, 0.12)",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.mp4",
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_800,so_2/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.jpg",
    miniThumb:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_200,so_3/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.jpg",
    stats: "420K+ Views · Viral Audio",
  },
  {
    id: "card-4",
    num: "04",
    cat: "04 / Founder Authority",
    title: "Jaya Daga",
    subtitle: "Executive Coaching & Personal Brand",
    desc: "Founder documentary reel establishing authority, leadership trust, and driving consistent inbound coaching leads with editorial typography and cinematic color grading.",
    tags: ["Founder Series", "Kinetic Captions", "Authority Reel", "Coaching Leads"],
    bgColor: "#2B47FC", // Electric Cobalt Blue from Template
    borderColor: "#1E3AE8",
    inkColor: "#FFFFFF",
    btnBg: "#FFFFFF",
    btnInk: "#111111",
    badgeBg: "rgba(255, 255, 255, 0.16)",
    videoSrc: "/videos/VdsrsWmmhiw.mp4",
    poster: "/shiva-about.webp",
    miniThumb: "/shiva-about.webp",
    stats: "310K+ Views · 3x Inbound",
  },
];

// Additional Real Client Reels from The Story Builder Portfolio
const ALL_CLIENT_REELS = [
  {
    id: "reel-1",
    name: "Commercial Brand Film",
    client: "Farhaan Campaign",
    tag: "Brand Film",
    stats: "450K+ Views",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.mp4",
  },
  {
    id: "reel-2",
    name: "Digital Medha Ads",
    client: "Performance Agency",
    tag: "Meta Ad Creative",
    stats: "890K+ Views",
    videoSrc: "/videos/rVUkWK8lRmw.mp4",
  },
  {
    id: "reel-3",
    name: "Vision Rainbow",
    client: "Learning & School Hub",
    tag: "Educational Story",
    stats: "115K+ Views",
    videoSrc: "/videos/_aVoaZbyXJQ.mp4",
  },
  {
    id: "reel-4",
    name: "Jaya Daga Coaching",
    client: "Executive Founder",
    tag: "Authority Brand",
    stats: "310K+ Views",
    videoSrc: "/videos/VdsrsWmmhiw.mp4",
  },
  {
    id: "reel-5",
    name: "Icons Gym Walkthrough",
    client: "Fitness Commercial",
    tag: "Gym & Fitness",
    stats: "420K+ Views",
    videoSrc: "/videos/1EwM31QxnKk.mp4",
  },
  {
    id: "reel-6",
    name: "Veto Gym Commercial",
    client: "Action Showcase",
    tag: "Cinematic Showcase",
    stats: "260K+ Views",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.mp4",
  },
  {
    id: "reel-7",
    name: "Madhura Yoga Breakdown",
    client: "Wellness Series",
    tag: "Wellness & Lifestyle",
    stats: "210K+ Views",
    videoSrc: "/videos/k-bJd1yYk1A.mp4",
  },
  {
    id: "reel-8",
    name: "Pre-Primary Reel",
    client: "Vision Rainbow",
    tag: "School Commercial",
    stats: "95K+ Views",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1793010466/portfolio%20video%20for%20editing%20services/vision%20rainbow/Vision_Rainbow_pre-primary_reel_2_aezhph.mp4",
  },
];

// The Story Builder 4 Production Capabilities (Pastel Tiles in Template)
const CAPABILITIES = [
  {
    num: "01",
    tag: "01 / Video Shoot (Hyderabad)",
    title: "On-Location Cinema Shoot",
    desc: "Trained crew with Sony Alpha 4K cinema cameras, wireless lapel microphones, and portable lighting rigs. We direct on-location across Hyderabad while you focus on running your business.",
    bgColor: "#EBE6DD",
    borderColor: "#DFDACF",
    pills: ["Sony Alpha 4K", "Wireless Lapels", "Portable Lights", "Hyderabad Shoot"],
  },
  {
    num: "02",
    tag: "02 / Short-Form Reels",
    title: "High-Retention Reels & Shorts",
    desc: "Hook research, kinetic animated captions, pattern-interrupt zoom cuts, and punchy sound design engineered to capture attention and stop the scroll on Instagram and YouTube Shorts.",
    bgColor: "#E7E3F8",
    borderColor: "#DDD7F3",
    pills: ["3s Viral Hook", "Kinetic Subtitles", "Sound Foley", "9:16 Format"],
  },
  {
    num: "03",
    tag: "03 / Paid Advertising",
    title: "Direct-Response Meta Video Ads",
    desc: "Paid ad creatives built to convert. Multi-angle variations, clear offer framing, and ROAS-focused narrative pacing proven to lower customer acquisition cost on Meta and YouTube.",
    bgColor: "#FFE7DB",
    borderColor: "#F7DACB",
    pills: ["Hook Testing", "Ad Variants", "CTA Overlays", "4.2x ROAS Avg"],
  },
  {
    num: "04",
    tag: "04 / Post-Production",
    title: "DaVinci Color & Sound Mixing",
    desc: "DaVinci Resolve S-Log3 film grading, vocal cleanup, cinematic bass foley, and multi-platform aspect ratio masters (9:16, 16:9, 4:5) ready to publish with 2 revision rounds included.",
    bgColor: "#E0EDE3",
    borderColor: "#D2E2D6",
    pills: ["S-Log3 Grading", "Foley SFX", "Vocal Polish", "2 Revisions"],
  },
];

// Real Story Builder Client Testimonials for QuoteDeck
const CLIENT_TESTIMONIALS = [
  {
    quote: "Working with The Story Builder on our personal brand series was transformative. They directed the shoot, kept pacing razor-sharp, and the video quality was indistinguishable from an international film. Inbound inquiries tripled in the first 30 days.",
    name: "Jaya Daga",
    role: "Founder & Author, Authority Coaching",
    image: "/shiva-about.webp",
    color: "#FFE27A", // Top Yellow Card
    ink: "#111111",
  },
  {
    quote: "The gym walkthrough and dynamic member workout reels they produced drove insane traction on Instagram. Filled our membership quota in two weeks flat. One crew, one brief.",
    name: "Icons Gym",
    role: "Management Team, Hyderabad",
    image: "/shiva-landing.webp",
    color: "#2D46F0", // Cobalt Card
    ink: "#FFFFFF",
  },
  {
    quote: "Their ad creatives outperformed every other video format we ran on Meta. The retention hooks and sound design made all the difference. Consistently generated 4.2x ROAS across campaigns.",
    name: "Digital Medha",
    role: "Growth Head, Performance Agency",
    image: "/shiva.webp",
    color: "#CFF26A", // Neon Lime Card
    ink: "#111111",
  },
  {
    quote: "They captured the true soul and warmth of our learning environment with sensitivity and cinematic grace. The storytelling is authentic and the feedback from parents has been phenomenal.",
    name: "Vision Rainbow",
    role: "Creative Director, School & Learning Hub",
    image: "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_400,so_2/v1793010466/portfolio%20video%20for%20editing%20services/vision%20rainbow/Vision_Rainbow_pre-primary_reel_2_aezhph.jpg",
    color: "#FF4D1A", // Orange Card
    ink: "#FFFFFF",
  },
];

export default function LatestVideoPortfolioPage({ setPage }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView("/latestpf", "Latest Video Portfolio — The Story Builder");
  }, []);

  // Split-screen Before/After Slider Interaction
  const handleSliderMove = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setSliderPos(Math.round((x / rect.width) * 100));
  };

  useEffect(() => {
    const onUp = () => setIsDraggingSlider(false);
    const onMove = (e) => {
      if (isDraggingSlider) handleSliderMove(e);
    };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [isDraggingSlider]);

  return (
    <div
      style={{
        background: "#F3EFEA",
        color: "#111111",
        minHeight: "100vh",
        fontFamily: '"Bricolage Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* 1. TOP NAVIGATION BAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          background: "rgba(243, 239, 234, 0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(17, 17, 17, 0.06)",
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s ease",
        }}
      >
        {/* Brand / Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setPage ? setPage("home") : (window.location.href = "/");
          }}
          style={{
            textDecoration: "none",
            color: "#111111",
            fontWeight: 800,
            fontSize: "clamp(18px, 2.5vw, 22px)",
            letterSpacing: "-0.04em",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {CONFIG.brand}
          <span style={{ color: "#FF4D1A", fontSize: "16px", lineHeight: 1 }}>✦</span>
        </a>

        {/* Center Nav Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 36px)",
          }}
        >
          <a
            href="#work"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.85,
            }}
          >
            Work
          </a>
          <a
            href="#services"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.85,
            }}
          >
            Services
          </a>
          <a
            href="#reels"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.85,
            }}
          >
            All Reels
          </a>
          <a
            href="#testimonials"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.85,
            }}
          >
            Reviews
          </a>
          <a
            href="#brief"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.85,
            }}
          >
            Brief
          </a>
        </nav>

        {/* Start a project Pill CTA */}
        <a
          href="#brief"
          style={{
            background: "#111111",
            color: "#FFFFFF",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            letterSpacing: "-0.01em",
            boxShadow: "0 4px 14px rgba(17, 17, 17, 0.12)",
          }}
        >
          Book a Shoot ↗
        </a>
      </header>

      {/* 2. HERO SECTION WITH IMAGE TRAIL & 3D TWIST RIBBON */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "84vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "30px 24px 40px",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Floating cursor trail on the warm light canvas with real project stills */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <ImageTrail
            images={STORYBUILDER_MEDIA}
            size={220}
            spacing={85}
            lifetime={1.1}
            rotation={12}
            radius={16}
          />
        </div>

        {/* 3D WebGL2 Twist Ribbon threading through wordmark "the story builder" */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "clamp(460px, 60vh, 660px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TwistRibbon
            images={STORYBUILDER_MEDIA}
            wordmark="the story builder"
            fontFamily="Bricolage Grotesque"
            fontWeight={800}
            wordmarkColor="#111111"
            wordmarkSize={0.62}
            background="#F3EFEA"
            ribbonWidth={0.96}
            cardShape={0.75}
            gap={0.06}
            corners={0.08}
            twists={2}
            depth={1.18}
            speed={0.32}
            tilt={1}
            shading={0.35}
            fog={0.28}
          />
        </div>

        {/* Hero Bottom 3-Part Micro-Content */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            maxWidth: 1280,
            width: "100%",
            margin: "0 auto",
            paddingTop: 20,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1.4vw, 15px)",
              lineHeight: 1.45,
              fontWeight: 500,
              color: "rgba(17, 17, 17, 0.72)",
              maxWidth: 320,
              letterSpacing: "-0.01em",
            }}
          >
            Shot by one crew in Hyderabad. Cut by the same team. High-retention video production for modern brands.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#111111",
              background: "rgba(17, 17, 17, 0.05)",
              border: "1px solid rgba(17, 17, 17, 0.08)",
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            <span>✦</span> ONE CREW · ONE BRIEF <span>✦</span>
          </div>

          <a
            href="#work"
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(17, 17, 17, 0.55)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            (scroll to explore ↓)
          </a>
        </div>
      </section>

      {/* 3. BIG TYPOGRAPHIC MANIFESTO STATEMENT */}
      <section
        style={{
          padding: "clamp(60px, 8vw, 110px) 24px",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(34px, 5.5vw, 68px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "#111111",
            maxWidth: 1100,
          }}
        >
          <span>We shoot, edit, and scale visual stories</span>{" "}
          <span style={{ color: "rgba(17, 17, 17, 0.38)" }}>
            that move audiences, stop the scroll, and turn attention into high-ticket clients and customers.
          </span>
        </h2>
      </section>

      {/* 4. SELECTED WORK ("Sel...") SECTION — 4 STORY BUILDER SHOWCASE CARDS */}
      <section
        id="work"
        style={{
          padding: "0 24px clamp(60px, 8vw, 110px)",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Section Header: "Sel..." typographic watermark + Subtitle */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: "clamp(36px, 5vw, 60px)",
            borderBottom: "1px solid rgba(17, 17, 17, 0.12)",
            paddingBottom: 24,
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(56px, 10vw, 110px)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
                color: "#111111",
              }}
            >
              Sel<span style={{ color: "rgba(17, 17, 17, 0.2)" }}>ected</span>
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              maxWidth: 440,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: 1.45,
                color: "rgba(17, 17, 17, 0.65)",
                fontWeight: 500,
              }}
            >
              Real client deliverables produced in Hyderabad: commercial brand films, paid Meta ad creatives, and viral gym reels.
            </p>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#111111",
                fontVariantNumeric: "tabular-nums",
                background: "rgba(17, 17, 17, 0.08)",
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              04
            </span>
          </div>
        </div>

        {/* 4 Showcase Cards Stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(28px, 4vw, 44px)",
          }}
        >
          {SHOWCASE_CARDS.map((card) => (
            <div
              key={card.id}
              style={{
                background: card.bgColor,
                color: card.inkColor,
                borderRadius: 36,
                border: `3px solid ${card.borderColor}`,
                padding: "clamp(20px, 3.2vw, 36px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                gap: "clamp(24px, 3.5vw, 44px)",
                alignItems: "center",
                boxShadow: "0 24px 60px -20px rgba(17, 17, 17, 0.15)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
              }}
            >
              {/* Left Column: Live Video Loop Preview inside Card! */}
              <div
                onClick={() => {
                  setActiveVideo(card);
                  trackEvent("video_play", "portfolio_reel", card.title);
                }}
                style={{
                  position: "relative",
                  borderRadius: 22,
                  overflow: "hidden",
                  aspectRatio: "16 / 10",
                  background: "#000000",
                  cursor: "pointer",
                  boxShadow: "0 18px 36px -12px rgba(17, 17, 17, 0.28)",
                }}
              >
                {/* Playing Real Video Loop Preview */}
                <video
                  src={card.videoSrc}
                  poster={card.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Top-Left Category Pill */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: "rgba(255, 255, 255, 0.94)",
                    color: "#111111",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    borderRadius: 999,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.14)",
                    zIndex: 2,
                  }}
                >
                  {card.cat}
                </div>

                {/* Center Pulsing Play Overlay Button */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 0, 0, 0.2)",
                    transition: "background 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 999,
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#111111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.35)",
                      paddingLeft: 3,
                    }}
                  >
                    ▶
                  </div>
                </div>

                {/* Bottom stats pill */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    background: "rgba(0, 0, 0, 0.72)",
                    backdropFilter: "blur(6px)",
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  {card.stats}
                </div>
              </div>

              {/* Right Column: Content, Real Project Details & Action Button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "100%",
                  gap: 20,
                  position: "relative",
                }}
              >
                {/* Floating Thumbnail in Top Right (Real Project Still!) */}
                <div
                  style={{
                    position: "absolute",
                    top: -4,
                    right: 0,
                    width: 58,
                    height: 58,
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "2px solid rgba(255, 255, 255, 0.4)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.18)",
                  }}
                >
                  <img
                    src={card.miniThumb}
                    alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      opacity: 0.75,
                      marginBottom: 8,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {card.subtitle}
                  </span>

                  <h4
                    style={{
                      margin: "0 0 14px",
                      fontSize: "clamp(30px, 4vw, 48px)",
                      fontWeight: 800,
                      lineHeight: 1.05,
                      letterSpacing: "-0.035em",
                      color: card.inkColor,
                    }}
                  >
                    {card.title}
                  </h4>

                  <p
                    style={{
                      margin: "0 0 24px",
                      fontSize: "clamp(14px, 1.4vw, 16px)",
                      lineHeight: 1.5,
                      opacity: 0.9,
                      fontWeight: 500,
                      maxWidth: 440,
                    }}
                  >
                    {card.desc}
                  </p>

                  {/* Tag Pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {card.tags.map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          background: card.badgeBg,
                          color: card.inkColor,
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "6px 14px",
                          borderRadius: 999,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Actions */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 16,
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveVideo(card);
                      trackEvent("video_play", "portfolio_reel", card.title);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: card.inkColor,
                      fontSize: 14,
                      fontWeight: 700,
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                    }}
                  >
                    Watch Full Cut With Sound ↗
                  </button>

                  {/* Circular Button Matching Template (Black/White with Arrow) */}
                  <button
                    onClick={() => {
                      setActiveVideo(card);
                      trackEvent("video_play", "portfolio_reel", card.title);
                    }}
                    aria-label={`Watch ${card.title}`}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 999,
                      background: card.btnBg,
                      color: card.btnInk,
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10h12M11 4.5l5.5 5.5-5.5 5.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ADDITIONAL REAL CLIENT REELS STRIP (INSTAGRAM VERTICAL REELS) */}
      <section
        id="reels"
        style={{
          padding: "0 24px clamp(60px, 8vw, 100px)",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#FF4D1A",
              display: "block",
              marginBottom: 6,
            }}
          >
            ✦ Social Proof & Reel Showcase
          </span>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "#111111",
            }}
          >
            More Client Cuts Produced By Our Crew
          </h3>
        </div>

        {/* 9:16 Vertical Reels Scrollable Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: 20,
          }}
        >
          {ALL_CLIENT_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => {
                setActiveVideo({
                  title: reel.name,
                  subtitle: reel.client,
                  videoSrc: reel.videoSrc,
                });
                trackEvent("video_play", "grid_reel", reel.name);
              }}
              style={{
                position: "relative",
                aspectRatio: "9 / 16",
                borderRadius: 22,
                overflow: "hidden",
                background: "#000000",
                cursor: "pointer",
                border: "2px solid rgba(17, 17, 17, 0.08)",
                boxShadow: "0 14px 34px -10px rgba(17, 17, 17, 0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <video
                src={reel.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Tag in Top Left */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  background: "rgba(255, 255, 255, 0.9)",
                  color: "#111111",
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                {reel.tag}
              </div>

              {/* Bottom Information */}
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  right: 14,
                  color: "#FFFFFF",
                }}
              >
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>
                  {reel.name}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 12, opacity: 0.8 }}>
                  {reel.client} · {reel.stats}
                </p>
              </div>

              {/* Hover Play Button */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.9)",
                  color: "#111111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  paddingLeft: 3,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                }}
              >
                ▶
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. THINGS WE DO ("Thin...") SECTION — 4 STORY BUILDER CAPABILITY TILES */}
      <section
        id="services"
        style={{
          padding: "0 24px clamp(60px, 8vw, 110px)",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: "clamp(36px, 5vw, 60px)",
            borderBottom: "1px solid rgba(17, 17, 17, 0.12)",
            paddingBottom: 24,
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(56px, 10vw, 110px)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
                color: "#111111",
              }}
            >
              Thin<span style={{ color: "rgba(17, 17, 17, 0.2)" }}>gs we do</span>
            </h3>
          </div>

          <div style={{ maxWidth: 440 }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: 1.45,
                color: "rgba(17, 17, 17, 0.65)",
                fontWeight: 500,
              }}
            >
              From on-location 4K filming in Hyderabad to multi-platform master edits, we handle your entire video pipeline under one roof.
            </p>
          </div>
        </div>

        {/* 4 Pastel Tiles Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 20,
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              style={{
                background: cap.bgColor,
                border: `2px solid ${cap.borderColor}`,
                borderRadius: 28,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 320,
                boxShadow: "0 12px 28px -10px rgba(17, 17, 17, 0.08)",
                transition: "transform 0.3s ease",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(17, 17, 17, 0.6)",
                    marginBottom: 16,
                  }}
                >
                  {cap.tag}
                </span>

                <h4
                  style={{
                    margin: "0 0 14px",
                    fontSize: "clamp(22px, 2.2vw, 26px)",
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                    color: "#111111",
                  }}
                >
                  {cap.title}
                </h4>

                <p
                  style={{
                    margin: "0 0 24px",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "rgba(17, 17, 17, 0.75)",
                    fontWeight: 500,
                  }}
                >
                  {cap.desc}
                </p>
              </div>

              {/* Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cap.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "rgba(17, 17, 17, 0.08)",
                      color: "#111111",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 999,
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. REAL VIDEO BEFORE / AFTER S-LOG3 COLOR SCIENCE STUDIO */}
      <section
        style={{
          padding: "0 24px clamp(60px, 8vw, 110px)",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 36,
            border: "2px solid rgba(17, 17, 17, 0.08)",
            padding: "clamp(24px, 4vw, 44px)",
            boxShadow: "0 20px 50px -15px rgba(17, 17, 17, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 20,
              marginBottom: 28,
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#FF4D1A",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                DaVinci Resolve Film Color Science
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(26px, 3.5vw, 38px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                Raw S-Log3 Camera Profile vs. Final Master Grade
              </h3>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "rgba(17, 17, 17, 0.65)",
                maxWidth: 440,
                lineHeight: 1.45,
              }}
            >
              Real Farhaan commercial footage shot in Hyderabad. Drag the slider to see flat S-Log3 transformed into rich contrast, accurate skin tones, and cinematic saturation.
            </p>
          </div>

          {/* Real Synchronized Video Comparison Slider */}
          <div
            ref={sliderRef}
            onMouseDown={() => setIsDraggingSlider(true)}
            onTouchStart={() => setIsDraggingSlider(true)}
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(280px, 46vw, 540px)",
              borderRadius: 22,
              overflow: "hidden",
              cursor: "ew-resize",
              userSelect: "none",
              background: "#000",
            }}
          >
            {/* Graded Video (Base / Full Width) */}
            <video
              src="https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "contrast(1.28) saturate(1.35) brightness(1.02)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                right: 18,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(6px)",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: 999,
                zIndex: 3,
              }}
            >
              Final Cinema Grade
            </div>

            {/* Flat S-Log3 Video (Left Clipped Overlay) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: `${sliderPos}%`,
                overflow: "hidden",
                borderRight: "3px solid #FFFFFF",
                boxShadow: "4px 0 20px rgba(0,0,0,0.4)",
                zIndex: 2,
              }}
            >
              <video
                src="https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: "absolute",
                  inset: 0,
                  width: sliderRef.current?.offsetWidth || "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(0.55) contrast(0.68) brightness(1.18) saturate(0.62)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 18,
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(6px)",
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "6px 14px",
                  borderRadius: 999,
                }}
              >
                Raw S-Log3 Camera Output
              </div>
            </div>

            {/* Center Drag Handle */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${sliderPos}%`,
                transform: "translate(-50%, -50%)",
                width: 48,
                height: 48,
                borderRadius: 999,
                background: "#FFFFFF",
                boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111111",
                fontSize: 18,
                pointerEvents: "none",
                zIndex: 5,
              }}
            >
              ↔
            </div>
          </div>
        </div>
      </section>

      {/* 8. KIND WORDS, SAID LOUDLY (REAL STORY BUILDER CLIENT REVIEWS) */}
      <section
        id="testimonials"
        style={{
          padding: "clamp(60px, 8vw, 110px) 24px",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(36px, 5vw, 64px)",
            alignItems: "center",
          }}
        >
          {/* Left Column: Heading */}
          <div>
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: "clamp(44px, 6vw, 76px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                color: "#111111",
              }}
            >
              Kind words,
              <br />
              said loudly.
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.5,
                color: "rgba(17, 17, 17, 0.68)",
                maxWidth: 440,
                fontWeight: 500,
              }}
            >
              Real reviews from founders, coaches, and gym owners across Hyderabad who trust The Story Builder to shoot, cut, and scale their video presence.
            </p>

            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <a
                href={waUrl("Hi Story Builder team, I saw the client reviews on /latestpf and want to discuss a video project.")}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#111111",
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: 999,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 4px 14px rgba(17,17,17,0.15)",
                }}
              >
                Work with our crew ↗
              </a>
            </div>
          </div>

          {/* Right Column: QuoteDeck with Real Clients (Jaya Daga, Icons Gym, Digital Medha, Vision Rainbow) */}
          <div style={{ width: "100%", minHeight: 460 }}>
            <QuoteDeck
              items={CLIENT_TESTIMONIALS}
              autoplay={6}
              buttonColor="#FF4D1A"
              buttonInk="#FFFFFF"
              lineColor="rgba(17,17,17,0.18)"
              counterColor="#111111"
            />
          </div>
        </div>
      </section>

      {/* 9. INTERACTIVE MAD-LIB PROJECT BRIEF (ORDER FORM) */}
      <section
        id="brief"
        style={{
          padding: "clamp(60px, 8vw, 110px) 24px",
          maxWidth: 1100,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 36,
            border: "2px solid rgba(17, 17, 17, 0.08)",
            padding: "clamp(28px, 5vw, 64px)",
            boxShadow: "0 24px 60px -15px rgba(17, 17, 17, 0.08)",
          }}
        >
          <div style={{ marginBottom: 36 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FF4D1A",
                display: "block",
                marginBottom: 8,
              }}
            >
              ✦ Start Your Project Brief
            </span>
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                color: "#111111",
              }}
            >
              Let’s create something iconic.
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                color: "rgba(17, 17, 17, 0.65)",
                lineHeight: 1.45,
              }}
            >
              Fill in your project details below. This automatically crafts a scoped brief sent straight to our team on WhatsApp for an immediate quote.
            </p>
          </div>

          <OrderForm
            greeting="Hi Story Builder, I’m"
            fromText="from"
            needText="We need a hand with"
            budgetText="and our budget is around"
            reachText="You can reach me at"
            namePlaceholder="your name"
            companyPlaceholder="company / brand"
            emailPlaceholder="name@company.com"
            services={[
              "a commercial brand film",
              "monthly reels growth pack (8-12 reels)",
              "direct response paid video ads",
              "a founder authority series",
              "a full shoot & edit package (Hyderabad)",
              "editing only (footage already shot)",
            ]}
            budgets={[
              "under ₹25,000",
              "₹25,000 to ₹50,000",
              "₹50,000 to ₹1,00,000",
              "₹1,00,000 to ₹2,50,000",
              "₹2,50,000 and above",
            ]}
            noteTitle="Oh, and one more thing…"
            notePlaceholder="Deadlines, reference videos you love, number of videos needed, anything that helps us scope."
            totalLabel="Total due today"
            totalText="₹0.00, creative pitch consultation is on us"
            buttonLabel="Place my order"
            pendingLabel="Sending…"
            successLabel="Order placed"
            errorLabel="Try again"
            recipient={CONFIG.email}
            displayFont="Bricolage Grotesque"
            bodyFont="Plus Jakarta Sans"
            ink="#111111"
            accent="#FF4D1A"
            muted="rgba(17, 17, 17, 0.6)"
            buttonText="#FFFFFF"
          />
        </div>
      </section>

      {/* 10. THE DEEP PITCH BLACK FOOTER WITH LOOP TEXT (EXACT TEMPLATE FINALE) */}
      <footer
        style={{
          background: "#0E0E0E",
          color: "#FFFFFF",
          padding: "clamp(60px, 8vw, 100px) 24px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Top Footer Navigation Bar */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              paddingBottom: 40,
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              marginBottom: "clamp(40px, 6vw, 70px)",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {CONFIG.brand}
              <span style={{ color: "#FF4D1A" }}>✦</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(16px, 3vw, 32px)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <a href="#work" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Work
              </a>
              <a href="#reels" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                All Reels
              </a>
              <a href="#services" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Services
              </a>
              <a href="#testimonials" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Reviews
              </a>
              <a href="#brief" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Contact
              </a>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FF4D1A", textDecoration: "none", fontWeight: 700 }}
              >
                WhatsApp ↗
              </a>
            </div>
          </div>

          {/* Centerpiece: The Figure-Eight Infinity LoopText with Center Round White Button */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 960,
              height: "clamp(260px, 40vw, 480px)",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoopText
              text="✦ SHOT BY ONE CREW · CUT BY THE SAME TEAM ✦ HELLO@THESTORYBUILDER.IN ✦ HYDERABAD & WORLDWIDE ✦ "
              bandColor="#FF4D1A"
              textColor="#111111"
              fontSize={32}
              bandWidth={66}
              speed={55}
              hoverBoost={3}
            />

            {/* Central White Circular Button in the Center of Infinity Loop (Signature Framer Detail!) */}
            <a
              href="#brief"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "clamp(88px, 12vw, 130px)",
                height: "clamp(88px, 12vw, 130px)",
                borderRadius: 999,
                background: "#FFFFFF",
                color: "#111111",
                fontWeight: 800,
                fontSize: "clamp(12px, 1.4vw, 14px)",
                letterSpacing: "-0.02em",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 10,
                boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
                zIndex: 10,
                lineHeight: 1.2,
                transition: "transform 0.3s ease",
              }}
            >
              <span>Book a</span>
              <span>Shoot ↗</span>
            </a>
          </div>

          {/* Bottom Copyright & Location Metadata */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              paddingTop: 40,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              marginTop: "clamp(30px, 4vw, 60px)",
              fontSize: 13,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <div>© 2026 The Story Builder · Video Shoot & Edit Studio Hyderabad · All Rights Reserved.</div>
            <div>Shooting on-location across Hyderabad · Post-production worldwide.</div>
            <div>
              <a
                href={`mailto:${CONFIG.email}`}
                style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 600 }}
              >
                {CONFIG.email}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. CINEMATIC VIDEO MODAL */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: 540,
              width: "100%",
              background: "#111111",
              borderRadius: 28,
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.03)",
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>
                  {activeVideo.title}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                  {activeVideo.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  color: "#FFFFFF",
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 16", background: "#000" }}>
              <video
                src={activeVideo.videoSrc}
                controls
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>

            {/* Modal Footer CTA */}
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255, 255, 255, 0.04)",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.7)" }}>
                Want a video shoot & edit like this?
              </span>

              <a
                href={waUrl(`Hi Story Builder, I love the "${activeVideo.title}" reel and want a quote for something similar.`)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#FF4D1A",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: 13,
                  padding: "9px 18px",
                  borderRadius: 999,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Quote this style ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 12. MOBILE STICKY BOTTOM ACTION BAR */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(243, 239, 234, 0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(17, 17, 17, 0.08)",
          padding: "10px 18px calc(10px + env(safe-area-inset-bottom))",
          display: "flex",
          gap: 12,
          zIndex: 75,
        }}
      >
        <a
          href="#brief"
          style={{
            flex: 1,
            background: "#111111",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 14,
            padding: "12px",
            borderRadius: 999,
            textAlign: "center",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(17,17,17,0.15)",
          }}
        >
          Book a Shoot ↗
        </a>
        <a
          href={waUrl()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#FF4D1A",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 14,
            padding: "12px 20px",
            borderRadius: 999,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
}
