import React, { useState, useEffect, useRef } from "react";

const servicesData = [
  {
    id: "website",
    title: "Website Design & Dev",
    kicker: "Core Capability",
    desc: "Lightning-fast, mobile-responsive websites engineered to turn visitors into leads and customers.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#facc15" strokeWidth="1.8" />
        <line x1="8" y1="21" x2="16" y2="21" stroke="#facc15" strokeWidth="1.8" />
        <line x1="12" y1="17" x2="12" y2="21" stroke="#facc15" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "social",
    title: "Social Media Growth",
    kicker: "Organic Reach",
    desc: "End-to-end organic social growth. We handle strategy, posting, and community building so you stay top-of-mind.",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#facc15" strokeWidth="1.8" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#facc15" strokeWidth="1.8" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#facc15" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "seo",
    title: "Search Engine SEO",
    kicker: "High Intent",
    desc: "Data-driven SEO strategies that improve organic rankings and drive high-intent search traffic to your brand.",
    img: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=1200&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#facc15" strokeWidth="1.8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#facc15" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "ads",
    title: "Performance Marketing",
    kicker: "Paid Acquisition",
    desc: "ROI-focused ad campaigns on Meta and Google. Media buying engineered to generate qualified business leads.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#facc15" strokeWidth="1.8" />
        <path d="M18 9l-5-5-4 4-4-4" stroke="#facc15" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "reels",
    title: "Reels & Video Production",
    kicker: "Short Form",
    desc: "Viral-ready short-form content. Scripted, shot, and optimized for algorithms across Instagram and YouTube.",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polygon points="23 7 16 12 23 17 23 7" stroke="#facc15" strokeWidth="1.8" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="#facc15" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "branding",
    title: "Branding & Identity",
    kicker: "Visual System",
    desc: "Complete visual systems. Logos, typography, and guidelines that make your business stand out from day one.",
    img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&q=80",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 6 6 1-4.5 4.4 1 6.6L12 17l-5.5 3 1-6.6L3 9l6-1 3-6z" stroke="#facc15" strokeWidth="1.8" />
      </svg>
    ),
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
              style={{ backgroundImage: `url('${service.img}')` }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="services-slide-overlay" />
              <div className="services-slide-content">
                <div className="services-avatar-badge">
                  <img
                    className="circle"
                    src={service.avatar}
                    alt={service.title}
                  />
                  <div className="icon-subbadge">{service.icon}</div>
                </div>
                <span className="services-kicker-tag">{service.kicker}</span>
                <h3 className="services-slide-title">{service.title}</h3>
                <p className="services-slide-desc">{service.desc}</p>

                {setPage && (
                  <button
                    className="services-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPage("contact");
                    }}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          );
        })}

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
