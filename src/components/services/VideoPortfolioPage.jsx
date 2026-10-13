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
  waMessage: "Hi, I'd like a quote for a video shoot and edit.",
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
  --vp-paper: #eaebec;
  --vp-paper-2: #dcdde0;
  --vp-ink: #0f1013;
  --vp-ink-2: #1b1d22;
  --vp-ink-3: #2a2d34;
  --vp-muted: #575b64;
  --vp-muted-inv: rgba(236, 237, 239, 0.68);
  --vp-line: rgba(15, 16, 19, 0.16);
  --vp-line-inv: rgba(255, 255, 255, 0.16);
  --vp-rec: #d4281a;
  --vp-rec-hi: #e8402f;
  --vp-clip-v: #5c7cfa;
  --vp-clip-a: #3fb68b;
  --vp-clip-t: #e0a53a;
  --vp-f-display: "Archivo", "Helvetica Neue", Arial, sans-serif;
  --vp-f-body: "Instrument Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --vp-f-tc: "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --vp-wrap: 1240px;
  --vp-gut: clamp(20px, 4vw, 48px);
  --vp-sec: clamp(72px, 10vw, 136px);
  --vp-r: 3px;
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
  letter-spacing: -0.025em; line-height: 0.98;
}
.vp-root h1 { font-size: clamp(2.35rem, 5.7vw, 5.2rem); }
.vp-root h2 { font-size: clamp(1.9rem, 4.2vw, 3.5rem); font-stretch: 112%; }
.vp-root h3 { font-family: var(--vp-f-display); font-stretch: 105%; font-weight: 700; font-size: 1.25rem; letter-spacing: -0.01em; line-height: 1.2; }
.vp-lede { font-size: clamp(1.05rem, 1.5vw, 1.25rem); line-height: 1.55; color: var(--vp-muted); max-width: 46ch; }
.vp-dark .vp-lede, .vp-dark .vp-muted { color: var(--vp-muted-inv); }
.vp-muted { color: var(--vp-muted); }
.vp-tc { font-family: var(--vp-f-tc); font-variant-numeric: tabular-nums; }
.vp-note { font-size: 0.875rem; color: var(--vp-muted); }

/* Buttons */
.vp-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 52px; padding: 0 26px; border-radius: var(--vp-r);
  border: 1.5px solid transparent; cursor: pointer; text-decoration: none;
  font-weight: 600; font-size: 1rem; line-height: 1; white-space: nowrap;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
}
.vp-btn svg { width: 18px; height: 18px; flex: none; }
.vp-btn:active { transform: translateY(1px); }
.vp-btn-primary { background: var(--vp-rec); color: #fff; }
.vp-btn-primary:hover { background: var(--vp-ink); }
.vp-dark .vp-btn-primary:hover { background: var(--vp-rec-hi); }
.vp-btn-ghost { border-color: var(--vp-ink); color: var(--vp-ink); background: transparent; }
.vp-btn-ghost:hover { background: var(--vp-ink); color: var(--vp-paper); }
.vp-dark .vp-btn-ghost { border-color: rgba(255,255,255,0.5); color: #fff; }
.vp-dark .vp-btn-ghost:hover { background: #fff; color: var(--vp-ink); border-color: #fff; }
.vp-btn-block { width: 100%; }
.vp-btn[disabled] { opacity: 0.6; cursor: progress; }

/* Nav */
.vp-nav {
  position: sticky; top: 0; z-index: 60;
  background: rgba(234, 235, 236, 0.86);
  -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--vp-line);
}
.vp-nav-in { display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 24px; }
.vp-brand {
  display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
  font-family: var(--vp-f-display); font-stretch: 118%; font-weight: 800; font-size: 1.125rem; letter-spacing: -0.02em;
}
.vp-brand::before { content: ""; width: 12px; height: 12px; border-radius: 50%; background: var(--vp-rec); }
.vp-nav-links { display: flex; gap: 32px; font-size: 0.95rem; font-weight: 500; }
.vp-nav-links a { text-decoration: none; padding: 6px 0; }
.vp-nav-links a:hover { text-decoration: underline; }
.vp-nav .vp-btn { min-height: 44px; padding: 0 20px; font-size: 0.95rem; }
@media (max-width: 860px) { .vp-nav-links { display: none; } }

/* Hero */
.vp-hero { padding-top: clamp(40px, 6vw, 88px); padding-bottom: clamp(48px, 7vw, 96px); }
.vp-hero-grid {
  display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(28px, 4vw, 56px) 24px;
  margin-top: clamp(32px, 5vw, 64px); align-items: end;
}
.vp-hero-copy { grid-column: 1 / span 4; display: grid; gap: 28px; align-self: start; }
.vp-hero-copy .vp-btn-row { display: flex; flex-wrap: wrap; gap: 12px; }
.vp-hero-points { display: grid; gap: 10px; font-size: 0.95rem; font-weight: 500; }
.vp-hero-points li { display: flex; gap: 12px; align-items: baseline; padding-top: 10px; border-top: 1px solid var(--vp-line); }
.vp-hero-points li::before { content: ""; width: 8px; height: 8px; margin-top: 0.4em; border-radius: 50%; background: var(--vp-rec); flex: none; }
.vp-monitor { grid-column: 5 / span 8; }
@media (max-width: 960px) { .vp-hero-copy, .vp-monitor { grid-column: 1 / -1; } }

/* Camera Monitor */
.vp-monitor-body {
  background: #000; border-radius: 10px; padding: clamp(8px, 1.4vw, 14px);
  box-shadow: 0 50px 90px -40px rgba(15, 16, 19, 0.6), 0 0 0 1px rgba(15, 16, 19, 0.6);
}
.vp-screen { position: relative; aspect-ratio: 16 / 9; overflow: hidden; border-radius: var(--vp-r); background: var(--vp-ink); color: #fff; }
.vp-scene {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #1a1f2e 0%, #0d1117 50%, #1a1215 100%);
  display: flex; align-items: center; justify-content: center;
}
.vp-scene-inner {
  text-align: center; color: rgba(255,255,255,0.25);
  font-family: var(--vp-f-tc); font-size: clamp(0.7rem, 1.5vw, 1.1rem);
  letter-spacing: 0.15em; text-transform: uppercase;
}
.vp-screen::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.55)); }
.vp-vf { position: absolute; inset: 0; z-index: 2; pointer-events: none; font-family: var(--vp-f-tc); font-size: clamp(0.62rem, 1.1vw, 0.8rem); }
.vp-vf-corner { position: absolute; width: 5%; max-width: 30px; aspect-ratio: 1; border: 2px solid rgba(255,255,255,0.85); }
.vp-vf-corner:nth-child(1) { top: 5%; left: 3.5%; border-right: 0; border-bottom: 0; }
.vp-vf-corner:nth-child(2) { top: 5%; right: 3.5%; border-left: 0; border-bottom: 0; }
.vp-vf-corner:nth-child(3) { bottom: 5%; left: 3.5%; border-right: 0; border-top: 0; }
.vp-vf-corner:nth-child(4) { bottom: 5%; right: 3.5%; border-left: 0; border-top: 0; }
.vp-vf-top, .vp-vf-bottom { position: absolute; left: 9%; right: 9%; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.04em; }
.vp-vf-top { top: 7%; }
.vp-vf-bottom { bottom: 7%; gap: 12px; }
.vp-vf-bottom span { opacity: 0.9; }
.vp-rec-badge { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; }
.vp-rec-badge::before { content: ""; width: 0.8em; height: 0.8em; border-radius: 50%; background: #ff3b2f; animation: vp-blink 1.6s steps(1) infinite; }
@keyframes vp-blink { 50% { opacity: 0.15; } }

/* Proofbar */
.vp-proofbar { border-block: 1px solid var(--vp-line); }
.vp-proofbar-in { display: grid; grid-template-columns: minmax(150px, 0.8fr) repeat(5, 1fr); align-items: stretch; }
.vp-proofbar-title { padding: 28px 24px 28px 0; font-size: 0.9rem; font-weight: 500; color: var(--vp-muted); display: flex; align-items: center; }
.vp-logo-slot { display: grid; place-items: center; padding: 28px 12px; border-left: 1px solid var(--vp-line); font-size: 0.8rem; color: var(--vp-muted); text-align: center; }
@media (max-width: 860px) {
  .vp-proofbar-in { grid-template-columns: repeat(3, 1fr); }
  .vp-proofbar-title { grid-column: 1 / -1; padding-bottom: 0; }
  .vp-logo-slot { border-left: 0; border-top: 1px solid var(--vp-line); margin-top: 16px; }
}

/* Package / Split */
.vp-split { display: grid; grid-template-columns: repeat(12, 1fr); gap: 40px 24px; }
.vp-split-head { grid-column: 1 / span 4; align-self: start; position: sticky; top: 108px; display: grid; gap: 20px; }
.vp-split-body { grid-column: 6 / span 7; }
@media (max-width: 960px) { .vp-split-head, .vp-split-body { grid-column: 1 / -1; position: static; } }
.vp-ledger > div { display: grid; grid-template-columns: minmax(130px, 0.8fr) 2fr; gap: 12px 28px; padding: 28px 0; border-top: 1px solid var(--vp-ink); }
.vp-ledger > div:last-child { border-bottom: 1px solid var(--vp-ink); }
.vp-ledger h3 { font-size: 1.15rem; }
.vp-ledger p { color: var(--vp-muted); }
.vp-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.vp-chips li { padding: 5px 12px; border: 1px solid var(--vp-line); border-radius: 99px; font-size: 0.85rem; font-weight: 500; }
@media (max-width: 560px) { .vp-ledger > div { grid-template-columns: 1fr; } }
.vp-tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: clamp(48px, 7vw, 88px); align-items: stretch; }
.vp-tier { display: grid; align-content: start; gap: 18px; padding: 32px 28px; border: 1px solid var(--vp-ink); border-radius: var(--vp-r); background: transparent; position: relative; }
.vp-tier h3 { font-size: 1.4rem; font-family: var(--vp-f-display); }
.vp-tier .vp-price { font-family: var(--vp-f-display); font-stretch: 112%; font-weight: 800; font-size: 2rem; letter-spacing: -0.03em; }
.vp-tier .vp-price small { font-family: var(--vp-f-body); font-stretch: 100%; font-weight: 500; font-size: 0.85rem; letter-spacing: 0; color: var(--vp-muted); margin-left: 6px; }
.vp-tier ul { display: grid; gap: 10px; font-size: 0.95rem; }
.vp-tier li { display: flex; gap: 10px; }
.vp-tier li::before { content: ""; flex: none; width: 14px; height: 8px; margin-top: 0.5em; border-left: 2px solid var(--vp-rec); border-bottom: 2px solid var(--vp-rec); transform: rotate(-45deg) scale(0.9); }
.vp-tier .vp-btn { margin-top: 8px; }
.vp-tier-featured { background: var(--vp-ink); color: #eceef0; border-color: var(--vp-ink); transform: translateY(-14px); padding-block: 40px; }
.vp-tier-featured .vp-price small { color: var(--vp-muted-inv); }
.vp-tier-flag { position: absolute; top: -1px; right: 24px; transform: translateY(-50%); background: var(--vp-rec); color: #fff; padding: 4px 12px; font-size: 0.78rem; font-weight: 600; border-radius: var(--vp-r); }
.vp-tier-featured .vp-btn-ghost { border-color: rgba(255,255,255,0.5); color: #fff; }
.vp-tier-featured .vp-btn-ghost:hover { background: #fff; color: var(--vp-ink); }
@media (max-width: 960px) { .vp-tiers { grid-template-columns: 1fr; } .vp-tier-featured { transform: none; padding-block: 32px; } }

/* Work grid */
.vp-work-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 24px; }
.vp-work-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 12px; margin-top: 48px; }
.vp-tile {
  position: relative; display: block; width: 100%; padding: 0; border: 0; border-radius: var(--vp-r); overflow: hidden;
  cursor: pointer; text-align: left; color: #fff; background: var(--vp-ink-3);
}
.vp-tile-a { grid-column: 1; grid-row: 1; aspect-ratio: 16 / 9; }
.vp-tile-d { grid-column: 1; grid-row: 2; aspect-ratio: 16 / 9; }
.vp-tile-b { grid-column: 2; grid-row: 1 / span 2; }
.vp-tile-c { grid-column: 3; grid-row: 1 / span 2; }
.vp-tile-bg { position: absolute; inset: 0; transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1); }
.vp-tile:hover .vp-tile-bg { transform: scale(1.04); }
.vp-tile::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.78), transparent 55%); }
.vp-tile-meta { position: absolute; z-index: 1; left: 20px; right: 20px; bottom: 18px; display: grid; gap: 2px; }
.vp-tile-meta strong { font-family: var(--vp-f-display); font-stretch: 105%; font-weight: 700; font-size: 1.05rem; }
.vp-tile-meta span { font-size: 0.85rem; color: rgba(255,255,255,0.75); }
.vp-tile-dur { position: absolute; z-index: 1; top: 14px; right: 14px; padding: 3px 8px; background: rgba(0,0,0,0.6); border-radius: 2px; font-size: 0.75rem; font-family: var(--vp-f-tc); }
.vp-tile-play {
  position: absolute; z-index: 1; left: 50%; top: 46%; width: 56px; aspect-ratio: 1; transform: translate(-50%, -50%);
  display: grid; place-items: center; border: 1.5px solid rgba(255,255,255,0.8); border-radius: 50%;
  background: rgba(15,16,19,0.3); transition: transform 0.25s, background-color 0.25s, border-color 0.25s;
}
.vp-tile-play svg { width: 18px; margin-left: 2px; }
.vp-tile:hover .vp-tile-play { transform: translate(-50%, -50%) scale(1.08); background: var(--vp-rec); border-color: var(--vp-rec); }
.vp-work-foot { margin-top: 40px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; padding-top: 28px; border-top: 1px solid var(--vp-line-inv); }
.vp-work-foot p { font-family: var(--vp-f-display); font-stretch: 110%; font-weight: 700; font-size: clamp(1.2rem, 2.2vw, 1.7rem); letter-spacing: -0.02em; }
@media (max-width: 760px) {
  .vp-work-grid { grid-template-columns: 1fr 1fr; }
  .vp-tile-a, .vp-tile-d { grid-column: 1 / -1; grid-row: auto; }
  .vp-tile-b, .vp-tile-c { grid-column: auto; grid-row: auto; aspect-ratio: 9 / 16; }
}

/* Video Dialog */
.vp-player-overlay {
  position: fixed; inset: 0; z-index: 200; background: rgba(8,8,10,0.86);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.vp-player-box { position: relative; width: min(960px, 94vw); border-radius: var(--vp-r); background: #000; overflow: hidden; }
.vp-player-stage { aspect-ratio: 16/9; display: grid; place-items: center; }
.vp-player-stage iframe, .vp-player-stage video { width: 100%; height: 100%; border: 0; }
.vp-player-close { position: absolute; z-index: 2; top: 10px; right: 10px; width: 40px; height: 40px; border-radius: 50%; border: 0; background: rgba(0,0,0,0.7); color: #fff; font-size: 1.4rem; cursor: pointer; line-height: 1; display: flex; align-items: center; justify-content: center; }

/* Process timeline */
.vp-process-head { display: grid; gap: 16px; max-width: 760px; }
.vp-tl { position: relative; margin-top: clamp(40px, 6vw, 72px); }
.vp-tl-ruler { height: 30px; border-bottom: 1px solid var(--vp-ink); background: repeating-linear-gradient(90deg, var(--vp-line) 0 1px, transparent 1px 24px) left bottom / 100% 9px no-repeat; position: relative; }
.vp-tl-ruler span { position: absolute; top: 0; font-size: 0.7rem; color: var(--vp-muted); transform: translateX(-50%); }
.vp-tl-ruler span:first-child { transform: none; }
.vp-tl-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.vp-tl-v { margin-top: 12px; }
.vp-clip {
  height: 66px; padding: 10px 14px; border-radius: var(--vp-r); color: #fff; font-weight: 600; display: flex; align-items: flex-end;
  background: var(--vp-clip-v); opacity: 0.35; transition: opacity 0.4s; font-size: 0.95rem;
}
.vp-clip.t-shoot { background: var(--vp-clip-a); }
.vp-clip.t-edit { background: var(--vp-clip-t); color: var(--vp-ink); }
.vp-clip.is-passed { opacity: 1; }
.vp-tl-a { margin-top: 6px; height: 46px; border-radius: var(--vp-r); background: var(--vp-ink-2); display: flex; align-items: center; gap: 2px; padding: 0 8px; overflow: hidden; }
.vp-tl-a i { flex: 1; min-width: 1px; background: var(--vp-clip-a); border-radius: 1px; opacity: 0.8; display: block; }
.vp-steps { margin-top: 20px; }
.vp-step { padding: 4px 14px 4px 0; color: var(--vp-muted); transition: color 0.4s; }
.vp-step h3 { margin-bottom: 8px; color: inherit; }
.vp-step p { font-size: 0.95rem; }
.vp-step.is-passed { color: var(--vp-ink); }
.vp-step.is-passed p { color: var(--vp-muted); }
@media (max-width: 760px) {
  .vp-tl-ruler, .vp-tl-a, .vp-tl-v { display: none; }
  .vp-tl-grid { grid-template-columns: 1fr; gap: 0; }
  .vp-steps { margin-top: 0; }
  .vp-step { padding: 18px 0 18px 18px; border-left: 3px solid var(--vp-rec); color: var(--vp-ink); }
}

/* Compare slider */
.vp-diff-head { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px 24px; align-items: end; margin-bottom: 48px; }
.vp-diff-head h2 { grid-column: 1 / span 7; }
.vp-diff-head p { grid-column: 9 / span 4; }
@media (max-width: 860px) { .vp-diff-head h2, .vp-diff-head p { grid-column: 1 / -1; } }
.vp-cmp { --pos: 50%; position: relative; aspect-ratio: 16/9; overflow: hidden; border-radius: var(--vp-r); background: var(--vp-ink-2); touch-action: pan-y; }
.vp-cmp-raw { position: absolute; inset: 0; background: linear-gradient(135deg, #1a1f2e 0%, #0d1117 50%, #1a1215 100%); filter: grayscale(0.6) contrast(0.7) brightness(1.18) saturate(0.7); }
.vp-cmp-graded { position: absolute; inset: 0; background: linear-gradient(135deg, #1a2030 0%, #0d1117 50%, #1a1215 100%); filter: contrast(1.2) saturate(1.3) brightness(0.92); clip-path: inset(0 0 0 var(--pos)); }
.vp-cmp-graded::after { content: ""; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(0,110,130,0.22), rgba(255,120,40,0.18)); mix-blend-mode: soft-light; }
.vp-cmp-tag { position: absolute; z-index: 2; top: 16px; padding: 6px 12px; background: rgba(0,0,0,0.65); border-radius: 2px; font-size: 0.85rem; font-weight: 500; color: #fff; }
.vp-cmp-tag.l { left: 16px; }
.vp-cmp-tag.r { right: 16px; }
.vp-cmp-handle { position: absolute; z-index: 2; top: 0; bottom: 0; left: var(--pos); width: 2px; background: #fff; pointer-events: none; }
.vp-cmp-handle::after { content: ""; position: absolute; top: 50%; left: 50%; width: 48px; height: 48px; transform: translate(-50%, -50%); border-radius: 50%; background: #fff; box-shadow: 0 4px 18px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; }
.vp-cmp input[type="range"] { position: absolute; z-index: 3; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize; }
.vp-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
.vp-pillars > div { padding-top: 20px; border-top: 1px solid var(--vp-line-inv); display: grid; gap: 8px; align-content: start; }
.vp-pillars p { color: var(--vp-muted-inv); font-size: 0.95rem; }
@media (max-width: 760px) { .vp-pillars { grid-template-columns: 1fr; } }

/* Testimonials */
.vp-quotes { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(32px, 6vw, 80px); }
.vp-quote { display: grid; gap: 24px; align-content: start; padding-top: 28px; border-top: 1px solid var(--vp-ink); }
.vp-quote blockquote { font-family: var(--vp-f-display); font-stretch: 105%; font-weight: 600; font-size: clamp(1.3rem, 2.3vw, 1.85rem); line-height: 1.25; letter-spacing: -0.015em; }
.vp-quote figcaption { display: flex; gap: 14px; align-items: center; font-size: 0.95rem; }
.vp-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--vp-paper-2); border: 1px dashed var(--vp-muted); flex: none; }
@media (max-width: 760px) { .vp-quotes { grid-template-columns: 1fr; } }

/* FAQ */
.vp-faq { background: var(--vp-paper-2); }
.vp-faq-in { display: grid; grid-template-columns: repeat(12, 1fr); gap: 40px 24px; }
.vp-faq-in h2 { grid-column: 1 / span 4; align-self: start; }
.vp-faq-list { grid-column: 6 / span 7; }
@media (max-width: 960px) { .vp-faq-in h2, .vp-faq-list { grid-column: 1 / -1; } }
.vp-faq-item { border-top: 1px solid var(--vp-ink); }
.vp-faq-item:last-child { border-bottom: 1px solid var(--vp-ink); }
.vp-faq-summary {
  cursor: pointer; padding: 22px 40px 22px 0; position: relative;
  font-family: var(--vp-f-display); font-stretch: 105%; font-weight: 700; font-size: 1.15rem;
  letter-spacing: -0.01em; display: flex; align-items: center; justify-content: space-between;
  background: none; border: none; width: 100%; text-align: left; color: var(--vp-ink);
}
.vp-faq-icon { font-size: 1.4rem; font-weight: 300; flex: none; transition: transform 0.25s; }
.vp-faq-icon.open { transform: rotate(45deg); }
.vp-faq-body { padding: 0 40px 24px 0; color: var(--vp-muted); max-width: 60ch; font-size: 0.95rem; }

/* Quote form */
.vp-quote-wrap { display: grid; grid-template-columns: repeat(12, 1fr); gap: 48px 24px; align-items: start; }
.vp-quote-copy { grid-column: 1 / span 5; display: grid; gap: 28px; }
.vp-next-steps { display: grid; gap: 0; counter-reset: s; }
.vp-next-steps li { counter-increment: s; display: grid; grid-template-columns: 36px 1fr; gap: 6px; padding: 16px 0; border-top: 1px solid var(--vp-line-inv); }
.vp-next-steps li::before { content: counter(s); font-family: var(--vp-f-tc); color: #ff6a5c; }
.vp-next-steps strong { display: block; font-weight: 600; }
.vp-next-steps span { color: var(--vp-muted-inv); font-size: 0.95rem; }
.vp-contact-lines { display: grid; gap: 6px; font-size: 0.95rem; }
.vp-form-card { grid-column: 7 / span 6; background: var(--vp-paper); color: var(--vp-ink); border-radius: 6px; padding: clamp(24px, 3.4vw, 44px); }
@media (max-width: 960px) { .vp-quote-copy, .vp-form-card { grid-column: 1 / -1; } }
.vp-form-card h3 { font-size: 1.5rem; margin-bottom: 4px; font-family: var(--vp-f-display); }
.vp-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 24px; }
.vp-field { display: grid; gap: 6px; align-content: start; }
.vp-field.full { grid-column: 1 / -1; }
@media (max-width: 560px) { .vp-form-grid { grid-template-columns: 1fr; } }
.vp-field label { font-size: 0.875rem; font-weight: 600; }
.vp-field label small { font-weight: 400; color: var(--vp-muted); }
.vp-field input[type="text"], .vp-field input[type="tel"], .vp-field input[type="email"],
.vp-field select, .vp-field textarea {
  width: 100%; min-height: 50px; padding: 12px 14px;
  border: 1px solid rgba(15,16,19,0.3); border-radius: var(--vp-r);
  background: #f6f6f7; transition: border-color 0.2s, box-shadow 0.2s; font-size: 1rem;
}
.vp-field textarea { min-height: 112px; resize: vertical; }
.vp-field select { appearance: none; padding-right: 38px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%230f1013' stroke-width='2'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; }
.vp-field input:focus, .vp-field select:focus, .vp-field textarea:focus { outline: none; border-color: var(--vp-rec); box-shadow: 0 0 0 3px rgba(212,40,26,0.18); }
.vp-seg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.vp-seg label { position: relative; font-weight: 500; font-size: 0.875rem; }
.vp-seg input { position: absolute; opacity: 0; inset: 0; }
.vp-seg span { display: grid; place-items: center; min-height: 50px; padding: 6px 10px; text-align: center; font-size: 0.9rem; line-height: 1.2; border: 1px solid rgba(15,16,19,0.3); border-radius: var(--vp-r); background: #f6f6f7; cursor: pointer; transition: background-color 0.2s, color 0.2s, border-color 0.2s; }
.vp-seg input:checked + span { background: var(--vp-ink); color: #fff; border-color: var(--vp-ink); }
.vp-hp { position: absolute; left: -9999px; }
.vp-form-foot { display: grid; gap: 12px; margin-top: 8px; }
.vp-form-msg-err { padding: 14px 16px; border-radius: var(--vp-r); font-size: 0.95rem; background: #f8dcd8; color: #7a1a10; margin-bottom: 8px; }
.vp-form-done { text-align: left; display: grid; gap: 16px; }
.vp-form-done h3 { font-family: var(--vp-f-display); font-size: 1.5rem; }

/* Footer */
.vp-footer { background: var(--vp-ink); color: #eceef0; padding-block: 56px 40px; border-top: 1px solid var(--vp-line-inv); }
.vp-footer-in { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
.vp-footer h4 { font-size: 0.9rem; font-weight: 600; margin: 0 0 12px; color: var(--vp-muted-inv); }
.vp-footer li { margin-bottom: 8px; }
.vp-footer a { text-decoration: none; color: inherit; }
.vp-footer a:hover { text-decoration: underline; text-underline-offset: 3px; }
.vp-footer-base { margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--vp-line-inv); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; font-size: 0.85rem; color: var(--vp-muted-inv); }
@media (max-width: 760px) { .vp-footer-in { grid-template-columns: 1fr 1fr; } .vp-footer-in > :first-child { grid-column: 1 / -1; } }

/* Mobile sticky bar */
.vp-sticky-bar {
  position: fixed; z-index: 70; left: 0; right: 0; bottom: 0; display: none; gap: 8px; padding: 10px 20px calc(10px + env(safe-area-inset-bottom));
  background: rgba(15,16,19,0.94); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  transform: translateY(110%); transition: transform 0.3s;
}
.vp-sticky-bar.show { transform: none; }
.vp-sticky-bar .vp-btn { flex: 1; min-height: 48px; padding: 0 12px; }
@media (max-width: 760px) { .vp-sticky-bar { display: flex; } }
`;

const WAVE_BARS = Array.from({ length: 110 }, (_, i) => {
  const h = 18 + Math.abs(Math.sin(i * 0.55) * 52 + Math.sin(i * 1.7) * 26);
  return Math.min(92, h);
});

const WORK_TILES = [
  { cls: "vp-tile-a", dur: "0:45", title: "Brand Story Film", cat: "Brand film", embed: "" },
  { cls: "vp-tile-b", dur: "0:22", title: "Short-form Reel", cat: "Reels & ads", embed: "" },
  { cls: "vp-tile-c", dur: "0:18", title: "Product Video", cat: "Product video", embed: "" },
  { cls: "vp-tile-d", dur: "1:10", title: "Corporate Video", cat: "Business video", embed: "" },
];

const TILE_GRADIENTS = [
  "radial-gradient(circle at 40% 30%, #3a4a6a, transparent 55%), linear-gradient(170deg, #1a2030, #0d1117)",
  "radial-gradient(circle at 30% 25%, #7d5a4a, transparent 55%), linear-gradient(170deg, #3a2f3f, #14131a)",
  "radial-gradient(circle at 70% 30%, #3f6f7a, transparent 55%), linear-gradient(170deg, #1f2c3a, #0f1118)",
  "radial-gradient(circle at 60% 40%, #8a6a3a, transparent 50%), linear-gradient(160deg, #2c2a33, #121217)",
];

const FAQ_ITEMS = [
  { q: "How much does a shoot and edit cost?", a: "It depends on the number of videos, shoot days and location. Packages start at ₹30,000. Send a short brief and we'll reply with a fixed quote, so there are no surprises later." },
  { q: "How long does it take?", a: "Most projects shoot within a week of confirmation. The first cut is ready 5 to 7 working days after the shoot, depending on length and complexity." },
  { q: "Do I need a script or idea ready?", a: "No. Bring your goal and your product or service. We help with concept, script and shot list before the shoot day." },
  { q: "Can you shoot outside Hyderabad?", a: "Yes. We travel across India. Travel and stay costs are quoted upfront." },
  { q: "How many revisions are included?", a: "Two rounds of changes on every edited video. Send feedback in one list per round so we can turn it around quickly. Extra rounds are quoted separately." },
  { q: "Can you edit footage I've already shot?", a: "Yes. Choose 'Editing only' in the quote form and tell us what you have. We'll review it and quote the edit." },
  { q: "Who owns the final videos?", a: "You do. Once the project is paid, the final videos are yours to use on any channel. Raw footage is available on request." },
];

export default function VideoPortfolioPage({ setPage }) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playerEmbed, setPlayerEmbed] = useState(null);
  const [playerVideo, setPlayerVideo] = useState(null);
  const [cmpPos, setCmpPos] = useState(50);
  const [openFaq, setOpenFaq] = useState(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", business: "", email: "", service: "Shoot + edit package", video_type: "", budget: "", details: "", website: "" });
  const [formError, setFormError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [tlProgress, setTlProgress] = useState(0);
  const [timecode, setTimecode] = useState("01:00:00:00");
  const tlRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView("/video-portfolio");
  }, []);

  // Timecode animation
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

  // Timeline scroll animation
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
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  // Sticky bar
  useEffect(() => {
    const update = () => {
      if (!quoteRef.current) { setStickyVisible(window.scrollY > 600); return; }
      const r = quoteRef.current.getBoundingClientRect();
      const nearForm = r.top < window.innerHeight && r.bottom > 0;
      setStickyVisible(window.scrollY > 600 && !nearForm);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openTile = (tile) => {
    if (tile.embed) { setPlayerEmbed(tile.embed); setPlayerVideo(null); }
    else { setPlayerEmbed(null); setPlayerVideo(null); }
    setPlayerOpen(true);
    trackEvent("VideoPlay", { placement: "work_tile", title: tile.title });
  };

  const closePlayer = () => { setPlayerOpen(false); setPlayerEmbed(null); setPlayerVideo(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!formData.name.trim()) { setFormError("Please enter your name."); return; }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) { setFormError("Please enter a valid WhatsApp number."); return; }
    if (!formData.business.trim()) { setFormError("Please enter your business name."); return; }
    if (!formData.video_type) { setFormError("Please select what you are making."); return; }
    if (!formData.budget) { setFormError("Please select an approximate budget."); return; }
    if (formData.website) return; // honeypot

    setFormSubmitting(true);

    const summary =
      "Hi, I'd like a quote.\n" +
      "Name: " + formData.name + "\n" +
      "Business: " + formData.business + "\n" +
      "Need: " + formData.service + "\n" +
      "Making: " + formData.video_type + "\n" +
      "Budget: " + formData.budget +
      (formData.details ? "\nDetails: " + formData.details : "");

    trackLead({ content_name: "Video Portfolio Quote Request", service: formData.service });

    // WhatsApp fallback submission
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
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="vp-root" id="vp-top">

        {/* =================== NAV =================== */}
        <header className="vp-nav">
          <div className="vp-wrap vp-nav-in">
            <a className="vp-brand" href="#vp-top" aria-label="The Story Builder home">
              The Story Builder
            </a>
            <nav className="vp-nav-links" aria-label="Primary">
              <a href="#vp-package" onClick={(e) => { e.preventDefault(); scrollTo("vp-package"); }}>Package</a>
              <a href="#vp-work" onClick={(e) => { e.preventDefault(); scrollTo("vp-work"); }}>Work</a>
              <a href="#vp-process" onClick={(e) => { e.preventDefault(); scrollTo("vp-process"); }}>Process</a>
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
              <h1>Shot by one crew.<br />Cut by the same team.</h1>
              <div className="vp-hero-grid">
                <div className="vp-hero-copy">
                  <p className="vp-lede">
                    Video shoots and editing in one package. Brief us once and get finished
                    videos built for Reels, YouTube and your ads.
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
                    <li>Crew based in Hyderabad, shooting across India</li>
                    <li>First cut within 5 to 7 working days of the shoot</li>
                    <li>Two revision rounds included</li>
                  </ul>
                </div>

                {/* Camera monitor mockup */}
                <figure className="vp-monitor">
                  <div className="vp-monitor-body">
                    <div className="vp-screen">
                      <div className="vp-scene">
                        <div className="vp-scene-inner">
                          <div style={{ fontSize: "clamp(2rem, 5vw, 4rem)", marginBottom: 8, opacity: 0.3 }}>🎬</div>
                          <div>SHOWREEL PLACEHOLDER</div>
                        </div>
                      </div>
                      {/* Viewfinder overlay */}
                      <div className="vp-vf" aria-hidden="true">
                        <span className="vp-vf-corner" />
                        <span className="vp-vf-corner" />
                        <span className="vp-vf-corner" />
                        <span className="vp-vf-corner" />
                        <div className="vp-vf-top">
                          <span className="vp-rec-badge vp-tc">REC</span>
                          <span className="vp-tc">{timecode}</span>
                        </div>
                        <div className="vp-vf-bottom">
                          <span className="vp-tc">4K 24p</span>
                          <span className="vp-tc">f/2.8</span>
                          <span className="vp-tc">ISO 800</span>
                          <span className="vp-tc">5600K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <figcaption style={{ marginTop: 12, fontSize: "0.85rem", color: "var(--vp-muted)" }}>
                    Showreel placeholder. Replace with your best 30-second cut.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* =================== PROOFBAR =================== */}
          <section className="vp-proofbar" aria-label="Clients">
            <div className="vp-wrap vp-proofbar-in">
              <p className="vp-proofbar-title">Brands we make videos for</p>
              {["Client logo", "Client logo", "Client logo", "Client logo", "Client logo"].map((txt, i) => (
                <div key={i} className="vp-logo-slot">{txt}</div>
              ))}
            </div>
          </section>

          {/* =================== PACKAGE =================== */}
          <section className="vp-section" id="vp-package">
            <div className="vp-wrap">
              <div className="vp-split">
                <div className="vp-split-head">
                  <h2>One brief. One crew. Finished videos.</h2>
                  <p className="vp-lede">
                    You don't hire a videographer, then hunt for an editor, then chase both.
                    We plan it, shoot it and edit it, so the footage is shot with the final cut in mind.
                  </p>
                </div>
                <div className="vp-split-body">
                  <dl className="vp-ledger">
                    {[
                      {
                        title: "Before the shoot",
                        desc: "We learn your goal, plan the story and lock the shot list, so shoot day runs on schedule.",
                        chips: ["Brief call", "Concept and script", "Shot list", "Schedule"],
                      },
                      {
                        title: "On shoot day",
                        desc: "A trained crew with cinema cameras, lighting and clean audio, directing on set at your location or ours.",
                        chips: ["On-location filming", "Product shots", "Business videos", "Promotional videos", "Cinematic camera work"],
                      },
                      {
                        title: "In the edit",
                        desc: "Every cut is paced for the platform it's going on, then graded and sound-designed to feel finished.",
                        chips: ["Pacing and story", "Colour grading", "Sound design", "Subtitles", "Motion graphics"],
                      },
                      {
                        title: "At delivery",
                        desc: "Files exported in the sizes your channels and ad accounts need, with revisions included.",
                        chips: ["Reels and Shorts 9:16", "YouTube 16:9", "Feed 4:5 and 1:1", "Two revision rounds"],
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

              {/* Pricing tiers */}
              <div className="vp-tiers">
                <article className="vp-tier">
                  <h3>Single video</h3>
                  <p className="vp-price">₹30,000 <small>starting from</small></p>
                  <ul>
                    <li>One shoot day, up to 4 hours</li>
                    <li>One edited video up to 60 seconds</li>
                    <li>Colour grade, music and subtitles</li>
                    <li>Two revision rounds</li>
                  </ul>
                  <a className="vp-btn vp-btn-ghost" href="#vp-quote" onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("PackageSelect", { package: "Single video" }); }}>Ask about this</a>
                </article>

                <article className="vp-tier vp-tier-featured">
                  <span className="vp-tier-flag">Best value</span>
                  <h3>Content month</h3>
                  <p className="vp-price">₹75,000 <small>starting from</small></p>
                  <ul>
                    <li>One full shoot day</li>
                    <li>6 to 8 short videos for Reels and ads</li>
                    <li>Hooks, captions and platform exports</li>
                    <li>Two revision rounds per video</li>
                  </ul>
                  <a className="vp-btn vp-btn-primary" href="#vp-quote" onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("PackageSelect", { package: "Content month" }); }}>Ask about this</a>
                </article>

                <article className="vp-tier">
                  <h3>Campaign</h3>
                  <p className="vp-price">Custom quote</p>
                  <ul>
                    <li>Multi-day shoot, crew and locations</li>
                    <li>Hero film plus cutdowns for every channel</li>
                    <li>Script, storyboard and direction</li>
                    <li>Dedicated producer</li>
                  </ul>
                  <a className="vp-btn vp-btn-ghost" href="#vp-quote" onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("PackageSelect", { package: "Campaign" }); }}>Ask about this</a>
                </article>
              </div>
            </div>
          </section>

          {/* =================== WORK =================== */}
          <section className="vp-section vp-dark" id="vp-work">
            <div className="vp-wrap">
              <div className="vp-work-head">
                <h2>Less talk.<br />More frame.</h2>
                <p className="vp-lede">Real projects from real briefs. Tap any tile to watch.</p>
              </div>
              <div className="vp-work-grid">
                {WORK_TILES.map((tile, i) => (
                  <button
                    key={i}
                    className={`vp-tile ${tile.cls}`}
                    type="button"
                    onClick={() => openTile(tile)}
                    aria-label={`Watch ${tile.title}`}
                  >
                    <span className="vp-tile-bg" style={{ background: TILE_GRADIENTS[i] }} />
                    <span className="vp-tile-play">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M6 3.5v17l14-8.5z" />
                      </svg>
                    </span>
                    <span className="vp-tile-dur vp-tc">{tile.dur}</span>
                    <span className="vp-tile-meta">
                      <strong>{tile.title}</strong>
                      <span>{tile.cat}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="vp-work-foot">
                <p>Your project could be next.</p>
                <a
                  className="vp-btn vp-btn-primary"
                  href="#vp-quote"
                  onClick={(e) => { e.preventDefault(); scrollTo("vp-quote"); trackEvent("CTAClick", { placement: "work_quote" }); }}
                >
                  Get my video quote
                </a>
              </div>
            </div>
          </section>

          {/* Video player overlay */}
          {playerOpen && (
            <div className="vp-player-overlay" onClick={closePlayer}>
              <div className="vp-player-box" onClick={(e) => e.stopPropagation()}>
                <button className="vp-player-close" type="button" onClick={closePlayer} aria-label="Close video">×</button>
                <div className="vp-player-stage">
                  {playerEmbed ? (
                    <iframe
                      src={playerEmbed + (playerEmbed.includes("?") ? "&" : "?") + "autoplay=1"}
                      allow="autoplay; fullscreen; picture-in-picture"
                      title="Video"
                    />
                  ) : (
                    <p style={{ color: "#fff", textAlign: "center", padding: "40px 24px" }}>
                      Video placeholder.<br />
                      <span style={{ opacity: 0.7 }}>Add a YouTube embed URL to this tile.</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =================== PROCESS =================== */}
          <section className="vp-section" id="vp-process">
            <div className="vp-wrap">
              <div className="vp-process-head">
                <h2>Simple process. Serious execution.</h2>
                <p className="vp-lede">Five steps from first call to final files. You always know what happens next.</p>
              </div>

              <div className="vp-tl" ref={tlRef}>
                <div className="vp-tl-ruler" aria-hidden="true">
                  <span style={{ left: 0 }}>0</span>
                  <span style={{ left: "20%" }}>Day 1</span>
                  <span style={{ left: "40%" }}>Day 3</span>
                  <span style={{ left: "60%" }}>Day 7</span>
                  <span style={{ left: "80%" }}>Day 12</span>
                </div>
                <div className="vp-tl-grid vp-tl-v" aria-hidden="true">
                  {[
                    { label: "Discuss", className: "" },
                    { label: "Plan", className: "" },
                    { label: "Shoot", className: "t-shoot" },
                    { label: "Edit", className: "t-edit" },
                    { label: "Deliver", className: "" },
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
                    { title: "Discuss", body: "A short call about your goal, audience, deliverables and budget." },
                    { title: "Plan", body: "We align on story, visual direction, schedule and scope before anything is shot." },
                    { title: "Shoot", body: "Crew on location with camera, lighting and sound. You direct the brand, we direct the frame." },
                    { title: "Edit", body: "Cut, grade and sound design. You review a first cut and send consolidated feedback." },
                    { title: "Deliver", body: "Final files for every platform, with the agreed revisions done." },
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

          {/* =================== DIFFERENCE =================== */}
          <section className="vp-section vp-dark" id="vp-difference">
            <div className="vp-wrap">
              <div className="vp-diff-head">
                <h2>Good footage gets attention. Great execution keeps it.</h2>
                <p className="vp-lede">Drag to compare raw footage with the finished edit.</p>
              </div>

              <div className="vp-cmp" style={{ "--pos": cmpPos + "%" }}>
                <div className="vp-cmp-raw" />
                <div className="vp-cmp-graded" />
                <span className="vp-cmp-tag l">Raw footage</span>
                <span className="vp-cmp-tag r">Finished edit</span>
                <div className="vp-cmp-handle" aria-hidden="true" />
                <label className="vp-sr-only" htmlFor="vp-cmpRange">Compare raw footage and finished edit</label>
                <input
                  id="vp-cmpRange"
                  type="range"
                  min="0"
                  max="100"
                  value={cmpPos}
                  onChange={(e) => setCmpPos(Number(e.target.value))}
                />
              </div>

              <div className="vp-pillars">
                {[
                  { title: "Intentional shooting", body: "Every shot is planned against the script, so nothing is filmed just in case." },
                  { title: "Thoughtful editing", body: "Pace, sound and colour are decided for the platform the video will run on." },
                  { title: "Finished to perform", body: "Delivered in the sizes, captions and formats your channels and ads need." },
                ].map((p) => (
                  <div key={p.title}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================== TESTIMONIALS =================== */}
          <section className="vp-section" id="vp-proof">
            <div className="vp-wrap">
              <div className="vp-quotes">
                <figure className="vp-quote">
                  <blockquote>"Working with The Story Builder was seamless. They shot and delivered our brand film within 10 days and it's become our best-performing piece of content."</blockquote>
                  <figcaption>
                    <span className="vp-avatar" aria-hidden="true" />
                    <span>
                      <strong>Priya Reddy</strong><br />
                      <span className="vp-muted">Founder, D2C Brand</span>
                    </span>
                  </figcaption>
                </figure>
                <figure className="vp-quote">
                  <blockquote>"One brief, one call, and they handled everything. The edit quality is cinematic — exactly the kind of content our agency clients expect."</blockquote>
                  <figcaption>
                    <span className="vp-avatar" aria-hidden="true" />
                    <span>
                      <strong>Arjun Mehta</strong><br />
                      <span className="vp-muted">Creative Director, Agency</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* =================== FAQ =================== */}
          <section className="vp-section vp-faq" id="vp-faq">
            <div className="vp-wrap vp-faq-in">
              <h2>Questions before you book</h2>
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
                <h2>Tell us what you're making.</h2>
                <p className="vp-lede">Share a few details and we'll reply within one working day with next steps and a quote.</p>
                <ol className="vp-next-steps">
                  <li>
                    <div>
                      <strong>We read your brief</strong>
                      <span>And message you on WhatsApp or call, whichever you prefer.</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <strong>You get a plan and quote</strong>
                      <span>Scope, schedule and a fixed price.</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <strong>We lock the shoot date</strong>
                      <span>Then handle the shoot and edit.</span>
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
                    Prefer WhatsApp? Message us
                  </a>
                </div>
                <div className="vp-contact-lines">
                  <a href={`tel:${CONFIG.phone.replace(/[^+\d]/g, "")}`} onClick={() => trackEvent("Contact", { method: "call" })}>{CONFIG.phone}</a>
                  <a href={`mailto:${CONFIG.email}`} onClick={() => trackEvent("Contact", { method: "email" })}>{CONFIG.email}</a>
                </div>
              </div>

              <div className="vp-form-card">
                {formSubmitted ? (
                  <div className="vp-form-done">
                    <h3>Request received</h3>
                    <p>Thanks! We've opened WhatsApp with your brief pre-filled. We'll follow up within one working day.</p>
                    <a className="vp-btn vp-btn-primary" href={waUrl()} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h3>Start with the brief</h3>
                    <p className="vp-note">Takes about a minute. Fields marked * are required.</p>

                    <div className="vp-form-grid">
                      <div className="vp-field">
                        <label htmlFor="vp-name">Your name *</label>
                        <input id="vp-name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      </div>
                      <div className="vp-field">
                        <label htmlFor="vp-phone">WhatsApp number *</label>
                        <input id="vp-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                      <div className="vp-field">
                        <label htmlFor="vp-business">Business or brand *</label>
                        <input id="vp-business" name="business" type="text" autoComplete="organization" required value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} />
                      </div>
                      <div className="vp-field">
                        <label htmlFor="vp-email">Email <small>(optional)</small></label>
                        <input id="vp-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      </div>

                      <div className="vp-field full">
                        <span style={{ fontSize: "0.875rem", fontWeight: 600 }} id="vp-lg-service">What do you need? *</span>
                        <div className="vp-seg" role="radiogroup" aria-labelledby="vp-lg-service">
                          {["Shoot + edit package", "Shoot only", "Editing only"].map((opt) => (
                            <label key={opt}>
                              <input type="radio" name="service" value={opt} checked={formData.service === opt} onChange={() => setFormData({ ...formData, service: opt })} />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="vp-field">
                        <label htmlFor="vp-type">What are you making? *</label>
                        <select id="vp-type" name="video_type" required value={formData.video_type} onChange={(e) => setFormData({ ...formData, video_type: e.target.value })}>
                          <option value="" disabled>Select</option>
                          <option>Product videos</option>
                          <option>Brand or company film</option>
                          <option>Reels and short-form content</option>
                          <option>Ad creatives</option>
                          <option>Event or corporate video</option>
                          <option>Something else</option>
                        </select>
                      </div>
                      <div className="vp-field">
                        <label htmlFor="vp-budget">Approximate budget *</label>
                        <select id="vp-budget" name="budget" required value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}>
                          <option value="" disabled>Select</option>
                          <option>Under ₹30,000</option>
                          <option>₹30,000 to ₹75,000</option>
                          <option>₹75,000 to ₹2,00,000</option>
                          <option>₹2,00,000 and above</option>
                          <option>Not sure yet</option>
                        </select>
                      </div>

                      <div className="vp-field full">
                        <label htmlFor="vp-details">Project details <small>(optional)</small></label>
                        <textarea id="vp-details" name="details" placeholder="What is it for, where will it run, and when do you need it?" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
                      </div>
                    </div>

                    <input className="vp-hp" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />

                    <div className="vp-form-foot">
                      {formError && <div className="vp-form-msg-err" role="alert">{formError}</div>}
                      <button className="vp-btn vp-btn-primary vp-btn-block" type="submit" disabled={formSubmitting}>
                        {formSubmitting ? "Sending…" : "Get my quote"}
                      </button>
                      <p className="vp-note">By submitting, you agree we may contact you about this enquiry. We don't share your information.</p>
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
                <p style={{ marginTop: 14, maxWidth: "34ch", color: "var(--vp-muted-inv)" }}>
                  Video shoots and editing for brands that want to be remembered.
                </p>
              </div>
              <div>
                <h4>Explore</h4>
                <ul>
                  <li><a href="#vp-package" onClick={(e) => { e.preventDefault(); scrollTo("vp-package"); }}>Package</a></li>
                  <li><a href="#vp-work" onClick={(e) => { e.preventDefault(); scrollTo("vp-work"); }}>Work</a></li>
                  <li><a href="#vp-process" onClick={(e) => { e.preventDefault(); scrollTo("vp-process"); }}>Process</a></li>
                  <li><a href="#vp-faq" onClick={(e) => { e.preventDefault(); scrollTo("vp-faq"); }}>FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4>Contact</h4>
                <ul>
                  <li><a href={waUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("Contact", { method: "whatsapp", placement: "footer" })}>WhatsApp</a></li>
                  <li><a href={`mailto:${CONFIG.email}`} onClick={() => trackEvent("Contact", { method: "email" })}>{CONFIG.email}</a></li>
                  <li><a href="https://instagram.com/thestorybuilder.in" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
              </div>
            </div>
            <div className="vp-footer-base">
              <span>© {new Date().getFullYear()} The Story Builder. Hyderabad, India.</span>
              <span><a href="/privacy" onClick={(e) => { e.preventDefault(); setPage && setPage("/privacy"); }}>Privacy policy</a></span>
            </div>
          </div>
        </footer>

        {/* =================== MOBILE STICKY BAR =================== */}
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
