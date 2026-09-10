import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../utils/supabaseClient";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}

export default function AdminEbookEditor({ ebook, password, onSave, onCancel }) {
  const isNew = !ebook;
  const coverInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: ebook?.title || "",
    slug: ebook?.slug || "",
    description: ebook?.description || "",
    price_inr: ebook?.price_inr ?? 2,
    cover_image_url: ebook?.cover_image_url || "",
    file_url: ebook?.file_url || "",
    chapters: ebook?.chapters ? ebook.chapters.join("\n") : ""
  });

  const [loading, setLoading] = useState(false);
  const [uploadingState, setUploadingState] = useState({ cover: false, file: false });
  const [dragActiveState, setDragActiveState] = useState({ cover: false, file: false });
  const [previewTab, setPreviewTab] = useState("card"); // "card" | "detail"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && isNew) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }
      return updated;
    });
  };

  const uploadFileToSupabase = async (file, type, bucket) => {
    if (!file) return;
    setUploadingState((prev) => ({ ...prev, [type]: true }));

    try {
      let finalPublicUrl = "";
      let finalStoragePath = "";
      const isSmallFile = file.size <= 3.5 * 1024 * 1024; // 3.5MB threshold

      if (isSmallFile) {
        // Direct Fast Serverless Upload (1.5s)
        const base64Data = await fileToBase64(file);
        const res = await fetch("/api/admin-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${password}`
          },
          body: JSON.stringify({
            bucket,
            filename: file.name,
            fileBase64: base64Data,
            contentType: file.type || "application/octet-stream"
          })
        });

        const resText = await res.text();
        let data;
        try {
          data = JSON.parse(resText);
        } catch (e) {
          throw new Error(`Server error (${res.status}): ${resText.substring(0, 80)}`);
        }

        if (!data.ok) throw new Error(data.error || "Upload failed.");
        finalPublicUrl = data.publicUrl;
        finalStoragePath = data.path;

      } else {

        // Streaming Signed Upload for Large Files (> 3.5MB)
        const res = await fetch("/api/admin-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${password}`
          },
          body: JSON.stringify({ bucket, filename: file.name })
        });

        const resText = await res.text();
        let data;
        try {
          data = JSON.parse(resText);
        } catch (e) {
          throw new Error(`Server signature error (${res.status}): ${resText.substring(0, 80)}`);
        }

        if (!data.ok) throw new Error(data.error || "Upload signature failed.");

        let uploadSuccess = false;
        if (data.token && data.filePath && supabase) {
          try {
            const { error: sErr } = await supabase.storage
              .from(bucket)
              .uploadToSignedUrl(data.filePath, data.token, file);
            if (!sErr) uploadSuccess = true;
          } catch (s1) {
            console.warn("Supabase SDK uploadToSignedUrl warning:", s1);
          }
        }

        if (!uploadSuccess && data.signedUrl) {
          const putRes = await fetch(data.signedUrl, {
            method: "PUT",
            headers: { "Content-Type": file.type || "application/octet-stream" },
            body: file
          });
          if (putRes.ok) uploadSuccess = true;
        }

        if (!uploadSuccess) throw new Error("Large file upload failed. Please check network connection.");
        finalPublicUrl = data.publicUrl;
        finalStoragePath = data.path;
      }

      if (type === "cover") {
        setFormData((prev) => ({ ...prev, cover_image_url: finalPublicUrl }));
      } else {
        setFormData((prev) => ({ ...prev, file_url: finalStoragePath }));
      }

    } catch (err) {
      alert(`Upload Notice: ${err.message}`);
    } finally {
      setUploadingState((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleDrag = (e, type, isDragOver) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveState((prev) => ({ ...prev, [type]: isDragOver }));
  };

  const handleDrop = (e, type, bucket) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveState((prev) => ({ ...prev, [type]: false }));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFileToSupabase(e.dataTransfer.files[0], type, bucket);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price_inr: Number(formData.price_inr),
      chapters: formData.chapters
        .split("\n")
        .map((c) => c.trim())
        .filter(Boolean)
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

      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch (parseErr) {
        throw new Error(`Server error (${res.status}): ${resText.substring(0, 80)}`);
      }

      if (data.ok) {
        onSave(data.ebook, isNew);
      } else {
        alert(data.error || "Failed to save product.");
      }
    } catch (err) {
      alert(`Save error: ${err.message}`);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--text)",
    outline: "none",
    fontSize: "14px",
    fontFamily: "var(--fb)",
    boxSizing: "border-box",
    transition: "border-color 0.2s"
  };

  const labelStyle = {
    display: "block",
    color: "var(--text)",
    marginBottom: "6px",
    fontSize: "13px",
    fontWeight: 700
  };

  const cardStyle = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.02)"
  };

  const chaptersArray = formData.chapters
    .split("\n")
    .map((c) => c.trim())
    .filter(Boolean);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "calc(var(--nav) + 32px) 20px 100px" }}>
      <div className="wrap" style={{ maxWidth: "1380px", margin: "0 auto" }}>
        
        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              onClick={onCancel}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                padding: "10px",
                borderRadius: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: "var(--text)"
              }}
              title="Back to Products"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div>
              <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>Product Studio</span>
              <h2 style={{ color: "var(--text)", margin: 0, fontSize: "24px", fontFamily: "var(--fd)", fontWeight: 800, letterSpacing: "-0.5px" }}>
                {isNew ? "Create New Product" : `Editing "${ebook.title}"`}
              </h2>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-ghost" onClick={onCancel} type="button">Cancel</button>
            <button
              className="btn btn-gold"
              onClick={handleSubmit}
              disabled={loading || uploadingState.cover || uploadingState.file}
              style={{ padding: "10px 24px" }}
            >
              {loading ? "Saving Product..." : isNew ? "Publish Product" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* 2-Column Studio Grid: Left CMS Form | Right Live Studio Preview */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "32px", alignItems: "start" }}>
          
          {/* LEFT COLUMN: CMS FORM */}
          <form onSubmit={handleSubmit}>
            
            {/* General Info Card */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "20px", color: "var(--text)", fontFamily: "var(--fd)", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                General Details
              </h3>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Product Title</label>
                <input
                  style={inputStyle}
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Astrology & Zodiac Blueprint"
                  required
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>URL Slug</label>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>Auto-generated</span>
                </div>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: "13px" }}>/store/</span>
                  <input
                    style={{ ...inputStyle, paddingLeft: "70px" }}
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="astrology-zodiac-blueprint"
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Description & Tagline</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a high-converting description explaining what founders and creators will gain from this playbook..."
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Price (INR ₹)</label>
                <div style={{ position: "relative", maxWidth: "200px" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--gold)", fontWeight: 800 }}>₹</span>
                  <input
                    style={{ ...inputStyle, paddingLeft: "32px", fontSize: "16px", fontWeight: 700 }}
                    type="number"
                    name="price_inr"
                    value={formData.price_inr}
                    onChange={handleChange}
                    placeholder="2"
                    required
                  />
                </div>
              </div>

            </div>

            {/* Media Uploads Card */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "20px", color: "var(--text)", fontFamily: "var(--fd)", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Media & File Attachments
              </h3>

              {/* Cover Image Dropzone */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Product Cover Image</label>

                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      uploadFileToSupabase(e.target.files[0], "cover", "public-assets");
                    }
                  }}
                  style={{ display: "none" }}
                />

                <div
                  onClick={() => coverInputRef.current?.click()}
                  onDragOver={(e) => handleDrag(e, "cover", true)}
                  onDragLeave={(e) => handleDrag(e, "cover", false)}
                  onDrop={(e) => handleDrop(e, "cover", "public-assets")}
                  style={{
                    border: dragActiveState.cover ? "2px dashed var(--gold)" : "2px dashed var(--border)",
                    background: dragActiveState.cover ? "rgba(249,115,22,0.05)" : "var(--surf)",
                    borderRadius: "12px",
                    padding: "24px",
                    textAlign: "center",
                    transition: "all 0.2s",
                    cursor: "pointer"
                  }}
                >
                  {uploadingState.cover ? (
                    <div style={{ color: "var(--gold)", fontSize: "14px", fontWeight: 600 }}>
                      Uploading cover image...
                    </div>
                  ) : formData.cover_image_url ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", textAlign: "left" }}>
                      <img src={formData.cover_image_url} alt="Cover Preview" style={{ width: "64px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border)" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#22c55e", fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>✓ Cover Image Attached</div>
                        <span style={{ fontSize: "12px", color: "var(--muted)", wordBreak: "break-all", display: "block" }}>{formData.cover_image_url}</span>
                      </div>
                      <button 
                        type="button" 
                        className="btn btn-ghost" 
                        onClick={(e) => { e.stopPropagation(); coverInputRef.current?.click(); }}
                        style={{ fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap" }}
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" style={{ margin: "0 auto 8px" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <div style={{ color: "var(--text)", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>Click or Drag & Drop Cover Image</div>
                      <div style={{ color: "var(--muted)", fontSize: "12px" }}>PNG, JPG or WEBP (Direct High-Speed Upload)</div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "10px" }}>
                  <input
                    style={{ ...inputStyle, fontSize: "12px", padding: "10px" }}
                    name="cover_image_url"
                    value={formData.cover_image_url}
                    onChange={handleChange}
                    placeholder="Or paste cover image URL directly (e.g. https://...)"
                  />
                </div>
              </div>

              {/* Private PDF File Dropzone */}
              <div>
                <label style={labelStyle}>Digital Product File (PDF / DOC)</label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      uploadFileToSupabase(e.target.files[0], "file", "ebooks-private");
                    }
                  }}
                  style={{ display: "none" }}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => handleDrag(e, "file", true)}
                  onDragLeave={(e) => handleDrag(e, "file", false)}
                  onDrop={(e) => handleDrop(e, "file", "ebooks-private")}
                  style={{
                    border: dragActiveState.file ? "2px dashed #22c55e" : "2px dashed var(--border)",
                    background: dragActiveState.file ? "rgba(34,197,94,0.05)" : "var(--surf)",
                    borderRadius: "12px",
                    padding: "24px",
                    textAlign: "center",
                    transition: "all 0.2s",
                    cursor: "pointer"
                  }}
                >
                  {uploadingState.file ? (
                    <div style={{ color: "#22c55e", fontSize: "14px", fontWeight: 600 }}>
                      Uploading digital document...
                    </div>
                  ) : formData.file_url ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", textAlign: "left" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(34,197,94,0.15)", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#22c55e", fontSize: "13px", fontWeight: 700, marginBottom: "2px" }}>✓ PDF Attached & Linked</div>
                        <span style={{ fontSize: "12px", color: "var(--muted)", wordBreak: "break-all" }}>{formData.file_url}</span>
                      </div>
                      <button 
                        type="button" 
                        className="btn btn-ghost" 
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        style={{ fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap" }}
                      >
                        Replace File
                      </button>
                    </div>
                  ) : (
                    <div>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" style={{ margin: "0 auto 8px" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="12 18 12 12 15 15"/></svg>
                      <div style={{ color: "var(--text)", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>Click or Drag & Drop PDF Ebook Document</div>
                      <div style={{ color: "var(--muted)", fontSize: "12px" }}>Fast Direct Streaming Upload</div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "10px" }}>
                  <input
                    style={{ ...inputStyle, fontSize: "12px", padding: "10px" }}
                    name="file_url"
                    value={formData.file_url}
                    onChange={handleChange}
                    placeholder="Or paste file storage path directly (e.g. ebooks-private/my-book.pdf)"
                  />
                </div>
              </div>

            </div>

            {/* Chapters & Highlights */}
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text)", fontFamily: "var(--fd)", margin: 0 }}>
                  Chapters / What You Get
                </h3>
                <span style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700 }}>
                  {chaptersArray.length} Bullet(s)
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>
                Enter each chapter title or feature bullet on a new line.
              </p>
              
              <textarea
                style={{ ...inputStyle, minHeight: "180px", resize: "vertical", fontFamily: "monospace", fontSize: "13px" }}
                name="chapters"
                value={formData.chapters}
                onChange={handleChange}
                placeholder={"01. Introduction & Setup\n02. Core Principles\n03. Advanced Strategies\n04. Templates & Checklists"}
              />
            </div>

          </form>

          {/* RIGHT COLUMN: LIVE INTERACTIVE PREVIEW */}
          <div style={{ position: "sticky", top: "calc(var(--nav) + 20px)" }}>
            <div style={cardStyle}>
              
              {/* Studio Preview Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Live Store Preview</span>
                </div>

                <div style={{ background: "var(--surf)", border: "1px solid var(--border)", padding: "2px", borderRadius: "8px", display: "flex", gap: "2px" }}>
                  <button
                    onClick={() => setPreviewTab("card")}
                    style={{
                      background: previewTab === "card" ? "var(--card)" : "transparent",
                      color: previewTab === "card" ? "var(--text)" : "var(--muted)",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Card
                  </button>
                  <button
                    onClick={() => setPreviewTab("detail")}
                    style={{
                      background: previewTab === "detail" ? "var(--card)" : "transparent",
                      color: previewTab === "detail" ? "var(--text)" : "var(--muted)",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Detail
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              {previewTab === "card" ? (
                
                /* Store Card Preview */
                <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
                  <div style={{ height: "200px", background: "var(--surf)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                    {formData.cover_image_url ? (
                      <img src={formData.cover_image_url} alt="Live Preview Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: "13px" }}>
                        Cover Image Preview
                      </div>
                    )}
                    <span style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.75)", color: "var(--gold)", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 800 }}>
                      ₹{formData.price_inr || 2}
                    </span>
                  </div>

                  <div style={{ padding: "20px" }}>
                    <h4 style={{ color: "var(--text)", fontSize: "18px", fontWeight: 800, margin: "0 0 8px", fontFamily: "var(--fd)" }}>
                      {formData.title || "Product Title Preview"}
                    </h4>
                    <p style={{ color: "var(--muted)", fontSize: "13px", margin: "0 0 16px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {formData.description || "Compelling description of what buyers gain from this playbook will appear here."}
                    </p>

                    <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center", padding: "10px" }} type="button">
                      Buy Now — ₹{formData.price_inr || 2}
                    </button>
                  </div>
                </div>

              ) : (

                /* Detail Page Preview */
                <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px" }}>
                  <div style={{ display: "flex", gap: "14px", marginBottom: "16px", alignItems: "center" }}>
                    <div style={{ width: "50px", height: "65px", borderRadius: "6px", background: "var(--surf)", border: "1px solid var(--border)", overflow: "hidden", flexShrink: 0 }}>
                      {formData.cover_image_url && <img src={formData.cover_image_url} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                    <div>
                      <h4 style={{ color: "var(--text)", fontSize: "16px", fontWeight: 800, margin: "0 0 4px", fontFamily: "var(--fd)" }}>
                        {formData.title || "Title Preview"}
                      </h4>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--gold)" }}>₹{formData.price_inr || 2}</span>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text)", textTransform: "uppercase", marginBottom: "8px" }}>WHAT YOU GET:</div>
                    {chaptersArray.length === 0 ? (
                      <div style={{ color: "var(--muted)", fontSize: "12px", fontStyle: "italic" }}>No chapters added yet.</div>
                    ) : (
                      <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--muted)", fontSize: "12px" }}>
                        {chaptersArray.slice(0, 5).map((chap, i) => (
                          <li key={i} style={{ marginBottom: "4px" }}>{chap}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              )}

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
