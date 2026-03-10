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
// ContactPage — the FULL contact page (replaces contact.html)
// ============================================================
export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="wrap">
        <div className="contact-layout">

          {/* LEFT — Photo + intro */}
          <div className="contact-left fi" style={{ "--i": 0 }}>
            <div className="photo-wrap">
              {/* 🔑 In React/Vite, images go in /public folder
                  and are referenced from root like this: */}
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

          {/* RIGHT — Contact action cards */}
          <div className="contact-right fi" style={{ "--i": 2 }}>
            <span className="tag">Get In Touch</span>
            <h2 className="sec-h">Let's build something<br /><em>great together.</em></h2>
            <p className="muted">
              Whether you have a project, a question, or just want to say hi —
              reach out and I'll get back to you fast.
            </p>

            <div className="reach-card">
              <div className="reach-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#facc15" strokeWidth="1.5"/>
                  <path d="M2 7l10 7 10-7" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="reach-text">
                <h3>Email Me</h3>
                <p>Opens Gmail with a message ready to send.</p>
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&to=shivashankar.7991@gmail.com&su=Project%20Enquiry&body=Hi%20Shiva%2C%20I%27d%20love%20to%20work%20with%20you!"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-gold"
              >
                Email
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="reach-card">
              <div className="reach-icon wa-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#25d366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="reach-text">
                <h3>WhatsApp Me</h3>
                <p>Fastest way to reach me. Usually reply within hours.</p>
              </div>
              <a
                href="https://wa.me/918341928526?text=Hi%20Shiva%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project!"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-wa"
              >
                Chat
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="response-note">
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
