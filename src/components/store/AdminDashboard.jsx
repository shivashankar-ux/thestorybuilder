import React, { useState, useEffect } from "react";
import AdminEbookEditor from "./AdminEbookEditor";

export default function AdminDashboard({ setPage }) {
  const [password, setPassword] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("tsb_admin_pwd") || "";
    return "";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ebooks, setEbooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingEbook, setEditingEbook] = useState(null);

  useEffect(() => {
    if (password) {
      fetchEbooks();
    }
  }, [password]);

  const handleLogin = (e) => {
    e.preventDefault();
    const input = e.target.elements.password.value;
    if (typeof window !== "undefined") localStorage.setItem("tsb_admin_pwd", input);
    setPassword(input);
  };

  const fetchEbooks = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin-ebooks", {
        headers: { Authorization: `Bearer ${password}` }
      });
      const data = await res.json();
      if (data.ok) {
        setIsAuthenticated(true);
        setEbooks(data.ebooks);
      } else {
        setIsAuthenticated(false);
        setErrorMsg(data.error || "Authentication failed.");
      }
    } catch (err) {
      setErrorMsg("Failed to connect to API.");
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ebook?")) return;
    try {
      const res = await fetch("/api/admin-ebooks", {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${password}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.ok) {
        setEbooks(ebooks.filter((e) => e.id !== id));
      } else {
        alert(data.error || "Failed to delete.");
      }
    } catch (err) {
      alert("Error deleting ebook.");
    }
  };

  const handleSaveEbook = (savedEbook, isNew) => {
    if (isNew) {
      setEbooks([savedEbook, ...ebooks]);
    } else {
      setEbooks(ebooks.map((e) => e.id === savedEbook.id ? savedEbook : e));
    }
    setEditingEbook(null);
  };

  if (!isAuthenticated) {
    return (
      <main className="store-detail-page-wrapper" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="hero-bg" aria-hidden="true"><div className="orb o1" /><div className="orb o2" /></div>
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", zIndex: 10, width: "100%", maxWidth: "400px" }}>
          <h2 style={{ color: "#fff", marginBottom: "20px", textAlign: "center" }}>Admin Access</h2>
          {errorMsg && <div style={{ color: "#ff4d4d", marginBottom: "15px", fontSize: "14px", textAlign: "center" }}>{errorMsg}</div>}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input 
              name="password"
              type="password" 
              placeholder="Master Password" 
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff" }} 
            />
            <button type="submit" style={{ background: "#f5a623", color: "#000", padding: "12px", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}>
              {loading ? "Authenticating..." : "Log In"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (editingEbook) {
    return <AdminEbookEditor ebook={editingEbook.id ? editingEbook : null} password={password} onSave={handleSaveEbook} onCancel={() => setEditingEbook(null)} />;
  }

  return (
    <main className="store-detail-page-wrapper" style={{ minHeight: "100vh", padding: "120px 20px" }}>
      <div className="hero-bg" aria-hidden="true"><div className="orb o1" /><div className="orb o2" /></div>
      <div className="wrap" style={{ position: "relative", zIndex: 10, maxWidth: "1000px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: "32px", marginBottom: "8px" }}>Store Admin</h1>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>Manage your digital products.</p>
          </div>
          <button 
            onClick={() => setEditingEbook({})} 
            style={{ background: "#f5a623", color: "#000", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}
          >
            + Add New Ebook
          </button>
        </div>

        {loading ? (
          <div style={{ color: "#fff" }}>Loading ebooks...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {ebooks.length === 0 ? (
              <div style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "40px" }}>No ebooks found. Create one!</div>
            ) : (
              ebooks.map((ebook) => (
                <div key={ebook.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", padding: "15px 20px", borderRadius: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    {ebook.cover_image_url && <img src={ebook.cover_image_url} alt="Cover" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />}
                    <div>
                      <h3 style={{ color: "#fff", fontSize: "16px", margin: 0 }}>{ebook.title}</h3>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: 0 }}>₹{ebook.price_inr} • {ebook.slug}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => setEditingEbook(ebook)} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => handleDelete(ebook.id)} style={{ background: "rgba(255, 77, 77, 0.2)", color: "#ff4d4d", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
