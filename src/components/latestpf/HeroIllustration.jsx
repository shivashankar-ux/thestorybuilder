import React from "react";

/* ============================================================
   HERO EDITORIAL ILLUSTRATION — "ONE CREW, ONE BRIEF"
   Full-length Dribbble-grade editorial illustration of The Story Builder's
   video shoot & edit crew, seamlessly blended into the #F3EFEA canvas.
   ============================================================ */

export default function HeroIllustration() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1120,
        margin: "0 auto",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <img
        src="/hero-crew-illustration.jpg"
        alt="The Story Builder video shoot and editing crew illustration"
        loading="eager"
        decoding="async"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          mixBlendMode: "multiply",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 100%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 100%)",
          maskComposite: "intersect",
        }}
      />
    </div>
  );
}
