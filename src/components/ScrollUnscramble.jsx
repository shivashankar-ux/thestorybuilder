import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

const WORDS = [
  "Stories",
  "convert,",
  "one",
  "brand",
  "at",
  "a",
  "time.",
];

// Precompute 3D offset factors matching the exact math from the zip file
function getLetterFactors(indexInWord) {
  const i = indexInWord + 1; // 1-based index
  const dir = 1 - 2 * (i % 2);
  const rand = ((i * 7 + 20) % 4) - 4;
  const wave = Math.sin(i * 17 * (Math.PI / 180));
  const yFactor = (rand + wave) * dir;
  const zFactor = Math.abs(rand * 2 + wave) * 0.02 * 13;
  return { yFactor, zFactor };
}

function ScrambleChar({ char, yFactor, zFactor, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0.15, 0.65], [yFactor * 75, 0]);
  const z = useTransform(scrollYProgress, [0.15, 0.65], [zFactor * 75, 0]);
  const transform = useMotionTemplate`translate3d(0px, ${y}px, ${z}px)`;

  return (
    <motion.span
      aria-hidden="true"
      className="scramble-char"
      style={{ transform }}
    >
      {char}
    </motion.span>
  );
}

export default function ScrollUnscramble() {
  const containerRef = useRef(null);

  // Bind scroll progress across this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="scramble-section" id="scramble-reveal">
      <div className="scramble-bg" aria-hidden="true">
        <div className="scramble-orb o-left" />
        <div className="scramble-orb o-right" />
        <div className="scramble-grid-dots" />
      </div>

      <div className="scramble-sticky">
        <div className="scramble-header-badge">
          <span className="tag">THE STORY BUILDER PHILOSOPHY</span>
        </div>

        <div className="scramble-wrap">
          {WORDS.map((word, wIdx) => {
            const isHighlight = wIdx === 1; // "convert,"
            return (
              <p
                key={wIdx}
                aria-label={word}
                className={`scramble-word ${isHighlight ? "highlight-word" : ""}`}
              >
                {word.split("").map((char, cIdx) => {
                  const { yFactor, zFactor } = getLetterFactors(cIdx);
                  return (
                    <ScrambleChar
                      key={cIdx}
                      char={char}
                      yFactor={yFactor}
                      zFactor={zFactor}
                      scrollYProgress={scrollYProgress}
                    />
                  );
                })}
              </p>
            );
          })}
        </div>

        <div className="scramble-mouse" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mouse-icon"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z" />
            <path d="M12 7l0 4" />
            <path d="M8 26l4 4l4 -4">
              <animateTransform
                attributeType="XML"
                attributeName="transform"
                type="translate"
                values="0 0; 0 4; 0 0"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          <span className="mouse-text">Scroll to unscramble</span>
        </div>
      </div>
    </section>
  );
}
