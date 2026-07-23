import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const instagramPosts = [
  {
    id: 1,
    type: "carousel",
    images: [
      "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&q=80",
      "https://images.unsplash.com/photo-1616423641405-4ddfa46b3e77?w=800&q=80",
    ],
    caption: "Latest brand identity system.",
  },
  {
    id: 2,
    type: "static",
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    caption: "Behind the scenes at the studio.",
  },
  {
    id: 3,
    type: "carousel",
    images: [
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80",
    ],
    caption: "UI/UX flow explorations.",
  },
  {
    id: 4,
    type: "static",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    caption: "Web development setup.",
  },
  {
    id: 5,
    type: "static",
    src: "https://images.unsplash.com/photo-1481481600465-b1a7d5300ec3?w=800&q=80",
  },
  {
    id: 6,
    type: "carousel",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    ],
  },
];

const CarouselIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    style={{
      position: "absolute",
      top: "12px",
      right: "12px",
      zIndex: 10,
      dropShadow: "0 2px 4px rgba(0,0,0,0.5)",
    }}
  >
    <rect x="4" y="8" width="12" height="12" rx="2" fill="white" fillOpacity="0.9" />
    <path
      d="M8 6V5C8 4.44772 8.44772 4 9 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}
    />
  </svg>
);

export default function InstagramPortfolio() {
  const [lightbox, setLightbox] = useState({ open: false, postIndex: 0, imageIndex: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  const openLightbox = (postIndex) => {
    setLightbox({ open: true, postIndex, imageIndex: 0 });
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setLightbox({ open: false, postIndex: 0, imageIndex: 0 });
    document.body.style.overflow = "auto";
  };

  const currentPost = instagramPosts[lightbox.postIndex];
  const isCarousel = currentPost?.type === "carousel";
  const currentImages = isCarousel ? currentPost.images : [currentPost?.src];

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (isCarousel) {
      setLightbox((prev) => ({
        ...prev,
        imageIndex: (prev.imageIndex + 1) % currentImages.length,
      }));
    }
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (isCarousel) {
      setLightbox((prev) => ({
        ...prev,
        imageIndex: (prev.imageIndex - 1 + currentImages.length) % currentImages.length,
      }));
    }
  };

  return (
    <section className="projects" id="instagram-portfolio">
      <div className="wrap">
        <span className="tag sr">Portfolio</span>
        <div className="proj-header sr">
          <h2 className="sec-h">
            Our <em>Instagram</em> Content
          </h2>
          <p className="muted">
            A snapshot of our latest work, insights, and studio life.
          </p>
        </div>

        <div
          className="sr"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {instagramPosts.map((post, i) => {
            const thumbSrc = post.type === "carousel" ? post.images[0] : post.src;
            return (
              <article
                key={post.id}
                className="card"
                style={{ cursor: "pointer", position: "relative" }}
                onClick={() => openLightbox(i)}
              >
                <div className="card-img-wrap" style={{ aspectRatio: "1/1" }}>
                  <img src={thumbSrc} alt={post.caption || "Instagram Post"} loading="lazy" />
                </div>
                {post.type === "carousel" && <CarouselIcon />}
              </article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(5,7,15,0.92)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10000,
                fontSize: "24px",
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              &times;
            </button>

            <div
              style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image
            >
              <img
                src={currentImages[lightbox.imageIndex]}
                alt="Enlarged Post"
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                }}
              />

              {isCarousel && currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: "absolute",
                      left: "-20px",
                      top: "50%",
                      transform: "translate(-100%, -50%)",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}
                  >
                    &#8249;
                  </button>
                  <button
                    onClick={nextImage}
                    style={{
                      position: "absolute",
                      right: "-20px",
                      top: "50%",
                      transform: "translate(100%, -50%)",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}
                  >
                    &#8250;
                  </button>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-36px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {currentImages.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: lightbox.imageIndex === idx ? "#facc15" : "rgba(255,255,255,0.3)",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Optional Caption */}
            {currentPost.caption && (
              <div 
                style={{
                  position: "absolute",
                  bottom: "32px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(15, 24, 39, 0.9)", // matches var(--card)
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  color: "#eef2ff",
                  fontSize: "14px",
                  backdropFilter: "blur(4px)",
                  textAlign: "center",
                  maxWidth: "80vw"
                }}
              >
                {currentPost.caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
