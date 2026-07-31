import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * SplitText — Animates text word-by-word or line-by-line on scroll entry.
 *
 * Props:
 *   text       – string to animate
 *   as         – HTML tag to render (default: "span")
 *   className  – class forwarded to wrapper
 *   delay      – initial delay in seconds (default: 0)
 *   stagger    – stagger between words in seconds (default: 0.04)
 *   duration   – per-word duration in seconds (default: 0.55)
 *   amount     – viewport intersection amount (default: 0.5)
 *   once       – animate only once (default: true)
 *   splitBy    – "words" | "chars" (default: "words")
 *   y          – slide distance in px (default: 28)
 */
export default function SplitText({
  text = "",
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.04,
  duration = 0.55,
  amount = 0.5,
  once = true,
  splitBy = "words",
  y = 28,
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  // Split into tokens (words or chars)
  const tokens =
    splitBy === "chars"
      ? text.split("")
      : text.split(" ").filter(Boolean);

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const word = {
    hidden: { opacity: 0, y, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: "inline", ...style }}
      // Full text for screen readers — the spans below are aria-hidden
      aria-label={text}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-hidden="true"
        style={{ display: "inline" }}
      >
        {tokens.map((token, i) => (
          <motion.span
            key={i}
            variants={word}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {token}
            {splitBy === "words" && i < tokens.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
