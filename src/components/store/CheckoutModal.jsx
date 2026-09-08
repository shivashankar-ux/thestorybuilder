import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutModal({ ebook, isOpen, onClose, onSuccess }) {
  const [buyerName, setBuyerName] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("tsb_buyer_name") || "Customer";
    return "Customer";
  });
  const [buyerEmail, setBuyerEmail] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("tsb_buyer_email") || "";
    return "";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !ebook || typeof document === "undefined" || !document.body) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!buyerName.trim() || buyerName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!buyerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("tsb_buyer_name", buyerName.trim());
      localStorage.setItem("tsb_buyer_email", buyerEmail.trim());
    }

    setLoading(true);

    try {
      // 1. Create order on server (tries /api/create-order, fallback www, or fallback /api/razorpay/create-order)
      const orderPayload = JSON.stringify({
        ebook_id: ebook.id,
        amount: Math.round(Number(ebook.price_inr || 499) * 100),
        buyer_name: buyerName.trim(),
        buyer_email: buyerEmail.trim(),
      });

      let res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: orderPayload,
      });

      if (!res.ok) {
        res = await fetch("https://www.thestorybuilder.in/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: orderPayload,
        });
      }

      if (!res.ok) {
        res = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: orderPayload,
        });
      }

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to create payment order. Please try again.");
      }

      // 2. Load Razorpay SDK
      const sdkReady = await loadRazorpayScript();
      if (!sdkReady) {
        throw new Error("Failed to load Razorpay payment SDK. Please check your internet connection.");
      }

      // 3. Configure and open Razorpay Checkout modal
      const options = {
        key: data.key_id || import.meta.env.ITE_RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TZe3RioKUQ4fhP",
        amount: data.amount,
        currency: data.currency || "INR",
        name: "The Story Builder",
        description: `Ebook: ${ebook.title}`,
        image: ebook.cover_image_url || "https://thestorybuilder.in/logo.png",
        order_id: data.order_id,
        prefill: {
          name: buyerName.trim(),
          email: buyerEmail.trim(),
        },
        theme: {
          color: "#f97316",
        },
        handler: async function (response) {
          setLoading(true);
          try {
            const verifyPayload = JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // 4. Verify payment signature on server
            let verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: verifyPayload,
            });

            if (!verifyRes.ok) {
              verifyRes = await fetch("https://www.thestorybuilder.in/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: verifyPayload,
              });
            }

            if (!verifyRes.ok) {
              verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: verifyPayload,
              });
            }

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.ok) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }

            // 5. Success callback
            setLoading(false);
            if (onSuccess) {
              onSuccess({
                order_id: response.razorpay_order_id,
                download_url: verifyData.download_url,
                ebook: verifyData.ebook || ebook,
              });
            }
          } catch (vErr) {
            setLoading(false);
            setError(vErr.message || "Payment verification failed.");
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (resp) {
        setLoading(false);
        setError(resp.error?.description || "Payment failed. Please try again.");
      });
      razorpayInstance.open();
    } catch (err) {
      setLoading(false);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <div className="store-modal-overlay" onClick={onClose}>
        <motion.div
          className="store-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="store-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>

          <div className="store-modal-header">
            <span className="store-modal-badge">INSTANT ACCESS</span>
            <h3 className="store-modal-title">Complete Your Purchase</h3>
            <p className="store-modal-subtitle">
              Enter your details to receive <strong>{ebook.title}</strong> directly in your inbox.
            </p>
          </div>

          <div className="store-modal-summary">
            <div className="store-modal-cover">
              <img src={ebook.cover_image_url} alt={ebook.title} />
            </div>
            <div className="store-modal-details">
              <span className="store-modal-book-title">{ebook.title}</span>
              <span className="store-modal-book-price">₹{ebook.price_inr}</span>
            </div>
          </div>

          {error && (
            <div className="store-modal-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="store-modal-form">
            <div className="form-group">
              <label htmlFor="buyerName">Your Name</label>
              <input
                id="buyerName"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="buyerEmail">Email Address (for download link)</label>
              <input
                id="buyerEmail"
                type="email"
                placeholder="rahul@example.com"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                disabled={loading}
                autoFocus
                required
              />
            </div>

            <button type="submit" className="btn btn-gold btn-full" disabled={loading}>
              {loading ? (
                <span className="btn-spinner-wrapper">
                  <span className="btn-spinner" /> Preparing Secure Checkout...
                </span>
              ) : (
                <>
                  Pay ₹{ebook.price_inr} with Razorpay
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="store-modal-footer-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>256-Bit Encrypted Payment via Razorpay. No account required.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
