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
      // 1. Get Signed URL from our secure API
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

      // 2. Upload directly to Supabase Storage using the signed URL
      const uploadRes = await fetch(data.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file
      });
      
      if (!uploadRes.ok) throw new Error("Failed to upload file to storage.");

      // 3. Save the path to form data
      if (type === "cover") {
        // For public images, construct the public URL
        const publicUrl = `https://prxgbhxjdesjsybrskhx.supabase.co/storage/v1/object/public/${data.path}`;
        setFormData(prev => ({ ...prev, cover_image_url: publicUrl }));
      } else {
        // For private ebooks, save the path
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

  const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", marginBottom: "15px" };
  const labelStyle = { display: "block", color: "rgba(255,255,255,0.7)", marginBottom: "5px", fontSize: "14px" };

  return (
    <main className="store-detail-page-wrapper" style={{ minHeight: "100vh", padding: "120px 20px" }}>
      <div className="hero-bg" aria-hidden="true"><div className="orb o1" /><div className="orb o2" /></div>
      <div className="wrap" style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto", background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#fff", margin: 0 }}>{isNew ? "Create New Ebook" : "Edit Ebook"}</h2>
          <button onClick={onCancel} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Book Title</label>
              <input style={inputStyle} name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <label style={labelStyle}>URL Slug</label>
              <input style={inputStyle} name="slug" value={formData.slug} onChange={handleChange} required />
            </div>
          </div>

          <label style={labelStyle}>Description</label>
          <textarea style={{...inputStyle, minHeight: "100px"}} name="description" value={formData.description} onChange={handleChange} required />

          <label style={labelStyle}>Price (₹)</label>
          <input style={inputStyle} type="number" name="price_inr" value={formData.price_inr} onChange={handleChange} required />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.2)" }}>
              <label style={labelStyle}>1. Upload Cover Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "cover", "public-assets")} style={{ color: "#fff", marginBottom: "10px" }} />
              {uploadingState.cover && <span style={{ color: "#f5a623", fontSize: "12px" }}>Uploading...</span>}
              <input style={{...inputStyle, marginBottom: 0, marginTop: "10px", fontSize: "12px"}} name="cover_image_url" value={formData.cover_image_url} onChange={handleChange} placeholder="Or paste image URL" />
            </div>
            
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.2)" }}>
              <label style={labelStyle}>2. Upload Ebook Document (PDF/DOCX)</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, "file", "ebooks-private")} style={{ color: "#fff", marginBottom: "10px" }} />
              {uploadingState.file && <span style={{ color: "#f5a623", fontSize: "12px" }}>Uploading...</span>}
              <input style={{...inputStyle, marginBottom: 0, marginTop: "10px", fontSize: "12px"}} name="file_url" value={formData.file_url} onChange={handleChange} placeholder="Or paste file path (e.g. ebooks-private/file.pdf)" />
            </div>
          </div>

          <label style={labelStyle}>Chapters / What You Get (One per line)</label>
          <textarea style={{...inputStyle, minHeight: "150px"}} name="chapters" value={formData.chapters} onChange={handleChange} placeholder="01. Introduction to topic..." />

          <button type="submit" disabled={loading || uploadingState.cover || uploadingState.file} style={{ width: "100%", background: "#f5a623", color: "#000", padding: "15px", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer", marginTop: "10px" }}>
            {loading ? "Saving..." : "Publish Ebook"}
          </button>
        </form>

      </div>
    </main>
  );
}
