import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase, isSupabaseConfigured } from "../../utils/supabaseClient";
import CheckoutModal from "./CheckoutModal";

const fallbackEbooks = [
  {
    id: "fb-astro",
    title: "Astrology for Beginners: Astro 6 Playbook",
    slug: "astro6-for-beginners",
    description: "Master planetary positions, natal charts, zodiac house alignments, and practical horoscopes step-by-step with this complete playbook.",
    cover_image_url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    price_inr: 499,
    file_url: "ebooks-private/Astro6-for-Beginners.docx",
  },
  {
    id: "fb-1",
    title: "The 7-Day Web Design & Conversion Blueprint",
    slug: "7-day-web-design-blueprint",
    description: "The exact blueprint used by high-converting digital agencies to build, launch, and monetize premium custom websites in 7 days flat.",
    cover_image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    price_inr: 499,
    file_url: "ebooks-private/Astro6-for-Beginners.docx",
  },
  {
    id: "fb-2",
    title: "Performance Marketing Playbook for Founders",
    slug: "performance-marketing-playbook",
    description: "Master Meta & Google Ads without burning budget. Learn audience targeting, creative testing framework, and scale ROAS predictably.",
    cover_image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    price_inr: 799,
    file_url: "ebooks/sample-2.pdf",
  },
  {
    id: "fb-3",
    title: "Brand Authority & Storybuilding Masterclass",
    slug: "brand-authority-masterclass",
    description: "Craft compelling brand messaging, high-status visual identity, and positions that command premium pricing in crowded markets.",
    cover_image_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    price_inr: 599,
    file_url: "ebooks/sample-3.pdf",
  },
];

export default function StoreFrontPage({ setPage }) {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEbooks() {
      setLoading(true);
      try {
        if (isSupabaseConfigured()) {
          const { data, error } = await supabase
            .from("ebooks")
            .select("*")
            .order("created_at", { ascending: false });

          if (!error && data && data.length > 0) {
            setEbooks(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch ebooks from Supabase, using fallback ebooks list:", err);
      }
      setEbooks(fallbackEbooks);
      setLoading(false);
    }

    fetchEbooks();
  }, []);

  const handleBuyNow = (ebook) => {
    setSelectedEbook(ebook);
    setIsModalOpen(true);
  };

  const handlePurchaseSuccess = ({ order_id }) => {
    setIsModalOpen(false);
    if (setPage) {
      setPage(`/store/success?order_id=${order_id}`);
    } else {
      window.location.href = `/store/success?order_id=${order_id}`;
    }
  };

  return (
    <main className="store-page-wrapper">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="dots" />
      </div>

      <div className="wrap">
        {/* STORE HEADER */}
        <header className="store-header">
          <span className="tag">DIGITAL EBOOK STORE</span>
          <h1 className="sec-h">
            Actionable Playbooks for<br />
            <em>Founders & Creators.</em>
          </h1>
          <p className="muted store-intro">
            Proven frameworks, step-by-step guides, and digital blueprints to accelerate your web design, branding, and performance marketing.
          </p>
        </header>

        {/* EBOOKS GRID */}
        {loading ? (
          <div className="store-loading-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="store-card-skeleton" />
            ))}
          </div>
        ) : (
          <div className="store-grid">
            {ebooks.map((ebook, idx) => (
              <motion.article
                key={ebook.id}
                className="store-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <div
                  className="store-card-cover-wrapper"
                  onClick={() => setPage && setPage(`/store/${ebook.slug}`)}
                >
                  <img
                    src={ebook.cover_image_url}
                    alt={ebook.title}
                    className="store-card-cover-img"
                    loading="lazy"
                  />
                  <span className="store-card-badge">DIGITAL PDF</span>
                </div>

                <div className="store-card-body">
                  <h3
                    className="store-card-title"
                    onClick={() => setPage && setPage(`/store/${ebook.slug}`)}
                  >
                    {ebook.title}
                  </h3>

                  <p className="store-card-desc">{ebook.description}</p>

                  <div className="store-card-footer">
                    <div className="store-card-price-row">
                      <span className="store-card-price">₹{ebook.price_inr}</span>
                      <span className="store-card-tax">Instant PDF Download</span>
                    </div>

                    <div className="store-card-actions">
                      <button
                        className="btn btn-gold btn-sm"
                        onClick={() => handleBuyNow(ebook)}
                      >
                        Buy Now
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setPage && setPage(`/store/${ebook.slug}`)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* TRUST BADGES / GUARANTEE */}
        <section className="store-guarantee-section">
          <div className="store-guarantee-card">
            <div className="store-guarantee-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h4>100% Secure Checkout & Instant Access</h4>
              <p>Purchases are encrypted via Razorpay. Direct PDF download link delivered instantly to your inbox.</p>
            </div>
          </div>
        </section>
      </div>

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        ebook={selectedEbook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePurchaseSuccess}
      />
    </main>
  );
}
