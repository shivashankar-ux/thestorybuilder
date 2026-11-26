import React from "react";

/* ============================================================
   HERO EDITORIAL ILLUSTRATION — "ONE CREW, ONE BRIEF"
   Playful, bold-outlined Dribbble-style vector storytelling scene
   featuring The Story Builder's shoot & edit crew, cinema rig,
   vertical 9:16 reel frame, clapperboard, clouds & sparkles.
   ============================================================ */

export default function HeroIllustration() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <style>{`
        @keyframes heroFloatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes heroFloatAlt {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes heroSparkle {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.22); opacity: 0.6; }
        }
        @keyframes heroRecBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .hero-ill-cloud-l { animation: heroFloatSlow 5.5s ease-in-out infinite; }
        .hero-ill-cloud-r { animation: heroFloatSlow 6.5s ease-in-out infinite reverse; }
        .hero-ill-float { animation: heroFloatAlt 4.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .hero-ill-spark { animation: heroSparkle 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .hero-ill-rec { animation: heroRecBlink 1.3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-ill-cloud-l, .hero-ill-cloud-r, .hero-ill-float, .hero-ill-spark, .hero-ill-rec {
            animation: none !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 1120 430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-hidden="true"
      >
        {/* ============================================================
            1. SOFT ATMOSPHERIC BACKDROP & SKETCHY CLOUDS
            ============================================================ */}
        <defs>
          <radialGradient id="heroSkyGlow" cx="50%" cy="62%" r="52%">
            <stop offset="0%" stopColor="#FFE27A" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#8ECAE6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#F3EFEA" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="560" cy="270" rx="510" ry="175" fill="url(#heroSkyGlow)" />

        {/* Left Sketchy Cloud */}
        <g className="hero-ill-cloud-l">
          <path
            d="M48 190 C28 190 16 174 22 156 C27 140 44 134 58 140 C66 116 94 104 120 112 C142 118 156 138 154 158 C170 158 184 170 182 186 C180 198 168 206 152 206 L52 206 C38 206 32 198 48 190 Z"
            fill="#FFFFFF"
            fillOpacity="0.82"
            stroke="#2B47FC"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M66 174 C80 180 102 180 116 174"
            stroke="#2B47FC"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>

        {/* Right Sketchy Cloud */}
        <g className="hero-ill-cloud-r">
          <path
            d="M936 142 C914 142 900 124 908 106 C914 90 932 84 948 90 C958 64 990 52 1018 60 C1042 66 1058 88 1054 110 C1072 110 1088 124 1084 140 C1082 154 1068 162 1050 162 L942 162 C924 162 918 150 936 142 Z"
            fill="#FFFFFF"
            fillOpacity="0.82"
            stroke="#2B47FC"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M962 126 C980 132 1006 132 1022 126"
            stroke="#2B47FC"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>

        {/* ============================================================
            2. PLAYFUL MOTION SWIRLS, SPARKLES & FLOATING FILM ACCENTS
            ============================================================ */}
        {/* Left Motion Swirl */}
        <g stroke="#FF4D1A" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M180 250 C196 250 206 240 204 228 C202 218 190 214 182 222 C176 228 180 238 190 238" />
          <path d="M116 266 L168 266" />
          <path d="M132 276 L176 276" />
        </g>

        {/* Right Motion Swirl */}
        <g stroke="#FF4D1A" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M902 218 C918 218 928 208 926 196 C924 186 912 182 904 190 C898 196 902 206 912 206" />
          <path d="M936 232 L990 232" />
          <path d="M948 242 L982 242" />
        </g>

        {/* Twinkling 4-Point Stars */}
        <path
          className="hero-ill-spark"
          d="M278 106 L284 122 L300 128 L284 134 L278 150 L272 134 L256 128 L272 122 Z"
          fill="#38BDF8"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          className="hero-ill-spark"
          style={{ animationDelay: "0.9s" }}
          d="M846 168 L851 181 L864 186 L851 191 L846 204 L841 191 L828 186 L841 181 Z"
          fill="#38BDF8"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          className="hero-ill-spark"
          style={{ animationDelay: "1.5s" }}
          d="M558 58 L562 68 L572 72 L562 76 L558 86 L554 76 L544 72 L554 68 Z"
          fill="#FFE27A"
          stroke="#111111"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Floating Winged Play / Butterfly Card (Left) */}
        <g className="hero-ill-float">
          <path
            d="M174 114 C194 122 210 112 216 96 C222 82 210 74 202 84 C196 92 206 104 218 98"
            stroke="#FF9F1C"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="translate(198, 52) rotate(-14)">
            <ellipse cx="14" cy="18" rx="14" ry="11" fill="#FFE27A" stroke="#111111" strokeWidth="2.6" />
            <ellipse cx="38" cy="16" rx="13" ry="10" fill="#FFE27A" stroke="#111111" strokeWidth="2.6" />
            <rect x="23" y="8" width="6" height="24" rx="3" fill="#111111" />
            <path d="M24 8 L18 1 M28 8 L34 1" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </g>

        {/* Floating Mini Reel / Butterfly (Right) */}
        <g className="hero-ill-float" style={{ animationDelay: "1.1s" }}>
          <path
            d="M918 286 C936 276 952 282 958 294"
            stroke="#FF9F1C"
            strokeWidth="2.4"
            strokeDasharray="4 4"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="translate(952, 260) rotate(12)">
            <rect x="0" y="0" width="44" height="32" rx="8" fill="#CEF237" stroke="#111111" strokeWidth="2.6" />
            <polygon points="18,9 18,23 30,16" fill="#111111" />
          </g>
        </g>

        {/* ============================================================
            3. FOREGROUND GROUND / STUDIO WAVE BASE
            ============================================================ */}
        {/* Vibrant Green/Lime Botanical & Studio Base Shapes */}
        <path
          d="M130 430 C165 370 230 348 295 366 C340 378 370 406 392 430 Z"
          fill="#CEF237"
          stroke="#111111"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M724 430 C756 382 818 352 886 364 C938 374 976 400 1002 430 Z"
          fill="#CEF237"
          stroke="#111111"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Decorative Studio Leaves */}
        <path d="M180 398 C168 372 184 342 212 346 C220 370 206 394 180 398 Z" fill="#10B981" stroke="#111111" strokeWidth="2.8" />
        <path d="M936 396 C950 370 936 340 908 344 C898 368 912 392 936 396 Z" fill="#10B981" stroke="#111111" strokeWidth="2.8" />
        <circle cx="242" cy="376" r="8" fill="#FF4D1A" stroke="#111111" strokeWidth="2.5" />
        <circle cx="878" cy="382" r="8" fill="#FF4D1A" stroke="#111111" strokeWidth="2.5" />

        {/* ============================================================
            4. LEFT CHARACTER: CREATIVE EDITOR WITH 9:16 VERTICAL REEL PHONE
            ============================================================ */}
        <g transform="translate(270, 152)">
          {/* Hair Back */}
          <path
            d="M46 56 C18 62 4 90 12 122 C20 148 54 152 72 136 Z"
            fill="#4A2511"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Body / Cobalt Jacket */}
          <path
            d="M34 148 C34 118 62 104 94 104 C126 104 152 120 156 154 L166 250 L24 250 Z"
            fill="#2B47FC"
            stroke="#111111"
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          {/* Jacket Stripes */}
          <path d="M52 142 L138 142 M44 176 L146 176 M38 210 L152 210" stroke="#70A1FF" strokeWidth="4" strokeLinecap="round" opacity="0.65" />

          {/* Head */}
          <circle cx="94" cy="64" r="34" fill="#FFD6BA" stroke="#111111" strokeWidth="3.2" />
          {/* Hair Bangs */}
          <path
            d="M60 58 C64 30 96 20 122 36 C132 44 134 58 128 66 C116 48 84 46 60 58 Z"
            fill="#4A2511"
            stroke="#111111"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Happy Eyes & Smile */}
          <circle cx="84" cy="64" r="3" fill="#111111" />
          <circle cx="106" cy="64" r="3" fill="#111111" />
          <circle cx="76" cy="72" r="5" fill="#FF8FA3" opacity="0.65" />
          <circle cx="114" cy="72" r="5" fill="#FF8FA3" opacity="0.65" />
          <path d="M88 76 C92 82 100 82 104 76" stroke="#111111" strokeWidth="2.8" strokeLinecap="round" fill="none" />

          {/* Left Arm holding Vertical iPhone Reel */}
          <path
            d="M42 138 C16 152 10 184 26 204 L60 198"
            fill="#2B47FC"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Vertical 9:16 iPhone Frame */}
          <g transform="translate(-32, 108) rotate(-8)">
            <rect x="0" y="0" width="74" height="132" rx="14" fill="#111111" stroke="#111111" strokeWidth="3" />
            <rect x="5" y="5" width="64" height="122" rx="10" fill="#FF4D1A" />
            {/* Dynamic Island */}
            <rect x="25" y="9" width="24" height="6" rx="3" fill="#111111" />
            {/* Play Triangle */}
            <circle cx="37" cy="64" r="16" fill="#FFFFFF" fillOpacity="0.92" stroke="#111111" strokeWidth="2.4" />
            <polygon points="33,57 33,71 45,64" fill="#111111" />
            {/* Reel Caption Lines */}
            <rect x="12" y="96" width="42" height="5" rx="2.5" fill="#FFFFFF" />
            <rect x="12" y="105" width="28" height="4" rx="2" fill="#FFFFFF" opacity="0.75" />
            {/* Floating View Pill */}
            <g transform="translate(36, -14)">
              <rect x="0" y="0" width="56" height="22" rx="11" fill="#CEF237" stroke="#111111" strokeWidth="2.4" />
              <text x="28" y="15" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="800" fontFamily="sans-serif">
                380K+
              </text>
            </g>
          </g>
        </g>

        {/* ============================================================
            5. CENTER CHARACTER: CINEMATOGRAPHER WITH 4K SONY CINEMA RIG
            ============================================================ */}
        <g transform="translate(465, 112)">
          {/* Hoodie / Vermilion Orange Studio Crew Top */}
          <path
            d="M36 164 C38 122 70 104 108 104 C146 104 176 124 180 164 L192 296 L24 296 Z"
            fill="#FF4D1A"
            stroke="#111111"
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          {/* Crew Badge on Shirt */}
          <rect x="114" y="148" width="44" height="16" rx="8" fill="#FFE27A" stroke="#111111" strokeWidth="2.2" />
          <text x="136" y="159" textAnchor="middle" fill="#111111" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">
            CREW
          </text>

          {/* Head */}
          <circle cx="106" cy="64" r="36" fill="#F4C095" stroke="#111111" strokeWidth="3.2" />
          {/* Stylish Hair + Backwards Cap */}
          <path
            d="M70 54 C70 28 96 18 126 24 C144 28 150 44 146 56 L70 54 Z"
            fill="#111111"
            stroke="#111111"
            strokeWidth="3"
          />
          {/* Cap Brim Backwards */}
          <path d="M144 44 L172 48 C174 54 166 58 144 54 Z" fill="#FFE27A" stroke="#111111" strokeWidth="2.6" />
          {/* Eyes & Smile */}
          <circle cx="94" cy="64" r="3.2" fill="#111111" />
          <circle cx="118" cy="64" r="3.2" fill="#111111" />
          <path d="M98 78 C104 85 114 85 118 78" stroke="#111111" strokeWidth="2.8" strokeLinecap="round" fill="none" />

          {/* Cinema Camera Rig Held in Front */}
          <g transform="translate(18, 134)">
            {/* Camera Body */}
            <rect x="20" y="24" width="112" height="72" rx="14" fill="#1F242D" stroke="#111111" strokeWidth="3.4" />
            {/* Top Handle */}
            <path d="M46 24 L46 8 L106 8 L106 24" stroke="#111111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Matte Box / Lens */}
            <rect x="132" y="34" width="26" height="52" rx="6" fill="#374151" stroke="#111111" strokeWidth="3.2" />
            <polygon points="158,34 184,22 184,98 158,86" fill="#111111" stroke="#111111" strokeWidth="3" strokeLinejoin="round" />
            {/* Glowing Lens Glass */}
            <circle cx="96" cy="60" r="22" fill="#38BDF8" stroke="#111111" strokeWidth="3" />
            <circle cx="96" cy="60" r="12" fill="#1E3A8A" />
            <circle cx="90" cy="54" r="4.5" fill="#FFFFFF" />
            {/* REC Dot + Badge */}
            <circle className="hero-ill-rec" cx="38" cy="40" r="5.5" fill="#FF4D1A" />
            <text x="50" y="44" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="monospace">
              REC 4K
            </text>
            {/* Hands holding camera */}
            <circle cx="28" cy="78" r="12" fill="#F4C095" stroke="#111111" strokeWidth="3" />
            <circle cx="130" cy="82" r="12" fill="#F4C095" stroke="#111111" strokeWidth="3" />
          </g>
        </g>

        {/* ============================================================
            6. RIGHT CHARACTER: COLORIST / DIRECTOR WITH CLAPPERBOARD & LIGHT
            ============================================================ */}
        <g transform="translate(690, 148)">
          {/* Studio Softbox Light on Stand (Far Right) */}
          <g transform="translate(114, 18)">
            <line x1="32" y1="74" x2="32" y2="246" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
            <g transform="rotate(-18 32 42)">
              <polygon points="0,10 60,0 60,72 0,62" fill="#FFFFFF" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" />
              <rect x="52" y="8" width="12" height="56" rx="4" fill="#FFE27A" stroke="#111111" strokeWidth="2.8" />
            </g>
          </g>

          {/* Character Body / Warm Mustard Sweater */}
          <path
            d="M22 148 C24 114 52 100 84 100 C116 100 142 118 144 150 L152 260 L14 260 Z"
            fill="#FFE27A"
            stroke="#111111"
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          {/* Head */}
          <circle cx="82" cy="60" r="33" fill="#FFD6BA" stroke="#111111" strokeWidth="3.2" />
          {/* Curly Hair */}
          <path
            d="M48 52 C42 32 60 16 84 18 C108 16 124 32 118 52 C108 40 94 36 82 38 C70 36 58 42 48 52 Z"
            fill="#111111"
            stroke="#111111"
            strokeWidth="3"
          />
          {/* Glasses */}
          <circle cx="71" cy="60" r="9.5" fill="#FFFFFF" fillOpacity="0.4" stroke="#111111" strokeWidth="2.6" />
          <circle cx="95" cy="60" r="9.5" fill="#FFFFFF" fillOpacity="0.4" stroke="#111111" strokeWidth="2.6" />
          <line x1="80.5" y1="60" x2="85.5" y2="60" stroke="#111111" strokeWidth="2.6" />
          <circle cx="71" cy="60" r="2.5" fill="#111111" />
          <circle cx="95" cy="60" r="2.5" fill="#111111" />
          <path d="M77 75 C81 80 87 80 91 75" stroke="#111111" strokeWidth="2.6" strokeLinecap="round" fill="none" />

          {/* Clapperboard Held Up */}
          <g transform="translate(-14, 134) rotate(7)">
            <rect x="0" y="18" width="96" height="66" rx="8" fill="#111111" stroke="#111111" strokeWidth="3" />
            {/* Clapper Top Arm (slightly open) */}
            <g transform="rotate(-14 0 18)">
              <rect x="0" y="2" width="96" height="16" rx="4" fill="#FFFFFF" stroke="#111111" strokeWidth="2.8" />
              <polygon points="14,2 26,2 18,18 6,18" fill="#111111" />
              <polygon points="40,2 52,2 44,18 32,18" fill="#111111" />
              <polygon points="66,2 78,2 70,18 58,18" fill="#111111" />
            </g>
            {/* Board Text */}
            <line x1="10" y1="40" x2="86" y2="40" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
            <text x="48" y="34" textAnchor="middle" fill="#CEF237" fontSize="9.5" fontWeight="800" fontFamily="monospace">
              STORY BUILDER
            </text>
            <text x="48" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="monospace">
              TAKE 01 · 4K
            </text>
          </g>
        </g>

        {/* ============================================================
            7. CUTE STUDIO MASCOT PUP IN FOREGROUND (NOD TO REFERENCE WARMTH)
            ============================================================ */}
        <g transform="translate(405, 314)">
          {/* Puppy Body */}
          <ellipse cx="42" cy="72" rx="34" ry="26" fill="#FFFFFF" stroke="#111111" strokeWidth="3.2" />
          {/* Spot */}
          <circle cx="56" cy="70" r="10" fill="#8B5A2B" />
          {/* Head */}
          <circle cx="42" cy="40" r="24" fill="#FFFFFF" stroke="#111111" strokeWidth="3.2" />
          {/* Floppy Ears */}
          <ellipse cx="18" cy="42" rx="8" ry="14" transform="rotate(15 18 42)" fill="#8B5A2B" stroke="#111111" strokeWidth="2.8" />
          <ellipse cx="66" cy="42" rx="8" ry="14" transform="rotate(-15 66 42)" fill="#8B5A2B" stroke="#111111" strokeWidth="2.8" />
          {/* Collar */}
          <path d="M26 59 C36 64 48 64 58 59" stroke="#FF4D1A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="42" cy="66" r="4" fill="#FFE27A" stroke="#111111" strokeWidth="2" />
          {/* Happy Face */}
          <path d="M31 36 C33 33 36 33 38 36" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M46 36 C48 33 51 33 53 36" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="42" cy="43" rx="4.5" ry="3.2" fill="#111111" />
          <path d="M39 48 C41 53 43 53 45 48" fill="#FF8FA3" stroke="#111111" strokeWidth="2" />
        </g>

        {/* Bottom Clean Ground Line */}
        <line x1="40" y1="428" x2="1080" y2="428" stroke="#111111" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
      </svg>
    </div>
  );
}
