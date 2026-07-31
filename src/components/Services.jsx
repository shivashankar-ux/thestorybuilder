import { motion } from "framer-motion";
import Services3DDeck from "./Services3DDeck";

export default function Services({ setPage }) {
  return (
    <section className="about" id="what-we-do" style={{ borderTop: "none" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <motion.span
            className="tag"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What We Do
          </motion.span>

          <motion.h2
            className="sec-h"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "16px" }}
          >
            Services engineered for <em>growth.</em>
          </motion.h2>

          <motion.p
            className="muted"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            We provide a complete suite of digital services designed to elevate your brand and drive measurable results.
          </motion.p>
        </div>
      </div>

      <Services3DDeck setPage={setPage} />
    </section>
  );
}
