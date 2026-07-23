import React, { Suspense, useEffect, useRef } from "react";
import Lenis from "lenis";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import Scene from "./canvas/Scene";

export default function CinematicHero() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <section className="relative w-full h-[300vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100vh] overflow-hidden">
        <Suspense fallback={null}>
          <Canvas
            shadows
            gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, 2]} // limit pixel ratio for performance
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
      </div>
      <Loader />
    </section>
  );
}
