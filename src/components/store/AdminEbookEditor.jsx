import React, { useState } from "react";

export default function AdminEbookEditor({ ebook, password, onSave, onCancel }) {
  const isNew = !ebook;
  const [formData, setFormData] = useState({
    title: ebook?.title || "",
    slug: ebook?.slug || "",
    description: ebook?.description || "",
    price_inr: ebook?.price_inr || "",
    cover_image_url: ebook?.cover_image_url || "",
    file_url: ebook?.file_url || "",
    chapters: ebook?.chapters ? ebook.chapters.join("\n") : ""
  });
  const [loading, setLoading] = useState(false);
  const [uploadingState, setUploadingState] = useState({ cover: false, file: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "title" && isNew ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') } : {})
    }));
  };

  const handleFileUpload = async (e, type, bucket) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingState(prev => ({ ...prev, [type]: true }));
    try {
      const res = await fetch("/api/admin-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`
        },
        body: JSON.stringify({ bucket, filename: file.name })
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);

      const uploadRes = await fetch(data.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file
      });
      
      if (!uploadRes.ok) throw new Error("Failed to upload file to storage.");

      if (type === "cover") {
        const publicUrl = `https://prxgbhxjdesjsybrskhx.supabase.co/storage/v1/object/public/${data.path}`;
        setFormData(prev => ({ ...prev, cover_image_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, file_url: data.path }));
      }
      alert(`${type === "cover" ? "Image" : "Document"} uploaded successfully!`);
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    }
    setUploadingState(prev => ({ ...prev, [type]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price_inr: Number(formData.price_inr),
      chapters: formData.chapters.split("\n").map(c => c.trim()).filter(Boolean)
    };

    if (!isNew) payload.id = ebook.id;

    try {
      const res = await fetch("/api/admin-ebooks", {
        method: isNew ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.ok) {
        onSave(data.ebook, isNew);
      } else {
        alert(data.error || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving ebook.");
    }
    setLoading(false);
  };

  const inputStyle = { 
    width: "100%", 
    padding: "12px", 
    borderRadius: "8px", 
    border: "1px solid var(--border)", 
    background: "var(--bg)", 
    color: "var(--text)", 
    outline: "none",
    fontSize: "14px",
    fontFamily: "var(--fb)"
  };
  
  const labelStyle = { 
    display: "block", 
    color: "var(--text)", 
    marginBottom: "6px", 
    fontSize: "14px",
    fontWeight: 600 
  };
  
  const cardStyle = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "calc(var(--nav) + 40px) 20px 100px" }}>
      <div className="wrap" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={onCancel} style={{ background: "transparent", border: "1px solid var(--border)", padding: "8px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", color: "var(--text)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div>
              <h2 style={{ color: "var(--text)", margin: 0, fontSize: "24px", fontFamily: "var(--fd)", fontWeight: 800, letterSpacing: "-0.5px" }}>
                {isNew ? "Create Product" : "Edit Product"}
              </h2>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="btn btn-gold" onClick={handleSubmit} disabled={loading || uploadingState.cover || uploadingState.file}>
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          
          {/* Left Column - Main Details */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            
            <div style={cardStyle}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "var(--text)", fontFamily: "var(--fd)" }}>General Information</h3>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Product Title</label>
                <input style={inputStyle} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Astrology for Beginners" required />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>URL Slug</label>
                <input style={inputStyle} name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. astrology-for-beginners" required />
              </div>

              <div>
                <label style={labelStyle}>Description</label>
                <textarea style={{...inputStyle, minHeight: "120px", resize: "vertical"}} name="description" value={formData.description} onChange={handleChange} placeholder="Write a compelling description for your ebook..." required />
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text)", fontFamily: "var(--fd)" }}>What You Get (Chapters)</h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>Enter each chapter or bullet point on a new line. These will render as a list on the product page.</p>
              
              <textarea style={{...inputStyle, minHeight: "200px", resize: "vertical"}} name="chapters" value={formData.chapters} onChange={handleChange} placeholder="01. Introduction to topic...&#10;02. Deep dive into strategy...&#10;03. Case studies..." />
            </div>

          </div>

          {/* Right Column - Pricing & Media */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            
            <div style={cardStyle}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "var(--text)", fontFamily: "var(--fd)" }}>Pricing</h3>
              
              <div>
                <label style={labelStyle}>Price (INR)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontWeight: 600 }}>₹</span>
                  <input style={{...inputStyle, paddingLeft: "30px"}} type="number" name="price_inr" value={formData.price_inr} onChange={handleChange} placeholder="0.00" required />
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "var(--text)", fontFamily: "var(--fd)" }}>Cover Image</h3>
              
              {formData.cover_image_url && (
                <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--surf)", aspectRatio: "16/10" }}>
                  <img src={formData.cover_image_url} alt="Cover Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              
              <div style={{ background: "var(--surf)", padding: "16px", borderRadius: "8px", border: "1px dashed var(--border)", textAlign: "center", marginBottom: "12px" }}>
                <input type="file" id="coverUpload" accept="image/*" onChange={(e) => handleFileUpload(e, "cover", "public-assets")} style={{ display: "none" }} />
                <label htmlFor="coverUpload" className="btn btn-ghost" style={{ cursor: "pointer", width: "100%", justifyContent: "center", padding: "10px", fontSize: "13px" }}>
                  {uploadingState.cover ? "Uploading..." : "Upload Cover Image"}
                </label>
              </div>
              
              <input style={{...inputStyle, fontSize: "12px", padding: "10px"}} name="cover_image_url" value={formData.cover_image_url} onChange={handleChange} placeholder="Or paste image URL" />
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "var(--text)", fontFamily: "var(--fd)" }}>Digital Product File</h3>
              
              {formData.file_url && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", borderRadius: "8px", marginBottom: "16px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  <span style={{ fontSize: "13px", color: "#22c55e", fontWeight: 600, wordBreak: "break-all" }}>{formData.file_url.split('/').pop()}</span>
                </div>
              )}

              <div style={{ background: "var(--surf)", padding: "16px", borderRadius: "8px", border: "1px dashed var(--border)", textAlign: "center", marginBottom: "12px" }}>
                <input type="file" id="fileUpload" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, "file", "ebooks-private")} style={{ display: "none" }} />
                <label htmlFor="fileUpload" className="btn btn-ghost" style={{ cursor: "pointer", width: "100%", justifyContent: "center", padding: "10px", fontSize: "13px" }}>
                  {uploadingState.file ? "Uploading..." : "Upload Document"}
                </label>
              </div>
              
              <input style={{...inputStyle, fontSize: "12px", padding: "10px"}} name="file_url" value={formData.file_url} onChange={handleChange} placeholder="Or paste file path (e.g. ebooks-private/file.pdf)" />
            </div>

          </div>

        </form>
      </div>
    </main>
  );
}
