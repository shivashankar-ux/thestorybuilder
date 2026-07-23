import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function CinematicHero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

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
    const rafId = requestAnimationFrame(raf);

    // Image Sequence Logic
    const context = canvasRef.current.getContext("2d");
    const frameCount = 191;
    const currentFrame = (index) => 
      `/ezgif/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

    // Preload images
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
      
      // Calculate aspect ratio to cover the screen
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // Handle Resize
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      
      // Re-render current frame on resize
      const maxScroll = window.innerHeight * 2;
      const scrollY = Math.max(0, window.scrollY);
      const scrollFraction = scrollY / maxScroll;
      
      let frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      if (frameIndex < 0) frameIndex = 0;
      if (images[frameIndex] && images[frameIndex].complete) {
        renderImage(images[frameIndex]);
      } else if (firstImg.complete) {
        renderImage(firstImg);
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Scroll Logic
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 2;
      const scrollY = Math.max(0, window.scrollY);
      const scrollFraction = scrollY / maxScroll;
      
      let frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      if (frameIndex < 0) frameIndex = 0;
      
      if (images[frameIndex] && images[frameIndex].complete) {
        requestAnimationFrame(() => renderImage(images[frameIndex]));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] bg-[#050505]">
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
