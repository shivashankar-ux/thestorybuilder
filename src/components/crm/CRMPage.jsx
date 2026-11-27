import React, { useEffect, useState } from "react";

export default function CRMPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);

  async function loadFiles() {
    try {
      const res = await fetch("/api/crm-files", { credentials: "include" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setFiles(data.files);
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    } catch {
      setAuthed(false);
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/crm-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Incorrect password.");
      }
      setPassword("");
      await loadFiles();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const wrapStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#F4F4F4",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: authed ? 640 : 380,
    background: "#FFFDF9",
    borderRadius: 16,
    padding: "36px 32px",
    boxShadow: "0 12px 40px rgba(0,0,0,.08)",
    border: "1px solid rgba(26,18,8,.08)",
  };

  if (checking) {
    return (
      <div style={wrapStyle}>
        <p style={{ color: "#1A1208" }}>Loading…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div style={wrapStyle}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: 22, marginBottom: 6, color: "#1A1208" }}>Operations Portal</h1>
          <p style={{ fontSize: 14, color: "#6b5f4d", marginBottom: 24 }}>
            Enter the access password to view shared documents.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1.5px solid rgba(26,18,8,.15)",
                fontSize: 15,
                marginBottom: 14,
                boxSizing: "border-box",
              }}
            />
            {error && (
              <p style={{ color: "#B91C1C", fontSize: 13, marginBottom: 14 }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting || !password}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1.5px solid #D97706",
                background: submitting ? "#e5b574" : "#D97706",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                cursor: submitting ? "default" : "pointer",
              }}
            >
              {submitting ? "Checking…" : "Unlock"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: 22, marginBottom: 6, color: "#1A1208" }}>Operations Documents</h1>
        <p style={{ fontSize: 14, color: "#6b5f4d", marginBottom: 24 }}>
          Download links expire 5 minutes after this page loads — refresh if a link stops working.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {files.map((f) => (
            <a
              key={f.id}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: 10,
                border: "1.5px solid rgba(26,18,8,.1)",
                background: "#F4F4F4",
                color: "#1A1208",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              <span>{f.label}</span>
              <span style={{ color: "#D97706", fontWeight: 600, fontSize: 13 }}>Download ↓</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
