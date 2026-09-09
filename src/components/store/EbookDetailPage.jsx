import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase, isSupabaseConfigured } from "../../utils/supabaseClient";
import { startRazorpayCheckout } from "../../utils/razorpayCheckout";

const fallbackEbooks = [
  {
    id: "fb-astro",
    title: "Astrology for Beginners: Astro 6 Playbook",
    slug: "astro6-for-beginners",
    description: "Master planetary positions, natal charts, zodiac house alignments, and practical horoscopes step-by-step with this complete playbook.",
    cover_image_url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    price_inr: 499,
    file_url: "ebooks-private/Astro6-for-Beginners.docx",
    chapters: [
      "01. Introduction to Planetary Positions & Zodiac Houses",
      "02. Natal Chart Interpretation Frameworks",
      "03. Sun, Moon & Rising Sign Alignment Strategy",
      "04. Planetary Transits & Life Cycle Timing",
      "05. Real-World Case Examples & Step-by-Step Exercises",
    ],
  },
  {
    id: "fb-1",
    title: "The 7-Day Web Design & Conversion Blueprint",
    slug: "7-day-web-design-blueprint",
    description: "The exact blueprint used by high-converting digital agencies to build, launch, and monetize premium custom websites in 7 days flat.",
    cover_image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    price_inr: 499,
    file_url: "ebooks-private/Astro6-for-Beginners.docx",
    chapters: [
      "01. Architecture of High-Converting Landing Pages",
      "02. Typography & Color Tokens for Premium Brands",
      "03. Copywriting Formulas That Drive Immediate Action",
      "04. Technical Performance & Speed Optimization Checklist",
      "05. Client Onboarding & 7-Day Sprint Delivery System",
    ],
  },
  {
    id: "fb-2",
    title: "Performance Marketing Playbook for Founders",
    slug: "performance-marketing-playbook",
    description: "Master Meta & Google Ads without burning budget. Learn audience targeting, creative testing framework, and scale ROAS predictably.",
    cover_image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    price_inr: 799,
    file_url: "ebooks/sample-2.pdf",
    chapters: [
      "01. Structuring Meta & Google Ad Accounts for Scale",
      "02. High-Converting UGC & Static Ad Creative Frameworks",
      "03. Audience Targeting & Custom Retargeting Funnels",
      "04. Landing Page Optimization for Lead Magnet Campaigns",
      "05. Budget Allocation & Daily Scaling Playbook",
    ],
  },
  {
    id: "fb-3",
    title: "Brand Authority & Storybuilding Masterclass",
    slug: "brand-authority-masterclass",
    description: "Craft compelling brand messaging, high-status visual identity, and positions that command premium pricing in crowded markets.",
    cover_image_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    price_inr: 599,
    file_url: "ebooks/sample-3.pdf",
    chapters: [
      "01. The Brand Positioning Spectrum & Value Mapping",
      "02. Designing Logos & Identity Systems That Command Respect",
      "03. Storytelling & Message-Market Fit for Premium Services",
      "04. Building Brand Equity Across Social Touchpoints",
      "05. Case Studies of High-Ticket Brand Transformations",
    ],
  },
];

export default function EbookDetailPage({ slug, setPage }) {
  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function fetchEbook() {
      setLoading(true);
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("ebooks")
            .select("*")
            .eq("slug", slug)
            .single();

          if (!error && data) {
            setEbook(data);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Error fetching ebook by slug from Supabase:", err);
        }
      }

      const found = fallbackEbooks.find((e) => e.slug === slug) || fallbackEbooks[0];
      setEbook(found);
      setLoading(false);
    }

    if (slug) fetchEbook();
  }, [slug]);

  const handleBuyNowClick = async () => {
    if (buying || !ebook) return;
    setBuying(true);
    setErrorMsg(null);

    await startRazorpayCheckout({
      ebook,
      onSuccess: ({ order_id }) => {
        setBuying(false);
        if (setPage) {
          setPage(`/store/success?order_id=${order_id}`);
        } else {
          window.location.href = `/store/success?order_id=${order_id}`;
        }
      },
      onError: (msg) => {
        setBuying(false);
        if (msg) setErrorMsg(msg);
      },
    });
  };

  if (loading) {
    return (
      <main className="store-detail-page-wrapper">
        <div className="hero-bg" aria-hidden="true">
          <div className="orb o1" /><div className="orb o2" /><div className="dots" />
        </div>
        <div className="wrap">
          <div className="store-loading-grid">
            <div className="store-card-skeleton" style={{ height: 600 }} />
          </div>
        </div>
      </main>
    );
  }

  if (!ebook) return null;

  const chapterList = ebook.chapters || [];

  return (
    <main className="store-detail-page-wrapper">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="dots" />
      </div>

      <div className="wrap">
        {/* BREADCRUMB */}
        <nav className="store-breadcrumb">
          <button onClick={() => setPage && setPage("/store")} className="store-back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Store
          </button>
        </nav>

        {/* ERROR BANNER */}
        {errorMsg && (
          <div className="store-error-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} aria-label="Dismiss">×</button>
          </div>
        )}

        {/* HERO / PRODUCT GRID */}
        <div className="store-detail-grid">
          {/* LEFT: COVER ART */}
          <motion.div
            className="store-detail-cover-box"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <img src={ebook.cover_image_url} alt={ebook.title} className="store-detail-cover-img" />
            <span className="store-detail-format-pill">PDF Ebook • Instant Delivery</span>
          </motion.div>

          {/* RIGHT: INFO & BUY CARD */}
          <motion.div
            className="store-detail-info-box"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span className="tag">THE STORY BUILDER PRESS</span>
            <h1 className="store-detail-title">{ebook.title}</h1>
            <p className="store-detail-desc">{ebook.description}</p>

            <div className="store-detail-price-card">
              <div className="price-row">
                <span className="price-amount">₹{ebook.price_inr}</span>
                <span className="price-label">One-Time Payment • Lifetime Access</span>
              </div>

              <button
                className="btn btn-gold btn-large btn-full"
                onClick={handleBuyNowClick}
                disabled={buying}
              >
                {buying ? (
                  <span className="btn-spinner-wrapper">
                    <span className="btn-spinner" /> Launching Razorpay...
                  </span>
                ) : (
                  <>
                    Buy Now — Instant Download
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              <div className="security-badges">
                <span>✓ Secured by Razorpay</span>
                <span>✓ 24-Hour Signed Link</span>
                <span>✓ Email Copy Included</span>
              </div>
            </div>

            {/* WHAT'S INSIDE */}
            <div className="store-detail-chapters">
              <h3>What's Inside This Playbook</h3>
              <ul className="chapter-list">
                {chapterList.map((ch, i) => (
                  <li key={i}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

    </main>
  );
}
