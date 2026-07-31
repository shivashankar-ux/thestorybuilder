/**
 * CinematicFallback — Beautiful gradient background shown when
 * WebGL/Three.js fails or is still loading.
 * Kept in a separate file to avoid circular imports with the lazy-loaded CinematicHero.
 */
export default function CinematicFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "400vh",
        background: "#050505",
        overflow: "hidden",
      }}
    >
      {/* Sticky ambient glow container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Large purple orb top-right */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "clamp(300px, 55vw, 700px)",
            height: "clamp(300px, 55vw, 700px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,66,245,.35) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "drift 16s linear infinite",
            willChange: "transform",
          }}
        />
        {/* Warm gold orb bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-8%",
            left: "-6%",
            width: "clamp(240px, 40vw, 540px)",
            height: "clamp(240px, 40vw, 540px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(250,204,21,.18) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "drift 22s linear infinite reverse",
          }}
        />
        {/* Sky blue orb center */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "40%",
            width: "clamp(160px, 22vw, 300px)",
            height: "clamp(160px, 22vw, 300px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "drift 28s linear infinite",
            animationDelay: "-10s",
          }}
        />
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
