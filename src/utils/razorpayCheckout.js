/**
 * razorpayCheckout.js
 * Direct, no-modal Razorpay checkout utility.
 * Preload script on import to reduce launch latency.
 */

// Preload Razorpay script as soon as this module is imported
let scriptPromise = null;

export function preloadRazorpay() {
  if (scriptPromise) return scriptPromise;
  if (window.Razorpay) {
    scriptPromise = Promise.resolve(true);
    return scriptPromise;
  }
  scriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
  return scriptPromise;
}

// Auto-preload on import
if (typeof window !== "undefined") {
  preloadRazorpay();
}

const PRIMARY_API = "https://www.thestorybuilder.in/api/create-order";
const FALLBACK_API = "/api/create-order";

const PRIMARY_VERIFY = "https://www.thestorybuilder.in/api/verify-payment";
const FALLBACK_VERIFY = "/api/verify-payment";

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

/**
 * Open Razorpay checkout directly — no modal, no intermediate step.
 * @param {object} ebook  - ebook object with id, title, price_inr, cover_image_url
 * @param {function} onSuccess - called with { order_id, download_url }
 * @param {function} onError   - called with error message string
 */
export async function startRazorpayCheckout({ ebook, onSuccess, onError }) {
  try {
    const savedName  = (typeof window !== "undefined" && localStorage.getItem("tsb_buyer_name"))  || "";
    const savedEmail = (typeof window !== "undefined" && localStorage.getItem("tsb_buyer_email")) || "";

    const payload = {
      ebook_id:    ebook.id,
      amount:      Math.round(Number(ebook.price_inr || 2) * 100),
      buyer_name:  savedName  || "Customer",
      buyer_email: savedEmail || "",
    };

    // 1. Create Razorpay order (try prod first, fallback to local)
    let result;
    try {
      result = await postJson(PRIMARY_API, payload);
    } catch (_) {
      result = await postJson(FALLBACK_API, payload);
    }

    if (!result.ok || !result.data.ok) {
      throw new Error(result.data?.error || "Failed to create payment order.");
    }

    const { order_id, amount, currency, key_id } = result.data;

    // 2. Ensure Razorpay SDK is ready (already preloaded, should be instant)
    const sdkReady = await preloadRazorpay();
    if (!sdkReady) throw new Error("Razorpay SDK failed to load. Check your internet connection.");

    // 3. Open Razorpay checkout — directly, no popup needed on our end
    const options = {
      key:         key_id || import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TZe3RioKUQ4fhP",
      amount,
      currency:    currency || "INR",
      name:        "The Story Builder",
      description: ebook.title,
      image:       ebook.cover_image_url || "https://thestorybuilder.in/logo.png",
      order_id,
      prefill: {
        name:  savedName,
        email: savedEmail,
      },
      theme:  { color: "#f97316" },
      config: { display: { hide: [], preferences: { show_default_blocks: true } } },
      handler: async (response) => {
        try {
          const verifyPayload = {
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,
          };

          let vResult;
          try {
            vResult = await postJson(PRIMARY_VERIFY, verifyPayload);
          } catch (_) {
            vResult = await postJson(FALLBACK_VERIFY, verifyPayload);
          }

          if (!vResult.ok || !vResult.data.ok) {
            throw new Error(vResult.data?.error || "Payment verification failed.");
          }

          // Store name/email for next time
          if (vResult.data.ebook) {
            try {
              if (response.razorpay_payment_id) {
                localStorage.setItem("tsb_last_payment_id", response.razorpay_payment_id);
              }
            } catch (_) {}
          }

          onSuccess({
            order_id:     response.razorpay_order_id,
            download_url: vResult.data.download_url,
            ebook:        vResult.data.ebook || ebook,
          });
        } catch (err) {
          onError(err.message || "Payment verification failed.");
        }
      },
      modal: {
        ondismiss: () => {
          // User closed Razorpay — just reset loading state
          onError(null); // null = cancelled, not an error
        },
        animation: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (resp) => {
      onError(resp.error?.description || "Payment failed. Please try again.");
    });

    rzp.open();
  } catch (err) {
    onError(err.message || "Something went wrong. Please try again.");
  }
}
