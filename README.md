# VedaPlus | Custom Website Development for Local Businesses

A fast, modern React web application built for **VedaPlus**, a web agency specializing in website development for local enterprises such as cafes, bakeries, retail shops, boutiques, and wellness studios.

---

## 🎨 3-Color Strict Palette Standard

The entire design system strictly adheres to the requested 3-color palette:

| Color Role | Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Royal Midnight Blue | `#0F172A` | Core typography, titles, dark sections, high-tech command elements, footers |
| **Secondary** | Marigold Amber | `#F59E0B` | Glowing accents, CTAs, interactive highlights, pulse signals, badges |
| **Base / Tertiary** | Soft Chalk White | `#F8FAFC` | Page backgrounds, clean readable whitespace, crisp card backings |

---

## 🪐 Core Pages & Website Features

Managed seamlessly with **React Router v7**:

### 1. Home Page (`/`)
- **Sticky Glassmorphism Navbar**: Features the custom abstract VedaPlus logo, active page routing, status indicator, and direct call-to-action button.
- **Hero Section**: Bold headline, subheadline, speed telemetry stats (`< 0.3s`, `+64%`, `100%`), and a centerpiece visual element featuring 4 local business websites:
  - ☕ **Artisan Cafe & Bakery**: *Roast & Bloom Bistro*
  - ✨ **Wellness & Beauty Studio**: *Aura Beauty Studio*
  - 🛍️ **Boutique Retail & Shop**: *Kite & Timber Merchants*
  - 🥐 **Artisan Bakery & Goods**: *Apex Gourmet Bakery*
- **Tailored Archetype Service Cards**: Interactive 3D tilt cards showcasing dedicated website solutions for cafes, retail shops, boutiques, and wellness studios with pre-selected query param links (`/contact?type=...`).
- **High-Speed Website Advantage**: Clean architecture explaining sub-second loading speed, frictionless local customer inquiries, and Google Maps local schema advantage.
- **14-Day Rapid Delivery Cycle**: 3-step transparent website development roadmap.
- **Conversion Banner**: Direct hotline and inquiry button.

### 2. Contact / Inquiry Page (`/contact`)
- **Responsive Small Business Inquiry Form**:
  - Full Name / Business Name (with validation)
  - Email Address (format validation)
  - Business Category Dropdown (Cafe/Restaurant, Small Shop/Retail, Wellness Studio, Other)
  - Direct Phone / WhatsApp
  - Launch Timeline Selector (Fast-Track, Standard, Flexible)
  - Project Goals & Specific Requirements (character length validation)
- **Form Validation & State Handling**: Built with `react-hook-form` with custom focus rings in Marigold Amber and inline validation error notices.
- **Secure Direct Email Delivery**: Wired to send all client inquiries directly to `vedaplus76@gmail.com` via FormSubmit AJAX service (`https://formsubmit.co/ajax/vedaplus76@gmail.com`) with table formatting, direct reply-to, and instant WhatsApp copy dispatch.
- **Interactive Loading & Confirmation**:
  - Live animated pulse spinner during `"Sending..."` state.
  - Confetti burst powered by `canvas-confetti`.
  - Confirmation view: *"Thank You! The VedaPulse team will review your project and get in touch within 24 hours."* with submitted business summary and 3-step next actions roadmap.
- **Studio Command Details**:
  - **Phone Numbers**: `+91 9503956026`, `+91 9226115976`, `+91 9762874676`
  - **Email**: `vedaplus76@gmail.com`
  - **Location**: Opp. Rajgurunagar Sarkari Bank, Rajgurunagar, Khed, Pune, Maharashtra – 410505
  - Response SLA guarantee badge (< 24h).

---

## 🚀 Setup & Local Execution

### 1. Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v22)
- npm or pnpm

### 2. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

Installed packages:
- `react` & `react-dom` (v19)
- `react-router-dom` (v7)
- `react-spring` & `@react-spring/web` (v10)
- `react-parallax-tilt` (v1.7)
- `react-hook-form` (v7)
- `lucide-react`
- `canvas-confetti`

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates production-optimized static assets in the `dist/` directory.

### 5. Deploy to Vercel
The repository includes [`vercel.json`](./vercel.json) pre-configured with SPA route rewrites and asset caching.
1. Push this project to your GitHub repository.
2. In [Vercel Dashboard](https://vercel.com/new), click **Import Project** and select this repo.
3. Vercel automatically detects **Vite** and runs `npm run build` with output directory `dist`.
4. Click **Deploy**! Direct URLs (like `/contact`) and page refreshes work out-of-the-box.

---

## 📁 Project Structure

```
├── index.html                   # HTML entry point with Google Fonts preconnect
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite config with React plugin and server port
└── src
    ├── App.css                  # Global layout container
    ├── App.jsx                  # Main router configuration
    ├── index.css                # CSS variables, 3-color palette tokens, anti-gravity keyframes
    ├── main.jsx                 # React root mount
    ├── components
    │   ├── FloatingVisual.jsx   # 3D tilted core + orbiting satellites with react-spring physics
    │   ├── FloatingVisual.module.css
    │   ├── Footer.jsx           # Dark Royal Midnight Blue footer with swatch standard
    │   ├── Footer.module.css
    │   ├── Logo.jsx             # Abstract pulse monogram mark in Amber over Midnight Blue
    │   ├── Logo.module.css
    │   ├── Navbar.jsx           # Sticky navigation with mobile drawer & active indicator
    │   ├── Navbar.module.css
    │   ├── ScrollToTop.jsx      # Scroll reset utility for route transitions
    │   ├── ServiceCard.jsx      # 3D tilt cards for business archetypes
    │   └── ServiceCard.module.css
    └── pages
        ├── Contact.jsx          # Inquiry form with validation, Formspree & confirmation view
        ├── Contact.module.css
        ├── Home.jsx             # Home page with hero, blueprints, architecture & comparison
        └── Home.module.css
```
