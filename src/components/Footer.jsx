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
            <a
              className="logo"
              href="/"
              onClick={(e) => { e.preventDefault(); navTo("home"); }}
              style={{ background: "none", border: "none", fontFamily: "var(--fd)", fontSize: 24, fontWeight: 800, color: "#fff", cursor: "pointer", padding: 0, marginBottom: 16, display: "block", textDecoration: "none" }}
            >
              <span style={{ color: "var(--gold, #facc15)" }}>The </span>Story Builder
            </a>
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
              <li><a href="/" onClick={(e) => { e.preventDefault(); navTo("home"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Home</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navTo("services"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Services</a></li>
              <li><a href="/pricing" onClick={(e) => { e.preventDefault(); navTo("pricing"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Pricing Plans</a></li>
              <li><a href="/#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Case Studies</a></li>
              <li><a href="/faq" onClick={(e) => { e.preventDefault(); navTo("faq"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>FAQ</a></li>
              <li><a href="/contact" onClick={(e) => { e.preventDefault(); navTo("contact"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Contact Us</a></li>
            </ul>
          </div>

          {/* COL 3: Services */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
              Core Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <li><a href="/services/web-development" onClick={(e) => { e.preventDefault(); navTo("service-web-dev"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Web Development</a></li>
              <li><a href="/services/performance-marketing" onClick={(e) => { e.preventDefault(); navTo("service-perf-mktg"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Performance Marketing</a></li>
              <li><a href="/services/seo-services-hyderabad" onClick={(e) => { e.preventDefault(); navTo("service-seo"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>SEO Services Hyderabad</a></li>
              <li><a href="/services/google-ads-hyderabad" onClick={(e) => { e.preventDefault(); navTo("service-google-ads"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Google Ads Hyderabad</a></li>
              <li><a href="/services/social-media-marketing" onClick={(e) => { e.preventDefault(); navTo("service-smm"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Social Media Marketing</a></li>
              <li><a href="/services/branding" onClick={(e) => { e.preventDefault(); navTo("service-branding"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Brand Strategy</a></li>
            </ul>
          </div>

          {/* COL 4: Legal & Connect */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
              Legal & Privacy
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14, marginBottom: 20 }}>
              <li><a href="/privacy" onClick={(e) => { e.preventDefault(); navTo("privacy"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Policy</a></li>
              <li><a href="/terms" onClick={(e) => { e.preventDefault(); navTo("terms"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Terms & Conditions</a></li>
              <li><a href="/cookies" onClick={(e) => { e.preventDefault(); navTo("cookies"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Cookie Policy</a></li>
              <li><a href="/disclaimer" onClick={(e) => { e.preventDefault(); navTo("disclaimer"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Disclaimer</a></li>
              <li><a href="/refund-cancellation" onClick={(e) => { e.preventDefault(); navTo("refund"); }} style={{ color: "#94a3b8", textDecoration: "none" }}>Refund & Cancellation</a></li>
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
