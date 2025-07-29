
# 🚀 MERN Agent Task Distribution System

A full-stack web application to manage agents and **automatically distribute tasks/items** from uploaded `.csv` or `.xlsx` files among registered agents.

Built with **MongoDB + Express + React + Node.js**, using modern tools like **Tailwind CSS**, **ShadCN UI**, **TypeScript**, and **Vite**.

---

## 📑 Table of Contents

- [📸 Demo Screenshots](#-demo-screenshots)
- [🧰 Features](#-features)
- [🧱 Tech Stack](#-tech-stack)
- [📦 Folder Structure](#-folder-structure)
- [🚀 Getting Started](#-getting-started)
- [1️⃣ Backend Setup](#1️⃣-backend-setup)
- [2️⃣ Frontend Setup](#2️⃣-frontend-setup)
- [📤 CSV Upload Format](#-csv-upload-format)
- [🛠️ API Endpoints](#️-api-endpoints)
- [📜 Environment Variables](#-environment-variables)
- [🤝 Contributing](#-contributing)
- [🪪 License](#-license)

---

## 📸 Demo Screenshots

> ⚡ Upload & distribute CSV tasks  
> 📊 View agent-wise task distribution  
> 🔐 Admin login & protected routes  
> ✅ Mobile responsive layout with ShadCN

---

## 🧰 Features

- 🔐 **Authentication** (JWT-based)
- 👨‍💼 **Agent management** (add, list)
- 📤 **Upload CSV/XLSX/XLS** file
- 🤖 **Automatically distribute tasks** equally among agents
- 💾 **Save to MongoDB**
- 🧾 **View distribution per agent**
- 📱 **Responsive UI with TailwindCSS + ShadCN**

---

## 🧱 Tech Stack

### Frontend

- ⚛️ React + TypeScript + Vite
- 💨 Tailwind CSS
- 🎨 ShadCN UI Components
- 📁 Axios, React Router, Lucide Icons

### Backend

- 🧠 Node.js + Express
- 🛢️ MongoDB + Mongoose
- 🔐 JWT Authentication
- 📂 Multer for file upload
- 📊 csv-parse & xlsx for file parsing

---

## 📦 Folder Structure

```
mern-agent-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── middleware/
│   ├── .env
│   └── server.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.tsx, main.tsx, etc.
│   └── tailwind.config.ts, index.html, etc.

```
---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js ≥ 18
- MongoDB instance (local or cloud)
- npm or yarn

---

### 1️⃣ Backend Setup

```bash
cd backend
npm install
````

```

#### ▶️ Run backend

```bash
npm run dev
# or
npx ts-node-dev src/server.ts
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### 🔧 Configure Tailwind CSS & ShadCN

Ensure your `tailwind.config.ts` and `vite.config.ts` are configured properly.

#### ▶️ Run frontend

```bash
npm run dev
```

---

## 📤 CSV Upload Format

Upload a `.csv`, `.xlsx`, or `.xls` file with these columns:

| FirstName | Phone      | Notes               |
| --------- | ---------- | ------------------- |
| John      | 9876543210 | Interested client   |
| Alice     | 9123456789 | Follow up next week |

📌 **Max file size:** 10MB

---

## 🛠️ API Endpoints

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| POST   | /api/auth/login   | Admin login                    |
| POST   | /api/agents       | Add a new agent                |
| GET    | /api/agents       | List all agents                |
| POST   | /api/lists/upload | Upload & distribute tasks      |
| GET    | /api/lists        | Get all distributed task lists |

---

## 📜 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your-mongo-uri
JWT_SECRET=your-key
```

### Frontend `.env` (Optional)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---
