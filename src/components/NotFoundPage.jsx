import { useEffect } from "react";

export default function NotFoundPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="not-found-page"
      style={{
        padding: "160px 24px 100px",
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "var(--text, #e2e8f0)",
      }}
    >
      <div style={{ fontSize: "clamp(4rem, 10vw, 7rem)", fontFamily: "var(--fd)", fontWeight: 900, color: "var(--gold, #facc15)", lineHeight: 1, marginBottom: 12 }}>
        404
      </div>
      <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 16, color: "#fff" }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: 16, color: "var(--muted, #94a3b8)", maxWidth: 500, lineHeight: 1.6, marginBottom: 32 }}>
        The page you are looking for might have been moved, renamed, or doesn't exist. Let's get you back on track.
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          className="btn btn-gold"
          onClick={() => setPage && setPage("home")}
          style={{ padding: "14px 28px", fontSize: 15 }}
        >
          Return to Homepage
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => setPage && setPage("services")}
          style={{ padding: "14px 28px", fontSize: 15 }}
        >
          Explore Our Services
        </button>
      </div>
    </main>
  );
}
