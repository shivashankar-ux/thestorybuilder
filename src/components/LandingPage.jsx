import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "../utils/tracking";

const WA_HREF =
  "https://wa.me/918341928526?text=" +
  encodeURIComponent("Hi! I'd like to book the free 1:1 consultation to build a better website.");

const BG       = "#f5f2eb";
const CARD     = "#e8e3d8";
const INK      = "#0e0e0e";
const INK_SOFT = "#5b5b5b";
const ORANGE   = "#f76b3a";
const ORANGE_GRAD = "linear-gradient(180deg, #ff9558 0%, #f76b3a 100%)";

const benefits = [
  "A website built specifically to convert visitors into customers",
  "Live in 14 days — no drawn-out timelines or surprise costs",
  "Paid ads & SEO setup so you start getting traffic from day one",
  "Live dashboards so you see exactly what's working",
];

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.05 0C5.5 0 .15 5.35.15 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.35-1.65a11.85 11.85 0 0 0 5.7 1.45h.01c6.55 0 11.9-5.35 11.9-11.9 0-3.18-1.24-6.17-3.46-8.4zM12.05 21.6h-.01a9.7 9.7 0 0 1-4.95-1.35l-.36-.21-3.77.98 1.01-3.67-.23-.38a9.7 9.7 0 0 1-1.5-5.17c0-5.39 4.4-9.78 9.81-9.78 2.62 0 5.07 1.02 6.92 2.86a9.7 9.7 0 0 1 2.87 6.93c0 5.39-4.39 9.79-9.79 9.79zm5.36-7.34c-.29-.15-1.74-.86-2-.96-.27-.1-.46-.15-.66.15s-.76.96-.93 1.16-.34.22-.63.07c-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.57-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.04 2.81 1.19 3c.15.19 2.05 3.13 4.97 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.74-.71 1.99-1.4.24-.69.24-1.27.17-1.4-.07-.13-.27-.2-.56-.34z"/>
  </svg>
);

export default function LandingPage() {
  useLayoutEffect(() => {
    const prevBodyBg = document.body.style.background;
    const prevHtmlBg = document.documentElement.style.background;
    document.body.style.background = BG;
    document.documentElement.style.background = BG;
    return () => {
      document.body.style.background = prevBodyBg;
      document.documentElement.style.background = prevHtmlBg;
    };
  }, []);

  return (
    <div style={{ background: BG, color: INK, minHeight: "100vh", paddingBottom: 110 }}>

      {/* ============ HERO ============ */}
      <section style={{ padding: "70px 20px 30px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Orange announcement pill (overlaps card) */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: ORANGE_GRAD,
                color: "#fff",
                padding: "18px 32px",
                borderRadius: 14,
                fontWeight: 800,
                fontSize: 16,
                lineHeight: 1.45,
                textAlign: "center",
                boxShadow: "0 10px 28px rgba(247,107,58,.28)",
                maxWidth: 520,
                position: "relative",
                top: 28,
                zIndex: 2,
                letterSpacing: 0.3,
              }}
            >
              FREE 1:1 STRATEGY CONSULTATION<br />
              FOR FOUNDERS WHO WANT A<br />
              HIGH-CONVERTING WEBSITE
            </motion.div>
          </div>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: CARD,
              borderRadius: 24,
              padding: "70px 30px 50px",
              textAlign: "center",
            }}
          >
            <h1 style={{
              fontSize: "clamp(28px, 4.4vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: INK,
              margin: 0,
              maxWidth: 760,
              marginInline: "auto",
              letterSpacing: -0.5,
            }}>
              Get a <span style={{ borderBottom: `4px solid ${ORANGE}`, paddingBottom: 2 }}>Better Website</span><br />
              That Brings You <em style={{ color: ORANGE, fontStyle: "normal" }}>Real Customers</em>
            </h1>

            <div style={{
              height: 1,
              background: "rgba(0,0,0,.15)",
              margin: "32px auto",
              maxWidth: 220,
            }} />

            <p style={{
              fontSize: 17,
              color: INK_SOFT,
              margin: 0,
              maxWidth: 580,
              marginInline: "auto",
              lineHeight: 1.55,
            }}>
              Book a free 30-min strategy call. We&apos;ll audit your current site, your funnel, and map out exactly what to fix to bring in more customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ FOUNDER ROW — big photo + name ============ */}
      <section style={{ padding: "40px 20px 20px" }}>
        <div style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 48,
          alignItems: "center",
        }}>

          {/* LEFT — BIG founder photo, full colour, soft bottom fade */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <img
              src="/shiva-landing.jpg"
              alt="Shiva Shankar, founder of The Story Builder"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = "1";
                  e.currentTarget.src = "/shiva.jpg";
                }
              }}
              style={{
                width: "100%",
                maxWidth: 440,
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "center 18%",
                filter: "saturate(1.05) contrast(1.04)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 0%, black 82%, transparent 100%)",
                maskImage:
                  "linear-gradient(180deg, black 0%, black 82%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* RIGHT — Name, title, blurb, stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{ fontSize: 15, color: INK_SOFT, marginBottom: 8 }}>
              I&apos;ll be your strategist for 30 mins
            </div>
            <h2 style={{
              fontSize: "clamp(40px, 6.5vw, 68px)",
              fontWeight: 900,
              color: ORANGE,
              lineHeight: 0.95,
              letterSpacing: -1.5,
              margin: 0,
            }}>
              SHIVA<br />SHANKAR
            </h2>
            <div style={{
              fontSize: 16,
              color: INK_SOFT,
              marginTop: 14,
              fontWeight: 500,
            }}>
              Founder · The Story Builder
            </div>
            <div style={{
              width: 48,
              height: 2,
              background: "rgba(0,0,0,.18)",
              margin: "18px 0",
            }} />
            <p style={{
              fontSize: 16,
              color: INK,
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 460,
            }}>
              Helped <strong>10+ ambitious brands</strong> get online and grow across India &amp; abroad — performance-tuned websites, paid ads that actually pay back, and honest reporting.
            </p>

            <div style={{
              marginTop: 26,
              display: "flex",
              gap: 32,
              flexWrap: "wrap",
            }}>
              <div>
                <div style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: INK,
                  lineHeight: 1,
                  letterSpacing: -0.5,
                }}>
                  10+
                </div>
                <div style={{ fontSize: 12, color: INK_SOFT, marginTop: 6, letterSpacing: 1 }}>
                  BRANDS LAUNCHED
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: INK,
                  lineHeight: 1,
                  letterSpacing: -0.5,
                }}>
                  3.4x
                </div>
                <div style={{ fontSize: 12, color: INK_SOFT, marginTop: 6, letterSpacing: 1 }}>
                  AVG ROAS DELIVERED
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ WHAT HAPPENS ON THE CALL — own row ============ */}
      <section style={{ padding: "40px 20px 40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "#fff",
            padding: "32px 36px",
            borderRadius: 18,
            border: "1px solid rgba(0,0,0,.06)",
            boxShadow: "0 6px 24px rgba(0,0,0,.06)",
          }}
        >
          <h3 style={{
            fontSize: 22,
            fontWeight: 800,
            color: INK,
            margin: 0,
            marginBottom: 18,
            textAlign: "center",
          }}>
            What Happens On The Call
          </h3>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}>
            {benefits.map((b, i) => (
              <li key={i} style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                fontSize: 15.5,
                color: INK,
                lineHeight: 1.5,
              }}>
                <span style={{
                  background: ORANGE,
                  color: "#fff",
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  flexShrink: 0,
                  marginTop: 1,
                }}>✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ============ TRUSTED BY ============ */}
      <section style={{ padding: "30px 20px 50px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: 12,
            color: INK_SOFT,
            letterSpacing: 2.5,
            margin: 0,
            marginBottom: 18,
            fontWeight: 700,
          }}>
            TRUSTED BY AMBITIOUS BRANDS
          </p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 28px",
            justifyContent: "center",
            color: INK,
            fontWeight: 700,
            fontSize: 13,
            opacity: 0.65,
            letterSpacing: 0.5,
          }}>
            <span>LEGACY SOLAR</span>
            <span>STAR FITNESS</span>
            <span>WAFFLESHUB</span>
            <span>CHESS ACADEMY</span>
            <span>UNBENT</span>
            <span>SIOLIM CAFE</span>
            <span>WHITE CLOSET</span>
            <span>SEVACTION</span>
          </div>
        </div>
      </section>

      {/* ============ STICKY BOTTOM CTA BAR — dark, compact, green CTA ============ */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#0f0f0f",
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 100,
        boxShadow: "0 -10px 30px rgba(0,0,0,.25)",
        gap: 14,
      }}>
        {/* LEFT — brand badge + tagline */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          flex: "1 1 auto",
          minWidth: 0,
        }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: ORANGE_GRAD,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            color: "#fff",
            fontSize: 13,
            flexShrink: 0,
            letterSpacing: 0.5,
            boxShadow: "0 4px 14px rgba(247,107,58,.35)",
          }}>
            TSB
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: -0.2,
            }}>
              Free 1:1 Strategy Call
            </div>
            <div style={{
              color: "rgba(255,255,255,.62)",
              fontSize: 12.5,
              marginTop: 3,
              lineHeight: 1.3,
            }}>
              30 mins · No pitch, no pressure · We map your plan
            </div>
          </div>
        </div>

        {/* RIGHT — big green WhatsApp CTA */}
        <motion.a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          data-track="landing_sticky_whatsapp"
          onClick={() => trackEvent("landing_sticky_whatsapp")}
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "linear-gradient(180deg, #2ee06f 0%, #1bb558 100%)",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: 10,
            fontWeight: 900,
            textDecoration: "none",
            fontSize: 14,
            letterSpacing: 0.6,
            boxShadow: "0 8px 24px rgba(34,197,94,.38)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <WhatsAppIcon size={18} />
          CHAT FREE NOW
        </motion.a>
      </div>
    </div>
  );
}
