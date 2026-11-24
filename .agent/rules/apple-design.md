# Apple-level web design rules

- Stack: Next.js, Tailwind, GSAP + ScrollTrigger, Lenis, Motion. No other animation libs.
- Layout: huge whitespace, max 1 idea per viewport, 12-col grid, section padding min 120px desktop.
- Type: one font family, hero 72-120px, tight tracking (-0.03em), weights 400/600 only.
- Color: near-black (#0a0a0a) or off-white (#fafafa) base, ONE accent color, subtle gradients on dark only.
- Motion: ease cubic-bezier(0.16, 1, 0.3, 1), 0.8-1.2s durations, reveal on scroll (fade + 40px translate), pin hero sections, parallax on media only.
- Media: full-bleed, WebP/AVIF, compressed video, lazy-load below the fold.
- Verify every section in the browser agent at 1440px and 390px before marking it done.
- Respect prefers-reduced-motion. Target Lighthouse 90+.
- No template patterns: no 3-icon-card rows, no generic gradients, no emoji icons.
- Use Context7 for library docs before writing GSAP, Lenis or Next.js code.
