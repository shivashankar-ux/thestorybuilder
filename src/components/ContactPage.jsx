import { useState } from "react";
import { motion } from "framer-motion";
import CalendlyEmbed from "./CalendlyEmbed";
import { trackEvent } from "../utils/tracking";
import GlowCard from "./common/GlowCard";
import MagneticButton from "./common/MagneticButton";

const BOT_TOKEN = "8712967453:AAGMQV1SneKzT2FGFkdNTrh2GvZD_Q_vgcY";
const CHAT_ID = "1340316382";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", project: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendToTelegram = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const text = [
      "🔔 New Portfolio Enquiry!",
      "",
      "👤 Name: " + form.name,
      "📧 Email: " + form.email,
      "📱 Phone: " + (form.phone || "Not provided"),
      "📍 Area: " + (form.area || "Not specified"),
      "💼 Project: " + (form.project || "Not specified"),
      "💬 Message: " + form.message,
      "",
      "📅 " + new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ].join("\n");

    try {
      trackEvent("contact_form_submitted", {
        project: form.project || "unspecified",
        area: form.area || "unspecified",
      });
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", area: "", project: "", message: "" });
      } else {
        new Image().src = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${encodeURIComponent(CHAT_ID)}&text=${encodeURIComponent(text)}`;
        setStatus("success");
        setForm({ name: "", email: "", phone: "", area: "", project: "", message: "" });
      }
    } catch (err) {
      try {
        new Image().src = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${encodeURIComponent(CHAT_ID)}&text=${encodeURIComponent(text)}`;
        setStatus("success");
        setForm({ name: "", email: "", phone: "", area: "", project: "", message: "" });
      } catch {
        setStatus("error");
      }
    }
  };

  return (
    <main className="contact-page" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
      <div className="wrap">
        <div className="contact-layout">

          {/* LEFT — Photo + intro */}
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="photo-wrap">
              <img src="/shiva.jpg" alt="The Story Builder — Founder" />
              <div className="photo-badge">
                <span className="pulse-dot" /> Now onboarding clients
              </div>
            </div>

            <div className="contact-intro">
              <h1>Talk to <span className="gold">The Story Builder</span></h1>
              <p>
                A full-service digital marketing agency working with founders and growing brands across India. Tell us where you are and where you want to be — we'll map the path.
              </p>
              <div className="contact-detail">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>+91 83419 28526</span>
              </div>
              <div className="contact-detail">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#facc15" strokeWidth="1.5" />
                  <path d="M2 7l10 7 10-7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>shivashankar.7991@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlowCard style={{ padding: "36px 32px" }}>
              <span className="tag">Get In Touch</span>
              <h2 className="sec-h" style={{ fontSize: "32px", margin: "12px 0 16px" }}>Let's build something<br /><em>great together.</em></h2>
              <p className="muted" style={{ marginBottom: 28 }}>
                Fill in the form and I'll get back to you within 24 hours.
              </p>

              {status === "success" ? (
                <div style={{
                  background: "rgba(250,204,21,0.08)",
                  border: "1.5px solid rgba(250,204,21,0.3)",
                  borderRadius: 16,
                  padding: "36px 28px",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <h3 style={{ fontFamily: "var(--fd)", fontSize: 22, marginBottom: 8 }}>Message Sent!</h3>
                  <p className="muted">Thanks! I've received your message and will get back to you soon.</p>
                  <button
                    className="btn btn-gold"
                    style={{ marginTop: 24 }}
                    onClick={() => setStatus("idle")}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={sendToTelegram} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                  <div className="cf-group">
                    <label className="cf-label">Your Name *</label>
                    <input
                      className="cf-input"
                      type="text"
                      name="name"
                      placeholder="Shiva"
                      value={form.name}
                      onChange={handle}
                      required
                    />
                  </div>

                  <div className="cf-group">
                    <label className="cf-label">Email Address *</label>
                    <input
                      className="cf-input"
                      type="email"
                      name="email"
                      placeholder="shiva@example.com"
                      value={form.email}
                      onChange={handle}
                      required
                    />
                  </div>

                  <div className="cf-group">
                    <label className="cf-label">Phone Number</label>
                    <input
                      className="cf-input"
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handle}
                    />
                  </div>

                  <div className="cf-group">
                    <label className="cf-label">Your Area</label>
                    <select
                      className="cf-input cf-select"
                      name="area"
                      value={form.area}
                      onChange={handle}
                    >
                      <option value="">Select your area...</option>
                      <optgroup label="West Hyderabad">
                        <option value="Banjara Hills">Banjara Hills</option>
                        <option value="Jubilee Hills">Jubilee Hills</option>
                        <option value="Madhapur">Madhapur</option>
                        <option value="Hi-Tech City">Hi-Tech City</option>
                        <option value="Gachibowli">Gachibowli</option>
                        <option value="Kondapur">Kondapur</option>
                        <option value="Financial District / Nanakramguda">Financial District / Nanakramguda</option>
                        <option value="Manikonda">Manikonda</option>
                        <option value="Tolichowki">Tolichowki</option>
                        <option value="Mehdipatnam">Mehdipatnam</option>
                      </optgroup>
                      <optgroup label="North & Central Hyderabad">
                        <option value="Kukatpally / KPHB">Kukatpally / KPHB</option>
                        <option value="Miyapur">Miyapur</option>
                        <option value="Ameerpet">Ameerpet</option>
                        <option value="SR Nagar">SR Nagar</option>
                        <option value="Begumpet">Begumpet</option>
                        <option value="Somajiguda / Punjagutta">Somajiguda / Punjagutta</option>
                        <option value="Himayatnagar">Himayatnagar</option>
                        <option value="Secunderabad">Secunderabad</option>
                        <option value="Tarnaka">Tarnaka</option>
                        <option value="Habsiguda">Habsiguda</option>
                      </optgroup>
                      <optgroup label="East & South Hyderabad">
                        <option value="Uppal">Uppal</option>
                        <option value="LB Nagar">LB Nagar</option>
                        <option value="Dilsukhnagar">Dilsukhnagar</option>
                        <option value="Malakpet">Malakpet</option>
                        <option value="Abids">Abids</option>
                        <option value="Old City / Charminar">Old City / Charminar</option>
                      </optgroup>
                      <option value="Other (Hyderabad)">Other (Hyderabad)</option>
                      <option value="Outside Hyderabad">Outside Hyderabad</option>
                    </select>
                  </div>

                  <div className="cf-group">
                    <label className="cf-label">Project Type</label>
                    <select
                      className="cf-input cf-select"
                      name="project"
                      value={form.project}
                      onChange={handle}
                    >
                      <option value="">Select a service...</option>
                      <option value="Performance Marketing (Meta + Google)">Performance Marketing (Meta + Google)</option>
                      <option value="Social Media Marketing">Social Media Marketing</option>
                      <option value="Website / Landing Page">Website / Landing Page</option>
                      <option value="Brand Strategy">Brand Strategy</option>
                      <option value="Full-Funnel Growth Partner">Full-Funnel Growth Partner</option>
                      <option value="Not Sure Yet — Need Audit">Not Sure Yet — Need Audit</option>
                    </select>
                  </div>

                  <div className="cf-group">
                    <label className="cf-label">Message *</label>
                    <textarea
                      className="cf-input cf-textarea"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={handle}
                      required
                      rows={4}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ color: "#f87171", fontSize: 14 }}>
                      ⚠️ Something went wrong. Please try again or contact me directly.
                    </p>
                  )}

                  <MagneticButton distance={0.3}>
                    <button
                      className="btn btn-gold"
                      type="submit"
                      disabled={status === "sending"}
                      style={{ marginTop: 4, width: "100%", justifyContent: "center", cursor: "pointer" }}
                    >
                      {status === "sending" ? "Sending..." : (
                        <>
                          Send Message
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </MagneticButton>

                </form>
              )}

              <div className="response-note" style={{ marginTop: 20 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="var(--muted)" strokeWidth="1.5" />
                  <polyline points="12 6 12 12 16 14" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                We typically respond within <strong>24 hours.</strong>
              </div>
            </GlowCard>
          </motion.div>

        </div>

        {/* Calendly — book a strategy call */}
        <motion.div
          className="contact-calendly-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginTop: "80px" }}
        >
          <div className="contact-calendly-head">
            <span className="tag">Or Book Direct</span>
            <h3>Pick a 30-min strategy slot.</h3>
            <p className="muted">
              Skip the form — book a free 30-minute call. Bring your numbers, leave with a plan.
            </p>
          </div>
          <CalendlyEmbed />
        </motion.div>
      </div>
    </main>
  );
}