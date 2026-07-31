import React, { useState, useRef } from "react";

const servicesData = [
  {
    id: "website",
    title: "Studio Habitare",
    category: "ARCHITECTURE & WEB",
    url: "s-hab.com",
    desc: "Lightning-fast, mobile-responsive websites engineered to turn visitors into leads and customers.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "social",
    title: "SocialScale",
    category: "ORGANIC GROWTH",
    url: "socialscale.co",
    desc: "End-to-end organic social growth. Strategy, viral reels, and community building.",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "seo",
    title: "Ryvo Search Engine",
    category: "HIGH INTENT SEO",
    url: "ryvosolutions.com",
    desc: "Data-driven SEO strategies that improve organic rankings and drive search traffic.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ads",
    title: "Capable Growth Engine",
    category: "PERFORMANCE ADS",
    url: "capablegroup.com",
    desc: "ROI-focused ad campaigns on Meta and Google to generate qualified business leads.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "reels",
    title: "Reels & Video Suite",
    category: "VIRAL PRODUCTION",
    url: "thestorybuilder.in/video",
    desc: "Scripted, shot, and edited short-form content for Instagram and YouTube algorithms.",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "branding",
    title: "Brand Systems",
    category: "IDENTITY & DESIGN",
    url: "thestorybuilder.in/branding",
    desc: "Complete visual identity, typography, and brand design guidelines.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Services3DDeck({ setPage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const total = servicesData.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (diffX > 40) prevSlide();
    if (diffX < -40) nextSlide();
  };

  const getOffsetClass = (index) => {
    let diff = index - activeIndex;
    while (diff > Math.floor(total / 2)) diff -= total;
    while (diff < -Math.floor(total / 2)) diff += total;

    if (diff === -2) return "slide-1";
    if (diff === -1) return "slide-2";
    if (diff === 0) return "slide-3 active-slide";
    if (diff === 1) return "slide-4";
    if (diff === 2) return "slide-5";
    return "slide-hidden";
  };

  return (
    <div className="services-3d-wrapper">
      <div
        className="services-slider-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {servicesData.map((service, index) => {
          const slotClass = getOffsetClass(index);
          return (
            <div
              key={service.id}
              className={`services-slide ${slotClass}`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Top Browser Bar */}
              <div className="browser-header-bar">
                <div className="browser-dots">
                  <span className="browser-dot red" />
                  <span className="browser-dot yellow" />
                  <span className="browser-dot green" />
                </div>
                <span className="browser-url-pill">{service.url}</span>
              </div>

              {/* Viewport Frame */}
              <div className="browser-viewport">
                <img
                  className="browser-img"
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                />
              </div>

              {/* Bottom Golden Panel */}
              <div className="browser-golden-panel">
                <div className="bgp-content">
                  <h3 className="bgp-title">{service.title}</h3>
                  <span className="bgp-kicker">{service.category}</span>
                </div>
                <button
                  className="bgp-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (setPage) setPage("contact");
                  }}
                  aria-label={`Explore ${service.title}`}
                  type="button"
                >
                  ↗
                </button>
              </div>
            </div>
          );
        })}

        {/* Controls */}
        <div className="services-deck-controls">
          <button
            className="services-deck-arrow left"
            onClick={prevSlide}
            aria-label="Previous service"
            type="button"
          >
            ‹
          </button>
          <div className="services-deck-dots">
            {servicesData.map((_, idx) => (
              <button
                key={idx}
                className={`services-deck-dot ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
          <button
            className="services-deck-arrow right"
            onClick={nextSlide}
            aria-label="Next service"
            type="button"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
