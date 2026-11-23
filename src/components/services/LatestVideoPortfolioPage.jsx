import React, { useState, useEffect, useRef } from "react";
import ImageTrail from "../latestpf/ImageTrail";
import TwistRibbon from "../latestpf/TwistRibbon";
import LoopText from "../latestpf/LoopText";
import QuoteDeck from "../latestpf/QuoteDeck";
import OrderForm from "../latestpf/OrderForm";
import { trackPageView, trackEvent } from "../../utils/tracking";

/* ============================================================
   LATEST VIDEO PORTFOLIO — /latestpf
   Pixel-Accurate Recreation of the Framer Design Template
   Warm Ivory Canvas (#F3EFEA) · Colored Project Cards · Black Footer
   ============================================================ */

const CONFIG = {
  brand: "the story builder",
  whatsapp: "918341928526",
  phone: "+91 83419 28526",
  email: "hello@thestorybuilder.in",
  waMessage: "Hi Story Builder team, I saw your latest video portfolio and I'd like to discuss a project.",
};

const waUrl = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.waMessage)}`;

// Curated high-res imagery for 3D Twist Ribbon & cursor Image Trail
const TRAIL_IMAGES = [
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=640&q=80",
];

// The 4 Signature Showcase Cards (Exact Color Hierarchy from Template Screenshot)
const SHOWCASE_CARDS = [
  {
    id: "card-1",
    num: "01",
    cat: "01 / Film",
    title: "Neon Hours",
    subtitle: "Farhaan Commercial Brand Film",
    desc: "A high-fashion 4K cinematic commercial shot on Sony cinema rigs with anamorphic lighting flares, rhythmic sound foley, and luxury film color grading.",
    tags: ["Brand Film", "4K S-Log3", "Commercial"],
    bgColor: "#CEF237", // Electric Lime from Screenshot
    borderColor: "#B8DC29",
    inkColor: "#111111",
    btnBg: "#111111",
    btnInk: "#FFFFFF",
    badgeBg: "rgba(17, 17, 17, 0.08)",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.mp4",
    poster: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    miniThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    stats: "450K+ Views · 4.8x Retention",
  },
  {
    id: "card-2",
    num: "02",
    cat: "02 / Ads",
    title: "Maison Vermeil",
    subtitle: "Digital Medha Performance Ads",
    desc: "Direct-response ad creative generating 890K+ views and 4.2x ROAS across Meta and YouTube feeds with thumb-stopping retention pacing.",
    tags: ["Meta Ads", "890K+ Views", "ROAS 4.2x"],
    bgColor: "#F9C0C4", // Dusty Salmon Pink from Screenshot
    borderColor: "#EFA9AE",
    inkColor: "#111111",
    btnBg: "#111111",
    btnInk: "#FFFFFF",
    badgeBg: "rgba(17, 17, 17, 0.08)",
    videoSrc: "/videos/rVUkWK8lRmw.mp4",
    poster: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    miniThumb: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=200&q=80",
    stats: "890K+ Views · 4.2x ROAS",
  },
  {
    id: "card-3",
    num: "03",
    cat: "03 / Motion",
    title: "Femme Moto",
    subtitle: "Veto & Icons Gym Cinematic",
    desc: "High-octane fitness commercial with speed ramps, high-energy member action cuts, and explosive bass foley synchronized to every beat.",
    tags: ["Gym Commercial", "Speed Ramps", "Bass Foley"],
    bgColor: "#FF4A1C", // Vibrant Vermilion Orange from Screenshot
    borderColor: "#E73E12",
    inkColor: "#111111",
    btnBg: "#111111",
    btnInk: "#FFFFFF",
    badgeBg: "rgba(17, 17, 17, 0.12)",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.mp4",
    poster: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80",
    miniThumb: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80",
    stats: "420K+ Views · Viral Audio",
  },
  {
    id: "card-4",
    num: "04",
    cat: "04 / Brand",
    title: "Lumen & Co",
    subtitle: "Jaya Daga Authority Series",
    desc: "Personal brand documentary reel establishing category authority, founder trust, and generating consistent inbound executive coaching leads.",
    tags: ["Founder Series", "Kinetic Captions", "Authority Reel"],
    bgColor: "#2B47FC", // Electric Cobalt Blue from Screenshot
    borderColor: "#1E3AE8",
    inkColor: "#FFFFFF",
    btnBg: "#FFFFFF",
    btnInk: "#111111",
    badgeBg: "rgba(255, 255, 255, 0.16)",
    videoSrc: "/videos/VdsrsWmmhiw.mp4",
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    miniThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    stats: "310K+ Views · 3x Inbound",
  },
];

// Things We Do Capabilities (Matching the 4 pastel tiles in screenshot)
const CAPABILITIES = [
  {
    num: "01",
    tag: "01 / Strategy & Cinema",
    title: "Brand Films & Commercials",
    desc: "From concept boards and scripts to on-location cinema cameras and lighting direction. Full-scale production for brands ready to own their category.",
    bgColor: "#EBE6DD",
    borderColor: "#DFDACF",
    pills: ["Pre-production", "Cinema Rig", "Lighting Direction", "On-location Shoot"],
  },
  {
    num: "02",
    tag: "02 / Short-Form",
    title: "High-Retention Reels",
    desc: "Hook research, kinetic animated captions, zoom transitions, sound design, and viral pacing engineered to capture attention and stop the scroll.",
    bgColor: "#E7E3F8",
    borderColor: "#DDD7F3",
    pills: ["3s Viral Hook", "Kinetic Subtitles", "Sound Foley", "9:16 Aspect"],
  },
  {
    num: "03",
    tag: "03 / Performance",
    title: "Performance Ad Creatives",
    desc: "Scroll-stopping ad creatives built for Meta and YouTube Ads. Multi-angle variations, clear offer framing, and ROAS-focused narrative pacing.",
    bgColor: "#FFE7DB",
    borderColor: "#F7DACB",
    pills: ["Hook Testing", "Ad Variants", "CTA Overlays", "4.2x ROAS Avg"],
  },
  {
    num: "04",
    tag: "04 / Post-Production",
    title: "Color Craft & Master Exports",
    desc: "DaVinci Resolve S-Log3 film grading, custom sound mixing, vocal enhancement, and multi-platform aspect ratio masters ready to publish.",
    bgColor: "#E0EDE3",
    borderColor: "#D2E2D6",
    pills: ["S-Log3 Grading", "Foley SFX", "Vocal Polish", "4K Masters"],
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
              opacity: 0.8,
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
              opacity: 0.8,
            }}
          >
            Services
          </a>
          <a
            href="#testimonials"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.8,
            }}
          >
            About
          </a>
          <a
            href="#brief"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.8,
            }}
          >
            Contact
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
          Start a project <span style={{ fontSize: 14 }}>↗</span>
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
        {/* Floating cursor trail on the warm light canvas */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <ImageTrail
            images={TRAIL_IMAGES}
            size={220}
            spacing={85}
            lifetime={1.1}
            rotation={12}
            radius={16}
          />
        </div>

        {/* 3D WebGL2 Twist Ribbon threading through wordmark */}
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
            images={TRAIL_IMAGES}
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
              maxWidth: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Shaping authentic stories for brands that dare to be bold.
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
            that move audiences, drive retention, and turn attention into revenue.
          </span>
        </h2>
      </section>

      {/* 4. SELECTED WORK ("Sel...") SECTION — 4 SIGNATURE SHOWCASE CARDS */}
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
              maxWidth: 420,
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
              A curated selection of films, commercials, and high-retention video stories.
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
              {/* Left Column: Big Video / Media Player */}
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
                {/* Media Image / Video Poster */}
                <img
                  src={card.poster}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
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
                    background: "rgba(0, 0, 0, 0.22)",
                    transition: "background 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 999,
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#111111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.35)",
                      paddingLeft: 4,
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
                    background: "rgba(0, 0, 0, 0.65)",
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

              {/* Right Column: Content, Floating Mini-Thumbnail & Round Action Button */}
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
                {/* Floating Polaroid-Style Mini Thumbnail in Top Right (Exact Detail from Screenshot!) */}
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
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 700,
                      opacity: 0.7,
                      marginBottom: 8,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {card.subtitle}
                  </span>

                  <h4
                    style={{
                      margin: "0 0 14px",
                      fontSize: "clamp(32px, 4.2vw, 52px)",
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
                      fontSize: "clamp(14px, 1.4vw, 17px)",
                      lineHeight: 1.5,
                      opacity: 0.88,
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
                    Watch Full Master ↗
                  </button>

                  {/* Circular Button Matching Screenshot (Black/White with Arrow) */}
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

      {/* 5. THINGS WE DO ("Thin...") SECTION — 4 PASTEL TILES */}
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

          <div style={{ maxWidth: 420 }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: 1.45,
                color: "rgba(17, 17, 17, 0.65)",
                fontWeight: 500,
              }}
            >
              From first concept to multi-platform master delivery, we handle the entire video pipeline under one roof.
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

      {/* 6. INTERACTIVE BEFORE / AFTER S-LOG3 COLOR GRADING STUDIO */}
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
                DaVinci Resolve Color Science
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(26px, 3.5vw, 38px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                Flat S-Log3 RAW vs. Final Film Grade
              </h3>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "rgba(17, 17, 17, 0.65)",
                maxWidth: 400,
                lineHeight: 1.45,
              }}
            >
              Drag the slider to inspect the contrast, skin-tone preservation, and saturation roll-off we grade into every frame.
            </p>
          </div>

          {/* Comparison Slider Element */}
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
            }}
          >
            {/* Graded Image (Right / Base) */}
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1280&q=85"
              alt="Graded Cinematic Master"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "contrast(1.15) saturate(1.2)",
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
              }}
            >
              Final Cinema Grade
            </div>

            {/* Flat Log Image (Left / Clipped Overlay) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: `${sliderPos}%`,
                overflow: "hidden",
                borderRight: "3px solid #FFFFFF",
                boxShadow: "4px 0 20px rgba(0,0,0,0.35)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1280&q=85"
                alt="Flat S-Log3 Profile"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: sliderRef.current?.offsetWidth || "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "contrast(0.68) saturate(0.3) brightness(1.2)",
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
              }}
            >
              ↔
            </div>
          </div>
        </div>
      </section>

      {/* 7. KIND WORDS, SAID LOUDLY (TESTIMONIALS / QUOTE DECK) */}
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
          {/* Left Column: Heading exactly as in template screenshot */}
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
                maxWidth: 420,
                fontWeight: 500,
              }}
            >
              What our clients say about our cinematography, rapid turnaround, and collaboration.
            </p>

            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <a
                href={waUrl("Hi Story Builder team, I'd like to book a shoot & edit package.")}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#111111",
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "12px 22px",
                  borderRadius: 999,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Work with our crew ↗
              </a>
            </div>
          </div>

          {/* Right Column: Exact QuoteDeck Component */}
          <div style={{ width: "100%", minHeight: 460 }}>
            <QuoteDeck
              autoplay={6}
              buttonColor="#FF4D1A"
              buttonInk="#FFFFFF"
              lineColor="rgba(17,17,17,0.18)"
              counterColor="#111111"
            />
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE MAD-LIB PROJECT BRIEF (ORDER FORM) */}
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
              ✦ Start a Project Brief
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
              Fill in your details below. This generates an instant scoped brief directly to our team on WhatsApp.
            </p>
          </div>

          <OrderForm
            greeting="Hi Story Builder, I’m"
            fromText="from"
            needText="We need a hand with"
            budgetText="and the budget is around"
            reachText="You can reach me at"
            namePlaceholder="your name"
            companyPlaceholder="company / brand"
            emailPlaceholder="name@company.com"
            services={[
              "a commercial brand film",
              "monthly high-retention reels",
              "performance meta ad creatives",
              "a founder authority series",
              "a full shoot & edit package",
            ]}
            budgets={[
              "under ₹25,000",
              "₹25,000 to ₹50,000",
              "₹50,000 to ₹1,00,000",
              "₹1,00,000 and above",
            ]}
            noteTitle="Oh, and one more thing…"
            notePlaceholder="Deadlines, reference videos you love, number of videos needed, anything that helps."
            totalLabel="Total due today"
            totalText="₹0.00, the first creative call is on us"
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

      {/* 9. THE DEEP PITCH BLACK FOOTER WITH LOOP TEXT (EXACT TEMPLATE FINALE) */}
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
              <a href="#services" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Services
              </a>
              <a href="#testimonials" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                About
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
              text="✦ LET’S TWIST SOMETHING NEW ✦ HELLO@THESTORYBUILDER.IN ✦ ONE CREW ONE BRIEF ✦ "
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
              <span>Start a</span>
              <span>project ↗</span>
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
            <div>© 2026 The Story Builder · All Rights Reserved.</div>
            <div>Shooting on-location across Hyderabad · Remote editing worldwide.</div>
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

      {/* 10. CINEMATIC VIDEO MODAL */}
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
                Want a video styled like this?
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

      {/* 11. MOBILE STICKY BOTTOM ACTION BAR */}
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
          Start a project ↗
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
