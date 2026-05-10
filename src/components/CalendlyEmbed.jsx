import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";

/* CALENDLY_URL — replace with your real link.
   While unset, the component shows a graceful placeholder. */
const CALENDLY_URL = ""; // e.g. "https://calendly.com/thestorybuilder/30min"

function loadScript() {
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
  const s = document.createElement("script");
  s.src = SCRIPT_SRC;
  s.async = true;
  document.body.appendChild(s);
}
function loadStyle() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = STYLE_HREF;
  document.head.appendChild(l);
}

export default function CalendlyEmbed() {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!CALENDLY_URL) return;
    loadStyle();
    loadScript();
  }, []);

  if (!CALENDLY_URL) {
    return (
      <div className="calendly-placeholder">
        <div>
          <strong>Booking widget</strong>
          <p>Drop your Calendly URL into <code>CalendlyEmbed.jsx</code> to enable in-page scheduling.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="calendly-inline-widget"
      data-url={CALENDLY_URL}
      style={{ minWidth: 320, height: 680 }}
    />
  );
}
