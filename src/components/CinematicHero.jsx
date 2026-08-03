import React, { Suspense, useEffect, useRef } from "react";
import Lenis from "lenis";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import Scene from "./canvas/Scene";

export default function CinematicHero() {
  const containerRef = useRef(null);
  
  // Use Framer Motion to tie opacity to the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade out smoothly during the last 20% of the scroll (from 0.8 to 1.0)
  // This creates a buttery seamless transition before the next section arrives
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);

  useEffect(() => {
    // Slower, butter-smooth Lenis configuration for that heavy 3D feel
    const lenis = new Lenis({
      duration: 1.8, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.8, 
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    // 400vh gives us plenty of runway for the 3D scroll physics
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      <motion.div 
        style={{ opacity, scale }}
        className="sticky top-0 left-0 w-full h-[100vh] overflow-hidden bg-[#050505]"
      >
        <Suspense fallback={null}>
          <Canvas
            shadows
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, 2]} // Crisp native 4K scaling while capping max density
            className="absolute inset-0 z-0"
          >
            <color attach="background" args={["#050505"]} />
            <Scene />
          </Canvas>
        </Suspense>

        {/* HTML Overlay text */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center p-6 mix-blend-difference z-10">
           <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tight opacity-95 mt-[-10vh]" style={{ fontFamily: 'Inter, sans-serif' }}>
              The Story Builder
           </h1>
           <p className="text-gray-300 text-lg md:text-2xl max-w-2xl mt-8 tracking-wide font-light">
              We don't build websites.<br/><span className="text-white font-medium">We build digital experiences.</span>
           </p>
        </div>
      </motion.div>
      <Loader />
    </section>
  );
}
