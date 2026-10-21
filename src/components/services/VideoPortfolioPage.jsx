import React, { useState, useEffect, useRef } from "react";
import { trackPageView, trackEvent, trackLead } from "../../utils/tracking";
import { getUTMParams } from "../../utils/utm";

/* ============================================================
   VideoPortfolioPage — /video-portfolio
   Shot by one crew. Cut by the same team.
   ============================================================ */

const CONFIG = {
  brand: "The Story Builder",
  whatsapp: "919553233063",
  phone: "+91 95532 33063",
  email: "hello@thestorybuilder.in",
  waMessage: "Hi Story Builder team, I'd like a quote for a video shoot and edit.",
};

const waUrl = (msg) =>
  "https://wa.me/" +
  CONFIG.whatsapp +
  "?text=" +
  encodeURIComponent(msg || CONFIG.waMessage);

/* ---------- CSS injected as a style tag ---------- */
const PAGE_CSS = `
/* ====== Video Portfolio Page Scoped Styles ====== */
.vp-root {
  --vp-paper: #F4F4F4;
  --vp-paper-2: #EFECE6;
  --vp-ink: #0F172A;
  --vp-ink-2: #1E293B;
  --vp-ink-3: #334155;
  --vp-muted: #665843;
  --vp-muted-inv: rgba(236, 237, 239, 0.72);
  --vp-line: rgba(120, 90, 40, 0.14);
  --vp-line-inv: rgba(255, 255, 255, 0.16);
  --vp-rec: #F59E0B;
  --vp-rec-hi: #FACC15;
  --vp-gold: #F59E0B;
  --vp-gold-accent: #FACC15;
  --vp-ig-pink: #e1306c;
  --vp-ig-grad: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  --vp-clip-v: #5c7cfa;
  --vp-clip-a: #3fb68b;
  --vp-clip-t: #e0a53a;
  --vp-f-display: "Archivo", "Helvetica Neue", Arial, sans-serif;
  --vp-f-body: "Instrument Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --vp-f-tc: "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --vp-wrap: 1240px;
  --vp-gut: clamp(16px, 4vw, 48px);
  --vp-sec: clamp(60px, 8vw, 120px);
  --vp-r: 4px;
  box-sizing: border-box;
  background: var(--vp-paper);
  color: var(--vp-ink);
  font: 400 1.0625rem/1.6 var(--vp-f-body);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}
.vp-root *, .vp-root *::before, .vp-root *::after { box-sizing: border-box; }
.vp-root a { color: inherit; }
.vp-root h1, .vp-root h2, .vp-root h3, .vp-root h4,
.vp-root p, .vp-root ul, .vp-root ol, .vp-root figure,
.vp-root blockquote, .vp-root dl, .vp-root dd { margin: 0; }
.vp-root ul, .vp-root ol { padding: 0; list-style: none; }
.vp-root button, .vp-root input, .vp-root select, .vp-root textarea { font: inherit; color: inherit; }
.vp-root img, .vp-root svg, .vp-root video { display: block; max-width: 100%; }

.vp-wrap { width: min(100% - 2 * var(--vp-gut), var(--vp-wrap)); margin-inline: auto; }
.vp-section { padding-block: var(--vp-sec); }
.vp-sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

.vp-dark { position: relative; background: var(--vp-ink); color: #eceef0; isolation: isolate; }
.vp-dark::before {
  content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0.07;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
}

/* Type */
.vp-root h1, .vp-root h2 {
  font-family: var(--vp-f-display); font-stretch: 118%; font-weight: 800;
  letter-spacing: -0.025em; line-height: 1.02;
}
.vp-root h1 { font-size: clamp(2.2rem, 5.2vw, 4.8rem); }
.vp-root h2 { font-size: clamp(1.8rem, 3.8vw, 3.2rem); font-stretch: 112%; }
.vp-root h3 { font-family: var(--vp-f-display); font-stretch: 105%; font-weight: 700; font-size: 1.25rem; letter-spacing: -0.01em; line-height: 1.2; }
.vp-lede { font-size: clamp(1rem, 1.4vw, 1.2rem); line-height: 1.55; color: var(--vp-muted); max-width: 48ch; }
.vp-dark .vp-lede, .vp-dark .vp-muted { color: var(--vp-muted-inv); }
.vp-muted { color: var(--vp-muted); }
.vp-tc { font-family: var(--vp-f-tc); font-variant-numeric: tabular-nums; }
.vp-note { font-size: 0.875rem; color: var(--vp-muted); }

/* Buttons */
.vp-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 50px; padding: 0 24px; border-radius: var(--vp-r);
  border: 1.5px solid transparent; cursor: pointer; text-decoration: none;
  font-weight: 600; font-size: 0.95rem; line-height: 1; white-space: nowrap;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
}
.vp-btn svg { width: 18px; height: 18px; flex: none; }
.vp-btn:active { transform: translateY(1px); }
.vp-btn-primary { background: #F59E0B; color: #0F172A; border: 1.5px solid #F59E0B; border-radius: 100px; font-weight: 700; }
.vp-btn-primary:hover { background: #FFFFFF; color: #0F172A; border-color: #FFFFFF; box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45); }
.vp-btn-ghost { border-color: var(--vp-ink); color: var(--vp-ink); background: transparent; }
.vp-btn-ghost:hover { background: var(--vp-ink); color: var(--vp-paper); }
.vp-dark .vp-btn-ghost { border-color: rgba(255,255,255,0.45); color: #fff; }
.vp-dark .vp-btn-ghost:hover { background: #fff; color: var(--vp-ink); border-color: #fff; }
.vp-btn-block { width: 100%; }
.vp-btn[disabled] { opacity: 0.6; cursor: progress; }

/* Nav */
.vp-nav {
  position: sticky; top: 0; z-index: 60;
  background: rgba(244, 244, 244, 0.94);
  -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--vp-line);
}
.vp-nav-in { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 20px; }
.vp-brand {
  display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
  font-family: var(--vp-f-display); font-stretch: 118%; font-weight: 800; font-size: 1.15rem; letter-spacing: -0.02em;
  color: var(--vp-ink);
}
.vp-brand::before { content: ""; width: 9px; height: 9px; border-radius: 50%; background: #F59E0B; }
.vp-nav-links { display: flex; gap: 28px; font-size: 0.92rem; font-weight: 500; }
.vp-nav-links a { text-decoration: none; padding: 6px 0; color: var(--vp-ink); }
.vp-nav-links a:hover { text-decoration: underline; color: #F59E0B; }
.vp-nav .vp-btn { min-height: 40px; padding: 0 18px; font-size: 0.88rem; }
.vp-nav .vp-btn-primary {
  background: #F59E0B;
  color: #0F172A !important;
  border: 1.5px solid #F59E0B;
  border-radius: 100px;
  font-weight: 700;
}
.vp-nav .vp-btn-primary:hover {
  background: #FFFFFF;
  color: #0F172A !important;
  border-color: #FFFFFF;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
}
@media (max-width: 860px) { .vp-nav-links { display: none; } }

/* Hero */
.vp-hero { padding-top: clamp(32px, 5vw, 64px); padding-bottom: clamp(40px, 6vw, 80px); }
.vp-hero-badge {
  display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px;
  background: rgba(217, 119, 6, 0.1); border: 1px solid rgba(217, 119, 6, 0.3);
  border-radius: 99px; font-size: 0.82rem; font-weight: 600; color: var(--vp-rec);
  margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.06em;
}
.vp-hero-grid {
  display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(24px, 3.5vw, 48px) 24px;
  margin-top: clamp(24px, 4vw, 48px); align-items: center;
}
.vp-hero-copy { grid-column: 1 / span 6; display: grid; gap: 24px; align-self: center; }
.vp-hero-copy .vp-btn-row { display: flex; flex-wrap: wrap; gap: 12px; }
.vp-hero-points { display: grid; gap: 8px; font-size: 0.92rem; font-weight: 500; }
.vp-hero-points li { display: flex; gap: 10px; align-items: baseline; padding-top: 8px; border-top: 1px solid var(--vp-line); }
.vp-hero-points li::before { content: ""; width: 7px; height: 7px; margin-top: 0.4em; border-radius: 50%; background: var(--vp-rec); flex: none; }

/* Hero Vertical Reel Showcase (9:16 Format) */
.vp-hero-reel-wrap {
  grid-column: 7 / span 6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vp-hero-reel-card {
  position: relative;
  width: min(320px, 86vw);
  aspect-ratio: 9 / 16;
  background: #000;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(15, 16, 19, 0.15);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.35);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.vp-hero-reel-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 40px 95px rgba(225, 48, 108, 0.22);
}
.vp-hero-reel-card video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  display: block;
}
.vp-hero-click-layer {
  position: absolute;
  inset: 0;
  z-index: 5;
  cursor: pointer;
}
.vp-hero-sound-btn {
  position: absolute;
  bottom: 14px;
  right: 14px;
  z-index: 10;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  background: rgba(15, 16, 19, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 6px 20px rgba(0,0,0,0.6);
  padding: 0;
}
.vp-hero-sound-btn:hover {
  background: rgba(15, 16, 19, 0.98);
  border-color: #fff;
  transform: scale(1.08);
}
.vp-hero-sound-btn.is-unmuted {
  background: #10b981;
  border-color: #10b981;
  color: #fff;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.6);
}
@media (max-width: 960px) {
  .vp-hero-copy, .vp-hero-reel-wrap { grid-column: 1 / -1; }
  .vp-hero-reel-wrap { margin-top: 16px; }
}

/* ============================================================
   CLIENT REELS SHOWCASE (MINIMALIST, ZERO JARGON, CONTINUOUS LOOP)
   ============================================================ */
.vp-ig-section {
  padding-block: clamp(50px, 7vw, 100px);
  background: #090a0d;
  color: #fff;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.vp-ig-header {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 16px;
  margin-bottom: 28px;
}
/* Continuous Reels Marquee Strip (Left-to-Right Gentle Glide) */
.vp-marquee-wrap {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  overflow: hidden;
  padding: 12px 0 24px;
}
.vp-marquee-track {
  display: flex;
  gap: 18px;
  width: max-content;
  animation: vp-marquee-ltr 70s linear infinite;
  will-change: transform;
}
.vp-marquee-wrap:hover .vp-marquee-track {
  animation-play-state: paused;
}
@keyframes vp-marquee-ltr {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .vp-marquee-track { animation: none; overflow-x: auto; width: 100%; }
}

.vp-ig-card {
  position: relative;
  flex: 0 0 clamp(220px, 18vw, 260px);
  width: clamp(220px, 18vw, 260px);
  aspect-ratio: 9 / 16;
  background: #000;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}
.vp-ig-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(225, 48, 108, 0.6);
  box-shadow: 0 24px 60px rgba(225, 48, 108, 0.2);
}

/* Continuous Video Frame (9:16 Aspect) - Cropped to Pure Video */
.vp-ig-video-frame {
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 9 / 16;
  background: #000;
  overflow: hidden;
  border-radius: 16px;
}
.vp-ig-video-frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  display: block;
}
.vp-ig-video-frame iframe {
  position: absolute;
  top: -14%;
  left: -14%;
  width: 128%;
  height: 128%;
  border: 0;
  pointer-events: none;
}
.vp-ig-click-layer {
  position: absolute;
  inset: 0;
  z-index: 5;
  cursor: pointer;
}

/* Floating Audio / Sound Button (Compact Circle, Icon Only) */
.vp-ig-sound-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  background: rgba(15, 16, 19, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 6px 20px rgba(0,0,0,0.6);
  padding: 0;
}
.vp-ig-sound-btn:hover {
  background: rgba(15, 16, 19, 0.98);
  border-color: #fff;
  transform: scale(1.08);
}
.vp-ig-sound-btn.is-unmuted {
  background: #10b981;
  border-color: #10b981;
  color: #fff;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.6);
}

/* Package / Split */
.vp-split { display: grid; grid-template-columns: repeat(12, 1fr); gap: 36px 24px; }
.vp-split-head { grid-column: 1 / span 4; align-self: start; position: sticky; top: 96px; display: grid; gap: 16px; }
.vp-split-body { grid-column: 6 / span 7; }
@media (max-width: 960px) { .vp-split-head, .vp-split-body { grid-column: 1 / -1; position: static; } }
.vp-ledger > div { display: grid; grid-template-columns: minmax(130px, 0.8fr) 2fr; gap: 12px 28px; padding: 24px 0; border-top: 1px solid var(--vp-ink); }
.vp-ledger > div:last-child { border-bottom: 1px solid var(--vp-ink); }
.vp-ledger h3 { font-size: 1.15rem; }
.vp-ledger p { color: var(--vp-muted); }
.vp-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.vp-chips li { padding: 4px 11px; border: 1px solid var(--vp-line); border-radius: 99px; font-size: 0.82rem; font-weight: 500; }
@media (max-width: 560px) { .vp-ledger > div { grid-template-columns: 1fr; } }

/* Pricing Tiers */
.vp-tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: clamp(40px, 6vw, 72px); align-items: stretch; }
.vp-tier { display: grid; align-content: start; gap: 16px; padding: 30px 24px; border: 1.5px solid var(--vp-ink); border-radius: var(--vp-r); background: transparent; position: relative; }
.vp-tier h3 { font-size: 1.35rem; font-family: var(--vp-f-display); }
.vp-tier .vp-price { font-family: var(--vp-f-display); font-stretch: 112%; font-weight: 800; font-size: 1.9rem; letter-spacing: -0.03em; }
.vp-tier .vp-price small { font-family: var(--vp-f-body); font-stretch: 100%; font-weight: 500; font-size: 0.82rem; letter-spacing: 0; color: var(--vp-muted); margin-left: 6px; }
.vp-tier ul { display: grid; gap: 10px; font-size: 0.92rem; }
.vp-tier li { display: flex; gap: 10px; align-items: baseline; }
.vp-tier li::before { content: "✓"; flex: none; color: var(--vp-rec); font-weight: bold; }
.vp-tier .vp-btn { margin-top: 6px; }
.vp-tier-featured { background: var(--vp-ink); color: #eceef0; border-color: var(--vp-ink); transform: translateY(-10px); padding-block: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.18); }
.vp-tier-featured .vp-price small { color: var(--vp-muted-inv); }
.vp-tier-flag { position: absolute; top: -1px; right: 24px; transform: translateY(-50%); background: var(--vp-gold-accent); color: #0F172A; padding: 5px 14px; font-size: 0.75rem; font-weight: 800; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35); }
.vp-tier-featured .vp-btn-ghost { border-color: rgba(255,255,255,0.45); color: #fff; }
.vp-tier-featured .vp-btn-ghost:hover { background: #fff; color: var(--vp-ink); }
@media (max-width: 960px) { .vp-tiers { grid-template-columns: 1fr; } .vp-tier-featured { transform: none; padding-block: 30px; } }

/* Process Timeline */
.vp-process-head { display: grid; gap: 16px; max-width: 760px; }
.vp-tl { position: relative; margin-top: clamp(36px, 5vw, 64px); }
.vp-tl-ruler { height: 28px; border-bottom: 1px solid var(--vp-ink); background: repeating-linear-gradient(90deg, var(--vp-line) 0 1px, transparent 1px 24px) left bottom / 100% 9px no-repeat; position: relative; }
.vp-tl-ruler span { position: absolute; top: 0; font-size: 0.72rem; color: var(--vp-muted); transform: translateX(-50%); font-family: var(--vp-f-tc); }
.vp-tl-ruler span:first-child { transform: none; }
.vp-tl-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.vp-tl-v { margin-top: 12px; }
.vp-clip {
  height: 60px; padding: 10px 14px; border-radius: var(--vp-r); color: #fff; font-weight: 600; display: flex; align-items: flex-end;
  background: var(--vp-clip-v); opacity: 0.35; transition: opacity 0.35s; font-size: 0.9rem;
}
.vp-clip.t-shoot { background: var(--vp-clip-a); }
.vp-clip.t-edit { background: var(--vp-clip-t); color: var(--vp-ink); }
.vp-clip.is-passed { opacity: 1; }
.vp-tl-a { margin-top: 6px; height: 42px; border-radius: var(--vp-r); background: var(--vp-ink-2); display: flex; align-items: center; gap: 2px; padding: 0 8px; overflow: hidden; }
.vp-tl-a i { flex: 1; min-width: 1px; background: var(--vp-clip-a); border-radius: 1px; opacity: 0.85; display: block; }
.vp-steps { margin-top: 20px; }
.vp-step { padding: 4px 14px 4px 0; color: var(--vp-muted); transition: color 0.35s; }
.vp-step h3 { margin-bottom: 6px; color: inherit; font-size: 1.1rem; }
.vp-step p { font-size: 0.92rem; line-height: 1.5; }
.vp-step.is-passed { color: var(--vp-ink); }
.vp-step.is-passed p { color: var(--vp-muted); }
@media (max-width: 760px) {
  .vp-tl-ruler, .vp-tl-a, .vp-tl-v { display: none; }
  .vp-tl-grid { grid-template-columns: 1fr; gap: 0; }
  .vp-steps { margin-top: 0; }
  .vp-step { padding: 14px 0 14px 18px; border-left: 3px solid var(--vp-rec); color: var(--vp-ink); }
}

/* Compare Slider (Color Grading) */
.vp-diff-head { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px 24px; align-items: end; margin-bottom: 36px; }
.vp-diff-head h2 { grid-column: 1 / span 7; }
.vp-diff-head p { grid-column: 8 / span 5; }
@media (max-width: 860px) { .vp-diff-head h2, .vp-diff-head p { grid-column: 1 / -1; } }

.vp-cmp {
  --pos: 50%; position: relative; aspect-ratio: 16 / 9; max-width: 1040px; margin-inline: auto;
  overflow: hidden; border-radius: 12px; background: #000; touch-action: pan-y;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.12);
}
.vp-cmp-video {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none;
}
.vp-cmp-video-raw {
  filter: grayscale(0.55) contrast(0.68) brightness(1.18) saturate(0.62);
}
.vp-cmp-graded-wrap {
  position: absolute; inset: 0; clip-path: inset(0 0 0 var(--pos)); pointer-events: none;
}
.vp-cmp-video-graded {
  filter: contrast(1.28) saturate(1.38) brightness(1.02);
}
.vp-cmp-graded-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(20, 80, 110, 0.22) 0%, rgba(245, 158, 11, 0.16) 100%);
  mix-blend-mode: soft-light; pointer-events: none;
}
.vp-cmp-tag {
  position: absolute; z-index: 3; top: 16px; padding: 6px 14px;
  background: rgba(15,16,19,0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border-radius: 99px; font-size: 0.78rem; font-family: var(--vp-f-tc); font-weight: 600; color: #fff;
  border: 1px solid rgba(255,255,255,0.18); display: flex; align-items: center; gap: 6px;
}
.vp-cmp-tag.l { left: 16px; }
.vp-cmp-tag.r { right: 16px; }
.vp-cmp-tag-dot { width: 8px; height: 8px; border-radius: 50%; }
.vp-cmp-tag-dot.raw { background: #94a3b8; }
.vp-cmp-tag-dot.graded { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
.vp-cmp-handle {
  position: absolute; z-index: 3; top: 0; bottom: 0; left: var(--pos); width: 2px;
  background: #fff; pointer-events: none;
}
.vp-cmp-handle::after {
  content: "↔";
  position: absolute; top: 50%; left: 50%; width: 42px; height: 42px;
  transform: translate(-50%, -50%); border-radius: 50%; background: #f59e0b;
  color: #0f1013; font-weight: 800; font-size: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
}
.vp-cmp input[type="range"] {
  position: absolute; z-index: 4; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize;
  touch-action: none;
}
.vp-cmp-sound-btn {
  position: absolute; bottom: 16px; right: 16px; z-index: 5;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px; border-radius: 99px;
  background: rgba(15, 16, 19, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 255, 255, 0.25); color: #fff;
  font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.vp-cmp-sound-btn:hover { background: rgba(15, 16, 19, 0.95); border-color: #f59e0b; }
.vp-cmp-sound-btn.is-unmuted {
  background: #10b981; border-color: #10b981; color: #fff; box-shadow: 0 0 16px rgba(16, 185, 129, 0.6);
}
.vp-cmp-presets { display: flex; justify-content: center; gap: 8px; margin-top: 16px; }
.vp-preset-btn {
  padding: 7px 16px; border-radius: 99px; border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent; color: #fff; font-size: 0.82rem; font-family: var(--vp-f-tc); cursor: pointer;
  transition: all 0.2s;
}
.vp-preset-btn:hover { background: rgba(255,255,255,0.1); border-color: #f59e0b; color: #f59e0b; }
.vp-preset-btn.active { background: #f59e0b; color: #0f1013; border-color: #f59e0b; font-weight: 700; }

.vp-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
.vp-pillars > div { padding-top: 20px; border-top: 1px solid var(--vp-line-inv); display: grid; gap: 8px; align-content: start; }
.vp-pillars h3 { font-size: 1.15rem; }
.vp-pillars p { color: var(--vp-muted-inv); font-size: 0.92rem; }
@media (max-width: 760px) { .vp-pillars { grid-template-columns: 1fr; } }

/* Testimonials */
.vp-quotes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.vp-quote {
  display: grid; gap: 18px; align-content: space-between; padding: 28px 24px;
  background: #fff; border: 1px solid var(--vp-line); border-radius: var(--vp-r);
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
}
.vp-quote-stars { color: #f59e0b; font-size: 1rem; letter-spacing: 2px; }
.vp-quote blockquote { font-family: var(--vp-f-body); font-weight: 500; font-size: 0.98rem; line-height: 1.55; color: var(--vp-ink); }
.vp-quote figcaption { display: flex; gap: 12px; align-items: center; border-top: 1px solid var(--vp-line); padding-top: 14px; }
.vp-avatar-badge {
  width: 42px; height: 42px; border-radius: 50%; background: var(--vp-ink); color: #fff;
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.88rem; flex: none;
}
.vp-quote-metric {
  display: inline-block; padding: 2px 8px; background: rgba(217,119,6,0.1); color: var(--vp-rec);
  border-radius: 4px; font-size: 0.75rem; font-weight: 600; font-family: var(--vp-f-tc); margin-top: 4px;
}
@media (max-width: 960px) { .vp-quotes { grid-template-columns: 1fr; } }

/* FAQ */
.vp-faq { background: var(--vp-paper-2); }
.vp-faq-in { display: grid; grid-template-columns: repeat(12, 1fr); gap: 36px 24px; }
.vp-faq-in h2 { grid-column: 1 / span 4; align-self: start; }
.vp-faq-list { grid-column: 6 / span 7; }
@media (max-width: 960px) { .vp-faq-in h2, .vp-faq-list { grid-column: 1 / -1; } }
.vp-faq-item { border-top: 1px solid var(--vp-ink); }
.vp-faq-item:last-child { border-bottom: 1px solid var(--vp-ink); }
.vp-faq-summary {
  cursor: pointer; padding: 20px 32px 20px 0; position: relative;
  font-family: var(--vp-f-display); font-stretch: 105%; font-weight: 700; font-size: 1.12rem;
  letter-spacing: -0.01em; display: flex; align-items: center; justify-content: space-between;
  background: none; border: none; width: 100%; text-align: left; color: var(--vp-ink);
}
.vp-faq-icon { font-size: 1.4rem; font-weight: 300; flex: none; transition: transform 0.25s; }
.vp-faq-icon.open { transform: rotate(45deg); }
.vp-faq-body { padding: 0 32px 20px 0; color: var(--vp-muted); max-width: 60ch; font-size: 0.95rem; line-height: 1.6; }

/* Quote Form */
.vp-quote-wrap { display: grid; grid-template-columns: repeat(12, 1fr); gap: 40px 24px; align-items: start; }
.vp-quote-copy { grid-column: 1 / span 5; display: grid; gap: 24px; }
.vp-next-steps { display: grid; gap: 0; counter-reset: s; }
.vp-next-steps li { counter-increment: s; display: grid; grid-template-columns: 32px 1fr; gap: 8px; padding: 14px 0; border-top: 1px solid var(--vp-line-inv); }
.vp-next-steps li::before { content: counter(s); font-family: var(--vp-f-tc); color: var(--vp-rec); font-weight: bold; }
.vp-next-steps strong { display: block; font-weight: 600; margin-bottom: 2px; }
.vp-next-steps span { color: var(--vp-muted-inv); font-size: 0.9rem; }
.vp-contact-lines { display: grid; gap: 6px; font-size: 0.92rem; }
.vp-form-card { grid-column: 7 / span 6; background: var(--vp-paper); color: var(--vp-ink); border-radius: 6px; padding: clamp(22px, 3.2vw, 40px); }
@media (max-width: 960px) { .vp-quote-copy, .vp-form-card { grid-column: 1 / -1; } }

.vp-form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 18px; }
.vp-field { display: grid; gap: 6px; }
.vp-field.full { grid-column: 1 / -1; }
.vp-field label { font-size: 0.88rem; font-weight: 600; }
.vp-field input, .vp-field select, .vp-field textarea {
  width: 100%; min-height: 48px; padding: 10px 14px;
  border: 1px solid rgba(15,16,19,0.25); border-radius: var(--vp-r);
  background: #fff; transition: border-color 0.2s, box-shadow 0.2s; font-size: 0.95rem;
}
.vp-field textarea { min-height: 100px; resize: vertical; }
.vp-field select { appearance: none; padding-right: 36px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%230f1013' stroke-width='2'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; }
.vp-field input:focus, .vp-field select:focus, .vp-field textarea:focus { outline: none; border-color: var(--vp-rec); box-shadow: 0 0 0 3px rgba(217,119,6,0.22); }
.vp-seg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.vp-seg label { position: relative; font-weight: 500; font-size: 0.85rem; }
.vp-seg input { position: absolute; opacity: 0; inset: 0; }
.vp-seg span { display: grid; place-items: center; min-height: 46px; padding: 6px 10px; text-align: center; font-size: 0.85rem; line-height: 1.2; border: 1px solid rgba(15,16,19,0.25); border-radius: var(--vp-r); background: #fff; cursor: pointer; transition: background-color 0.2s, color 0.2s, border-color 0.2s; }
.vp-seg input:checked + span { background: var(--vp-ink); color: #fff; border-color: var(--vp-ink); font-weight: 600; }
@media (max-width: 560px) { .vp-form-grid { grid-template-columns: 1fr; } .vp-field { grid-column: 1 / -1; } .vp-seg { grid-template-columns: 1fr; } }
.vp-hp { position: absolute; left: -9999px; }
.vp-form-foot { display: grid; gap: 12px; margin-top: 14px; }
.vp-form-msg-err { padding: 12px 14px; border-radius: var(--vp-r); font-size: 0.9rem; background: #f8dcd8; color: #7a1a10; }
.vp-form-done { text-align: left; display: grid; gap: 16px; padding: 12px 0; }
.vp-form-done h3 { font-family: var(--vp-f-display); font-size: 1.6rem; color: #166534; }

/* Modal Video Player */
.vp-player-overlay {
  position: fixed; inset: 0; z-index: 200; background: rgba(5,6,8,0.92);
  display: flex; align-items: center; justify-content: center; padding: clamp(12px, 3vw, 24px);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  animation: vp-fade 0.2s ease-out;
}
@keyframes vp-fade { from { opacity: 0; } to { opacity: 1; } }
.vp-player-box {
  position: relative; border-radius: 8px; background: #000; overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1);
  display: flex; flex-direction: column;
}
.vp-player-box.is-vertical {
  width: min(440px, 92vw); max-height: 92vh;
}
.vp-player-box.is-vertical .vp-player-stage {
  aspect-ratio: 9 / 16; max-height: 78vh;
}
.vp-player-box.is-horizontal {
  width: min(980px, 94vw);
}
.vp-player-box.is-horizontal .vp-player-stage {
  aspect-ratio: 16 / 9;
}
.vp-player-header {
  display: flex; justify-content: space-between; align-items: center; padding: 12px 18px;
  background: #111317; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff;
}
.vp-player-header h4 { font-size: 0.95rem; font-weight: 700; margin: 0; }
.vp-player-header span { font-size: 0.75rem; color: rgba(255,255,255,0.6); }
.vp-player-close {
  width: 32px; height: 32px; border-radius: 50%; border: 0; background: rgba(255,255,255,0.1);
  color: #fff; font-size: 1.3rem; cursor: pointer; line-height: 1; display: flex; align-items: center; justify-content: center;
  transition: background-color 0.2s;
}
.vp-player-close:hover { background: var(--vp-rec); }
.vp-player-stage { width: 100%; display: grid; place-items: center; background: #000; }
.vp-player-stage iframe { width: 100%; height: 100%; border: 0; }

/* Footer */
.vp-footer { background: var(--vp-ink); color: #eceef0; padding-block: 48px 36px; border-top: 1px solid var(--vp-line-inv); }
.vp-footer-in { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 36px; }
.vp-footer h4 { font-size: 0.88rem; font-weight: 600; margin: 0 0 12px; color: var(--vp-muted-inv); text-transform: uppercase; letter-spacing: 0.05em; }
.vp-footer li { margin-bottom: 8px; }
.vp-footer a { text-decoration: none; color: inherit; font-size: 0.92rem; }
.vp-footer a:hover { text-decoration: underline; text-underline-offset: 3px; color: #fff; }
.vp-footer-base { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-line-inv); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; font-size: 0.82rem; color: var(--vp-muted-inv); }
@media (max-width: 760px) { .vp-footer-in { grid-template-columns: 1fr 1fr; } .vp-footer-in > :first-child { grid-column: 1 / -1; } }

/* Mobile Sticky Bar */
.vp-sticky-bar {
  position: fixed; z-index: 70; left: 0; right: 0; bottom: 0; display: none; gap: 8px; padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
  background: rgba(15,16,19,0.95); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255,255,255,0.12); transform: translateY(110%); transition: transform 0.3s;
}
.vp-sticky-bar.show { transform: none; }
.vp-sticky-bar .vp-btn { flex: 1; min-height: 46px; padding: 0 12px; font-size: 0.9rem; }
@media (max-width: 760px) { .vp-sticky-bar { display: flex; } }
`;

/* Continuous Moving Strip Reels (Including Client Video Shoots & Cloudinary MP4s) */
const PORTFOLIO_STRIP_REELS = [
  {
    handle: "farhaan_edit_1",
    name: "Commercial Brand Video",
    type: "mp4",
    videoSrc: "https://res.cloudinary.com/dvr5erobx/video/upload/v1792571810/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-18_at_7.04.34_PM_oewt6w.mp4",
  },
  {
    handle: "digitalmedhaadvertising",
    name: "Digital Medha Advertising",
    type: "youtube",
    videoId: "rVUkWK8lRmw",
  },
  {
    handle: "farhaan_edit_2",
    name: "High-Retention Reel",
    type: "mp4",
    videoSrc: "https://res.cloudinary.com/dvr5erobx/video/upload/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.mp4",
  },
  {
    handle: "vision.rainbow",
    name: "Vision Rainbow",
    type: "youtube",
    videoId: "_aVoaZbyXJQ",
  },
  {
    handle: "farhaan_edit_3",
    name: "Cinematic Movement Story",
    type: "mp4",
    videoSrc: "https://res.cloudinary.com/dvr5erobx/video/upload/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.36_PM_vtlfsv.mp4",
  },
  {
    handle: "madhurayoga_",
    name: "Madhura Yoga",
    type: "youtube",
    videoId: "k-bJd1yYk1A",
  },
  {
    handle: "jaya.daga.1",
    name: "Jaya Daga",
    type: "youtube",
    videoId: "VdsrsWmmhiw",
  },
  {
    handle: "icons.gym",
    name: "Icons Gym",
    type: "youtube",
    videoId: "1EwM31QxnKk",
  },
];

/* Real Testimonials Aligned With Clients */
const TESTIMONIALS = [
  {
    quote: "Working with The Story Builder on our personal brand series was transformative. They directed the shoot, kept pacing razor-sharp, and the video quality was indistinguishable from an international film.",
    author: "Jaya Daga",
    role: "Author & Keynote Speaker",
    handle: "@jaya.daga.1",
    initials: "JD",
    metric: "410K+ Reel Reach",
  },
  {
    quote: "The gym walkthrough and dynamic member workout reels they produced drove insane traction on Instagram. Filled our membership quota in two weeks flat.",
    author: "Icons Gym Team",
    role: "Commercial Fitness Studio",
    handle: "@icons.gym",
    initials: "IG",
    metric: "580K+ Views on Instagram",
  },
  {
    quote: "They captured the true soul and warmth of our learning environment with sensitivity and cinematic grace. The feedback from parents has been phenomenal.",
    author: "Vision Rainbow",
    role: "Holistic Education Center",
    handle: "@vision.rainbow",
    initials: "VR",
    metric: "195K+ Organic Impressions",
  },
];

/* FAQ Items */
const FAQ_ITEMS = [
  {
    q: "How much does a video shoot and edit package cost?",
    a: "Our reel packages start at ₹10,000 for 4 reels, ₹15,000 for 6 reels, and ₹20,000 for 8 reels. Send a brief and we'll reply with a transparent, fixed quote.",
  },
  {
    q: "How fast is the turnaround from shoot day to final cut?",
    a: "Most projects shoot within 4 to 7 days of confirmation. Your first cut is delivered in 5 to 7 working days post-shoot, with quick 24-48 hour turnaround on revision notes.",
  },
  {
    q: "Do I need a script or concept ready before booking?",
    a: "No! You bring your product, service, or goal. We develop the core concept, scripting hooks, visual storyboard, and shot list before shoot day.",
  },
  {
    q: "Can you shoot outside Hyderabad?",
    a: "Yes. While our core crew is based in Hyderabad, Telangana, we travel across India for client campaigns. Travel and accommodation are quoted transparently upfront.",
  },
  {
    q: "What camera gear and production equipment do you bring?",
    a: "We shoot on cinema-line bodies (Sony FX series / Cine lenses), DJI Ronin stabilization gimbals, professional Aputure/Nanlite wireless lighting rigs, and Sennheiser/Rode wireless audio lavaliers.",
  },
  {
    q: "How many revisions are included in the package?",
    a: "Two comprehensive revision rounds are included with every video. Send your timestamps and notes in one batch, and we implement the changes swiftly.",
  },
  {
    q: "Can you edit footage I have already shot?",
    a: "Yes! Simply choose 'Editing only' in the quote form below. We will review your raw files, color grade them, add sound design, motion graphics, and platform exports.",
  },
  {
    q: "Who owns the copyright to the final delivered videos?",
    a: "You do. Once the project invoice is cleared, you receive 100% full commercial rights across YouTube, Instagram, Meta Ads, TV, and web.",
  },
];

const WAVE_BARS = Array.from({ length: 90 }, (_, i) => {
  const h = 18 + Math.abs(Math.sin(i * 0.55) * 52 + Math.sin(i * 1.7) * 26);
  return Math.min(92, Math.round(h));
});

export default function VideoPortfolioPage({ setPage }) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playerVideo, setPlayerVideo] = useState(null);
  const [heroUnmuted, setHeroUnmuted] = useState(false);
  const [unmutedReel, setUnmutedReel] = useState(null);
  const [cmpPos, setCmpPos] = useState(50);
  const [cmpUnmuted, setCmpUnmuted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [tlProgress, setTlProgress] = useState(0);
  const [timecode, setTimecode] = useState("01:00:00:00");

  const heroVideoRef = useRef(null);
  const cmpVideoRawRef = useRef(null);
  const cmpVideoGradedRef = useRef(null);
  const iframeRefs = useRef({});
  const videoRefs = useRef({});

  const toggleHeroMute = () => {
    if (heroVideoRef.current) {
      const nextMuted = !heroVideoRef.current.muted;
      heroVideoRef.current.muted = nextMuted;
      if (!nextMuted) {
        heroVideoRef.current.volume = 1.0;
        heroVideoRef.current.play().catch(() => {});
      }
      setHeroUnmuted(!nextMuted);
    }
  };

  const toggleCmpMute = () => {
    if (cmpVideoGradedRef.current) {
      const next = !cmpUnmuted;
      cmpVideoGradedRef.current.muted = !next;
      setCmpUnmuted(next);
      if (next) {
        cmpVideoGradedRef.current.volume = 1.0;
        cmpVideoGradedRef.current.play().catch(() => {});
      }
    }
  };

  // Synchronize the Before & After raw and graded video playback in real time
  useEffect(() => {
    const rawEl = cmpVideoRawRef.current;
    const gradedEl = cmpVideoGradedRef.current;
    if (!rawEl || !gradedEl) return;

    const handleSync = () => {
      if (Math.abs(gradedEl.currentTime - rawEl.currentTime) > 0.08) {
        gradedEl.currentTime = rawEl.currentTime;
      }
    };
    rawEl.addEventListener("timeupdate", handleSync);
    return () => {
      rawEl.removeEventListener("timeupdate", handleSync);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    email: "",
    service: "Shoot + edit package",
    video_type: "",
    budget: "",
    details: "",
    website: "",
  });
  const [formError, setFormError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const tlRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView("/video-portfolio");
  }, []);

  // Escape key closes player
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closePlayer();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Timecode animation in hero viewfinder
  useEffect(() => {
    const fps = 24;
    const t0 = performance.now();
    let raf;
    const pad = (n) => String(n).padStart(2, "0");
    let last = -1;
    const tick = (now) => {
      const f = Math.floor(((now - t0) / 1000) * fps);
      if (f !== last) {
        last = f;
        const s = Math.floor(f / fps);
        setTimecode(`${pad(1 + Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % fps)}`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Timeline scroll progress animation
  useEffect(() => {
    const update = () => {
      if (!tlRef.current) return;
      const r = tlRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.3)));
      setTlProgress(p);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Sticky bottom bar trigger
  useEffect(() => {
    const update = () => {
      if (!quoteRef.current) {
        setStickyVisible(window.scrollY > 500);
        return;
      }
      const r = quoteRef.current.getBoundingClientRect();
      const nearForm = r.top < window.innerHeight && r.bottom > 0;
      setStickyVisible(window.scrollY > 500 && !nearForm);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openPlayer = (item) => {
    setPlayerVideo({
      id: item.videoId,
      title: item.name,
      client: `@${item.handle}`,
      aspect: "9/16",
      embed: `https://www.youtube.com/embed/${item.videoId}`,
    });
    setPlayerOpen(true);
    trackEvent("VideoPlay", { placement: "ig_reel", handle: item.handle });
  };

  const closePlayer = () => {
    setPlayerOpen(false);
    setPlayerVideo(null);
  };

  // Instant seamless unmute/mute for both HTML5 MP4 videos and YouTube iframes
  const toggleMute = (handle) => {
    const isCurrentlyUnmuted = unmutedReel === handle;
    const nextUnmuted = isCurrentlyUnmuted ? null : handle;
    setUnmutedReel(nextUnmuted);

    // 1. Native HTML5 videos (Cloudinary MP4s)
    Object.keys(videoRefs.current).forEach((h) => {
      const vList = videoRefs.current[h];
      const list = Array.isArray(vList) ? vList : [vList];
      list.forEach((v) => {
        if (v) {
          if (h === handle && !isCurrentlyUnmuted) {
            v.muted = false;
            v.volume = 1.0;
            v.play().catch(() => {});
          } else {
            v.muted = true;
          }
        }
      });
    });

    // 2. YouTube iframes
    Object.keys(iframeRefs.current).forEach((h) => {
      const iframes = iframeRefs.current[h];
      const list = Array.isArray(iframes) ? iframes : [iframes];
      list.forEach((iframe) => {
        if (iframe && iframe.contentWindow) {
          if (h === handle && !isCurrentlyUnmuted) {
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "unMute", args: "" }),
              "*"
            );
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "setVolume", args: [100] }),
              "*"
            );
          } else {
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "mute", args: "" }),
              "*"
            );
          }
        }
      });
    });

    trackEvent("AudioToggle", { handle, unmuted: !isCurrentlyUnmuted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) { setFormError("Please enter your name."); return; }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) { setFormError("Please enter a valid WhatsApp number."); return; }
    if (!formData.business.trim()) { setFormError("Please enter your business or brand name."); return; }
    if (!formData.video_type) { setFormError("Please select what you are making."); return; }
    if (!formData.budget) { setFormError("Please select an approximate budget."); return; }
    if (formData.website) return; // honeypot

    setFormSubmitting(true);
    const utm = getUTMParams();

    // 1. Post to API endpoint asynchronously to persist lead
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim() || "video-lead@thestorybuilder.in",
          phone: formData.phone.trim(),
          area: "Video Shoot & Edit Services",
          project: `${formData.service} | ${formData.video_type} (${formData.budget})`,
          message: `Brand: ${formData.business}\nDetails: ${formData.details || "None"}\nPage: /video-portfolio`,
          honeypot: formData.website,
          utm,
        }),
      }).catch((err) => console.warn("API lead sync error:", err));
    } catch (_) {}

    // 2. Track lead events
    trackLead({
      content_name: "Video Shoot & Edit Quote Request",
      service: formData.service,
      video_type: formData.video_type,
      budget: formData.budget,
    });
    trackEvent("QuoteFormSubmit", {
      service: formData.service,
      video_type: formData.video_type,
      budget: formData.budget,
    });

    // 3. Format WhatsApp brief message
    const summary =
      "🎬 *New Video Shoot & Edit Inquiry*\n\n" +
      "• *Name:* " + formData.name.trim() + "\n" +
      "• *WhatsApp:* " + formData.phone.trim() + "\n" +
      "• *Brand / Business:* " + formData.business.trim() + "\n" +
      "• *Service:* " + formData.service + "\n" +
      "• *What are you making:* " + formData.video_type + "\n" +
      "• *Budget Tier:* " + formData.budget +
      (formData.email ? "\n• *Email:* " + formData.email.trim() : "") +
      (formData.details ? "\n• *Details:* " + formData.details.trim() : "");

    // 4. Open WhatsApp
    window.open(waUrl(summary), "_blank", "noopener");
    setFormSubmitted(true);
    setFormSubmitting(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="vp-root" id="vp-top">
        {/* =================== NAV =================== */}
        <header className="vp-nav">
          <div className="vp-wrap vp-nav-in">
            <a className="vp-brand" href="#vp-top" aria-label="The Story Builder home">
              <span style={{ color: "#F59E0B" }}>The </span>Story Builder
            </a>
            <nav className="vp-nav-links" aria-label="Primary">
              <a href="#vp-client-reels" onClick={(e) => { e.preventDefault(); scrollTo("vp-client-reels"); }}>Client Reels</a>
              <a href="#vp-package" onClick={(e) => { e.preventDefault(); scrollTo("vp-package"); }}>Packages</a>
              <a href="#vp-process" onClick={(e) => { e.preventDefault(); scrollTo("vp-process"); }}>Process</a>
              <a href="#vp-difference" onClick={(e) => { e.preventDefault(); scrollTo("vp-difference"); }}>Color Grade</a>
              <a href="#vp-faq" onClick={(e) => { e.preventDefault(); scrollTo("vp-faq"); }}>FAQ</a>
            </nav>
            <a
              className="vp-btn vp-btn-primary"
              href="#vp-quote"
              onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("CTAClick", { placement: "nav_quote" }); }}
            >
              Get a quote
            </a>
          </div>
        </header>

        <main id="vp-main">
          {/* =================== HERO =================== */}
          <section className="vp-hero">
            <div className="vp-wrap">
              <div className="vp-hero-badge">
                <span>Video Shoot & Edit • Hyderabad & Pan-India</span>
              </div>
              <h1>Shot by one crew.<br />Cut by the same team.</h1>
              <div className="vp-hero-grid">
                <div className="vp-hero-copy">
                  <p className="vp-lede">
                    Video shoots and editing in one seamless package. Brief us once and get finished
                    cinema-grade videos tailored for Reels, YouTube, and high-converting paid ads.
                  </p>
                  <div className="vp-btn-row">
                    <a
                      className="vp-btn vp-btn-primary"
                      href="#vp-quote"
                      onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("CTAClick", { placement: "hero_quote" }); }}
                    >
                      Get my video quote
                    </a>
                    <a
                      className="vp-btn vp-btn-ghost"
                      href={waUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("Contact", { method: "whatsapp", placement: "hero" })}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 5h16v11H10l-5 4v-4H4z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                  <ul className="vp-hero-points">
                    <li>Crew based in Hyderabad, shooting on-location across India</li>
                    <li>First cut delivered within 5 to 7 working days of shoot</li>
                    <li>Two comprehensive revision rounds included per video</li>
                  </ul>
                </div>

                {/* Hero Featured Reel in Vertical 9:16 Format */}
                <div className="vp-hero-reel-wrap">
                  <div className="vp-hero-reel-card">
                    <video
                      ref={heroVideoRef}
                      src="https://res.cloudinary.com/dvr5erobx/video/upload/v1792571813/portfolio%20video%20for%20editing%20services/farhaan%20videos/WhatsApp_Video_2026-10-21_at_12.06.22_PM_xm5ybc.mp4"
                      autoPlay
                      loop
                      muted={!heroUnmuted}
                      playsInline
                      preload="auto"
                    />

                    {/* Transparent Click Layer for Mute/Unmute */}
                    <div
                      className="vp-hero-click-layer"
                      onClick={toggleHeroMute}
                      title={heroUnmuted ? "Tap to mute audio" : "Tap to unmute audio"}
                    />

                    {/* Minimal Circular Sound Toggle Button */}
                    <button
                      type="button"
                      className={`vp-hero-sound-btn ${heroUnmuted ? "is-unmuted" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleHeroMute();
                      }}
                      title={heroUnmuted ? "Mute audio" : "Unmute audio"}
                      aria-label={heroUnmuted ? "Mute audio" : "Unmute audio"}
                    >
                      {heroUnmuted ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================== CLIENT REELS (CLEAN, CONTINUOUSLY PLAYING ON MUTE, TAP TO UNMUTE) =================== */}
          <section className="vp-ig-section" id="vp-client-reels">
            <div className="vp-wrap">
              <div className="vp-ig-header">
                <div>
                  <h2>Client Reels</h2>
                </div>
              </div>

              {/* Infinite gentle scrolling marquee strip (Moving left to right at very low speed) */}
              <div className="vp-marquee-wrap">
                <div className="vp-marquee-track">
                  {[...PORTFOLIO_STRIP_REELS, ...PORTFOLIO_STRIP_REELS].map((item, idx) => {
                    const isUnmuted = unmutedReel === item.handle;
                    return (
                      <div className="vp-ig-card" key={`${item.handle}_${idx}`}>
                        <div className="vp-ig-video-frame">
                          {item.type === "mp4" ? (
                            <video
                              ref={(el) => {
                                if (el) {
                                  if (!videoRefs.current[item.handle]) videoRefs.current[item.handle] = [];
                                  if (!videoRefs.current[item.handle].includes(el)) {
                                    videoRefs.current[item.handle].push(el);
                                  }
                                }
                              }}
                              src={item.videoSrc}
                              autoPlay
                              loop
                              muted={!isUnmuted}
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <iframe
                              ref={(el) => {
                                if (el) {
                                  if (!iframeRefs.current[item.handle]) iframeRefs.current[item.handle] = [];
                                  if (!iframeRefs.current[item.handle].includes(el)) {
                                    iframeRefs.current[item.handle].push(el);
                                  }
                                }
                              }}
                              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0`}
                              title={`${item.name} Reel`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                          )}

                          {/* Transparent click layer for toggling sound without triggering YouTube UI */}
                          <div
                            className="vp-ig-click-layer"
                            onClick={() => toggleMute(item.handle)}
                            title={isUnmuted ? "Tap to mute" : "Tap to unmute"}
                          />

                          {/* Minimal One-Tap Mute / Unmute Symbol Only (No Text) */}
                          <button
                            type="button"
                            className={`vp-ig-sound-btn ${isUnmuted ? "is-unmuted" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMute(item.handle);
                            }}
                            title={isUnmuted ? "Mute audio" : "Unmute audio"}
                            aria-label={isUnmuted ? "Mute audio" : "Unmute audio"}
                          >
                            {isUnmuted ? (
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                <p style={{ fontFamily: "var(--vp-f-display)", fontWeight: 700, fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)", letterSpacing: "-0.01em" }}>
                  Want your brand’s Reels shot & edited by our crew?
                </p>
                <a
                  className="vp-btn vp-btn-primary"
                  href="#vp-quote"
                  onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("CTAClick", { placement: "ig_section_quote" }); }}
                >
                  Book your shoot & edit session
                </a>
              </div>
            </div>
          </section>

          {/* Video Player Modal with Dynamic Aspect Ratio */}
          {playerOpen && playerVideo && (
            <div className="vp-player-overlay" onClick={closePlayer} role="dialog" aria-modal="true">
              <div
                className={`vp-player-box ${playerVideo.aspect === "9/16" ? "is-vertical" : "is-horizontal"}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="vp-player-header">
                  <div>
                    <h4>{playerVideo.title}</h4>
                    <span>{playerVideo.client}</span>
                  </div>
                  <button className="vp-player-close" type="button" onClick={closePlayer} aria-label="Close video player">
                    ✕
                  </button>
                </div>
                <div className="vp-player-stage">
                  <iframe
                    src={`${playerVideo.embed}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    title={playerVideo.title}
                  />
                </div>
              </div>
            </div>
          )}

          {/* =================== PACKAGE / SPLIT =================== */}
          <section className="vp-section" id="vp-package">
            <div className="vp-wrap">
              <div className="vp-split">
                <div className="vp-split-head">
                  <h2>One brief. One crew. Finished videos.</h2>
                  <p className="vp-lede">
                    No hiring a videographer, then hunting for an editor, then chasing both.
                    We plan it, shoot it, and edit it so the footage is shot specifically with the final cut in mind.
                  </p>
                </div>
                <div className="vp-split-body">
                  <dl className="vp-ledger">
                    {[
                      {
                        title: "1. Pre-Production & Planning",
                        desc: "We analyze your business goal, write the concept, create scripting hooks, and lock the shot list so shoot day runs on clockwork.",
                        chips: ["Strategy call", "Concept & hook writing", "Shot list & storyboard", "Call sheet & schedule"],
                      },
                      {
                        title: "2. Shoot Day On-Location",
                        desc: "Cinema camera crew with lighting, gimbal rigs, and lavalier audio directing on set at your office, studio, or factory.",
                        chips: ["Cinema 4K cameras", "Lighting design", "Clean lav audio", "Product macro shots", "Director on set"],
                      },
                      {
                        title: "3. Post-Production & Color",
                        desc: "Every cut is paced for platform retention, enhanced with sound design, kinetic captions, and cinematic color grading.",
                        chips: ["Retention pacing", "Film LUT grade", "Sound FX & mixing", "Animated subtitles", "Motion graphics"],
                      },
                      {
                        title: "4. Multi-Platform Delivery",
                        desc: "Finished assets exported in every format your social channels and ad managers demand, with revision rounds included.",
                        chips: ["Reels/Shorts 9:16", "YouTube 16:9", "Feed 4:5 & 1:1", "Two revision rounds", "Cloud archive"],
                      },
                    ].map((item) => (
                      <div key={item.title}>
                        <dt><h3>{item.title}</h3></dt>
                        <dd>
                          <p>{item.desc}</p>
                          <ul className="vp-chips">
                            {item.chips.map((c) => <li key={c}>{c}</li>)}
                          </ul>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Pricing Tiers */}
              <div className="vp-tiers">
                <article className="vp-tier">
                  <h3>4 Reels</h3>
                  <p className="vp-price">₹10,000 <small>shoot & edit</small></p>
                  <ul>
                    <li>On-location video shoot</li>
                    <li>4 short-form vertical reels (9:16)</li>
                    <li>Hook scripting & retention pacing</li>
                    <li>Cinematic color grade & sound design</li>
                    <li>Two revision rounds included</li>
                  </ul>
                  <a className="vp-btn vp-btn-ghost" href="#vp-quote" onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("PackageSelect", { package: "4 Reels (₹10,000)" }); }}>
                    Choose 4 Reels
                  </a>
                </article>

                <article className="vp-tier vp-tier-featured">
                  <span className="vp-tier-flag">Most Popular</span>
                  <h3>6 Reels</h3>
                  <p className="vp-price">₹15,000 <small>shoot & edit</small></p>
                  <ul>
                    <li>Full on-location video shoot</li>
                    <li>6 short-form vertical reels (9:16)</li>
                    <li>Hook scripting, viral pacing & dynamic B-roll</li>
                    <li>Sound effects, motion graphics & color grade</li>
                    <li>Two revision rounds per video</li>
                  </ul>
                  <a className="vp-btn vp-btn-primary" href="#vp-quote" onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("PackageSelect", { package: "6 Reels (₹15,000)" }); }}>
                    Choose 6 Reels
                  </a>
                </article>

                <article className="vp-tier">
                  <h3>8 Reels</h3>
                  <p className="vp-price">₹20,000 <small>shoot & edit</small></p>
                  <ul>
                    <li>Extended on-location video shoot</li>
                    <li>8 short-form vertical reels (9:16)</li>
                    <li>Complete monthly content calendar coverage</li>
                    <li>Scroll-stopping hooks, kinetic captions & SFX</li>
                    <li>Two revision rounds per video</li>
                  </ul>
                  <a className="vp-btn vp-btn-ghost" href="#vp-quote" onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("PackageSelect", { package: "8 Reels (₹20,000)" }); }}>
                    Choose 8 Reels
                  </a>
                </article>
              </div>
            </div>
          </section>

          {/* =================== PROCESS =================== */}
          <section className="vp-section" id="vp-process">
            <div className="vp-wrap">
              <div className="vp-process-head">
                <h2>Simple process. Serious execution.</h2>
                <p className="vp-lede">Five streamlined steps from first message to final export. You always know what is happening next.</p>
              </div>

              <div className="vp-tl" ref={tlRef}>
                <div className="vp-tl-ruler" aria-hidden="true">
                  <span style={{ left: 0 }}>Day 0</span>
                  <span style={{ left: "20%" }}>Day 2</span>
                  <span style={{ left: "40%" }}>Day 4</span>
                  <span style={{ left: "60%" }}>Day 8</span>
                  <span style={{ left: "80%" }}>Day 10</span>
                </div>
                <div className="vp-tl-grid vp-tl-v" aria-hidden="true">
                  {[
                    { label: "1. Discuss", className: "" },
                    { label: "2. Plan", className: "" },
                    { label: "3. Shoot", className: "t-shoot" },
                    { label: "4. Edit", className: "t-edit" },
                    { label: "5. Deliver", className: "" },
                  ].map((clip, i) => (
                    <div key={clip.label} className={`vp-clip ${clip.className} ${tlProgress >= i / 5 - 0.001 ? "is-passed" : ""}`}>
                      {clip.label}
                    </div>
                  ))}
                </div>
                <div className="vp-tl-a" aria-hidden="true">
                  {WAVE_BARS.map((h, i) => (
                    <i key={i} style={{ height: h + "%" }} />
                  ))}
                </div>
                <ol className="vp-tl-grid vp-steps">
                  {[
                    { title: "Discuss", body: "Quick call or WhatsApp brief to clarify your objectives, target viewers, and key deliverables." },
                    { title: "Plan", body: "We write the hooks, finalize the shot list, and coordinate locations before rolling a second of tape." },
                    { title: "Shoot", body: "Crew arrives with cinema cameras, lights, and audio. You direct the brand, we direct the frame." },
                    { title: "Edit", body: "Rough cut, fine pacing, color grade, and sound design. You review the first cut with easy notes." },
                    { title: "Deliver", body: "Finished 4K/HD assets formatted for Reels, YouTube, and Meta Ads ready to publish." },
                  ].map((step, i) => (
                    <li key={step.title} className={`vp-step ${tlProgress >= i / 5 - 0.001 ? "is-passed" : ""}`}>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* =================== BEFORE & AFTER COLOR GRADE (LIVE VIDEO DEMO) =================== */}
          <section className="vp-section vp-dark" id="vp-difference">
            <div className="vp-wrap">
              <div className="vp-diff-head">
                <h2>Raw footage gets attention.<br />Cinematic color keeps it.</h2>
                <p className="vp-lede">
                  Watch the live video in action. Drag the slider to compare unedited flat camera log profile (Sony S-Log3) with our finished cinematic film grade.
                </p>
              </div>

              <div className="vp-cmp" style={{ "--pos": cmpPos + "%" }}>
                {/* 1. Raw Flat Camera Video (Layer 0) */}
                <video
                  ref={cmpVideoRawRef}
                  className="vp-cmp-video vp-cmp-video-raw"
                  src="https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/samples/cld-sample-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />

                {/* 2. Finished Graded Master Video (Layer 1, clipped) */}
                <div className="vp-cmp-graded-wrap">
                  <video
                    ref={cmpVideoGradedRef}
                    className="vp-cmp-video vp-cmp-video-graded"
                    src="https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/samples/cld-sample-video.mp4"
                    autoPlay
                    loop
                    muted={!cmpUnmuted}
                    playsInline
                    preload="auto"
                  />
                  <div className="vp-cmp-graded-overlay" />
                </div>

                <span className="vp-cmp-tag l">
                  <span className="vp-cmp-tag-dot raw" /> BEFORE: Raw S-Log3 Camera
                </span>
                <span className="vp-cmp-tag r">
                  <span className="vp-cmp-tag-dot graded" /> AFTER: Cinematic Master Grade
                </span>

                <div className="vp-cmp-handle" aria-hidden="true" />
                <label className="vp-sr-only" htmlFor="vp-cmpRange">Compare raw log footage and graded master edit</label>
                <input
                  id="vp-cmpRange"
                  type="range"
                  min="0"
                  max="100"
                  value={cmpPos}
                  onChange={(e) => setCmpPos(Number(e.target.value))}
                />

                {/* Sound toggle button */}
                <button
                  type="button"
                  className={`vp-cmp-sound-btn ${cmpUnmuted ? "is-unmuted" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCmpMute();
                  }}
                  title={cmpUnmuted ? "Mute audio" : "Unmute audio"}
                  aria-label={cmpUnmuted ? "Mute audio" : "Unmute audio"}
                >
                  {cmpUnmuted ? (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  )}
                  <span>{cmpUnmuted ? "Sound On" : "Sound Off"}</span>
                </button>
              </div>

              <div className="vp-cmp-presets">
                <button type="button" className={`vp-preset-btn ${cmpPos === 15 ? "active" : ""}`} onClick={() => setCmpPos(15)}>
                  Show Raw S-Log3
                </button>
                <button type="button" className={`vp-preset-btn ${cmpPos === 50 ? "active" : ""}`} onClick={() => setCmpPos(50)}>
                  50 / 50 Split
                </button>
                <button type="button" className={`vp-preset-btn ${cmpPos === 85 ? "active" : ""}`} onClick={() => setCmpPos(85)}>
                  Show Master Grade
                </button>
              </div>

              <div className="vp-pillars">
                {[
                  { title: "Intentional Directing", body: "Every shot is planned against the script. We never spray and pray on location, saving hours in post." },
                  { title: "Sound Architecture", body: "Great video is 50% audio. We record crisp multi-channel lavalier audio and build rich sound FX beds." },
                  { title: "Engineered for Reach", body: "Hook pacing and motion graphics tailored specifically for the platform algorithms where your viewers live." },
                ].map((p) => (
                  <div key={p.title}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================== TESTIMONIALS WITH CLIENT LOGOS =================== */}
          <section className="vp-section" id="vp-proof">
            <div className="vp-wrap">
              <div style={{ marginBottom: 32 }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--vp-rec)" }}>
                  Verified Client Results
                </span>
                <h2 style={{ marginTop: 8 }}>What Our Clients Say</h2>
              </div>

              <div className="vp-quotes">
                {TESTIMONIALS.map((t, idx) => (
                  <figure className="vp-quote" key={idx}>
                    <div>
                      <div className="vp-quote-stars">★★★★★</div>
                      <blockquote style={{ marginTop: 12 }}>"{t.quote}"</blockquote>
                    </div>
                    <figcaption>
                      <div className="vp-avatar-badge">{t.initials}</div>
                      <div>
                        <strong>{t.author}</strong><br />
                        <span className="vp-muted" style={{ fontSize: "0.82rem" }}>{t.role} ({t.handle})</span><br />
                        <span className="vp-quote-metric">{t.metric}</span>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* =================== FAQ =================== */}
          <section className="vp-section vp-faq" id="vp-faq">
            <div className="vp-wrap vp-faq-in">
              <div>
                <h2>Frequently Asked Questions</h2>
                <p className="vp-muted" style={{ marginTop: 12, maxWidth: "34ch" }}>
                  Got questions before locking your shoot dates? Here are the most common questions answered.
                </p>
              </div>
              <div className="vp-faq-list">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="vp-faq-item">
                    <button
                      className="vp-faq-summary"
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      {item.q}
                      <span className={`vp-faq-icon ${openFaq === i ? "open" : ""}`}>+</span>
                    </button>
                    {openFaq === i && (
                      <p className="vp-faq-body">{item.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================== QUOTE FORM =================== */}
          <section className="vp-section vp-dark" id="vp-quote" ref={quoteRef}>
            <div className="vp-wrap vp-quote-wrap">
              <div className="vp-quote-copy">
                <h2>Tell us about your project.</h2>
                <p className="vp-lede">
                  Share a few brief details and we will reply within 24 hours with schedule availability and a fixed quotation.
                </p>
                <ol className="vp-next-steps">
                  <li>
                    <div>
                      <strong>1. Brief review</strong>
                      <span>We review your requirements and follow up over WhatsApp or phone call.</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <strong>2. Production plan & quote</strong>
                      <span>You get a transparent timeline, scope, and fixed price quote.</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <strong>3. Shoot day locked</strong>
                      <span>We lock the production dates, prepare shot lists, and execute the shoot & edit.</span>
                    </div>
                  </li>
                </ol>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <a
                    className="vp-btn vp-btn-ghost"
                    href={waUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("Contact", { method: "whatsapp", placement: "quote_section" })}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 5h16v11H10l-5 4v-4H4z" />
                    </svg>
                    Prefer instant WhatsApp? Chat now
                  </a>
                </div>

                <div className="vp-contact-lines">
                  <a href={`tel:${CONFIG.phone.replace(/[^+\d]/g, "")}`} onClick={() => trackEvent("Contact", { method: "call" })}>
                    📞 {CONFIG.phone}
                  </a>
                  <a href={`mailto:${CONFIG.email}`} onClick={() => trackEvent("Contact", { method: "email" })}>
                    ✉️ {CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="vp-form-card">
                {formSubmitted ? (
                  <div className="vp-form-done">
                    <h3>✓ Request Sent!</h3>
                    <p style={{ fontSize: "1.05rem", color: "var(--vp-ink)" }}>
                      Thank you! We have logged your project brief and opened WhatsApp with your details pre-filled.
                    </p>
                    <p className="vp-muted" style={{ fontSize: "0.9rem" }}>
                      Our team will respond with availability and next steps within 24 hours.
                    </p>
                    <a
                      className="vp-btn vp-btn-primary"
                      href={waUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop: 10 }}
                    >
                      Continue to WhatsApp
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h3 style={{ fontSize: "1.35rem" }}>Book Your Shoot & Edit</h3>
                    <p className="vp-note">Takes 60 seconds. Fields marked with * are required.</p>

                    <div className="vp-form-grid">
                      <div className="vp-field">
                        <label htmlFor="vp-name">Your Name *</label>
                        <input
                          id="vp-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="e.g. Shiva / Rahul"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="vp-field">
                        <label htmlFor="vp-phone">WhatsApp Number *</label>
                        <input
                          id="vp-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="vp-field">
                        <label htmlFor="vp-business">Brand / Business Name *</label>
                        <input
                          id="vp-business"
                          name="business"
                          type="text"
                          autoComplete="organization"
                          placeholder="e.g. Vision Rainbow / Icons Gym"
                          required
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        />
                      </div>
                      <div className="vp-field">
                        <label htmlFor="vp-email">Email Address <small>(optional)</small></label>
                        <input
                          id="vp-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@brand.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="vp-field full">
                        <span style={{ fontSize: "0.88rem", fontWeight: 600 }} id="vp-lg-service">Service Scope *</span>
                        <div className="vp-seg" role="radiogroup" aria-labelledby="vp-lg-service">
                          {["Shoot + edit package", "Shoot only", "Editing only"].map((opt) => (
                            <label key={opt}>
                              <input
                                type="radio"
                                name="service"
                                value={opt}
                                checked={formData.service === opt}
                                onChange={() => setFormData({ ...formData, service: opt })}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="vp-field">
                        <label htmlFor="vp-type">What are you making? *</label>
                        <select
                          id="vp-type"
                          name="video_type"
                          required
                          value={formData.video_type}
                          onChange={(e) => setFormData({ ...formData, video_type: e.target.value })}
                        >
                          <option value="" disabled>Select video format</option>
                          <option>Instagram Reels & Shorts (9:16)</option>
                          <option>Brand Story / Company Film (16:9)</option>
                          <option>Product Video / E-Commerce</option>
                          <option>Direct Response Paid Ad Creatives</option>
                          <option>Facility / Commercial Walkthrough</option>
                          <option>Event or Founder Keynote</option>
                          <option>Other / Mixed Campaign</option>
                        </select>
                      </div>

                      <div className="vp-field">
                        <label htmlFor="vp-budget">Approximate Budget *</label>
                        <select
                          id="vp-budget"
                          name="budget"
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        >
                          <option value="" disabled>Select budget range</option>
                          <option>₹10,000 (4 Reels Package)</option>
                          <option>₹15,000 (6 Reels Package)</option>
                          <option>₹20,000 (8 Reels Package)</option>
                          <option>₹25,000+ (Custom Monthly Plan)</option>
                          <option>Let's discuss recommendations</option>
                        </select>
                      </div>

                      <div className="vp-field full">
                        <label htmlFor="vp-details">Project Details & Target Date <small>(optional)</small></label>
                        <textarea
                          id="vp-details"
                          name="details"
                          placeholder="Where is the shoot location, what is the goal of the videos, and when do you plan to shoot?"
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        />
                      </div>
                    </div>

                    <input
                      className="vp-hp"
                      type="text"
                      name="website"
                      tabIndex="-1"
                      autoComplete="off"
                      aria-hidden="true"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />

                    <div className="vp-form-foot">
                      {formError && <div className="vp-form-msg-err" role="alert">{formError}</div>}
                      <button className="vp-btn vp-btn-primary vp-btn-block" type="submit" disabled={formSubmitting}>
                        {formSubmitting ? "Submitting brief..." : "Get My Custom Quote →"}
                      </button>
                      <p className="vp-note">
                        🔒 Your contact details are kept strictly confidential. We respond within 24 hours.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* =================== FOOTER =================== */}
        <footer className="vp-footer">
          <div className="vp-wrap">
            <div className="vp-footer-in">
              <div>
                <a className="vp-brand" href="#vp-top" style={{ color: "#fff" }}>The Story Builder</a>
                <p style={{ marginTop: 12, maxWidth: "34ch", color: "var(--vp-muted-inv)", fontSize: "0.92rem" }}>
                  End-to-end video shoots and editing for businesses and personal brands that want to dominate attention.
                </p>
              </div>
              <div>
                <h4>Explore</h4>
                <ul>
                  <li><a href="#vp-client-reels" onClick={(e) => { e.preventDefault(); scrollTo("vp-client-reels"); }}>Client Reels</a></li>
                  <li><a href="#vp-package" onClick={(e) => { e.preventDefault(); scrollTo("vp-package"); }}>Packages</a></li>
                  <li><a href="#vp-process" onClick={(e) => { e.preventDefault(); scrollTo("vp-process"); }}>5-Step Process</a></li>
                  <li><a href="#vp-difference" onClick={(e) => { e.preventDefault(); scrollTo("vp-difference"); }}>Color Grade Comparison</a></li>
                  <li><a href="#vp-faq" onClick={(e) => { e.preventDefault(); scrollTo("vp-faq"); }}>FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4>Contact & Book</h4>
                <ul>
                  <li><a href={waUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("Contact", { method: "whatsapp", placement: "footer" })}>Chat on WhatsApp</a></li>
                  <li><a href={`tel:${CONFIG.phone.replace(/[^+\d]/g, "")}`}>Call {CONFIG.phone}</a></li>
                  <li><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></li>
                  <li><a href="https://instagram.com/thestorybuilder.in" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
              </div>
            </div>
            <div className="vp-footer-base">
              <span>© {new Date().getFullYear()} The Story Builder. Hyderabad, India. All rights reserved.</span>
              <span>
                <a href="/privacy" onClick={(e) => { e.preventDefault(); setPage && setPage("/privacy"); }}>
                  Privacy Policy
                </a>
                {" · "}
                <a href="/terms" onClick={(e) => { e.preventDefault(); setPage && setPage("/terms"); }}>
                  Terms of Service
                </a>
              </span>
            </div>
          </div>
        </footer>

        {/* =================== MOBILE STICKY BOTTOM BAR =================== */}
        <div className={`vp-sticky-bar ${stickyVisible ? "show" : ""}`} id="vp-stickyBar">
          <a
            className="vp-btn vp-btn-primary"
            href="#vp-quote"
            onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("CTAClick", { placement: "sticky_quote" }); }}
          >
            Get a quote
          </a>
          <a
            className="vp-btn vp-btn-ghost"
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            onClick={() => trackEvent("Contact", { method: "whatsapp", placement: "sticky" })}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 5h16v11H10l-5 4v-4H4z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
