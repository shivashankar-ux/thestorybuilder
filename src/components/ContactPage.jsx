import { useState } from "react";

const BOT_TOKEN = "8712967453:AAGMQV1SneKzT2FGFkdNTrh2GvZD_Q_vgcY";
const CHAT_ID   = "1340316382";

// ============================================================
// ContactSection — the small contact block on the HOME page
// ============================================================
export function ContactSection({ setPage }) {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-box sr">
          <span className="tag">Get In Touch</span>
          <h2 className="sec-h">Let's build something<br /><em>great together.</em></h2>
          <p className="muted">
            Whether you have a project, a question, or just want to say hi — reach out and I'll get back to you fast.
          </p>
          <div className="contact-btns">
            <a
              href="https://mail.google.com/mail/?view=cm&to=shivashankar.7991@gmail.com&su=Project%20Enquiry&body=Hi%20Shiva%2C%20I%27d%20love%20to%20work%20with%20you!"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-gold btn-lg"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Email on Gmail
            </a>
            <a
              href="https://wa.me/918341928526?text=Hi%20Shiva%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project!"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-wa btn-lg"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ContactPage — the FULL contact page with Telegram form
// ============================================================
export default function ContactPage() {
  const [form, setForm]     = useState({ name: "", email: "", project: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendToTelegram = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const text =
`🔔 *New Portfolio Enquiry!*

👤 *Name:* ${form.name}
📧 *Email:* ${form.email}
💼 *Project Type:* ${form.project || "Not specified"}
💬 *Message:*
${form.message}

📅 ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setForm({ name: "", email: "", project: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="contact-page">
      <div className="wrap">
        <div className="contact-layout">

          {/* LEFT — Photo + intro */}
          <div className="contact-left fi" style={{ "--i": 0 }}>
            <div className="photo-wrap">
              <img src="/shiva.jpg" alt="Shiva — Web Designer & Developer" />
              <div className="photo-badge">
                <span className="pulse-dot" /> Available for work
              </div>
            </div>

            <div className="contact-intro">
              <h1>Hey, I'm <span className="gold">Shiva</span> 👋</h1>
              <p>
                Web designer &amp; developer based in India. I build clean, modern websites
                that help businesses stand out online. Got a project? Let's talk.
              </p>
              <div className="contact-detail">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>+91 83419 28526</span>
              </div>
              <div className="contact-detail">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#facc15" strokeWidth="1.5"/>
                  <path d="M2 7l10 7 10-7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>shivashankar.7991@gmail.com</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className="contact-right fi" style={{ "--i": 2 }}>
            <span className="tag">Get In Touch</span>
            <h2 className="sec-h">Let's build something<br /><em>great together.</em></h2>
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
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handle}
                    required
                  />
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
                    <option value="Website Design">Website Design</option>
                    
                    
                    <option value="Landing Page">Landing Page</option>
                    
                    
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

                <button
                  className="btn btn-gold"
                  type="submit"
                  disabled={status === "sending"}
                  style={{ marginTop: 4, width: "100%", justifyContent: "center" }}
                >
                  {status === "sending" ? "Sending..." : (
                    <>
                      Send Message
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>

              </form>
            )}

            <div className="response-note" style={{ marginTop: 20 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="var(--muted)" strokeWidth="1.5"/>
                <polyline points="12 6 12 12 16 14" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              I typically respond within <strong>24 hours.</strong>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}