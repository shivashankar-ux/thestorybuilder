import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function CinematicHero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Ultra-smooth Lenis configuration
    const lenis = new Lenis({
      duration: 2.0, // Slower base scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.5, // Heavier mouse wheel
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Image Sequence Logic
    const context = canvasRef.current.getContext("2d");
    const frameCount = 191;
    const currentFrame = (index) => 
      `/ezgif/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

    const images = [];
    
    // Draw the first frame immediately
    const firstImg = new Image();
    firstImg.src = currentFrame(1);
    firstImg.onload = () => {
      renderImage(firstImg);
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const renderImage = (img) => {
      if (!canvasRef.current || !context) return;
      const canvas = canvasRef.current;
      
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // Buttery-smooth frame interpolation (lerp)
    let currentFrameIndex = 0;
    let targetFrameIndex = 0;
    let frameRafId;

    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const drawLoop = () => {
      // This decoupling makes it feel like a heavy 3D engine rather than a simple video scrub
      currentFrameIndex = lerp(currentFrameIndex, targetFrameIndex, 0.08);
      
      const index = Math.round(currentFrameIndex);
      if (images[index] && images[index].complete) {
         renderImage(images[index]);
      } else if (firstImg.complete) {
         renderImage(firstImg);
      }
      frameRafId = requestAnimationFrame(drawLoop);
    };
    
    frameRafId = requestAnimationFrame(drawLoop);

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      if (images[Math.round(currentFrameIndex)]?.complete) {
         renderImage(images[Math.round(currentFrameIndex)]);
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleScroll = () => {
      // Extended depth to 500vh to slow the sequence down significantly
      const maxScroll = window.innerHeight * 5; 
      const scrollY = Math.max(0, window.scrollY);
      const scrollFraction = scrollY / maxScroll;
      
      targetFrameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      if (targetFrameIndex < 0) targetFrameIndex = 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(frameRafId);
      lenis.destroy();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // 600vh height gives a huge runway for the 191 frames
    <section ref={sectionRef} className="relative w-full h-[600vh] bg-[#050505]">
      <div className="sticky top-0 left-0 w-full h-[100vh] overflow-hidden">
        
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

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
    </section>
  );
}
