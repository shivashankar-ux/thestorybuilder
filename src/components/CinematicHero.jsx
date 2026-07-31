import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import Scene from "./canvas/Scene";
import CinematicFallbackBg from "./CinematicFallback";

/**
 * CinematicHero — WebGL 3D scene with scroll-driven fade.
 * Wrapped in an ErrorBoundary in App.jsx that shows a graceful gradient
 * background fallback if Three.js / WebGL fails.
 */
export default function CinematicHero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0.75, 1], [1, 0.94]);

  // Cap DPR to 1.5 to protect battery / GPU on high-density screens
  const dpr = typeof window !== "undefined"
    ? Math.min(window.devicePixelRatio ?? 1, 1.5)
    : 1;

  return (
    <section
      ref={containerRef}
      className="cinematic-hero-section"
      aria-hidden="true"
    >
      <motion.div
        className="cinematic-hero-sticky"
        style={{ opacity, scale }}
      >
        <Suspense fallback={<CinematicFallbackBg />}>
          <Canvas
            shadows
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, dpr]}
          >
            <color attach="background" args={["#050505"]} />
            <Scene />
          </Canvas>
        </Suspense>
      </motion.div>
      <Loader />
    </section>
  );
}
