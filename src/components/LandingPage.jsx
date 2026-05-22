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

      {/* ============ FOUNDER + WHAT YOU GET ============ */}
      <section style={{ padding: "40px 20px" }}>
        <div style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 28,
          alignItems: "center",
        }}>

          {/* LEFT — Founder card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            style={{ display: "flex", gap: 18, alignItems: "center" }}
          >
            <img
              src="/shiva.jpg"
              alt="Shiva Shankar, founder of The Story Builder"
              style={{
                width: 120,
                height: 150,
                borderRadius: 14,
                objectFit: "cover",
                filter: "grayscale(.15)",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: 13, color: INK_SOFT, marginBottom: 4 }}>
                I&apos;ll be your strategist
              </div>
              <div style={{
                fontSize: 28,
                fontWeight: 900,
                color: ORANGE,
                lineHeight: 1,
                letterSpacing: -0.5,
              }}>
                SHIVA SHANKAR
              </div>
              <div style={{ fontSize: 13, color: INK_SOFT, marginTop: 6 }}>
                Founder · The Story Builder
              </div>
              <div style={{
                width: 30,
                height: 2,
                background: "rgba(0,0,0,.2)",
                margin: "10px 0",
              }} />
              <div style={{ fontSize: 14, color: INK, lineHeight: 1.5 }}>
                Helped <strong>10+ ambitious brands</strong> get online &amp; grow across India &amp; abroad.
              </div>
            </div>
          </motion.div>

          {/* RIGHT — What you get card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              background: "#fff",
              padding: "26px 28px",
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,.06)",
              boxShadow: "0 2px 12px rgba(0,0,0,.04)",
            }}
          >
            <h3 style={{
              fontSize: 20,
              fontWeight: 800,
              color: INK,
              margin: 0,
              marginBottom: 14,
            }}>
              What Happens On The Call
            </h3>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {benefits.map((b, i) => (
                <li key={i} style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  fontSize: 14.5,
                  color: INK,
                  lineHeight: 1.5,
                }}>
                  <span style={{
                    background: ORANGE,
                    color: "#fff",
                    width: 22,
                    height: 22,
                    borderRadius: 11,
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
        </div>
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

      {/* ============ STICKY BOTTOM CTA BAR ============ */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        borderTop: "1px solid rgba(0,0,0,.08)",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 100,
        boxShadow: "0 -6px 24px rgba(0,0,0,.1)",
        flexWrap: "wrap",
        gap: 10,
      }}>
        <div style={{ flex: "1 1 auto", minWidth: 160 }}>
          <div style={{
            fontSize: 22,
            fontWeight: 900,
            color: INK,
            lineHeight: 1,
            letterSpacing: -0.5,
          }}>
            FREE
          </div>
          <div style={{ fontSize: 12, color: INK_SOFT, marginTop: 4 }}>
            1:1 Consultation · 30 mins · No commitment
          </div>
        </div>
        <motion.a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          data-track="landing_sticky_whatsapp"
          onClick={() => trackEvent("landing_sticky_whatsapp")}
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: ORANGE_GRAD,
            color: "#fff",
            padding: "14px 22px",
            borderRadius: 10,
            fontWeight: 800,
            textDecoration: "none",
            fontSize: 14,
            letterSpacing: 0.5,
            boxShadow: "0 8px 22px rgba(247,107,58,.32)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}
        >
          <WhatsAppIcon size={18} />
          BOOK FREE 1:1 CALL
        </motion.a>
      </div>
    </div>
  );
}
