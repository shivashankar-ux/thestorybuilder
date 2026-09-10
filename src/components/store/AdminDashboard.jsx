import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminEbookEditor from "./AdminEbookEditor";

export default function AdminDashboard({ setPage }) {
  const [password, setPassword] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("tsb_admin_pwd") || "";
    return "";
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ebooks, setEbooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingEbook, setEditingEbook] = useState(null);
  
  // Dashboard UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // "all" | "has_pdf" | "missing_pdf"
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"

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

  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("tsb_admin_pwd");
    setPassword("");
    setIsAuthenticated(false);
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
        setEbooks(data.ebooks || []);
      } else {
        setIsAuthenticated(false);
        setErrorMsg(data.error || "Authentication failed. Incorrect master password.");
      }
    } catch (err) {
      setErrorMsg("Failed to connect to admin API server.");
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
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
        alert(data.error || "Failed to delete product.");
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

  // Filtered ebooks logic
  const filteredEbooks = ebooks.filter((ebook) => {
    const matchesSearch = 
      ebook.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterMode === "has_pdf") return Boolean(ebook.file_url);
    if (filterMode === "missing_pdf") return !ebook.file_url;
    return true;
  });

  // Calculate metrics
  const totalEbooksCount = ebooks.length;
  const attachedPdfsCount = ebooks.filter(e => Boolean(e.file_url)).length;
  const missingPdfsCount = totalEbooksCount - attachedPdfsCount;

  // Unauthenticated Login UI
  if (!isAuthenticated) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: "20px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: "var(--card)", 
            padding: "44px 36px", 
            borderRadius: "20px", 
            border: "1px solid var(--border)", 
            width: "100%", 
            maxWidth: "420px", 
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #f97316, #eab308, #f97316)" }} />

          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span style={{ display: "inline-block", background: "rgba(249, 115, 22, 0.1)", color: "#f97316", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "100px", border: "1px solid rgba(249, 115, 22, 0.2)", marginBottom: "12px" }}>
              STORE CONTENT STUDIO
            </span>
            <h2 style={{ color: "var(--text)", margin: "0 0 6px", fontFamily: "var(--fd)", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px" }}>
              Admin Portal Login
            </h2>
            <p style={{ color: "var(--muted)", margin: 0, fontSize: "14px" }}>
              Enter your master password to access product CMS.
            </p>
          </div>
          
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ color: "#ef4444", background: "rgba(239,68,68,0.08)", padding: "12px 14px", borderRadius: "10px", marginBottom: "20px", fontSize: "13px", textAlign: "center", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>{errorMsg}</span>
            </motion.div>
          )}
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ position: "relative" }}>
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Master Password" 
                required
                style={{ 
                  padding: "14px 44px 14px 16px", 
                  borderRadius: "10px", 
                  border: "1px solid var(--border)", 
                  background: "var(--bg)", 
                  color: "var(--text)", 
                  width: "100%", 
                  outline: "none", 
                  fontSize: "15px",
                  boxSizing: "border-box",
                  fontFamily: "var(--fb)",
                  transition: "border-color 0.2s"
                }} 
                onFocus={(e) => e.target.style.borderColor = "var(--gold)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer", padding: "4px" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>

            <button type="submit" className="btn btn-gold" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "14px", borderRadius: "10px", fontSize: "15px", fontWeight: 700 }}>
              {loading ? "Authenticating..." : "Unlock Studio Dashboard"}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  // Active Product Editor
  if (editingEbook) {
    return <AdminEbookEditor ebook={editingEbook.id ? editingEbook : null} password={password} onSave={handleSaveEbook} onCancel={() => setEditingEbook(null)} />;
  }

  // Authenticated Main Dashboard UI
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "calc(var(--nav) + 32px) 20px 100px" }}>
      <div className="wrap" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        
        {/* Top Navbar Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>The Story Builder</span>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>/</span>
              <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700 }}>Store Studio CMS</span>
            </div>
            <h1 style={{ color: "var(--text)", fontSize: "28px", fontFamily: "var(--fd)", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>
              Product Inventory & CMS
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button 
              className="btn btn-ghost" 
              onClick={() => {
                if (typeof setPage === "function") setPage("store");
                else window.open("/store", "_blank");
              }}
              style={{ fontSize: "13px", padding: "10px 16px" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              View Live Storefront
            </button>
            <button 
              className="btn btn-gold"
              onClick={() => setEditingEbook({})}
              style={{ fontSize: "14px", padding: "10px 20px" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add New Product
            </button>
            <button 
              onClick={handleLogout}
              title="Log Out"
              style={{ background: "transparent", border: "1px solid var(--border)", padding: "10px", borderRadius: "8px", cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", transition: "all 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>

        {/* Dashboard Metrics Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
          
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ color: "var(--muted)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Products</span>
              <div style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", fontFamily: "var(--fd)" }}>{totalEbooksCount}</div>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>Active store playbooks</span>
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ color: "var(--muted)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>PDF Files Attached</span>
              <div style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", fontFamily: "var(--fd)" }}>{attachedPdfsCount}</div>
            <span style={{ fontSize: "12px", color: attachedPdfsCount === totalEbooksCount ? "#22c55e" : "var(--muted)" }}>
              {missingPdfsCount === 0 ? "✓ All products have PDF attached" : `${missingPdfsCount} product(s) missing PDF file`}
            </span>
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ color: "var(--muted)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Storefront Status</span>
              <div style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
              <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--text)", fontFamily: "var(--fd)" }}>Live & Online</span>
            </div>
            <span style={{ fontSize: "12px", color: "var(--muted)", display: "block", marginTop: "4px" }}>Razorpay integration active</span>
          </div>

        </div>

        {/* Toolbar & Filter Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
          
          {/* Search Box */}
          <div style={{ position: "relative", flex: 1, minWidth: "260px", maxWidth: "400px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              type="text" 
              placeholder="Search by title, slug, or description..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 40px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--text)",
                outline: "none",
                fontSize: "14px",
                fontFamily: "var(--fb)",
                boxSizing: "border-box"
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "14px" }}>×</button>
            )}
          </div>

          {/* Filter Chips & View Mode */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            
            {/* Filter Pills */}
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "3px", borderRadius: "10px", display: "flex", gap: "4px" }}>
              <button 
                onClick={() => setFilterMode("all")}
                style={{
                  background: filterMode === "all" ? "var(--surf)" : "transparent",
                  color: filterMode === "all" ? "var(--text)" : "var(--muted)",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                All ({totalEbooksCount})
              </button>
              <button 
                onClick={() => setFilterMode("has_pdf")}
                style={{
                  background: filterMode === "has_pdf" ? "var(--surf)" : "transparent",
                  color: filterMode === "has_pdf" ? "#22c55e" : "var(--muted)",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                With PDF ({attachedPdfsCount})
              </button>
              <button 
                onClick={() => setFilterMode("missing_pdf")}
                style={{
                  background: filterMode === "missing_pdf" ? "var(--surf)" : "transparent",
                  color: filterMode === "missing_pdf" ? "#f59e0b" : "var(--muted)",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Missing PDF ({missingPdfsCount})
              </button>
            </div>

            {/* Layout Toggle */}
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "3px", borderRadius: "10px", display: "flex", gap: "4px" }}>
              <button 
                onClick={() => setViewMode("table")}
                title="Table View"
                style={{
                  background: viewMode === "table" ? "var(--surf)" : "transparent",
                  color: viewMode === "table" ? "var(--text)" : "var(--muted)",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
              <button 
                onClick={() => setViewMode("grid")}
                title="Grid View"
                style={{
                  background: viewMode === "grid" ? "var(--surf)" : "transparent",
                  color: viewMode === "grid" ? "var(--text)" : "var(--muted)",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </button>
            </div>

          </div>
        </div>

        {/* Product Inventory View */}
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", background: "var(--card)", borderRadius: "16px", border: "1px solid var(--border)", color: "var(--muted)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite", marginBottom: "12px" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <div>Loading products inventory...</div>
          </div>
        ) : filteredEbooks.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center", background: "var(--card)", borderRadius: "16px", border: "1px solid var(--border)" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--surf)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "var(--muted)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <h3 style={{ color: "var(--text)", fontSize: "18px", margin: "0 0 6px", fontFamily: "var(--fd)" }}>No products found</h3>
            <p style={{ color: "var(--muted)", fontSize: "14px", margin: "0 0 20px" }}>
              {searchQuery ? `No results matching "${searchQuery}"` : "Get started by adding your first ebook or playbook."}
            </p>
            <button className="btn btn-gold" onClick={() => setEditingEbook({})}>+ Create First Ebook</button>
          </div>
        ) : viewMode === "table" ? (
          
          /* Data Table View */
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "70px 3fr 1.5fr 1fr 140px", gap: "16px", padding: "14px 24px", borderBottom: "1px solid var(--border)", background: "rgba(0,0,0,0.02)", color: "var(--muted)", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <div>Cover</div>
              <div>Product Info</div>
              <div>File Attachment</div>
              <div>Price (INR)</div>
              <div style={{ textAlign: "right" }}>Actions</div>
            </div>
            
            <div>
              {filteredEbooks.map((ebook, idx) => (
                <div 
                  key={ebook.id} 
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "70px 3fr 1.5fr 1fr 140px", 
                    gap: "16px", 
                    padding: "16px 24px", 
                    alignItems: "center", 
                    borderBottom: idx === filteredEbooks.length - 1 ? "none" : "1px solid var(--border)", 
                    transition: "background 0.2s" 
                  }} 
                  onMouseOver={(e) => e.currentTarget.style.background = "var(--surf)"} 
                  onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                >
                  
                  {/* Thumbnail */}
                  <div>
                    {ebook.cover_image_url ? (
                      <div style={{ width: "44px", height: "56px", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)", background: "#000" }}>
                        <img src={ebook.cover_image_url} alt={ebook.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ width: "44px", height: "56px", borderRadius: "6px", border: "1px dashed var(--border)", background: "var(--surf)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "var(--muted)", fontSize: "10px" }}>No Cover</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Slug */}
                  <div>
                    <h3 style={{ color: "var(--text)", fontSize: "15px", fontWeight: 700, margin: "0 0 4px 0", fontFamily: "var(--fd)" }}>{ebook.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "var(--muted)", fontSize: "12px", fontFamily: "monospace" }}>/store/{ebook.slug}</span>
                      <a href={`/store/${ebook.slug}`} target="_blank" rel="noreferrer" title="Open product page" style={{ color: "var(--gold)", fontSize: "11px", textDecoration: "none" }}>↗</a>
                    </div>
                  </div>

                  {/* File Status Badge */}
                  <div>
                    {ebook.file_url ? (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", border: "1px solid rgba(34, 197, 94, 0.25)", padding: "4px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>PDF Ready</span>
                      </div>
                    ) : (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.25)", padding: "4px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span>No File Uploaded</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--text)", fontFamily: "var(--fd)" }}>
                      ₹{ebook.price_inr}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <button 
                      onClick={() => setEditingEbook(ebook)} 
                      style={{ background: "var(--surf)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600, transition: "all 0.2s", display: "flex", alignItems: "center", gap: "4px" }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(ebook.id, ebook.title)} 
                      title="Delete Product"
                      style={{ background: "transparent", color: "var(--muted)", border: "1px solid var(--border)", padding: "8px", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseOver={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ) : (
          
          /* Visual Grid View */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {filteredEbooks.map((ebook) => (
              <div 
                key={ebook.id} 
                style={{ 
                  background: "var(--card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "16px", 
                  overflow: "hidden", 
                  display: "flex", 
                  flexDirection: "column",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.03)"; }}
              >
                {/* Cover Image Header */}
                <div style={{ height: "180px", background: "var(--surf)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                  {ebook.cover_image_url ? (
                    <img src={ebook.cover_image_url} alt={ebook.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: "13px" }}>
                      No Cover Image Uploaded
                    </div>
                  )}

                  {/* Status Overlay Badge */}
                  <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                    {ebook.file_url ? (
                      <span style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", color: "#22c55e", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, border: "1px solid rgba(34,197,94,0.3)" }}>
                        ✓ PDF Attached
                      </span>
                    ) : (
                      <span style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", color: "#f59e0b", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, border: "1px solid rgba(245,158,11,0.3)" }}>
                        ⚠️ Missing PDF
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                    <h3 style={{ color: "var(--text)", fontSize: "16px", fontWeight: 800, margin: 0, fontFamily: "var(--fd)", lineHeight: 1.3 }}>{ebook.title}</h3>
                    <span style={{ background: "var(--surf)", color: "var(--gold)", padding: "4px 10px", borderRadius: "100px", fontSize: "13px", fontWeight: 800, border: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                      ₹{ebook.price_inr}
                    </span>
                  </div>

                  <p style={{ color: "var(--muted)", fontSize: "13px", margin: "0 0 16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5 }}>
                    {ebook.description || "No description provided."}
                  </p>

                  <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "var(--muted)", fontSize: "11px", fontFamily: "monospace" }}>/{ebook.slug}</span>
                    
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        onClick={() => setEditingEbook(ebook)}
                        className="btn btn-gold" 
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        Edit Product
                      </button>
                      <button 
                        onClick={() => handleDelete(ebook.id, ebook.title)}
                        style={{ background: "transparent", color: "var(--muted)", border: "1px solid var(--border)", padding: "6px 10px", borderRadius: "6px", cursor: "pointer" }}
                        onMouseOver={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                      >
                        Trash
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
