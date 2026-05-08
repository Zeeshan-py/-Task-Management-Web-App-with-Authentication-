# HookupFlow 🚀

### Modern MERN Stack SaaS Task Management Platform

HookupFlow is a modern full-stack MERN productivity and task management application inspired by professional SaaS platforms like Linear, Jira, and Notion.

The platform allows users to:
- Create and manage tasks
- Organize workflow using Kanban boards
- Authenticate securely with JWT
- Manage projects professionally
- Experience a premium responsive UI

Built as part of the **TEYZIX Core Internship Assignment** with focus on:
- Scalable architecture
- Production deployment
- Modern UI/UX
- Secure backend APIs

---

## 🌐 Live Production Links

### Frontend (Netlify)
- https://hookupflow.netlify.app/

### Backend API (Railway)
- https://hookup-flow-production.up.railway.app/

### GitHub Repository
- https://github.com/Zeeshan-py/-Task-Management-Web-App-with-Authentication-

---

## ✨ Features

### 🔐 Authentication System
- JWT Authentication
- Protected Routes
- Persistent Login Sessions
- Password Hashing using bcryptjs
- Secure Middleware Architecture

### 📋 Advanced Kanban Board
- Task Status Management
- Organized Workflow Lanes
- Responsive Task Cards
- Real-Time UI Updates
- Professional Dashboard Layout

### 🎨 Premium SaaS UI
- Modern Dark Theme
- Glassmorphism Effects
- Responsive Layouts
- Smooth Hover Effects
- Sidebar Navigation
- Mobile Friendly Design

### 📊 Dashboard & Analytics
- Task Statistics
- Sprint Overview
- Team Pages
- Analytics Dashboard
- Productivity Insights

### ⚡ Production Ready
- Railway Backend Deployment
- Netlify Frontend Deployment
- CORS Configuration
- Environment Variable Support
- Secure API Architecture
- Global Error Handling

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- React Hot Toast
- Lucide React Icons

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Helmet
- Morgan
- CORS

---

# 📁 Project Structure

```bash
HookupFlow/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Local Development Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Zeeshan-py/-Task-Management-Web-App-with-Authentication-.git

cd "-Task-Management-Web-App-with-Authentication-"
```

---

## 2️⃣ Backend Setup

```bash
cd backend

npm install
```

### Create `.env` inside backend folder

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

NODE_ENV=development

FRONTEND_URL=http://localhost:3000
```

### Run Backend

```bash
npm run dev
```

### Backend runs on:
```bash
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

### Open New Terminal

```bash
cd frontend

npm install
```

### Create `.env` inside frontend folder

```env
VITE_API_URL=http://localhost:5000/api
```

### Run Frontend

```bash
npm run dev
```

### Frontend runs on:
```bash
http://localhost:3000
```

---

# 🚀 Production Deployment Guide

## 🔥 Backend Deployment (Railway)

### Railway Settings

#### Root Directory
```bash
backend
```

#### Build Command
```bash
npm install
```

#### Start Command
```bash
npm start
```

---

## Railway Environment Variables

```env
NODE_ENV=production

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

FRONTEND_URL=https://hookupflow.netlify.app
```

---

# 🌍 Frontend Deployment (Netlify)

## Netlify Settings

### Base Directory
```bash
frontend
```

### Build Command
```bash
npm run build
```

### Publish Directory
```bash
dist
```

---

## Netlify Environment Variables

```env
VITE_API_URL=https://hookup-flow-production.up.railway.app/api
```

---

# 🔄 SPA Redirect Support

### Create File

```bash
frontend/public/_redirects
```

### Add This Code

```bash
/* /index.html 200
```

This fixes refresh issues in React Router when deployed on Netlify.

---

# 🛡️ Security Features

- Helmet Security Headers
- JWT Token Validation
- Password Hashing
- Environment Variable Protection
- Protected API Middleware
- Centralized Error Handling
- Secure Authentication Flow

---

# 📸 Future Improvements

- Drag & Drop Tasks
- Real-Time Collaboration
- Notifications System
- Workspace Management
- File Uploads
- AI Productivity Assistant
- Team Invitations

---

# 👨‍💻 Developer

## Zeeshan Ahmad

### Full Stack MERN Developer
### Computer Engineering Student

### Skills
- MERN Stack
- Next.js
- TypeScript
- MongoDB
- Express.js
- React.js
- Node.js
- Tailwind CSS
- REST APIs

---

# 📜 License

This project is licensed under the ISC License.

---

# ⭐ Support

If you like this project:
- Star the repository
- Fork the project
- Share feedback
- Contribute improvements

---

# 📬 Contact

### GitHub Profile
- https://github.com/Zeeshan-py

### Project Repository
- https://github.com/Zeeshan-py/-Task-Management-Web-App-with-Authentication-
