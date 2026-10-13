# Video shoot + edit landing page

Static HTML/CSS/JS. No build step. Works on any host (Vercel, Netlify, cPanel, WordPress as a custom page).

## 1. Set up in 5 minutes
Open `js/main.js` and edit the `CONFIG` block at the top:
- `brand`, `whatsapp` (e.g. 919876543210), `phone`, `email`
- `metaPixelId`: your Pixel ID (leave empty to disable)
- `formEndpoint`: where leads are POSTed as JSON (Formspree, Google Apps Script, n8n, your own API).
  If empty, the form opens WhatsApp with the brief pre-filled, so the page works even with no backend.
- `thankYouUrl`: optional redirect after submit

Also search `index.html` for: `Studio Name`, `99999`, `yourstudio.com`, `yourhandle`, `₹XX,XXX`.

## 2. Replace placeholders
- Showreel: `index.html`, `<video class="reel" data-src="" data-poster="">`
- Portfolio tiles: add `data-video="assets/x.mp4"` or `data-embed="https://www.youtube.com/embed/ID"`; set thumbnails via `--thumb` in `css/styles.css` (`.tile-a` to `.tile-d`)
- Raw vs finished slider: set a background image on `.cmp-raw` and `.cmp-graded` (same photo; the CSS does the "grade")
- Client logos, testimonials, pricing, OG image (commented in `<head>`)

## 3. Claims to verify (written as sensible defaults)
First cut in 5 to 7 working days, two revision rounds, reply within one working day, shoots across India, final videos owned by client, "up to 4 hours" and "6 to 8 short videos" in the tiers.

## 4. Tracking (Meta Ads)
Events fired (Pixel + `dataLayer` for GTM):
| Event | When |
|---|---|
| PageView | load |
| ViewContent | package section seen |
| Lead | form submitted (carries `event_id` for CAPI dedupe) |
| Contact | WhatsApp, call or email click |
| Custom: CTAClick, PackageSelect, FormStart, VideoPlay, CompareUsed, ScrollDepth (50/90) | engagement |

UTMs and `fbclid` are captured (first touch, per session) and sent with the lead along with `fbp`, `fbc`, `event_id`, page URL. Use these in your webhook if you send server-side Conversions API events.

## 5. Using it inside your own site
- Easiest: upload the folder and link to it (e.g. `/video-production/`).
- Next.js: copy the folder into `public/video-production/` and use a rewrite, or paste `index.html` body into a page and import `css/styles.css` and `js/main.js`.
- WordPress: upload as a folder and point a page template or redirect at `index.html`.

Fonts load from Google Fonts (Archivo, Instrument Sans, IBM Plex Mono) with system fallbacks.
