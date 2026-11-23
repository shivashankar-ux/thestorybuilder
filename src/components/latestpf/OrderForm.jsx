import React, { useState, useRef, useEffect, useId } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mix(color, pct) {
  return "color-mix(in srgb, " + color + " " + pct + "%, transparent)";
}

export default function OrderForm({
  greeting = "Hi Story Builder, I’m",
  fromText = "from",
  needText = "We need a hand with",
  budgetText = "and our budget is around",
  reachText = "You can reach me at",
  phoneText = "or WhatsApp at",
  namePlaceholder = "your name",
  companyPlaceholder = "company / brand",
  emailPlaceholder = "name@company.com",
  phonePlaceholder = "+91 99999 99999",
  services = [
    "Shoot + Edit Package (Hyderabad)",
    "Monthly Reels Growth Pack (8-12 Reels)",
    "Direct Response Video Ads",
    "Editing Only (Post-Production)",
    "Commercial Brand Film",
    "Custom Campaign",
  ],
  budgets = [
    "Under ₹25,000",
    "₹25,000 to ₹60,000",
    "₹60,000 to ₹1,50,000",
    "₹1,50,000 and above",
    "Not sure yet (Need Quote)",
  ],
  noteTitle = "Oh, and one more thing…",
  notePlaceholder = "Deadlines, reference videos you love, number of videos needed, anything that helps us scope.",
  totalLabel = "Response Time Guarantee",
  totalText = "Free proposal & review within 24 hours",
  buttonLabel = "Submit Project Brief",
  pendingLabel = "Sending Brief…",
  successLabel = "Brief Sent!",
  errorLabel = "Something went wrong, try again",
  successNote = "Thanks! Opening WhatsApp with your brief now.",
  missingNote = "Please fill in your name, service, and contact details first.",
  whatsapp = "918341928526",
  recipient = "hello@thestorybuilder.in",
  subject = "New Video Project Brief — The Story Builder",
  displayFont = "Space Grotesk",
  bodyFont = "Plus Jakarta Sans",
  ink = "#F3F4F6",
  accent = "#F59E0B",
  muted = "rgba(243, 244, 246, 0.6)",
  buttonText = "#0B0D12",
  errorColor = "#EF4444",
  style = {},
}) {
  const rootRef = useRef(null);
  const [width, setWidth] = useState(1100);
  const [values, setValues] = useState({
    name: "",
    company: "",
    service: "",
    budget: "",
    email: "",
    phone: "",
    message: "",
  });
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState("idle");
  const [hover, setHover] = useState(false);
  const uid = "of" + useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compact = width < 680;
  const scale = compact ? 0.65 : Math.max(0.72, Math.min(1, width / 1100));
  const sentenceSize = Math.round(38 * scale);
  const fieldSize = Math.round(34 * scale);
  const fieldW = (w) => (compact ? "100%" : Math.round(w * scale) + "px");

  const set = (key) => (e) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [key]: v }));
    if (invalid[key]) setInvalid((s) => ({ ...s, [key]: false }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "pending") return;
    const bad = {
      name: !values.name.trim(),
      service: !values.service,
      phone: !values.phone.trim() && !EMAIL_RE.test(values.email.trim()),
    };
    setInvalid(bad);
    if (bad.name || bad.service || bad.phone) {
      setStatus("missing");
      return;
    }

    setStatus("pending");
    const data = {
      name: values.name.trim(),
      company: values.company.trim(),
      service: values.service,
      budget: values.budget,
      email: values.email.trim() || "video-lead@thestorybuilder.in",
      phone: values.phone.trim(),
      message: values.message.trim(),
    };

    // 1. Post to API in background
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          area: "Video Portfolio (/latestpf)",
          project: `${data.service} (${data.budget || "Budget not set"})`,
          message: `Company: ${data.company || "Individual"}\nNotes: ${data.message || "None"}\nSource: /latestpf OrderForm`,
        }),
      }).catch(() => {});
    } catch (_) {}

    // 2. Format WhatsApp link with brief
    const lines = [
      `*New Video Project Brief*`,
      `👤 Name: ${data.name}${data.company ? ` (${data.company})` : ""}`,
      `🎬 Service: ${data.service}`,
      `💰 Budget: ${data.budget || "Flexible"}`,
      `📞 Contact: ${data.phone || data.email}`,
    ];
    if (data.email) lines.push(`📧 Email: ${data.email}`);
    if (data.message) lines.push(`📝 Notes: ${data.message}`);

    const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("success");
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 400);
  };

  const display = "'" + displayFont + "', sans-serif";
  const body = "'" + bodyFont + "', sans-serif";

  const css = `
    .${uid} .of-field {
      font-family: ${display};
      font-weight: 600;
      font-size: ${fieldSize}px;
      line-height: 1.25em;
      color: ${ink};
      background: ${mix(accent, 12)};
      border: 2px dashed ${mix(accent, 60)};
      border-radius: 12px;
      padding: ${Math.round(6 * scale)}px ${Math.round(16 * scale)}px ${Math.round(8 * scale)}px;
      outline: none;
      box-sizing: border-box;
      max-width: 100%;
      margin: 0;
      transition: background .3s ease, border-color .3s ease;
    }
    .${uid} .of-field::placeholder { color: ${mix(ink, 40)}; opacity: 1; }
    .${uid} .of-field:focus { background: ${mix(accent, 22)}; border-style: solid; border-color: ${accent}; }
    .${uid} .of-field.of-bad { border-style: solid; border-color: ${errorColor}; background: ${mix(errorColor, 14)}; }
    .${uid} select.of-field { appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: ${Math.round(48 * scale)}px; }
    .${uid} select.of-field.of-empty { color: ${mix(ink, 40)}; }
    .${uid} select.of-field option { background: #131722; color: #fff; font-size: 16px; }
    .${uid} .of-note {
      font-family: ${body};
      font-size: 16px;
      line-height: 1.6em;
      color: ${ink};
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 16px 20px;
      width: 100%;
      height: 120px;
      resize: vertical;
      outline: none;
      box-sizing: border-box;
      margin: 0;
      transition: border-color .3s ease;
    }
    .${uid} .of-note::placeholder { color: ${mix(ink, 40)}; }
    .${uid} .of-note:focus { border-color: ${accent}; background: rgba(255, 255, 255, 0.05); }
  `;

  const word = {
    fontFamily: display,
    fontWeight: 600,
    fontSize: sentenceSize,
    lineHeight: "1.15em",
    letterSpacing: "-0.03em",
    color: ink,
    margin: 0,
    whiteSpace: compact ? "normal" : "nowrap",
  };

  const field = (key, w, placeholder, type, auto) => (
    <input
      className={"of-field" + (invalid[key] ? " of-bad" : "")}
      style={{ width: fieldW(w) }}
      type={type}
      name={key}
      autoComplete={auto}
      placeholder={placeholder}
      value={values[key]}
      onChange={set(key)}
      aria-label={placeholder}
      aria-invalid={!!invalid[key]}
    />
  );

  const select = (key, w, options, placeholder) => (
    <span style={{ position: "relative", display: "inline-flex", width: fieldW(w), maxWidth: "100%" }}>
      <select
        className={"of-field" + (values[key] ? "" : " of-empty") + (invalid[key] ? " of-bad" : "")}
        style={{ width: "100%" }}
        name={key}
        value={values[key]}
        onChange={set(key)}
        aria-label={placeholder}
        aria-invalid={!!invalid[key]}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {(options || []).map((o, i) => (
          <option key={i} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        width={Math.round(14 * scale) + 4}
        height={Math.round(14 * scale) + 4}
        viewBox="0 0 16 16"
        style={{ position: "absolute", right: Math.round(18 * scale), top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      >
        <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke={ink} strokeOpacity="0.65" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const dot = compact ? null : <p style={word}>.</p>;
  const gap = Math.round(14 * scale);

  const label =
    status === "pending" ? pendingLabel : status === "success" ? successLabel : status === "error" ? errorLabel : buttonLabel;

  const footNote =
    status === "success" ? successNote : status === "missing" ? missingNote : null;

  return (
    <div ref={rootRef} className={uid} style={{ ...style, width: "100%" }}>
      <style>{css}</style>
      <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 30, width: "100%", margin: 0 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            columnGap: gap,
            rowGap: compact ? 12 : gap + 4,
            width: "100%",
          }}
        >
          <p style={word}>{greeting}</p>
          {field("name", 240, namePlaceholder, "text", "name")}
          <p style={word}>{fromText}</p>
          {field("company", 240, companyPlaceholder, "text", "organization")}
          {dot}
          <p style={word}>{needText}</p>
          {select("service", 360, services, "pick a service")}
          <p style={word}>{budgetText}</p>
          {select("budget", 280, budgets, "pick a budget")}
          {dot}
          <p style={word}>{phoneText}</p>
          {field("phone", 320, phonePlaceholder, "tel", "tel")}
          <p style={word}>{reachText}</p>
          {field("email", 380, emailPlaceholder, "email", "email")}
          {dot}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <p style={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: ink, margin: 0, letterSpacing: "-0.01em" }}>
            {noteTitle}
          </p>
          <textarea
            className="of-note"
            name="message"
            placeholder={notePlaceholder}
            value={values.message}
            onChange={set("message")}
            aria-label={noteTitle}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: compact ? "column" : "row",
            alignItems: compact ? "stretch" : "center",
            justifyContent: "space-between",
            gap: 20,
            paddingTop: 22,
            borderTop: "2px dashed " + mix(ink, 20),
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontFamily: body, fontSize: 13, color: footNote && status === "missing" ? errorColor : status === "success" ? accent : muted, margin: 0, fontWeight: 600 }}>
              {footNote || totalLabel}
            </p>
            <p style={{ fontFamily: display, fontWeight: 700, fontSize: 22, color: ink, margin: 0 }}>
              {totalText}
            </p>
          </div>
          <button
            type="submit"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            disabled={status === "pending"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              width: compact ? "100%" : 330,
              padding: "16px 22px",
              borderRadius: 999,
              border: "none",
              background: accent,
              color: buttonText,
              cursor: status === "pending" ? "progress" : "pointer",
              fontFamily: display,
              fontWeight: 700,
              fontSize: 15,
              boxSizing: "border-box",
              transform: hover ? "translateY(-2px)" : "none",
              boxShadow: hover ? "0 10px 28px rgba(245, 158, 11, 0.35)" : "none",
              transition: "transform .3s ease, box-shadow .3s ease",
            }}
          >
            <span>{label}</span>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                background: "#0B0D12",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: hover || status === "success" ? "rotate(45deg)" : "none",
                transition: "transform .4s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16">
                {status === "success" ? (
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4.5 11.5l7-7M6 4.5h5.5V10" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
