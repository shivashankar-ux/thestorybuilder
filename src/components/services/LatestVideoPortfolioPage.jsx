import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, remove } from "animejs";
import { useTransition, useSpring, animated } from "@react-spring/web";
import QuoteDeck from "../latestpf/QuoteDeck";
import OrderForm from "../latestpf/OrderForm";
import PhoneStackCarousel from "../latestpf/PhoneStackCarousel";
import SplitScreenCapabilities from "../latestpf/SplitScreenCapabilities";
import HeroIllustration from "../latestpf/HeroIllustration";
import GalleryTunnel from "../latestpf/GalleryTunnel";
import { trackPageView, trackEvent } from "../../utils/tracking";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   LATEST VIDEO PORTFOLIO — /latestpf
   100% The Story Builder Content, Real Client Videos & Imagery
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

// The Signature Showcase Cards (The Story Builder's Actual Client Projects)
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
    id: "card-ntf",
    num: "02",
    cat: "02 / Farmhouse & Resort",
    title: "Neem Tree Farms",
    subtitle: "Luxury Farmhouse & Event Venue Showcase",
    desc: "Cinematic property showcase shot on Sony Alpha 4K cinema cameras with golden-hour drone landscapes, immersive nature sound foley, and resort luxury film grading. Directed on-location in Hyderabad.",
    tags: ["Luxury Farmhouse", "4K Cinema", "Resort Film", "Hyderabad Shoot"],
    bgColor: "#F5DF77", // Warm Golden Sunlight Farmhouse
    borderColor: "#E5CD5F",
    inkColor: "#111111",
    btnBg: "#111111",
    btnInk: "#FFFFFF",
    badgeBg: "rgba(17, 17, 17, 0.08)",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1795579958/portfolio%20video%20for%20editing%20services/website%20videos/farm%20house%20neem%20tree/NTF_1F_rysbyy.mp4",
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_800,so_0/v1795579958/portfolio%20video%20for%20editing%20services/website%20videos/farm%20house%20neem%20tree/NTF_1F_rysbyy.jpg",
    miniThumb:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_200,so_0/v1795579958/portfolio%20video%20for%20editing%20services/website%20videos/farm%20house%20neem%20tree/NTF_1F_rysbyy.jpg",
    stats: "380K+ Views · Resort Master",
  },
  {
    id: "card-2",
    num: "03",
    cat: "03 / Performance Ads",
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
    num: "04",
    cat: "04 / Gym & Fitness",
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
    num: "05",
    cat: "05 / Founder Authority",
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
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,so_2/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.jpg",
  },
  {
    id: "reel-ntf-1",
    name: "Neem Tree Farms Stay",
    client: "Neem Tree Farms",
    tag: "Luxury Farmhouse",
    stats: "380K+ Views",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1795579958/portfolio%20video%20for%20editing%20services/website%20videos/farm%20house%20neem%20tree/NTF_1F_rysbyy.mp4",
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,so_0/v1795579958/portfolio%20video%20for%20editing%20services/website%20videos/farm%20house%20neem%20tree/NTF_1F_rysbyy.jpg",
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
    id: "reel-ntf-2",
    name: "Neem Tree Farms Tour",
    client: "Neem Tree Farms",
    tag: "Property Walkthrough",
    stats: "290K+ Views",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1795580065/portfolio%20video%20for%20editing%20services/website%20videos/farm%20house%20neem%20tree/NTF_2_gmiu2b.mp4",
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,so_0/v1795580065/portfolio%20video%20for%20editing%20services/website%20videos/farm%20house%20neem%20tree/NTF_2_gmiu2b.jpg",
  },
  {
    id: "reel-3",
    name: "Vision Rainbow",
    client: "Learning & School Hub",
    tag: "Educational Story",
    stats: "115K+ Views",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1793010466/portfolio%20video%20for%20editing%20services/vision%20rainbow/Vision_Rainbow_pre-primary_reel_2_aezhph.mp4",
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,so_2/v1793010466/portfolio%20video%20for%20editing%20services/vision%20rainbow/Vision_Rainbow_pre-primary_reel_2_aezhph.jpg",
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
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,so_2/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.jpg",
  },
  {
    id: "reel-6",
    name: "Veto Gym Commercial",
    client: "Action Showcase",
    tag: "Cinematic Showcase",
    stats: "260K+ Views",
    videoSrc:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,vc_h264/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.mp4",
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,so_2/v1793023865/portfolio%20video%20for%20editing%20services/Veto%20Gym/GYM_showcase_V1_mizyxa.jpg",
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
    poster:
      "https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_540,so_1/v1793010466/portfolio%20video%20for%20editing%20services/vision%20rainbow/Vision_Rainbow_pre-primary_reel_2_aezhph.jpg",
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
    icon: "founder",
    color: "#FFE27A", // Top Yellow Card
    ink: "#111111",
  },
  {
    quote: "The gym walkthrough and dynamic member workout reels they produced drove insane traction on Instagram. Filled our membership quota in two weeks flat. One crew, one brief.",
    name: "Icons Gym",
    role: "Management Team, Hyderabad",
    icon: "fitness",
    color: "#2D46F0", // Cobalt Card
    ink: "#FFFFFF",
  },
  {
    quote: "Their ad creatives outperformed every other video format we ran on Meta. The retention hooks and sound design made all the difference. Consistently generated 4.2x ROAS across campaigns.",
    name: "Digital Medha",
    role: "Growth Head, Performance Agency",
    icon: "growth",
    color: "#CFF26A", // Neon Lime Card
    ink: "#111111",
  },
  {
    quote: "They captured the true soul and warmth of our learning environment with sensitivity and cinematic grace. The storytelling is authentic and the feedback from parents has been phenomenal.",
    name: "Vision Rainbow",
    role: "Creative Director, School & Learning Hub",
    icon: "education",
    color: "#FF4D1A", // Orange Card
    ink: "#FFFFFF",
  },
];

const MANIFESTO_WORDS_PRIMARY = [
  "We", "shoot,", "edit,", "and", "scale", "visual", "stories"
];
const MANIFESTO_WORDS_SECONDARY = [
  "that", "move", "audiences,", "stop", "the", "scroll,", "and", "turn",
  "attention", "into", "high-ticket", "clients", "and", "customers."
];

/* ------------------------------------------------------------
   SHOWCASE CARD VIDEO — HIGH-PERFORMANCE LAZY VIEWPORT PLAYER
   Crisp poster fallback guarantees zero black screen and 0 decoders
   used when card is off-screen.
   ------------------------------------------------------------ */
function ShowcaseCardVideo({ card, isMobile }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isInView) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* High-res poster fallback: ensures card is NEVER black and renders immediately */}
      <img
        src={card.poster}
        alt={card.title}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          zIndex: 1,
        }}
      />

      {/* Video element: only mounted when card is in or near viewport */}
      {isInView && (
        <video
          ref={videoRef}
          src={card.videoSrc}
          poster={card.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setIsPlaying(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            zIndex: 2,
            opacity: isPlaying ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />
      )}
    </div>
  );
}

export default function LatestVideoPortfolioPage({ setPage }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [heroMuted, setHeroMuted] = useState(true);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const pageRef = useRef(null);
  const manifestoRef = useRef(null);
  const sliderSectionRef = useRef(null);
  const sliderDemoAnimated = useRef(false);
  const sliderVideoBaseRef = useRef(null);
  const sliderVideoClipRef = useRef(null);

  // Lazy viewport observer for color comparison videos
  useEffect(() => {
    const el = sliderSectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sliderVideoBaseRef.current?.play().catch(() => {});
          sliderVideoClipRef.current?.play().catch(() => {});
        } else {
          sliderVideoBaseRef.current?.pause();
          sliderVideoClipRef.current?.pause();
        }
      },
      { rootMargin: "140px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    trackPageView("/latestpf", "Latest Video Portfolio — The Story Builder");

    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    } else {
      window.scrollTo(0, 0);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP 3.15 + ScrollTrigger Context Setup
  useEffect(() => {
    if (!pageRef.current) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 0. Top Cinematic Gradient Scroll Progress Bar Scrub
      gsap.to(".latestpf-scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });

      // 1. Kinetic Manifesto Text-Scrub Highlight (Illuminates word by word on scroll)
      const manifestoWords = gsap.utils.toArray(".latestpf-manifesto-word");
      if (manifestoWords.length > 0) {
        gsap.fromTo(
          manifestoWords,
          { opacity: 0.22, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: "top 78%",
              end: "bottom 50%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Editorial Watermarks Horizontal Drift Scrub ("Selected" and "Things we do")
      gsap.to(".latestpf-watermark-1", {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#work",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".latestpf-watermark-2", {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#services",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 3. Showcase Cards Entrance & Stacking Dimensional Depth
      const cards = gsap.utils.toArray(".latestpf-showcase-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Subtly scale down underlying cards as the next card stacks above them
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.955,
            filter: "brightness(0.92)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 45%",
              end: "top 18%",
              scrub: 0.6,
            },
          });
        }
      });

      // 4. All Reels Staggered Wave Entrance
      const reelCards = gsap.utils.toArray(".latestpf-reel-card");
      if (reelCards.length > 0) {
        gsap.fromTo(
          reelCards,
          { y: 30, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#reels",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 5. Split-Screen Capabilities ("Things We Do") Staggered Lift
      const splitCap = document.querySelector(".latestpf-split-capabilities");
      if (splitCap) {
        gsap.fromTo(
          splitCap,
          { y: 24, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#services",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 6. Before/After S-Log3 Slider Preview Swipe Demo (Runs once on scroll)
      ScrollTrigger.create({
        trigger: sliderSectionRef.current,
        start: "top 68%",
        once: true,
        onEnter: () => {
          if (sliderDemoAnimated.current) return;
          sliderDemoAnimated.current = true;
          const proxy = { pos: 50 };
          gsap
            .timeline()
            .to(proxy, {
              pos: 70,
              duration: 0.6,
              ease: "power2.inOut",
              onUpdate: () => setSliderPos(Math.round(proxy.pos)),
            })
            .to(proxy, {
              pos: 30,
              duration: 0.85,
              ease: "power2.inOut",
              onUpdate: () => setSliderPos(Math.round(proxy.pos)),
            })
            .to(proxy, {
              pos: 50,
              duration: 0.6,
              ease: "power2.out",
              onUpdate: () => setSliderPos(Math.round(proxy.pos)),
            });
        },
      });

      // 7. Ambient Breathing Pulse on Slider Handle
      gsap.to(".latestpf-slider-handle", {
        scale: 1.08,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });

      // 8. Testimonials Section Content Entrance
      gsap.fromTo(
        ".latestpf-testimonials-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 9. Agency Proof Numbers Count-Up Animation (Anime.js + GSAP ScrollTrigger)
      ScrollTrigger.create({
        trigger: ".latestpf-stats-ribbon",
        start: "top 85%",
        once: true,
        onEnter: () => {
          // Stat 1: 2.8M Views
          const stat1 = { val: 0 };
          animate(stat1, {
            val: 2.8,
            duration: 1600,
            ease: "outExpo",
            onUpdate: () => {
              const el = document.getElementById("latestpf-stat-views");
              if (el) el.innerText = stat1.val.toFixed(1) + "M+";
            },
          });
          // Stat 2: 4.2x ROAS
          const stat2 = { val: 0 };
          animate(stat2, {
            val: 4.2,
            duration: 1700,
            ease: "outExpo",
            onUpdate: () => {
              const el = document.getElementById("latestpf-stat-roas");
              if (el) el.innerText = stat2.val.toFixed(1) + "x";
            },
          });
          // Stat 3: 100% In-House Crew
          const stat3 = { val: 0 };
          animate(stat3, {
            val: 100,
            duration: 1500,
            ease: "outExpo",
            onUpdate: () => {
              const el = document.getElementById("latestpf-stat-crew");
              if (el) el.innerText = Math.round(stat3.val) + "%";
            },
          });
          // Stat 4: 48h Turnaround
          const stat4 = { val: 0 };
          animate(stat4, {
            val: 48,
            duration: 1400,
            ease: "outExpo",
            onUpdate: () => {
              const el = document.getElementById("latestpf-stat-time");
              if (el) el.innerText = Math.round(stat4.val) + "h";
            },
          });
        },
      });
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Anime.js v4 Micro-Interactions (Dancing Equalizers, Spark Shimmer, Floating Badges)
  useEffect(() => {
    // 1. Equalizer audio visualizer bars on reels
    animate(".anime-eq-bar-1", {
      scaleY: [0.25, 1, 0.45, 0.85, 0.25],
      duration: 750,
      ease: "inOutSine",
      loop: true,
    });
    animate(".anime-eq-bar-2", {
      scaleY: [0.75, 0.3, 1, 0.5, 0.75],
      duration: 650,
      ease: "inOutSine",
      loop: true,
    });
    animate(".anime-eq-bar-3", {
      scaleY: [0.4, 0.9, 0.2, 1, 0.4],
      duration: 850,
      ease: "inOutSine",
      loop: true,
    });

    // 2. Kinetic Sparkle Shimmer (✦) across branding & section badges
    animate(".anime-spark", {
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.25, 0.92, 1.2, 1],
      duration: 4500,
      ease: "inOutSine",
      loop: true,
    });

    // 3. Floating micro-pulse on Hero Badge
    animate(".anime-hero-badge", {
      y: [0, -3, 0],
      duration: 2400,
      ease: "inOutSine",
      loop: true,
    });

    return () => {
      remove(".anime-eq-bar-1");
      remove(".anime-eq-bar-2");
      remove(".anime-eq-bar-3");
      remove(".anime-spark");
      remove(".anime-hero-badge");
    };
  }, []);

  // Anime.js Elastic Spring Feedback on Button Press
  const triggerButtonSpring = (e) => {
    animate(e.currentTarget, {
      scale: [1, 0.92, 1.05, 1],
      duration: 380,
      ease: "outElastic(1, .6)",
    });
  };

  // Desktop Magnetic Pull for Primary Action Buttons (Award-winning agency feel)
  const onMagneticMove = (e, strength = 0.3) => {
    if (isMobile) return;
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(btn, { x, y, duration: 0.22, ease: "power2.out" });
  };

  const onMagneticLeave = (e) => {
    if (isMobile) return;
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)" });
  };

  // React Spring Modal Transition (smooth physics on mount AND unmount)
  const modalTransitions = useTransition(activeVideo, {
    from: { opacity: 0, scale: 0.88, y: 35 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0, scale: 0.9, y: 22 },
    config: { mass: 0.9, tension: 280, friction: 24 },
  });

  // React Spring Slider Drag Handle Physics
  const sliderHandleSpring = useSpring({
    scale: isDraggingSlider ? 1.25 : 1,
    config: { tension: 350, friction: 20 },
  });

  // Desktop 3D Mouse Tilt on Showcase Cards
  const onCardMouseMove = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateY: (x / rect.width) * 4.5,
      rotateX: (-y / rect.height) * 4.5,
      transformPerspective: 1000,
      duration: 0.35,
      ease: "power1.out",
    });
  };

  const onCardMouseLeave = (e) => {
    if (isMobile) return;
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Split-screen Before/After Slider Interaction
  const handleSliderMove = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setSliderPos(Math.round((x / rect.width) * 100));
  };

  useEffect(() => {
    if (!isDraggingSlider) return;
    const onUp = () => setIsDraggingSlider(false);
    const onMove = (e) => handleSliderMove(e);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [isDraggingSlider]);

  return (
    <div
      ref={pageRef}
      style={{
        background: "#F3EFEA",
        color: "#111111",
        minHeight: "100vh",
        fontFamily: '"Bricolage Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflowX: "clip",
        position: "relative",
        paddingBottom: isMobile ? "80px" : "0px",
      }}
    >
      {/* 0. CINEMATIC GRADIENT SCROLL PROGRESS BAR (GSAP SCROLLTRIGGER SCRUB) */}
      <div
        className="latestpf-scroll-progress"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #FF4D1A 0%, #FFE27A 40%, #2B47FC 75%, #CFF26A 100%)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          zIndex: 999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      {/* SCOPED RESPONSIVE STYLES FOR /latestpf */}
      <style>{`
        @keyframes latestpfMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes latestpfPulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.25); }
        }
        .latestpf-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: center;
        }
        .latestpf-hero-marquee-track {
          display: flex;
          width: max-content;
          animation: latestpfMarquee 26s linear infinite;
          will-change: transform;
        }
        .latestpf-hero-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 960px) {
          .latestpf-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
        .latestpf-reels-section,
        .latestpf-work-section,
        .latestpf-services-section,
        .latestpf-testimonials-section,
        .latestpf-brief-section {
          scroll-margin-top: 100px;
        }
        @media (max-width: 800px) {
          .latestpf-reels-section,
          .latestpf-work-section,
          .latestpf-services-section,
          .latestpf-testimonials-section,
          .latestpf-brief-section {
            scroll-margin-top: 75px !important;
          }
          .latestpf-desktop-nav {
            display: none !important;
          }
          .latestpf-header {
            padding: 12px 16px !important;
          }
          .latestpf-hero-ribbon {
            height: 270px !important;
            min-height: 270px !important;
          }
          .latestpf-hero-section {
            min-height: auto !important;
            padding: 20px 16px 28px !important;
          }
          .latestpf-manifesto-section {
            padding: 34px 16px !important;
          }
          .latestpf-work-section {
            padding: 0 16px 48px !important;
          }
          .latestpf-card-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .latestpf-card-thumb {
            display: none !important;
          }
          .latestpf-reels-section {
            padding: 0 16px 50px !important;
          }
          .latestpf-services-section {
            padding: 0 16px 50px !important;
          }
          .latestpf-testimonials-section {
            padding: 36px 16px !important;
          }
          .latestpf-brief-section {
            padding: 36px 16px !important;
          }
          .latestpf-footer {
            padding: 44px 16px 96px !important;
          }
        }
        @media (min-width: 801px) {
          .latestpf-mobile-only {
            display: none !important;
          }
          .latestpf-bottom-bar {
            display: none !important;
          }
        }
      `}</style>

      {/* 1. TOP NAVIGATION BAR */}
      <header
        className="latestpf-header"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          background: "rgba(243, 239, 234, 0.92)",
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
            fontSize: isMobile ? "16px" : "clamp(18px, 2.5vw, 22px)",
            letterSpacing: "-0.04em",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            whiteSpace: "nowrap",
          }}
        >
          {CONFIG.brand}
          <span className="anime-spark" style={{ color: "#FF4D1A", fontSize: "15px", lineHeight: 1, display: "inline-block" }}>✦</span>
        </a>

        {/* Center Nav Links (Hidden on Mobile) */}
        <nav
          className="latestpf-desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 36px)",
          }}
        >
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
            href="#vault"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.85,
            }}
          >
            Vault
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

        {/* Header Right CTA (Single clean button on mobile, no cramped wrapping) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a
            href="#brief"
            onMouseDown={triggerButtonSpring}
            onMouseMove={(e) => onMagneticMove(e, 0.32)}
            onMouseLeave={onMagneticLeave}
            style={{
              background: "#111111",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: isMobile ? 12 : 13,
              fontWeight: 700,
              padding: isMobile ? "8px 16px" : "10px 20px",
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              letterSpacing: "-0.01em",
              boxShadow: "0 4px 14px rgba(17, 17, 17, 0.12)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              willChange: "transform",
            }}
          >
            Book a Shoot ↗
          </a>
        </div>
      </header>

      {/* 2. DRIBBBLE-INSPIRED EDITORIAL ILLUSTRATED HERO SECTION */}
      <section
        className="latestpf-hero-section"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          padding: isMobile ? "28px 16px 0" : "clamp(44px, 5.5vw, 72px) 24px 0",
          boxSizing: "border-box",
          background:
            "linear-gradient(90deg, rgba(142, 202, 230, 0.22) 0%, rgba(243, 239, 234, 0) 20%, rgba(243, 239, 234, 0) 80%, rgba(142, 202, 230, 0.22) 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Subtle Live Crew Pill */}
          <div
            className="anime-hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: isMobile ? 10.5 : 12,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#111111",
              background: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(17, 17, 17, 0.1)",
              padding: isMobile ? "6px 13px" : "7px 16px",
              borderRadius: 999,
              boxShadow: "0 4px 12px rgba(17, 17, 17, 0.04)",
              marginBottom: isMobile ? 16 : 20,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#10B981",
                display: "inline-block",
                animation: "latestpfPulseDot 1.8s ease-in-out infinite",
              }}
            />
            <span>The Story Builder · Hyderabad Video Crew</span>
          </div>

          {/* Crisp 2-Line Centered Editorial Headline (Matches Reference Composition) */}
          <h1
            style={{
              margin: "0 0 14px",
              fontSize: isMobile ? "clamp(32px, 8.8vw, 44px)" : "clamp(46px, 5.2vw, 70px)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#0F2E36",
              maxWidth: 880,
            }}
          >
            Shot by Storytellers,
            <br />
            Made to{" "}
            <span style={{ color: "#FF4D1A", fontWeight: 800 }}>Stop the Scroll.</span>
          </h1>

          {/* Clean Concise Subtitle */}
          <p
            style={{
              margin: "0 0 24px",
              fontSize: isMobile ? 14 : "clamp(15px, 1.3vw, 17.5px)",
              lineHeight: 1.5,
              fontWeight: 500,
              color: "rgba(17, 17, 17, 0.68)",
              maxWidth: 640,
              letterSpacing: "-0.01em",
            }}
          >
            Because your brand deserves more than random edits—it deserves one dedicated Hyderabad crew that shoots, cuts, and scales your story.
          </p>

          {/* 2 Clean Centered Pill CTAs (WhatsApp & Explore Our Work) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: isMobile ? 16 : 20,
            }}
          >
            <a
              href={waUrl("Hi Story Builder team, I visited /latestpf and want to discuss a video shoot & edit project.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Contact", { method: "whatsapp", placement: "latestpf_hero" })}
              onMouseDown={triggerButtonSpring}
              onMouseMove={(e) => onMagneticMove(e, 0.25)}
              onMouseLeave={onMagneticLeave}
              style={{
                background: "#111111",
                color: "#FFFFFF",
                textDecoration: "none",
                fontSize: isMobile ? 13.5 : 14.5,
                fontWeight: 700,
                padding: isMobile ? "12px 22px" : "13px 26px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 10px 24px rgba(17, 17, 17, 0.16)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                willChange: "transform",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Chat on WhatsApp ↗
            </a>

            <a
              href="#reels"
              onMouseDown={triggerButtonSpring}
              onMouseMove={(e) => onMagneticMove(e, 0.25)}
              onMouseLeave={onMagneticLeave}
              style={{
                background: "#FF4D1A",
                color: "#FFFFFF",
                textDecoration: "none",
                fontSize: isMobile ? 13.5 : 14.5,
                fontWeight: 700,
                padding: isMobile ? "12px 22px" : "13px 26px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 10px 24px rgba(255, 77, 26, 0.24)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                willChange: "transform",
              }}
            >
              Explore Our Work ↓
            </a>
          </div>

          {/* Playful Illustrated Story Builder Crew Scene */}
          <div style={{ width: "100%", marginTop: isMobile ? 4 : 8 }}>
            <HeroIllustration />
          </div>
        </div>

        {/* FULL-WIDTH SMOOTH CLIENT & DELIVERABLE TICKER MARQUEE */}
        <div
          style={{
            marginTop: 0,
            marginBottom: isMobile ? 24 : 36,
            borderTop: "1px solid rgba(17, 17, 17, 0.08)",
            borderBottom: "1px solid rgba(17, 17, 17, 0.08)",
            padding: "12px 0",
            overflow: "hidden",
            width: "100%",
            background: "rgba(255, 255, 255, 0.45)",
          }}
        >
          <div className="latestpf-hero-marquee-track">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 24 : 40,
                  paddingRight: isMobile ? 24 : 40,
                  fontSize: isMobile ? 11.5 : 12.5,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(17, 17, 17, 0.65)",
                  whiteSpace: "nowrap",
                }}
              >
                <span>✦ FARHAAN COMMERCIAL</span>
                <span>✦ NEEM TREE FARMS</span>
                <span>✦ ICONS GYM</span>
                <span>✦ DIGITAL MEDHA</span>
                <span>✦ VETO GYM</span>
                <span>✦ VISION RAINBOW</span>
                <span>✦ JAYA DAGA COACHING</span>
                <span>✦ MADHURA YOGA</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5. PERFORMANCE PROOF STAT RIBBON (ANIMATED STAT COUNTERS VIA ANIME.JS + GSAP) */}
      <section
        className="latestpf-stats-ribbon"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: isMobile ? "0 16px 36px" : "0 24px 64px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: "2px solid rgba(17, 17, 17, 0.08)",
            borderRadius: isMobile ? 20 : 30,
            padding: isMobile ? "20px 14px" : "28px 36px",
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? 16 : 24,
            boxShadow: "0 14px 34px -10px rgba(17, 17, 17, 0.07)",
          }}
        >
          <div style={{ textAlign: "center", borderRight: isMobile ? "none" : "1px solid rgba(17,17,17,0.08)" }}>
            <div
              id="latestpf-stat-views"
              style={{
                fontSize: isMobile ? "clamp(26px, 7vw, 34px)" : "clamp(34px, 3.5vw, 44px)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              2.8M+
            </div>
            <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#FF4D1A", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>
              Reel Views Generated
            </div>
          </div>

          <div style={{ textAlign: "center", borderRight: isMobile ? "none" : "1px solid rgba(17,17,17,0.08)" }}>
            <div
              id="latestpf-stat-roas"
              style={{
                fontSize: isMobile ? "clamp(26px, 7vw, 34px)" : "clamp(34px, 3.5vw, 44px)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              4.2x
            </div>
            <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#2B47FC", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>
              Average Ad ROAS
            </div>
          </div>

          <div style={{ textAlign: "center", borderRight: isMobile ? "none" : "1px solid rgba(17,17,17,0.08)" }}>
            <div
              id="latestpf-stat-crew"
              style={{
                fontSize: isMobile ? "clamp(26px, 7vw, 34px)" : "clamp(34px, 3.5vw, 44px)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              100%
            </div>
            <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#111111", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>
              In-House Hyderabad Crew
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              id="latestpf-stat-time"
              style={{
                fontSize: isMobile ? "clamp(26px, 7vw, 34px)" : "clamp(34px, 3.5vw, 44px)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              48h
            </div>
            <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>
              First Cut Turnaround
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHONE STACK CAROUSEL — VIRAL CLIENT REELS (FEATURED RIGHT AFTER INTRO) */}
      <section
        id="reels"
        className="latestpf-reels-section"
        style={{
          scrollMarginTop: isMobile ? "75px" : "100px",
          padding: isMobile ? "0 16px 44px" : "0 24px clamp(50px, 7vw, 90px)",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            marginBottom: isMobile ? 12 : 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: isMobile ? 11 : 12,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#FF4D1A",
              display: "block",
              marginBottom: 4,
            }}
          >
            ✦ Client Reels in Action · Swipe & Listen
          </span>
          <h3
            style={{
              margin: "0 0 8px",
              fontSize: isMobile ? "clamp(26px, 6vw, 32px)" : "clamp(32px, 4.2vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "#111111",
            }}
          >
            Scroll-Stopping Reels We Shot & Edited
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? 13 : 15,
              color: "rgba(17, 17, 17, 0.68)",
              fontWeight: 500,
              maxWidth: 560,
              lineHeight: 1.45,
            }}
          >
            Real shoots for Hyderabad brands, luxury farmhouses, gyms, and founders. Swipe left or right, and tap the speaker icon to hear the full sound mix.
          </p>
        </div>

        {/* The Smooth Phone Stack Carousel */}
        <PhoneStackCarousel
          reels={ALL_CLIENT_REELS}
          isMobile={isMobile}
        />
      </section>

      {/* 5. 3D PRODUCTION VAULT — INTERACTIVE GALLERY TUNNEL WITH REAL SHOOT FOOTAGE */}
      <section
        id="vault"
        className="latestpf-vault-section"
        style={{
          scrollMarginTop: isMobile ? "75px" : "100px",
          padding: isMobile ? "0 16px 44px" : "0 24px clamp(60px, 8vw, 100px)",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? 310 : 460,
            borderRadius: isMobile ? 22 : 36,
            overflow: "hidden",
            background: "#08090C",
            border: "2px solid rgba(17, 17, 17, 0.14)",
            boxShadow: "0 28px 65px -15px rgba(0, 0, 0, 0.45)",
          }}
        >
          {/* Three.js 3D Tunnel Flying Through Real Shoot Stills */}
          <GalleryTunnel
            colors={["#FF4D1A", "#CEF237", "#2B47FC", "#FFE27A", "#F9C0C4"]}
            background="#08090C"
            lineColor="#FFFFFF"
            lineOpacity={20}
            grid={4}
            speed={85}
            boost={95}
            fade={92}
            label={true}
            labelText="Hold to Warp ⚡"
            labelFill="#FFFFFF"
            labelColor="#111111"
          />

          {/* Subtle Radial Vignette for Crisp Overlay Readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, rgba(8, 9, 12, 0.72) 0%, rgba(8, 9, 12, 0.28) 55%, rgba(8, 9, 12, 0.55) 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Centered Editorial Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: isMobile ? "20px 18px" : "32px 24px",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: isMobile ? 10.5 : 12,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#CEF237",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                padding: isMobile ? "5px 12px" : "6px 14px",
                borderRadius: 999,
                marginBottom: isMobile ? 10 : 14,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              ✦ The Story Builder Archive · 140+ Shoots
            </span>

            <h3
              style={{
                margin: "0 0 8px",
                fontSize: isMobile ? "clamp(24px, 6.5vw, 32px)" : "clamp(32px, 4vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
                maxWidth: 680,
              }}
            >
              Inside Our Production Vault
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                fontSize: isMobile ? 12.5 : 15,
                color: "rgba(255, 255, 255, 0.78)",
                fontWeight: 500,
                maxWidth: 480,
                lineHeight: 1.45,
              }}
            >
              {isMobile
                ? "Tap & hold anywhere to warp through frames from our Hyderabad shoots."
                : "Press and hold anywhere to warp through real frames from our Hyderabad shoots."}
            </p>

            <a
              href="#brief"
              style={{
                pointerEvents: "auto",
                background: "#FF4D1A",
                color: "#FFFFFF",
                textDecoration: "none",
                fontSize: isMobile ? 12.5 : 14,
                fontWeight: 800,
                padding: isMobile ? "10px 20px" : "12px 24px",
                borderRadius: 999,
                boxShadow: "0 8px 24px rgba(255, 77, 26, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
            >
              Book Your Shoot ↗
            </a>
          </div>
        </div>
      </section>

      {/* 6. THINGS WE DO ("Thin...") SECTION — 4 STORY BUILDER CAPABILITY TILES */}
      <section
        id="services"
        className="latestpf-services-section"
        style={{
          scrollMarginTop: isMobile ? "75px" : "100px",
          padding: isMobile ? "0 16px 44px" : "0 24px clamp(60px, 8vw, 110px)",
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
            gap: isMobile ? 12 : 20,
            marginBottom: isMobile ? 24 : "clamp(36px, 5vw, 60px)",
            borderBottom: "1px solid rgba(17, 17, 17, 0.12)",
            paddingBottom: isMobile ? 16 : 24,
          }}
        >
          <div>
            <span
              style={{
                fontSize: isMobile ? 11 : 12,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FF4D1A",
                display: "block",
                marginBottom: 6,
              }}
            >
              ✦ How We Work · After Client Onboarding
            </span>
            <h3
              className="latestpf-watermark-2"
              style={{
                margin: 0,
                fontSize: isMobile ? "clamp(30px, 7.5vw, 40px)" : "clamp(40px, 5vw, 64px)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                color: "#111111",
                display: "inline-block",
                willChange: "transform",
              }}
            >
              Our 4-Step Shoot & Edit Process
            </h3>
          </div>

          <div style={{ maxWidth: 460 }}>
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? 13 : "clamp(14px, 1.4vw, 16px)",
                lineHeight: 1.45,
                color: "rgba(17, 17, 17, 0.68)",
                fontWeight: 500,
              }}
            >
              After client onboarding, we research your brand & competition, plan Reels with scripts, shoot only after script approval, and finish in post-production.
            </p>
          </div>
        </div>

        {/* Luxury Split-Screen Capabilities Showcase (Framer "Cypher" Signature) */}
        <div className="latestpf-split-capabilities">
          <SplitScreenCapabilities isMobile={isMobile} />
        </div>
      </section>

      {/* 7. REAL VIDEO BEFORE / AFTER S-LOG3 COLOR SCIENCE STUDIO */}
      <section
        ref={sliderSectionRef}
        style={{
          padding: isMobile ? "0 16px 44px" : "0 24px clamp(60px, 8vw, 110px)",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: isMobile ? 22 : 36,
            border: "2px solid rgba(17, 17, 17, 0.08)",
            padding: isMobile ? "20px 16px" : "clamp(24px, 4vw, 44px)",
            boxShadow: "0 20px 50px -15px rgba(17, 17, 17, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: isMobile ? 18 : 28,
            }}
          >
            <div>
              <span
                style={{
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#FF4D1A",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                DaVinci Resolve Film Color Science
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: isMobile ? "clamp(20px, 5vw, 26px)" : "clamp(26px, 3.5vw, 38px)",
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
                fontSize: isMobile ? 12 : 14,
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
              height: isMobile ? "240px" : "clamp(280px, 46vw, 540px)",
              borderRadius: isMobile ? 16 : 22,
              overflow: "hidden",
              cursor: "ew-resize",
              userSelect: "none",
              background: "#000",
            }}
          >
            {/* Graded Video (Base / Full Width) */}
            <video
              ref={sliderVideoBaseRef}
              src="https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.mp4"
              poster="https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,so_1/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.jpg"
              muted
              loop
              playsInline
              preload="none"
              onTimeUpdate={(e) => {
                const clipVid = sliderVideoClipRef.current;
                if (clipVid && Math.abs(clipVid.currentTime - e.currentTarget.currentTime) > 0.15) {
                  clipVid.currentTime = e.currentTarget.currentTime;
                }
              }}
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
                bottom: isMobile ? 10 : 16,
                right: isMobile ? 12 : 18,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(6px)",
                color: "#FFFFFF",
                fontSize: isMobile ? 10 : 12,
                fontWeight: 700,
                padding: isMobile ? "4px 10px" : "6px 14px",
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
                ref={sliderVideoClipRef}
                src="https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,vc_h264/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.mp4"
                poster="https://res.cloudinary.com/dvr5erobx/video/upload/q_auto,w_720,so_1/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.jpg"
                muted
                loop
                playsInline
                preload="none"
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
                  bottom: isMobile ? 10 : 16,
                  left: isMobile ? 12 : 18,
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(6px)",
                  color: "#FFFFFF",
                  fontSize: isMobile ? 10 : 12,
                  fontWeight: 700,
                  padding: isMobile ? "4px 10px" : "6px 14px",
                  borderRadius: 999,
                }}
              >
                Raw S-Log3 Camera Output
              </div>
            </div>

            {/* Center Drag Handle (React Spring Scale Physics on Drag) */}
            <animated.div
              className="latestpf-slider-handle"
              style={{
                position: "absolute",
                top: "50%",
                left: `${sliderPos}%`,
                transform: "translate(-50%, -50%)",
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                borderRadius: 999,
                background: "#FFFFFF",
                boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111111",
                fontSize: isMobile ? 15 : 18,
                pointerEvents: "none",
                zIndex: 5,
                willChange: "transform",
                ...sliderHandleSpring,
              }}
            >
              ↔
            </animated.div>
          </div>
        </div>
      </section>

      {/* 8. KIND WORDS, SAID LOUDLY (REAL STORY BUILDER CLIENT REVIEWS) */}
      <section
        id="testimonials"
        className="latestpf-testimonials-section"
        style={{
          scrollMarginTop: isMobile ? "75px" : "100px",
          padding: isMobile ? "36px 16px" : "clamp(60px, 8vw, 110px) 24px",
          maxWidth: 1280,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          className="latestpf-testimonials-content"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: isMobile ? 24 : "clamp(36px, 5vw, 64px)",
            alignItems: "center",
          }}
        >
          {/* Left Column: Heading */}
          <div>
            <span
              style={{
                fontSize: isMobile ? 11 : 12,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FF4D1A",
                display: "block",
                marginBottom: 8,
              }}
            >
              ✦ Real Client Results & Reviews
            </span>
            <h3
              style={{
                margin: isMobile ? "0 0 12px" : "0 0 18px",
                fontSize: isMobile ? "clamp(30px, 7.5vw, 40px)" : "clamp(40px, 5vw, 62px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                color: "#111111",
              }}
            >
              Trusted by Founders & Brands Across Hyderabad.
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "13.5px" : "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.48,
                color: "rgba(17, 17, 17, 0.7)",
                maxWidth: 460,
                fontWeight: 500,
              }}
            >
              Read how local businesses, fitness studios, and personal brands grew their views, engagement, and inbound leads with our crew.
            </p>

            <div style={{ marginTop: isMobile ? 18 : 32, display: "flex", gap: 12 }}>
              <a
                href={waUrl("Hi Story Builder team, I saw the client reviews on /latestpf and want to discuss a video project.")}
                target="_blank"
                rel="noopener noreferrer"
                onMouseDown={triggerButtonSpring}
                onMouseMove={(e) => onMagneticMove(e, 0.32)}
                onMouseLeave={onMagneticLeave}
                style={{
                  background: "#111111",
                  color: "#FFFFFF",
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 700,
                  padding: isMobile ? "10px 20px" : "12px 24px",
                  borderRadius: 999,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 4px 14px rgba(17,17,17,0.15)",
                  cursor: "pointer",
                  willChange: "transform",
                }}
              >
                Work with our crew ↗
              </a>
            </div>
          </div>

          {/* Right Column: QuoteDeck with Real Clients */}
          <div style={{ width: "100%", minHeight: isMobile ? 320 : 460 }}>
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
        className="latestpf-brief-section"
        style={{
          scrollMarginTop: isMobile ? "75px" : "100px",
          padding: isMobile ? "36px 16px" : "clamp(60px, 8vw, 110px) 24px",
          maxWidth: 1100,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: isMobile ? 22 : 36,
            border: "2px solid rgba(17, 17, 17, 0.08)",
            padding: isMobile ? "24px 16px" : "clamp(28px, 5vw, 64px)",
            boxShadow: "0 24px 60px -15px rgba(17, 17, 17, 0.08)",
          }}
        >
          <div style={{ marginBottom: isMobile ? 20 : 36 }}>
            <span
              style={{
                fontSize: isMobile ? 11 : 12,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FF4D1A",
                display: "block",
                marginBottom: 6,
              }}
            >
              ✦ Get a Custom Package Quote in 30 Seconds
            </span>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: isMobile ? "clamp(26px, 6vw, 34px)" : "clamp(32px, 4.2vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                color: "#111111",
              }}
            >
              Ready to Shoot? Build Your Project Brief.
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? 13.5 : 15.5,
                color: "rgba(17, 17, 17, 0.68)",
                lineHeight: 1.5,
              }}
            >
              Pick your video format, deliverable count, and timeline below — we’ll send a tailored package quote straight to your WhatsApp.
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
        className="latestpf-footer"
        style={{
          background: "#0E0E0E",
          color: "#FFFFFF",
          padding: isMobile
            ? "44px 16px 96px"
            : "clamp(60px, 8vw, 100px) 24px 40px",
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
              gap: 16,
              paddingBottom: isMobile ? 24 : 40,
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              marginBottom: isMobile ? 24 : "clamp(40px, 6vw, 70px)",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? 18 : 22,
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
                flexWrap: "wrap",
                alignItems: "center",
                gap: isMobile ? "10px 18px" : "clamp(16px, 3vw, 32px)",
                fontSize: isMobile ? 13 : 14,
                fontWeight: 600,
              }}
            >
              <a href="#reels" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                All Reels
              </a>
              <a href="#vault" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Vault
              </a>
              <a href="#services" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Services
              </a>
              <a href="#testimonials" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Reviews
              </a>
              <a href="#brief" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Brief
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

          {/* Centerpiece: Clean Editorial Hero-Matched Finale (No Fruit Stickers) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1080,
              margin: "0 auto",
              padding: isMobile ? "12px 0 24px" : "16px 0 36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: isMobile ? 10.5 : 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                padding: isMobile ? "6px 13px" : "7px 16px",
                borderRadius: 999,
                marginBottom: isMobile ? 16 : 22,
              }}
            >
              <span style={{ color: "#CEF237" }}>✦</span>
              <span>One Crew · One Brief · Hyderabad Studio</span>
            </div>

            <h2
              style={{
                margin: "0 0 14px",
                fontSize: isMobile ? "clamp(30px, 8.2vw, 42px)" : "clamp(42px, 5vw, 66px)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
                maxWidth: 820,
              }}
            >
              Shot by Storytellers,
              <br />
              Ready to{" "}
              <span style={{ color: "#FF4D1A", fontWeight: 800 }}>Stop the Scroll?</span>
            </h2>

            <p
              style={{
                margin: "0 0 26px",
                fontSize: isMobile ? 14 : 16.5,
                lineHeight: 1.5,
                color: "rgba(255, 255, 255, 0.68)",
                maxWidth: 560,
                fontWeight: 500,
              }}
            >
              From brand & competitor research to scripted 4K shoots and high-retention edits — let’s build your next campaign.
            </p>

            {/* 2 Hero-Matched Pill CTAs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: isMobile ? 32 : 48,
              }}
            >
              <a
                href={waUrl("Hi Story Builder team, I’m ready to book a shoot & edit package.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Contact", { method: "whatsapp", placement: "latestpf_footer" })}
                style={{
                  background: "#FF4D1A",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: isMobile ? 13.5 : 14.5,
                  fontWeight: 700,
                  padding: isMobile ? "12px 22px" : "13px 26px",
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 10px 24px rgba(255, 77, 26, 0.28)",
                }}
              >
                Chat on WhatsApp ↗
              </a>

              <a
                href="#brief"
                style={{
                  background: "#FFFFFF",
                  color: "#111111",
                  textDecoration: "none",
                  fontSize: isMobile ? 13.5 : 14.5,
                  fontWeight: 700,
                  padding: isMobile ? "12px 22px" : "13px 26px",
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Build Project Brief ↑
              </a>
            </div>

            {/* Clean Architectural Brand Wordmark */}
            <div
              style={{
                fontSize: isMobile ? "clamp(32px, 9.5vw, 48px)" : "clamp(58px, 8.8vw, 120px)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
                color: "#FF4D1A",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              the story builder<span style={{ color: "#CEF237" }}>✦</span>
            </div>
          </div>

          {/* Bottom Copyright & Location Metadata */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              paddingTop: isMobile ? 24 : 40,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              marginTop: isMobile ? 24 : "clamp(30px, 4vw, 60px)",
              fontSize: isMobile ? 12 : 13,
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

      {/* 11. CINEMATIC VIDEO MODAL (REACT SPRING TRANSITIONS ON MOUNT & UNMOUNT) */}
      {modalTransitions((styles, item) =>
        item ? (
          <animated.div
            className="latestpf-modal-backdrop"
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
              padding: isMobile ? 12 : 20,
              opacity: styles.opacity,
            }}
          >
            <animated.div
              className="latestpf-modal-card"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 520,
                width: "100%",
                background: "#111111",
                borderRadius: isMobile ? 22 : 28,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
                transform: styles.y.to((y) => `translateY(${y}px)`),
                scale: styles.scale,
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: isMobile ? "12px 16px" : "16px 20px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(255, 255, 255, 0.03)",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, fontWeight: 700, color: "#FFFFFF" }}>
                    {item.title}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                    {item.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setActiveVideo(null)}
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    border: "none",
                    color: "#FFFFFF",
                    width: 32,
                    height: 32,
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
                  src={item.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>

              {/* Modal Footer CTA */}
              <div
                style={{
                  padding: isMobile ? "12px 16px" : "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255, 255, 255, 0.04)",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: isMobile ? 11 : 12, color: "rgba(255, 255, 255, 0.7)" }}>
                  Want a video cut like this?
                </span>

                <a
                  href={waUrl(`Hi Story Builder, I love the "${item.title}" reel and want a quote for something similar.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#FF4D1A",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: isMobile ? 12 : 13,
                    padding: isMobile ? "8px 16px" : "9px 18px",
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
            </animated.div>
          </animated.div>
        ) : null
      )}

      {/* 12. MOBILE STICKY BOTTOM ACTION BAR (HIDDEN ON DESKTOP VIA CSS) */}
      <div
        className="latestpf-bottom-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(243, 239, 234, 0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(17, 17, 17, 0.08)",
          padding: "10px 14px calc(10px + env(safe-area-inset-bottom))",
          display: "flex",
          gap: 10,
          zIndex: 75,
        }}
      >
        <a
          href="#brief"
          onMouseDown={triggerButtonSpring}
          style={{
            flex: 1,
            background: "#111111",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 13,
            padding: "11px",
            borderRadius: 999,
            textAlign: "center",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(17,17,17,0.15)",
            cursor: "pointer",
            willChange: "transform",
          }}
        >
          Book a Shoot ↗
        </a>
        <a
          href={waUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onMouseDown={triggerButtonSpring}
          style={{
            background: "#FF4D1A",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 13,
            padding: "11px 18px",
            borderRadius: 999,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            willChange: "transform",
          }}
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
}
