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
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ background: "var(--card)", padding: "40px", borderRadius: "16px", border: "1px solid var(--border)", width: "100%", maxWidth: "420px", boxShadow: "0 12px 36px rgba(0,0,0,0.08)" }}>
          <h2 style={{ color: "var(--text)", marginBottom: "8px", textAlign: "center", fontFamily: "var(--fd)" }}>Admin Login</h2>
          <p style={{ color: "var(--muted)", marginBottom: "24px", textAlign: "center", fontSize: "14px" }}>Enter your master password to access the CMS.</p>
          
          {errorMsg && <div style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "10px", borderRadius: "6px", marginBottom: "16px", fontSize: "13px", textAlign: "center", border: "1px solid rgba(239,68,68,0.2)" }}>{errorMsg}</div>}
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input 
              name="password"
              type="password" 
              placeholder="Master Password" 
              style={{ padding: "14px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", width: "100%", outline: "none", fontSize: "15px" }} 
            />
            <button type="submit" className="btn btn-gold" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
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
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "calc(var(--nav) + 40px) 20px 100px" }}>
      <div className="wrap" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header Area */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ color: "var(--text)", fontSize: "28px", fontFamily: "var(--fd)", fontWeight: 800, letterSpacing: "-0.5px" }}>Products</h1>
            <p style={{ color: "var(--muted)", fontSize: "15px" }}>Manage your digital ebooks and playbooks.</p>
          </div>
          <button 
            className="btn btn-gold"
            onClick={() => setEditingEbook({})} 
          >
            + Add Product
          </button>
        </div>

        {/* Data Table Area */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>Loading products...</div>
          ) : (
            <>
              {/* Table Header */}
              <div style={{ display: "grid", gridTemplateColumns: "80px 3fr 1fr 1fr", gap: "16px", padding: "16px 24px", borderBottom: "1px solid var(--border)", background: "rgba(0,0,0,0.02)", color: "var(--muted)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <div>Media</div>
                <div>Product Name</div>
                <div>Price (INR)</div>
                <div style={{ textAlign: "right" }}>Actions</div>
              </div>
              
              {/* Table Body */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {ebooks.length === 0 ? (
                  <div style={{ padding: "60px 20px", textAlign: "center" }}>
                    <div style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "16px" }}>You haven't added any products yet.</div>
                    <button className="btn btn-ghost" onClick={() => setEditingEbook({})}>Create your first ebook</button>
                  </div>
                ) : (
                  ebooks.map((ebook, idx) => (
                    <div key={ebook.id} style={{ display: "grid", gridTemplateColumns: "80px 3fr 1fr 1fr", gap: "16px", padding: "16px 24px", alignItems: "center", borderBottom: idx === ebooks.length - 1 ? "none" : "1px solid var(--border)", transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.01)"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                      
                      {/* Media Column */}
                      <div>
                        {ebook.cover_image_url ? (
                          <div style={{ width: "48px", height: "48px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--surf)" }}>
                            <img src={ebook.cover_image_url} alt={ebook.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        ) : (
                          <div style={{ width: "48px", height: "48px", borderRadius: "8px", border: "1px dashed var(--border)", background: "var(--surf)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ color: "var(--muted)", fontSize: "10px" }}>No Img</span>
                          </div>
                        )}
                      </div>

                      {/* Product Name Column */}
                      <div>
                        <h3 style={{ color: "var(--text)", fontSize: "15px", fontWeight: 700, margin: "0 0 4px 0", fontFamily: "var(--fd)" }}>{ebook.title}</h3>
                        <p style={{ color: "var(--muted)", fontSize: "13px", margin: 0 }}>/{ebook.slug}</p>
                      </div>

                      {/* Price Column */}
                      <div>
                        <span style={{ display: "inline-block", background: "var(--surf)", color: "var(--text)", padding: "4px 10px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, border: "1px solid var(--border)" }}>
                          ₹{ebook.price_inr}
                        </span>
                      </div>

                      {/* Actions Column */}
                      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <button 
                          onClick={() => setEditingEbook(ebook)} 
                          style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600, transition: "all 0.2s" }}
                          onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                          onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(ebook.id)} 
                          style={{ background: "transparent", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600, transition: "all 0.2s" }}
                          onMouseOver={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
