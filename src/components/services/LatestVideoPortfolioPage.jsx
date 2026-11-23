import React, { useState, useEffect, useRef } from "react";
import ImageTrail from "../latestpf/ImageTrail";
import TwistRibbon from "../latestpf/TwistRibbon";
import LoopText from "../latestpf/LoopText";
import QuoteDeck from "../latestpf/QuoteDeck";
import OrderForm from "../latestpf/OrderForm";
import { trackPageView, trackEvent } from "../../utils/tracking";

/* ============================================================
   LATEST VIDEO PORTFOLIO — /latestpf
   Modern Framer Aesthetic + The Story Builder Production Suite
   ============================================================ */

const CONFIG = {
  brand: "The Story Builder",
  whatsapp: "918341928526",
  phone: "+91 83419 28526",
  email: "hello@thestorybuilder.in",
  waMessage: "Hi Story Builder team, I saw your latest video portfolio and I'd like to discuss a shoot & edit project.",
};

const waUrl = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.waMessage)}`;

// Curated cinematography & client project visual cards for 3D ribbon & image trail
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

// Actual Story Builder Client Videos
const CLIENT_REELS = [
  {
    id: "reel-1",
    handle: "commercial_brand",
    name: "Commercial Brand Film",
    tag: "Brand Film",
    stats: "450K+ Views",
    videoSrc: "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.mp4",
  },
  {
    id: "reel-2",
    handle: "digitalmedha",
    name: "Digital Medha Advertising",
    tag: "Meta Ad Creative",
    stats: "890K+ Views",
    videoSrc: "/videos/rVUkWK8lRmw.mp4",
  },
  {
    id: "reel-3",
    handle: "high_retention",
    name: "High-Retention Reel",
    tag: "9:16 Short-Form",
    stats: "320K+ Views",
    videoSrc: "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.mp4",
  },
  {
    id: "reel-4",
    handle: "vision_rainbow",
    name: "Vision Rainbow Learning",
    tag: "Educational Story",
    stats: "115K+ Views",
    videoSrc: "/videos/_aVoaZbyXJQ.mp4",
  },
  {
    id: "reel-5",
    handle: "jaya_daga",
    name: "Jaya Daga Personal Brand",
    tag: "Authority Coaching",
    stats: "310K+ Views",
    videoSrc: "/videos/VdsrsWmmhiw.mp4",
  },
  {
    id: "reel-6",
    handle: "icons_gym",
    name: "Icons Gym Walkthrough",
    tag: "Gym & Fitness",
    stats: "420K+ Views",
    videoSrc: "/videos/1EwM31QxnKk.mp4",
  },
  {
    id: "reel-7",
    handle: "veto_gym",
    name: "Veto Gym Commercial",
    tag: "Cinematic Showcase",
    stats: "260K+ Views",
    videoSrc: "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.mp4",
  },
  {
    id: "reel-8",
    handle: "madhura_yoga",
    name: "Madhura Yoga Breakdown",
    tag: "Wellness & Lifestyle",
    stats: "210K+ Views",
    videoSrc: "/videos/k-bJd1yYk1A.mp4",
  },
];

// Production Deliverables Pillars
const PILLARS = [
  {
    num: "01",
    phase: "Before the Shoot",
    title: "Strategy & Shot Planning",
    desc: "We learn your business goal, write viral hooks, lock the shot list, and plan lighting so shoot day runs on razor-sharp schedule.",
    chips: ["Brief call", "Concept & Script", "Shot list & Pacing", "Location check"],
  },
  {
    num: "02",
    phase: "On Shoot Day",
    title: "Cinema Rig & Sound Direction",
    desc: "Trained on-location crew with Sony Alpha 4K cinema cameras, wireless lapel audio, and portable lighting. We direct the frame while you focus on your business.",
    chips: ["On-location 4K filming", "Founder interviews", "Product close-ups", "Wireless clean audio"],
  },
  {
    num: "03",
    phase: "In the Edit",
    title: "Retention Pacing & Color Craft",
    desc: "Every cut is paced for social retention, color graded for maximum pop, sound-designed with punchy SFX, and layered with animated kinetic captions.",
    chips: ["Retention hooks", "Cinematic S-Log3 grading", "Sound design & Foley", "Kinetic subtitles"],
  },
  {
    num: "04",
    phase: "At Delivery",
    title: "Multi-Platform Master Exports",
    desc: "Exported in native platform aspect ratios with revision rounds included. Ready to publish to Instagram Reels, YouTube Shorts, Meta Ads, and web.",
    chips: ["9:16 Vertical Reel/Short", "16:9 YouTube master", "4:5 / 1:1 Feed cuts", "2 Revision rounds"],
  },
];

// Transparent Pricing Tiers
const PRICING_TIERS = [
  {
    name: "Single High-Impact Video",
    tag: "Starter Shoot & Cut",
    price: "Custom Quote",
    period: "per deliverable",
    desc: "Ideal for a signature brand film, founder spotlight, or flagship commercial reel.",
    features: [
      "Up to 4 hours on-location shoot in Hyderabad",
      "1 master edited video (up to 60s)",
      "Cinematic color grading & audio sweetening",
      "Dynamic kinetic subtitles & sound design",
      "2 comprehensive revision rounds",
      "100% commercial usage rights",
    ],
    cta: "Ask About Single Video",
    featured: false,
  },
  {
    name: "Content Month (Growth Pack)",
    tag: "Most Popular Retainer",
    price: "Best Value",
    period: "monthly batch production",
    desc: "A full month of high-converting social media videos shot in one batch day.",
    features: [
      "1 full-day batch shoot session (up to 8 hours)",
      "8 to 12 edited short-form Reels / Shorts",
      "Hook scripting assistance & prompt direction",
      "Custom branded subtitle styling & motion titles",
      "48-hour revision turnaround",
      "Priority scheduling & ongoing content calendar",
    ],
    cta: "Lock Your Content Month",
    featured: true,
  },
  {
    name: "Commercial Ad Campaign",
    tag: "Enterprise / Agency Scale",
    price: "Bespoke Scope",
    period: "full ad production",
    desc: "End-to-end commercial ad creative shoot, hero films, and direct-response paid ad cutdowns.",
    features: [
      "Multi-day filming with dedicated production crew",
      "Hero brand film + 6 ad variations (testing hooks)",
      "Scriptwriting, storyboard, and actor direction",
      "Advanced motion graphics & visual sound design",
      "Multi-ratio platform delivery (9:16, 16:9, 1:1)",
      "Direct consultation with performance marketers",
    ],
    cta: "Discuss Campaign Scope",
    featured: false,
  },
];

// FAQs
const FAQ_ITEMS = [
  {
    q: "How are video shoot and edit packages priced?",
    a: "Every project is scoped based on your exact deliverables, shoot days, and timeline. Contact us directly on WhatsApp or submit the brief form below and we will discuss your requirements and pitch the best package for you.",
  },
  {
    q: "How fast is the turnaround from shoot day to final cut?",
    a: "Most projects shoot within 4 to 7 days of confirmation. Your first cut is delivered in 5 to 7 working days post-shoot, with quick 24-48 hour turnaround on revision notes.",
  },
  {
    q: "Do I need a script or concept ready before booking?",
    a: "No! If you have your concepts or reference reels ready, we execute them immediately. If not, we guide the hook ideation, talking points, and on-set direction.",
  },
  {
    q: "Can you shoot outside Hyderabad?",
    a: "Our camera crew is based in Hyderabad for on-location filming, but we accept remote video editing projects globally from clients anywhere in India and worldwide.",
  },
  {
    q: "What camera gear and production equipment do you bring?",
    a: "We shoot primarily on flagship Sony Alpha 4K cinema-line cameras with fast prime lenses, wireless DJI/Rode lapel microphones, and professional portable lighting kits.",
  },
  {
    q: "Can you edit footage I have already shot myself?",
    a: "Yes! Choose 'Editing Only' in the project brief form. Upload your raw footage via Google Drive or Dropbox, and we will color grade, clean audio, pace, and sound design the entire sequence.",
  },
  {
    q: "Who owns the copyright to the final delivered videos?",
    a: "You do. Once the project invoice is cleared, you receive 100% full commercial rights across YouTube, Instagram, Meta Ads, TV, and web.",
  },
];

export default function LatestVideoPortfolioPage({ setPage }) {
  const [unmutedReel, setUnmutedReel] = useState(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [cmpPos, setCmpPos] = useState(50);
  const [openFaq, setOpenFaq] = useState(0);
  const videoRefs = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView("/latestpf");
  }, []);

  const toggleSound = (id) => {
    const isUnmuted = unmutedReel === id;
    const next = isUnmuted ? null : id;
    setUnmutedReel(next);

    Object.keys(videoRefs.current).forEach((k) => {
      const v = videoRefs.current[k];
      if (v) {
        if (k === id && !isUnmuted) {
          v.muted = false;
          v.volume = 1.0;
          v.play().catch(() => {});
        } else {
          v.muted = true;
        }
      }
    });
    trackEvent("ReelSoundToggle", { reelId: id, unmuted: !isUnmuted });
  };

  const openVideoModal = (reel) => {
    setSelectedVideo(reel);
    setPlayerOpen(true);
    trackEvent("VideoModalOpen", { name: reel.name });
  };

  const closeVideoModal = () => {
    setPlayerOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div
      style={{
        background: "#090B0E",
        color: "#F3F4F6",
        minHeight: "100vh",
        position: "relative",
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* 1. CURSOR IMAGE TRAIL (Drifts cinema cards on mouse movement) */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <ImageTrail images={TRAIL_IMAGES} size={190} spacing={85} lifetime={1.1} />
      </div>

      {/* 2. STICKY TOP NAVIGATION */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          background: "rgba(9, 11, 14, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          height: 68,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "min(100% - 32px, 1200px)",
            marginInline: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setPage ? setPage("home") : (window.location.href = "/");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#F59E0B",
                boxShadow: "0 0 12px #F59E0B",
              }}
            />
            <span>The Story Builder</span>
            <span
              style={{
                fontSize: 11,
                background: "rgba(245, 158, 11, 0.15)",
                color: "#F59E0B",
                padding: "2px 8px",
                borderRadius: 99,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              LATEST PF
            </span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", gap: 20, fontSize: 14, fontWeight: 600 }}>
              <a href="#work" style={{ color: "#9CA3AF", textDecoration: "none" }} onMouseEnter={(e) => (e.target.style.color = "#fff")} onMouseLeave={(e) => (e.target.style.color = "#9CA3AF")}>
                Work
              </a>
              <a href="#colorgrade" style={{ color: "#9CA3AF", textDecoration: "none" }} onMouseEnter={(e) => (e.target.style.color = "#fff")} onMouseLeave={(e) => (e.target.style.color = "#9CA3AF")}>
                Color Grade
              </a>
              <a href="#process" style={{ color: "#9CA3AF", textDecoration: "none" }} onMouseEnter={(e) => (e.target.style.color = "#fff")} onMouseLeave={(e) => (e.target.style.color = "#9CA3AF")}>
                Process
              </a>
              <a href="#pricing" style={{ color: "#9CA3AF", textDecoration: "none" }} onMouseEnter={(e) => (e.target.style.color = "#fff")} onMouseLeave={(e) => (e.target.style.color = "#9CA3AF")}>
                Packages
              </a>
              <a href="#brief" style={{ color: "#9CA3AF", textDecoration: "none" }} onMouseEnter={(e) => (e.target.style.color = "#fff")} onMouseLeave={(e) => (e.target.style.color = "#9CA3AF")}>
                Brief Form
              </a>
            </div>

            <a
              href="#brief"
              style={{
                background: "#F59E0B",
                color: "#0B0D12",
                fontWeight: 700,
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13,
                textDecoration: "none",
                transition: "all 0.2s",
                boxShadow: "0 4px 14px rgba(245, 158, 11, 0.3)",
              }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </nav>

      {/* 3. HERO WITH WEBGL2 3D TWIST RIBBON */}
      <header style={{ position: "relative", zIndex: 10, padding: "40px 0 30px" }}>
        <div style={{ width: "min(100% - 32px, 1200px)", marginInline: "auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              color: "#F59E0B",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#F59E0B",
                boxShadow: "0 0 10px #F59E0B",
              }}
            />
            Video Production & High-Retention Editing
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: 18,
            }}
          >
            Shot by One Crew.<br />
            <span style={{ color: "#F59E0B" }}>Cut by the Same Team.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
              color: "#9CA3AF",
              maxWidth: 680,
              margin: "0 auto 30px",
              lineHeight: 1.6,
            }}
          >
            Video shoots and editing in one seamless package. You don’t hire a videographer, then hunt for an editor, then chase both. We plan it, shoot it, and edit it for Reels, YouTube, and high-ROAS ads.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 30 }}>
            <a
              href="#brief"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#F59E0B",
                color: "#0B0D12",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(245, 158, 11, 0.35)",
              }}
            >
              Start Your Video Brief →
            </a>
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 26px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              💬 WhatsApp Us Directly
            </a>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
              fontSize: 13,
              color: "#D1D5DB",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span>🎥 4K 24p Cinema Gear</span>
            <span>⚡ 5 to 7 Day Turnaround</span>
            <span>📍 Hyderabad & Remote</span>
            <span>🔄 2 Revision Rounds</span>
          </div>
        </div>

        {/* 3D WebGL2 Twist Ribbon Interactive Canvas */}
        <div style={{ width: "100%", height: "clamp(340px, 48vh, 520px)", margin: "20px auto 0", position: "relative" }}>
          <TwistRibbon
            images={TRAIL_IMAGES}
            wordmark="STORY BUILDER"
            fontFamily="Space Grotesk"
            wordmarkColor="#F59E0B"
            wordmarkSize={0.58}
            background="#090B0E"
            speed={0.4}
            ribbonWidth={0.92}
            twists={2}
          />
        </div>
      </header>

      {/* 4. LOOPTEXT SVG MARQUEE BANNER */}
      <section style={{ position: "relative", zIndex: 10, padding: "20px 0 40px", overflow: "hidden" }}>
        <div style={{ width: "min(100% - 24px, 1100px)", height: 260, margin: "0 auto" }}>
          <LoopText
            text="Shot by One Crew ✦ Cut by the Same Team ✦ High-Retention Reels & Ads ✦ Hyderabad & Worldwide ✦ hello@thestorybuilder.in ✦ "
            bandColor="#F59E0B"
            textColor="#0B0D12"
            fontSize={30}
            bandWidth={62}
            speed={65}
          />
        </div>
      </section>

      {/* 5. CLIENT REELS SHOWCASE WITH INTERACTIVE AUDIO & POPUP */}
      <section id="work" style={{ position: "relative", zIndex: 10, padding: "60px 0 80px" }}>
        <div style={{ width: "min(100% - 32px, 1200px)", marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(245, 158, 11, 0.12)",
                color: "#F59E0B",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Proven Social & Brand Traction
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, margin: 0 }}>
              Recent Client Video Work
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, marginTop: 8 }}>
              Click any video to toggle sound or tap to watch in full-screen theatre mode.
            </p>
          </div>

          {/* Grid of 8 Client Videos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {CLIENT_REELS.map((reel) => {
              const isUnmuted = unmutedReel === reel.id;
              return (
                <div
                  key={reel.id}
                  style={{
                    background: "#121620",
                    borderRadius: 18,
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    position: "relative",
                    aspectRatio: "9 / 16",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    transition: "transform 0.25s, border-color 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  }}
                >
                  <video
                    ref={(el) => (videoRefs.current[reel.id] = el)}
                    src={reel.videoSrc}
                    loop
                    muted={!isUnmuted}
                    playsInline
                    autoPlay
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={() => openVideoModal(reel)}
                  />

                  {/* Overlay Gradient */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 35%, rgba(0,0,0,0.85) 100%)",
                      pointerEvents: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: 14,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        style={{
                          background: "rgba(0,0,0,0.65)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          padding: "4px 10px",
                          borderRadius: 99,
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#F59E0B",
                        }}
                      >
                        {reel.tag}
                      </span>

                      {/* Sound Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSound(reel.id);
                        }}
                        style={{
                          pointerEvents: "auto",
                          background: isUnmuted ? "#10B981" : "rgba(0,0,0,0.7)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.25)",
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: 14,
                          transition: "all 0.2s",
                        }}
                        aria-label="Toggle sound"
                      >
                        {isUnmuted ? "🔊" : "🔇"}
                      </button>
                    </div>

                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>
                        {reel.name}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        <span style={{ color: "#F59E0B", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                          🔥 {reel.stats}
                        </span>
                        <span
                          onClick={() => openVideoModal(reel)}
                          style={{
                            pointerEvents: "auto",
                            cursor: "pointer",
                            textDecoration: "underline",
                            color: "#E5E7EB",
                          }}
                        >
                          Fullscreen ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BEFORE & AFTER COLOR GRADING COMPARISON */}
      <section id="colorgrade" style={{ position: "relative", zIndex: 10, padding: "70px 0", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: "min(100% - 32px, 1200px)", marginInline: "auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              background: "rgba(245, 158, 11, 0.12)",
              color: "#F59E0B",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Post-Production Mastery
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, margin: 0 }}>
            Raw Flat S-Log3 vs. Graded Master
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, marginTop: 8, maxWidth: 640, marginInline: "auto" }}>
            Drag the slider sideways to see the dynamic difference between unedited camera sensor LOG footage and our calibrated DaVinci color grading suite.
          </p>

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 960,
              aspectRatio: "16 / 9",
              borderRadius: 18,
              overflow: "hidden",
              margin: "36px auto 0",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
              userSelect: "none",
            }}
          >
            {/* Raw Footage Layer (desaturated & low contrast simulation) */}
            <img
              src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1400&q=80"
              alt="Raw S-Log3 Uncut Camera Footage"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "saturate(0.3) contrast(0.85) brightness(1.1)",
              }}
            />

            {/* Finished Graded Master Layer */}
            <img
              src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1400&q=80"
              alt="Finished Color Graded Video"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                clipPath: `polygon(0 0, ${cmpPos}% 0, ${cmpPos}% 100%, 0 100%)`,
              }}
            />

            {/* Split Divider Bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${cmpPos}%`,
                width: 2,
                background: "#fff",
                boxShadow: "0 0 14px rgba(0,0,0,0.7)",
                pointerEvents: "none",
              }}
            />

            {/* Handle Dial */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${cmpPos}%`,
                transform: "translate(-50%, -50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#F59E0B",
                color: "#0B0D12",
                fontWeight: 800,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                pointerEvents: "none",
              }}
            >
              ⇄
            </div>

            {/* Badges */}
            <span
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(6px)",
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Raw Flat LOG
            </span>
            <span
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(6px)",
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                color: "#F59E0B",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Graded & Mastered
            </span>

            {/* Slider Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={cmpPos}
              onChange={(e) => setCmpPos(e.target.value)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "ew-resize",
                zIndex: 20,
              }}
              aria-label="Color grade comparison slider"
            />
          </div>
        </div>
      </section>

      {/* 7. ONE BRIEF. ONE CREW. FINISHED VIDEOS (THEORY & PROCESS) */}
      <section id="process" style={{ position: "relative", zIndex: 10, padding: "80px 0" }}>
        <div style={{ width: "min(100% - 32px, 1200px)", marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(245, 158, 11, 0.12)",
                color: "#F59E0B",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              The Video Production Framework
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, margin: 0 }}>
              One Brief. One Crew. Finished Videos.
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, marginTop: 8, maxWidth: 640, marginInline: "auto" }}>
              How we transform raw concepts into high-retention social content and commercial film assets.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {PILLARS.map((p) => (
              <div
                key={p.num}
                style={{
                  background: "#121620",
                  borderRadius: 16,
                  padding: "32px 24px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#F59E0B",
                      marginBottom: 8,
                    }}
                  >
                    PHASE {p.num} · {p.phase}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.chips.map((chip, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "4px 10px",
                        borderRadius: 99,
                        fontSize: 11,
                        color: "#D1D5DB",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DRAGGABLE 3D QUOTE DECK (TESTIMONIALS) */}
      <section style={{ position: "relative", zIndex: 10, padding: "60px 0 90px", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ width: "min(100% - 32px, 1200px)", marginInline: "auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              background: "rgba(245, 158, 11, 0.12)",
              color: "#F59E0B",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Verified Client Reviews
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, margin: "0 0 10px" }}>
            What Founders & Directors Say
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, marginBottom: 40 }}>
            Drag the cards sideways or tap the arrows to browse client results.
          </p>

          <QuoteDeck quoteSize={24} buttonColor="#F59E0B" buttonInk="#0B0D12" />
        </div>
      </section>

      {/* 9. TRANSPARENT PACKAGES & PRICING */}
      <section id="pricing" style={{ position: "relative", zIndex: 10, padding: "80px 0" }}>
        <div style={{ width: "min(100% - 32px, 1200px)", marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(245, 158, 11, 0.12)",
                color: "#F59E0B",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Clear & Predictable Investment
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, margin: 0 }}>
              Video Shoot & Editing Packages
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, marginTop: 8 }}>
              No surprise extras. All footage is backed up, color graded, and platform formatted.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {PRICING_TIERS.map((tier, idx) => (
              <div
                key={idx}
                style={{
                  background: tier.featured ? "linear-gradient(180deg, #1A1F2C 0%, #121620 100%)" : "#121620",
                  borderRadius: 20,
                  padding: "36px 28px",
                  border: tier.featured ? "2px solid #F59E0B" : "1px solid rgba(255, 255, 255, 0.08)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: tier.featured ? "0 20px 50px rgba(245, 158, 11, 0.15)" : "none",
                }}
              >
                {tier.featured && (
                  <span
                    style={{
                      position: "absolute",
                      top: -12,
                      right: 24,
                      background: "#F59E0B",
                      color: "#0B0D12",
                      fontWeight: 800,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      padding: "4px 12px",
                      borderRadius: 999,
                    }}
                  >
                    Recommended Retainer
                  </span>
                )}

                <div>
                  <span style={{ fontSize: 12, color: "#F59E0B", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {tier.tag}
                  </span>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "8px 0 10px" }}>
                    {tier.name}
                  </h3>
                  <p style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
                    {tier.desc}
                  </p>

                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: "#fff" }}>
                      {tier.price}
                    </span>
                    <span style={{ fontSize: 13, color: "#9CA3AF", marginLeft: 8 }}>
                      / {tier.period}
                    </span>
                  </div>

                  <ul style={{ display: "grid", gap: 10, padding: 0, margin: "0 0 30px", listStyle: "none" }}>
                    {tier.features.map((f, fi) => (
                      <li key={fi} style={{ display: "flex", gap: 10, fontSize: 14, color: "#D1D5DB", alignItems: "baseline" }}>
                        <span style={{ color: "#F59E0B", fontWeight: 800 }}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#brief"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: "14px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    background: tier.featured ? "#F59E0B" : "rgba(255, 255, 255, 0.06)",
                    color: tier.featured ? "#0B0D12" : "#fff",
                    border: tier.featured ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
                    transition: "all 0.2s",
                  }}
                >
                  {tier.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE MAD-LIB ORDER FORM */}
      <section id="brief" style={{ position: "relative", zIndex: 10, padding: "80px 0 100px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: "min(100% - 32px, 1100px)", marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(245, 158, 11, 0.12)",
                color: "#F59E0B",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Interactive Brief Builder
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, margin: 0 }}>
              Tell Us What You're Making
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, marginTop: 8 }}>
              Fill in the blanks below to generate your custom video scope. We reply within one working day.
            </p>
          </div>

          <div
            style={{
              background: "#121620",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 24,
              padding: "clamp(24px, 5vw, 48px)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
            }}
          >
            <OrderForm />
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section style={{ position: "relative", zIndex: 10, padding: "70px 0 90px" }}>
        <div style={{ width: "min(100% - 32px, 860px)", marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(245, 158, 11, 0.12)",
                color: "#F59E0B",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Frequently Asked Questions
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, margin: 0 }}>
              Questions Before You Book
            </h2>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    background: "#121620",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 14,
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{item.q}</span>
                    <span
                      style={{
                        color: "#F59E0B",
                        fontSize: 22,
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 24px 22px",
                        color: "#9CA3AF",
                        fontSize: 15,
                        lineHeight: 1.65,
                        borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                        paddingTop: 16,
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. FULLSCREEN VIDEO MODAL */}
      {playerOpen && selectedVideo && (
        <div
          onClick={closeVideoModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
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
              width: "min(400px, 94vw)",
              aspectRatio: "9 / 16",
              background: "#000",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 70px rgba(0,0,0,0.8)",
            }}
          >
            <video
              src={selectedVideo.videoSrc}
              controls
              autoPlay
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <button
              type="button"
              onClick={closeVideoModal}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 18,
                zIndex: 10,
              }}
              aria-label="Close video player"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 13. FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "40px 0 50px",
          textAlign: "center",
          fontSize: 14,
          color: "#9CA3AF",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ width: "min(100% - 32px, 1200px)", marginInline: "auto" }}>
          <p style={{ margin: "0 0 8px", color: "#E5E7EB", fontWeight: 600 }}>
            The Story Builder — Video Shoot & Edit Production Suite
          </p>
          <p style={{ margin: "0 0 16px", fontSize: 13 }}>
            Shooting on-location across Hyderabad, India · Post-production & remote editing worldwide.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, fontSize: 13 }}>
            <a href="/" onClick={(e) => { e.preventDefault(); setPage && setPage("home"); }} style={{ color: "#F59E0B", textDecoration: "none" }}>
              Main Homepage
            </a>
            <a href="/video-portfolio" onClick={(e) => { e.preventDefault(); setPage && setPage("video-portfolio"); }} style={{ color: "#9CA3AF", textDecoration: "none" }}>
              Standard Portfolio
            </a>
            <a href="/privacy" onClick={(e) => { e.preventDefault(); setPage && setPage("privacy"); }} style={{ color: "#9CA3AF", textDecoration: "none" }}>
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>

      {/* 14. MOBILE STICKY BOTTOM ACTION BAR */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(9, 11, 14, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
          display: "flex",
          gap: 10,
          zIndex: 90,
        }}
      >
        <a
          href="#brief"
          style={{
            flex: 1,
            background: "#F59E0B",
            color: "#0B0D12",
            fontWeight: 700,
            fontSize: 14,
            padding: "12px",
            borderRadius: 8,
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Get a Video Quote
        </a>
        <a
          href={waUrl()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontWeight: 600,
            fontSize: 14,
            padding: "12px 18px",
            borderRadius: 8,
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
