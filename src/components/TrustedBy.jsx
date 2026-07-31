import { motion } from "framer-motion";

const clients = [
  "LEGACY SOLAR",
  "STAR FITNESS",
  "WAFFLESHUB",
  "CHESS ACADEMY",
  "UNBENT",
  "DIGITALWITHCHIRAG",
  "SIOLIM CAFE",
  "SEVACTION",
  "WHITE CLOSET",
  "CHECKVSMATE",
];

export default function TrustedBy() {
  return (
    <section className="trusted-by" aria-label="Trusted by these brands" style={{ padding: "48px 0" }}>
      <div className="wrap">
        <motion.p
          className="trusted-label"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "12px", color: "var(--muted)", textAlign: "center", marginBottom: "24px" }}
        >
          Trusted by ambitious brands worldwide
        </motion.p>
        <div className="trusted-marquee" aria-hidden="true" style={{ overflow: "hidden", position: "relative" }}>
          <motion.div
            className="trusted-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            style={{ display: "flex", width: "max-content", gap: "40px" }}
          >
            {[...clients, ...clients].map((c, i) => (
              <motion.span
                className="trusted-logo"
                key={i}
                whileHover={{ scale: 1.08, color: "var(--gold)" }}
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.12em",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "100px",
                  cursor: "default",
                  transition: "color 0.25s, border-color 0.25s",
                }}
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
