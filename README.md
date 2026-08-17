# 🏛️ Ta-Render — AI Render Prompt Generator for Architects

**Ta-Render** adalah alat berbasis web (*web-based tool*) yang dirancang khusus untuk para arsitek dan desainer interior. Alat ini memudahkan proses pembuatan prompt render AI (seperti Gemini, Midjourney, Stable Diffusion, atau ControlNet) hanya dengan mengunggah gambar *screenshot* dari tampilan model 3D SketchUp Anda.

---

## ✨ Fitur Utama

- 📸 **Upload & Preview Screenshot**: Cukup drag-and-drop atau unggah screenshot tampilan SketchUp Anda.
- 🎨 **Dual Visual Tracks**:
  - **Rendering Style (CGI/Engine)**: Untuk estetika hasil render 3D (V-Ray, Corona, FStorm, D5 Render, Unreal Engine).
  - **Photography Style (Real Camera)**: Untuk hasil seperti foto arsitektur editorial nyata (gaya Iwan Baan, Rory Gardiner, Julius Shulman, dll).
- 🔒 **Geometry Lock Architecture**: Mengunci bentuk massing, denah, posisi jendela, dan geometri bangunan agar AI tidak mengubah struktur arsitektur asli.
- 🌿 **Preset Lengkap & Otomatis**:
  - **Design Style**: Modern Minimalist, Scandinavian Warm, Industrial Loft, Tropical Luxury, Japandi Style.
  - **Lighting Presets**: Golden Hour, Blue Hour, Bright Midday, Overcast, Tropical Morning, dll.
  - **Output Presets**: ArchDaily, Dezeen, Architectural Digest, Kinfolk, dan fotografer arsitektur dunia.
- 📋 **One-Click Copy**: Salin prompt yang dihasilkan secara instan dengan satu klik.

---

## 📁 Struktur Repositori

```text
gemini-render-prompter-web/
├── index.html          # Antarmuka pengguna (UI Utama)
├── README.md           # Dokumentasi proyek
├── css/
│   └── style.css       # Style & Desain UI responsif
└── js/
    ├── presets.js      # Database preset lighting, style, & output
    ├── engine.js       # Core PromptEngine (Logika pembentuk prompt)
    └── app.js          # Main controller & event handling