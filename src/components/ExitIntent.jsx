import { useEffect, useState } from "react";
import { trackEvent } from "../utils/tracking";

const STORAGE_KEY = "tsb_exit_dismissed";
const DISMISS_DAYS = 7;

function wasDismissedRecently() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return false;
    const ts = parseInt(v, 10);
    if (!ts) return false;
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch { /* ignore */ }
}

export default function ExitIntent({ setPage }) {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (wasDismissedRecently()) return;

    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer:coarse)").matches || window.innerWidth < 760);

    let mobileTimer = null;

    const trigger = (reason) => {
      if (hasShown) return;
      setHasShown(true);
      setOpen(true);
      trackEvent("exit_intent_shown", { reason });
    };

    const onMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShown) trigger("mouse_top");
    };

    if (isMobile) {
      // mobile: fire after 30s of presence
      mobileTimer = setTimeout(() => trigger("mobile_30s"), 30_000);
    } else {
      document.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [hasShown]);

  const close = (reason) => {
    markDismissed();
    setOpen(false);
    trackEvent("exit_intent_dismissed", { reason });
  };

  const claim = () => {
    markDismissed();
    setOpen(false);
    trackEvent("exit_intent_claimed");
    setPage("contact");
  };

  if (!open) return null;

  return (
    <div className="exit-overlay" role="dialog" aria-modal="true" aria-labelledby="exit-title">
      <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
        <button className="exit-close" aria-label="Close" onClick={() => close("button")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <span className="exit-eyebrow">Wait — before you go</span>
        <h3 id="exit-title" className="exit-title">
          Free <em>Marketing Audit</em><br />for your business.
        </h3>
        <p className="exit-sub">
          We'll audit your website, ads and SEO — then send a one-page report
          on the three biggest growth levers we'd pull this quarter. No fluff, no pitch.
        </p>

        <ul className="exit-list">
          <li>· Conversion-rate quick wins</li>
          <li>· Wasted-ad-spend audit</li>
          <li>· SEO opportunity map</li>
        </ul>

        <button className="btn btn-gold exit-cta" onClick={claim}>
          Claim Free Audit
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button className="exit-skip" onClick={() => close("skip")}>
          No thanks, I'll figure it out
        </button>
      </div>
      <div
        className="exit-backdrop"
        onClick={() => close("backdrop")}
        aria-hidden="true"
      />
    </div>
  );
}
