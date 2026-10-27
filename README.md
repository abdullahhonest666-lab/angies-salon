# Angie's Salon — Luxury DHA Karachi Beauty Sanctuary

A complete, production-ready full-stack **MERN** web platform crafted for **Angie's Salon**, located at Khadda Market, Khayaban-e-Shamsheer, DHA Phase 5, Karachi.

---

## 🌟 Business Overview
- **Name:** Angie's Salon
- **Category:** Premier Beauty & Bridal Salon
- **Rating:** 4.8 ★ (≈229 Google Reviews)
- **Address:** Khadda Market, Khayaban-e-Shamsheer, DHA Phase 5, Karachi, Pakistan
- **Phone:** +92 308 9569291 / 021-35851771
- **WhatsApp Concierge:** +92 308 9569291
- **Working Hours:** Monday – Saturday 10:30 AM – 8:30 PM, Sunday 12:00 PM – 7:00 PM

---

## 💻 Tech Stack
- **Frontend:** React 19 + Vite + Tailwind CSS v4 + Motion
- **Backend:** Node.js + Express + TypeScript
- **Database:** Persistent Datastore with MongoDB Atlas (`MONGODB_URI`) driver compatibility
- **Authentication:** Signed JWT (JSON Web Tokens) for administrative staff portal
- **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Installation
Install all dependencies:
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configuration variables:
- `PORT`: Port for the server (defaults to `3000`)
- `JWT_SECRET`: Secret key for admin authentication
- `MONGODB_URI`: *(Optional)* Your MongoDB Atlas connection string. If omitted, the application uses an atomic persistent local store at `/data/db.json` with pre-seeded Karachi salon data.

### 3. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`, serving both the Express `/api` endpoints and the Vite React frontend via middleware.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔐 Admin Portal Credentials
- **URL:** Navigate to **Staff Portal** from the navigation bar or footer.
- **Email:** `admin@angiesalon.com`
- **Password:** `admin123`
- **Quick Demo:** Includes a 1-click demo login button for instant preview.

---

## ✨ Key Features
1. **Interactive 4-Step Booking Wizard**:
   - Treatment & Category selection with transparent PKR pricing and duration
   - Stylist preference (Angie, Zara Malik, Sara Qureshi, Hina Rizvi, or First Available)
   - Date & Time slot allocation (Morning, Afternoon, Evening)
   - Contact details validation (+92 Pakistani phone format)
   - Instant confirmation reference code (`AS-2026-XXXX`)
   - 1-Click WhatsApp confirmation dispatch to salon front desk (+92 308 9569291)
2. **Services & Pricing Menu**:
   - 18+ services across Hair, Skin, Nails, Bridal, and Waxing/Threading
   - Search filter and category tabs
3. **Filterable Portfolio Gallery**:
   - Real transformations (Bridal, Balayage, Hydra-Facial, Russian Nails)
   - Interactive Lightbox view with detailed descriptions
4. **Interactive Contact & DHA Karachi Map**:
   - Embedded Google Map centered on Khadda Market, Khayaban-e-Shamsheer, DHA Phase 5
   - Click-to-call mobile and landline links
   - Working contact message submission form
5. **Admin Operations Dashboard**:
   - KPI metrics: Total Bookings, Pending, Confirmed, Completed, and Estimated PKR Revenue
   - Appointment status updates (Confirm, Complete, Cancel)
   - Client inquiry manager
6. **Mobile-First & Universal Luxury Design**:
   - High-contrast Playfair Display serif paired with clean Plus Jakarta Sans typography
   - Blush pink (`#F8E1E7`), rose gold (`#C9A9A6`), and champagne gold accents
   - Floating WhatsApp concierge widget and back-to-top button
