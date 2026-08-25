export default function Footer({ setPage }) {
  const scrollTo = (id) => {
    if (setPage) setPage({ page: "home", scrollTo: id });
  };

  const navTo = (dest) => {
    if (setPage) setPage(dest);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,10,12,0.95)", padding: "60px 0 30px" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>
          
          {/* COL 1: Brand & Contact Info */}
          <div>
            <button
              className="logo"
              onClick={() => navTo("home")}
              style={{ background: "none", border: "none", fontFamily: "var(--fd)", fontSize: 24, fontWeight: 800, color: "#fff", cursor: "pointer", padding: 0, marginBottom: 16, display: "block" }}
            >
              <span style={{ color: "var(--gold, #facc15)" }}>The </span>Story Builder
            </button>
            <p style={{ color: "var(--muted, #94a3b8)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
              Full-service digital marketing agency engineered for measurable business growth across India.
            </p>
            <div style={{ color: "#cbd5e1", fontSize: 13, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#facc15" }}>📍</span>
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#facc15" }}>📞</span>
                <a href="tel:+918341928526" style={{ color: "inherit", textDecoration: "none" }}>+91 83419 28526</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#facc15" }}>📧</span>
                <a href="mailto:shivashankar.7991@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>shivashankar.7991@gmail.com</a>
              </div>
            </div>
          </div>

          {/* COL 2: Quick Links */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
              Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <li><button onClick={() => navTo("home")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Home</button></li>
              <li><button onClick={() => navTo("services")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Services</button></li>
              <li><button onClick={() => navTo("pricing")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Pricing Plans</button></li>
              <li><button onClick={() => scrollTo("projects")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Case Studies</button></li>
              <li><button onClick={() => navTo("faq")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>FAQ</button></li>
              <li><button onClick={() => navTo("contact")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Contact Us</button></li>
            </ul>
          </div>

          {/* COL 3: Services */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
              Core Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <li><button onClick={() => navTo("service-web-dev")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Web Development</button></li>
              <li><button onClick={() => navTo("service-perf-mktg")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Performance Marketing</button></li>
              <li><button onClick={() => navTo("service-smm")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Social Media Marketing</button></li>
              <li><button onClick={() => navTo("service-branding")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Brand Strategy</button></li>
            </ul>
          </div>

          {/* COL 4: Legal & Connect */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
              Legal & Privacy
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14, marginBottom: 20 }}>
              <li><button onClick={() => navTo("privacy")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Privacy Policy</button></li>
              <li><button onClick={() => navTo("terms")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Terms & Conditions</button></li>
              <li><button onClick={() => navTo("cookies")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Cookie Policy</button></li>
              <li><button onClick={() => navTo("disclaimer")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Disclaimer</button></li>
              <li><button onClick={() => navTo("refund")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Refund & Cancellation</button></li>
            </ul>

            <div style={{ display: "flex", gap: 12 }}>
              <a href="https://wa.me/918341928526" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: "#facc15", fontSize: 20, textDecoration: "none" }}>💬</a>
              <a href="tel:+918341928526" aria-label="Phone" style={{ color: "#facc15", fontSize: 20, textDecoration: "none" }}>📞</a>
              <a href="mailto:shivashankar.7991@gmail.com" aria-label="Email" style={{ color: "#facc15", fontSize: 20, textDecoration: "none" }}>✉️</a>
            </div>
          </div>

        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, color: "var(--muted, #94a3b8)", fontSize: 13 }}>
          <p style={{ margin: 0 }}>© 2026 The Story Builder. All rights reserved.</p>
          <p style={{ margin: 0 }}>Made with precision in Hyderabad, India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
