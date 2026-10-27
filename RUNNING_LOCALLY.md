# 🌸 How to Run Angie's Salon on Your PC (Complete Setup Guide)

This project has been structured with **Frontend Alag (`/client`)** and **Backend Alag (`/server`)**, allowing you to run them in separate terminal windows or together with a single command.

---

## 📁 Project File Structure

```
angies-salon/
├── client/                     # 🎨 FRONTEND (React 19 + Vite + Tailwind CSS)
│   ├── public/
│   │   └── images/             # All salon images, logo, & favicon
│   ├── src/
│   │   ├── components/         # Navbar, Footer, WhatsAppWidget, Lightbox, etc.
│   │   ├── data/               # Static Salon Content & Seed Services
│   │   ├── pages/              # Home, Services, About, Gallery, Book, Contact, Admin
│   │   ├── services/           # api.ts (Backend REST API client)
│   │   ├── types.ts            # TypeScript Data Models
│   │   ├── App.tsx             # Main App
│   │   ├── main.tsx            # Entry Point
│   │   └── index.css           # Global Tailwind CSS & Fonts
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── server/                     # ⚙️ BACKEND (Node.js + Express + MongoDB)
│   ├── auth.ts                 # JWT Token Signing & Verify Middleware
│   ├── db.ts                   # Database & Atomic Store (/data/db.json)
│   ├── routes.ts               # /api/services, /api/appointments, /api/auth, /api/stats
│   ├── seedData.ts             # Initial DHA Karachi Seed Data
│   ├── server.ts               # Standalone Express Server (Port 5000)
│   ├── .env.example
│   └── package.json
│
├── data/
│   └── db.json                 # Persistent Local Database File (Auto-created)
├── .env.example
├── README.md
└── package.json                # Root package with unified scripts
```

---

## 🛠️ Step 1: Prerequisites on Your PC

Make sure you have **Node.js** installed:
1. Download Node.js (v18 or higher recommended) from [nodejs.org](https://nodejs.org).
2. Open your terminal or Command Prompt (PowerShell / cmd on Windows, Terminal on Mac) and verify:
   ```bash
   node -v
   npm -v
   ```

---

## 🚀 Option A: Run Frontend & Backend Separately (Recommended for Development)

### 1️⃣ Terminal 1 — Start the Backend (Port 5000)
Open your terminal and run:
```bash
# Navigate into the server folder
cd server

# Install backend dependencies
npm install

# Start backend server
npm run dev
```
👉 Your backend will start at: **`http://localhost:5000`**  
*(It will automatically create and connect to the local persistent database with all services, stylists, reviews, and sample bookings)*.

---

### 2️⃣ Terminal 2 — Start the Frontend (Port 5173)
Open a **new** terminal window and run:
```bash
# Navigate into the client folder
cd client

# Install frontend dependencies
npm install

# Start Vite React frontend
npm run dev
```
👉 Your frontend will start at: **`http://localhost:5173`**  
*(Vite is already pre-configured to proxy `/api` calls directly to `http://localhost:5000`)*.

---

## ⚡ Option B: Run Everything from the Root with 1 Command

If you want to start the full-stack app with a single command from the main root folder:

```bash
# In the main root folder
npm install

# Start the full-stack server
npm run dev
```
👉 Open your browser at **`http://localhost:3000`**. The root server serves the Express backend and the Vite frontend together.

---

## 🍃 MongoDB Configuration (Optional)

By default, the application runs an **embedded persistent JSON datastore** in `/data/db.json` that requires **zero installation** and saves all appointments across restarts.

If you want to connect to a live **MongoDB Atlas** database:
1. Create a free cluster on [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a `.env` file inside `/server` or root:
   ```env
   PORT=5000
   JWT_SECRET="angies-salon-dha-karachi-super-secret-2026"
   MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/angies_salon?retryWrites=true&w=majority"
   ```
3. Start the backend. It will detect your `MONGODB_URI` automatically.

---

## 🔑 Admin Portal Credentials (For Testing)

1. Open the website in your browser (`http://localhost:5173` or `http://localhost:3000`).
2. Click **Staff Portal** in the navigation bar or footer.
3. Use the pre-configured credentials:
   - **Email:** `admin@angiesalon.com`
   - **Password:** `admin123`
   *(Or click the purple **"1-Click Demo Login"** button for instant access).*
4. You can view all bookings, update statuses (`Pending` ➔ `Confirmed` ➔ `Completed`), and calculate live PKR revenue.

---

## 📱 WhatsApp Integration
- Customer bookings generate an instant booking code (`AS-2026-XXXX`) and provide a 1-click **"Send Confirmation on WhatsApp"** button.
- The button opens WhatsApp chat with the pre-filled appointment details directed to **+92 308 9569291**.
