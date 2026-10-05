import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reelsPortfolio = [
  { id: "QAL6E6fy1f0", title: "Brand Storytelling", views: "120K Views", badge: "⚡ Trending" },
  { id: "1EwM31QxnKk", title: "Real Estate Walkthrough", views: "450K Views", badge: "🔥 Hot" },
  { id: "_aVoaZbyXJQ", title: "Founder Spotlight", views: "95K Views", badge: "📈 Viral" },
  { id: "rVUkWK8lRmw", title: "Product Showcase", views: "890K Views", badge: "🚀 Featured" },
  { id: "VdsrsWmmhiw", title: "Fashion & Apparel", views: "310K Views", badge: "✨ Aesthetic" },
  { id: "k-bJd1yYk1A", title: "Restaurant Spotlight", views: "210K Views", badge: "🍕 Local" },
];

export default function ReelsLandingPage({ setPage }) {
  const [activeTab, setActiveTab] = useState("retainer");
  const [activeVideo, setActiveVideo] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    brand: "",
    pkg: "8 Reels Growth Pack (₹18,999)",
    city: "",
    date: "",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const message = `Hi StoryBuilder team! I want to book a Reels Shoot Session:\n\n👤 Name: ${formState.name}\n📞 Phone: ${formState.countryCode} ${formState.phone}\n🏢 Brand: ${formState.brand}\n📦 Package: ${formState.pkg}\n📍 City: ${formState.city}\n📅 Date: ${formState.date}\n📝 Goals: ${formState.notes}`;
    const waUrl = `https://wa.me/919989679185?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 1200);
  };

  return (
    <div style={{ background: "#07040A", color: "#F8FAFC", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Glow Effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 1100,
          height: 600,
          background: "radial-gradient(ellipse at center, rgba(255,45,85,0.22), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Hero Section */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          {setPage && (
            <button
              onClick={() => setPage("services")}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#94A3B8",
                padding: "8px 18px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 28,
              }}
            >
              ← Back to All Services
            </button>
          )}

          <p style={{ fontSize: 12, letterSpacing: "0.3em", color: "#FF2D55", fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>
            🎬 HYDERABAD'S #1 REELS PRODUCTION & EDITING STUDIO
          </p>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 24px 0",
            }}
          >
            Turn Viewers Into Customers With{" "}
            <span
              style={{
                background: "linear-gradient(110deg, #F59E0B, #FF2D55 50%, #E11D48)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              High-Impact Reels
            </span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#94A3B8", maxWidth: 680, margin: "0 auto 36px", lineHeight: 1.6 }}>
            We handle scriptwriting, professional 4K on-location shooting, scroll-stopping kinetic captions, sound design, and strategic editing for Instagram Reels &amp; YouTube Shorts.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <a
              href="#reels-booking"
              style={{
                background: "linear-gradient(135deg, #FF2D55, #D91438)",
                color: "#FFFFFF",
                padding: "16px 36px",
                borderRadius: 100,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'Sora', sans-serif",
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(255,45,85,0.4)",
              }}
            >
              Book Shoot Session →
            </a>
            <a
              href="https://wa.me/919989679185?text=Hi%20StoryBuilder%2C%20I'm%20interested%20in%20your%20Reels%20Production%20Services!"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "rgba(37,211,102,0.12)",
                border: "1px solid rgba(37,211,102,0.4)",
                color: "#25D366",
                padding: "16px 32px",
                borderRadius: 100,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'Sora', sans-serif",
                textDecoration: "none",
              }}
            >
              💬 WhatsApp Instant Chat
            </a>
          </div>

          <div style={{ fontSize: 14, color: "#94A3B8" }}>
            <span style={{ color: "#F59E0B" }}>★★★★★</span> <strong>4.9/5 Rating</strong> · Over <strong>1,500+ Reels Produced</strong> · <strong>10M+ Organic Views</strong>
          </div>
        </div>
      </section>

      {/* Industry Marquee Ticker */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "24px 0", overflow: "hidden" }}>
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.3em", color: "#64748B", textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>
          HIGH-CONVERTING REELS FOR EVERY INDUSTRY
        </p>
        <div style={{ display: "flex", gap: 40, width: "max-content", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
          {["Real Estate", "E-Commerce", "Doctors & Clinics", "Gyms & Fitness", "Tech Founders", "Restaurants", "Fashion Brands"].map((ind) => (
            <span key={ind} style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: "#CBD5E1" }}>
              ⚡ {ind}
            </span>
          ))}
        </div>
      </section>

      {/* 9:16 Video Portfolio Showcase */}
      <section style={{ padding: "80px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "#FF2D55", fontWeight: 700, textTransform: "uppercase" }}>
            🎬 PORTFOLIO SHOWCASE
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Sora', sans-serif", fontWeight: 800, marginTop: 10 }}>
            Watch Our <span style={{ color: "#F59E0B" }}>Reels & Shorts Work</span>
          </h2>
          <p style={{ color: "#94A3B8", marginTop: 8 }}>Click any card below to play full 9:16 video.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 24, justifyContent: "center" }}>
          {reelsPortfolio.map((reel) => (
            <motion.div
              key={reel.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setActiveVideo(reel)}
              style={{
                position: "relative",
                aspectRatio: "9 / 16",
                borderRadius: 20,
                overflow: "hidden",
                background: "#000",
                border: "1.5px solid rgba(255,255,255,0.12)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={`https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`}
                alt={reel.title}
                style={{ width: "100%", height: "80%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: "20%",
                  background: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#FF2D55",
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    paddingLeft: 3,
                    boxShadow: "0 6px 20px rgba(255,45,85,0.6)",
                  }}
                >
                  ▶
                </div>
              </div>
              <div style={{ padding: "10px 12px", background: "#150F1C", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#FFF" }}>{reel.title}</span>
                <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 600 }}>{reel.views}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "80px 20px", background: "#0C0812", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "#FF2D55", fontWeight: 700, textTransform: "uppercase" }}>
              OUR REELS ENGINE
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontFamily: "'Sora', sans-serif", fontWeight: 800, marginTop: 10 }}>
              End-to-End Video Production
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {[
              { num: "01", title: "Script & Hook Writing", desc: "Copywriting engineered to hook viewers in the first 3 seconds and trigger curiosity." },
              { num: "02", title: "On-Location 4K Shoot", desc: "Videographer arrives with professional cinema cameras, lighting, and wireless mics." },
              { num: "03", title: "Kinetic Captions & SFX", desc: "Alex Hormozi-style animated subtitles, sound effects, B-roll overlays, and graphic polish." },
              { num: "04", title: "48-Hour Delivery", desc: "Fast editing pipeline so your business stays trending on Instagram Reels & YouTube Shorts." },
            ].map((f) => (
              <div
                key={f.num}
                style={{
                  background: "#150F1C",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  padding: 32,
                }}
              >
                <div style={{ fontSize: 44, fontWeight: 300, color: "transparent", WebkitTextStroke: "1px rgba(255,45,85,0.6)", fontFamily: "'Sora', sans-serif" }}>
                  {f.num}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: "14px 0 10px", color: "#FFF", fontFamily: "'Sora', sans-serif" }}>{f.title}</h3>
                <p style={{ color: "#94A3B8", fontSize: 14.5, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section style={{ padding: "90px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "#FF2D55", fontWeight: 700, textTransform: "uppercase" }}>
            TRANSPARENT REELS PACKAGES
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontFamily: "'Sora', sans-serif", fontWeight: 800, marginTop: 10 }}>
            Choose Your Reels Package
          </h2>

          <div
            style={{
              display: "inline-flex",
              gap: 8,
              background: "#100B16",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 100,
              padding: 6,
              marginTop: 28,
            }}
          >
            {["retainer", "project", "enterprise"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? "#FF2D55" : "transparent",
                  color: activeTab === tab ? "#FFF" : "#94A3B8",
                  border: 0,
                  padding: "10px 24px",
                  borderRadius: 100,
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                {tab === "retainer" ? "Monthly Retainers" : tab === "project" ? "Single Shoot Packs" : "Agency Scale"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {activeTab === "retainer" && (
            <>
              <div style={{ background: "#150F1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 36 }}>
                <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#94A3B8", fontWeight: 700 }}>STARTER ENGINE</span>
                <h3 style={{ fontSize: 26, margin: "10px 0 6px", fontFamily: "'Sora', sans-serif" }}>4 Reels Pack</h3>
                <p style={{ color: "#94A3B8", fontSize: 14 }}>1 shoot session per month + full editing.</p>
                <div style={{ fontSize: 36, fontWeight: 800, margin: "20px 0", fontFamily: "'Sora', sans-serif" }}>
                  ₹ 9,999 <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 400 }}>+GST / mo</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                  {["4 High-Quality 4K Reels", "1 On-Location Shoot Session (2 hrs)", "Scriptwriting & Hook Concepts", "Animated Captions & Sound Design", "48-Hour Delivery"].map((item) => (
                    <li key={item} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 14, color: "#CBD5E1" }}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#reels-booking"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#FFF",
                    color: "#0F172A",
                    padding: 14,
                    borderRadius: 100,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Book 4 Reels Pack →
                </a>
              </div>

              <div
                style={{
                  background: "linear-gradient(165deg, #250B14, #150912)",
                  border: "1.5px solid rgba(255,45,85,0.5)",
                  borderRadius: 20,
                  padding: 36,
                  position: "relative",
                  boxShadow: "0 15px 45px rgba(255,45,85,0.15)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 28,
                    background: "#FF2D55",
                    color: "#FFF",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: 100,
                  }}
                >
                  MOST POPULAR
                </span>
                <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#FF2D55", fontWeight: 700 }}>GROWTH SUITE</span>
                <h3 style={{ fontSize: 26, margin: "10px 0 6px", fontFamily: "'Sora', sans-serif" }}>8 Reels Pack</h3>
                <p style={{ color: "#94A3B8", fontSize: 14 }}>Post 2 Reels every week to dominate your market.</p>
                <div style={{ fontSize: 36, fontWeight: 800, margin: "20px 0", fontFamily: "'Sora', sans-serif" }}>
                  ₹ 18,999 <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 400 }}>+GST / mo</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                  {[
                    "8 High-Impact 4K Reels",
                    "2 On-Location Shoot Sessions (4 hrs total)",
                    "Full Scripting & Hook Engineering",
                    "Hormozi Subtitles & Sound FX",
                    "Trending Audio & Cover Thumbnails",
                    "Dedicated Creative Director",
                  ].map((item) => (
                    <li key={item} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 14, color: "#CBD5E1" }}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#reels-booking"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#FF2D55",
                    color: "#FFF",
                    padding: 14,
                    borderRadius: 100,
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(255,45,85,0.4)",
                  }}
                >
                  Book 8 Reels Pack →
                </a>
              </div>
            </>
          )}

          {activeTab === "project" && (
            <div style={{ background: "#150F1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 36, gridColumn: "1 / -1" }}>
              <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#FF2D55", fontWeight: 700 }}>LAUNCH SPECIAL</span>
              <h3 style={{ fontSize: 26, margin: "10px 0 6px", fontFamily: "'Sora', sans-serif" }}>6 Reels Launch Pack</h3>
              <p style={{ color: "#94A3B8", fontSize: 14 }}>One-time shoot session perfect for launches, campaign offers, or profile revamps.</p>
              <div style={{ fontSize: 36, fontWeight: 800, margin: "20px 0", fontFamily: "'Sora', sans-serif" }}>
                ₹ 14,999 <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 400 }}>+GST one-time</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                {["6 Polished Vertical Videos (9:16)", "Half-Day On-Location Filming", "Pro Lighting & Wireless Mics", "Complete Captions, Sound & Color Grading"].map((item) => (
                  <li key={item} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 14, color: "#CBD5E1" }}>
                    ✓ {item}
                  </li>
                ))}
              </ul>
              <a href="#reels-booking" style={{ display: "inline-block", background: "#FF2D55", color: "#FFF", padding: "14px 32px", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>
                Book Launch Pack →
              </a>
            </div>
          )}

          {activeTab === "enterprise" && (
            <div style={{ background: "#150F1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 36, gridColumn: "1 / -1" }}>
              <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#FF2D55", fontWeight: 700 }}>FULL CONTENT MACHINE</span>
              <h3 style={{ fontSize: 26, margin: "10px 0 6px", fontFamily: "'Sora', sans-serif" }}>15 Reels Content Engine</h3>
              <p style={{ color: "#94A3B8", fontSize: 14 }}>Aggressive video scale: 15 Reels per month with dedicated videographer &amp; priority edits.</p>
              <div style={{ fontSize: 36, fontWeight: 800, margin: "20px 0", fontFamily: "'Sora', sans-serif" }}>
                ₹ 32,999 <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 400 }}>+GST / mo</span>
              </div>
              <a href="#reels-booking" style={{ display: "inline-block", background: "#FF2D55", color: "#FFF", padding: "14px 32px", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>
                Book 15 Reels Engine →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "80px 20px", background: "#0C0812", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "'Sora', sans-serif", fontWeight: 800, marginBottom: 40 }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { q: "Where do the Reel shoots take place?", a: "We come directly to your office, venue, store, clinic, or studio anywhere in Hyderabad (and major metros in India)." },
              { q: "What if I feel camera shy or don't know what to say?", a: "Our director guides you step-by-step on camera, provides bullet point scripts, and shoots multiple takes until you look confident." },
              { q: "What gear do you use?", a: "We shoot on 4K cameras / iPhones with cinema lenses, dual wireless lavalier mics for studio audio, and LED softboxes." },
              { q: "How fast is video delivery?", a: "Standard delivery is 48 hours per Reel. Express 24-hour turnaround is available upon request." },
            ].map((faq, idx) => (
              <div key={idx} style={{ background: "#150F1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: 0,
                    color: "#FFF",
                    padding: 22,
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  {faq.q} <span>{openFaq === idx ? "⌃" : "⌄"}</span>
                </button>
                {openFaq === idx && (
                  <p style={{ padding: "0 22px 22px", color: "#94A3B8", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="reels-booking" style={{ padding: "90px 20px", maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "#FF2D55", fontWeight: 700, textTransform: "uppercase" }}>
            BOOK YOUR REELS SHOOT
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Sora', sans-serif", fontWeight: 800, marginTop: 8 }}>
            Lock In Your Shoot Slot
          </h2>
        </div>

        <form
          onSubmit={handleFormSubmit}
          style={{
            background: "#150F1C",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20,
            padding: 36,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div>
            <label style={{ fontSize: 11, letterSpacing: "0.2em", color: "#94A3B8", fontWeight: 700, display: "block", marginBottom: 6 }}>
              FULL NAME *
            </label>
            <input
              type="text"
              required
              placeholder="Your full name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              style={{ width: "100%", background: "#0B0710", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 14, color: "#FFF" }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, letterSpacing: "0.2em", color: "#94A3B8", fontWeight: 700, display: "block", marginBottom: 6 }}>
              WHATSAPP NUMBER *
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <select
                value={formState.countryCode}
                onChange={(e) => setFormState({ ...formState, countryCode: e.target.value })}
                style={{ width: 100, background: "#0B0710", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 14, color: "#FFF" }}
              >
                <option value="+91">IN +91</option>
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
                <option value="+971">UAE +971</option>
              </select>
              <input
                type="tel"
                required
                placeholder="10-digit phone number"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                style={{ flex: 1, background: "#0B0710", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 14, color: "#FFF" }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, letterSpacing: "0.2em", color: "#94A3B8", fontWeight: 700, display: "block", marginBottom: 6 }}>
              BUSINESS / BRAND NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Urban Nests / Dr. Rao Clinic"
              value={formState.brand}
              onChange={(e) => setFormState({ ...formState, brand: e.target.value })}
              style={{ width: "100%", background: "#0B0710", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 14, color: "#FFF" }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, letterSpacing: "0.2em", color: "#94A3B8", fontWeight: 700, display: "block", marginBottom: 6 }}>
              SELECT REELS PACKAGE *
            </label>
            <select
              value={formState.pkg}
              onChange={(e) => setFormState({ ...formState, pkg: e.target.value })}
              style={{ width: "100%", background: "#0B0710", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 14, color: "#FFF" }}
            >
              <option value="4 Reels Pack (₹9,999)">4 Reels Pack — ₹9,999 +GST</option>
              <option value="8 Reels Growth Pack (₹18,999)">8 Reels Growth Pack (Popular) — ₹18,999 +GST</option>
              <option value="6 Reels Launch Pack (₹14,999)">6 Reels Launch Pack — ₹14,999 +GST</option>
              <option value="15 Reels Content Machine (₹32,999)">15 Reels Content Machine — ₹32,999 +GST</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, letterSpacing: "0.2em", color: "#94A3B8", fontWeight: 700, display: "block", marginBottom: 6 }}>
                CITY / LOCATION *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Hyderabad"
                value={formState.city}
                onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                style={{ width: "100%", background: "#0B0710", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 14, color: "#FFF" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, letterSpacing: "0.2em", color: "#94A3B8", fontWeight: 700, display: "block", marginBottom: 6 }}>
                PREFERRED SHOOT DATE *
              </label>
              <input
                type="date"
                required
                value={formState.date}
                onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                style={{ width: "100%", background: "#0B0710", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 14, color: "#FFF" }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, letterSpacing: "0.2em", color: "#94A3B8", fontWeight: 700, display: "block", marginBottom: 6 }}>
              REEL GOALS / NOTES *
            </label>
            <textarea
              required
              placeholder="Tell us what products or topics you want to shoot Reels on"
              value={formState.notes}
              onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
              style={{ width: "100%", minHeight: 90, background: "#0B0710", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 14, color: "#FFF" }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #FF2D55, #D91438)",
              color: "#FFF",
              border: 0,
              padding: 16,
              borderRadius: 100,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Sora', sans-serif",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(255,45,85,0.4)",
            }}
          >
            {formSubmitted ? "Redirecting to WhatsApp..." : "Submit Booking Enquiry →"}
          </button>
        </form>
      </section>

      {/* 9:16 Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(8,4,12,0.92)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 380,
                aspectRatio: "9 / 16",
                maxHeight: "88vh",
                background: "#000",
                borderRadius: 24,
                overflow: "hidden",
                border: "2px solid #F59E0B",
                boxShadow: "0 25px 80px rgba(0,0,0,0.9)",
              }}
            >
              <button
                onClick={() => setActiveVideo(null)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  zIndex: 10,
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#FFF",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                ✕
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
