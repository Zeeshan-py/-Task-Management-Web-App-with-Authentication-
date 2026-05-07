# TaskFlow - Kanban SaaS Task Management

**TaskFlow** is a modern, production-ready full-stack MERN task management application with a premium "slate-and-indigo" SaaS aesthetic. It allows users to authenticate securely, create and manage tasks on a Kanban-style dashboard, and handle project details intuitively.

Designed and developed as part of **TEYZIX Core Internship Assignment 1**.

## 🚀 Tech Stack

### Frontend
- **React.js** (Bootstrapped with Vite)
- **Tailwind CSS v4** (Modern utility-first styling with glassmorphism)
- **React Router v6** (Client-side routing)
- **Axios** (HTTP client with request interceptors)
- **React Hot Toast** (Alerts & notifications)

### Backend
- **Node.js & Express.js**
- **MongoDB** (Hosted on MongoDB Atlas)
- **Mongoose** (ODM for MongoDB)
- **JWT (JSON Web Tokens)** (Secure authentication)
- **Helmet & Morgan** (Security headers and HTTP request logging)
- **CORS** (Cross-Origin Resource Sharing)

---

## ✨ Key Features
- **Secure Authentication**: JWT-based auth with password hashing (bcryptjs) and protected React routes.
- **Premium UI/UX**: Professional "slate and indigo" color palette with smooth hover states, responsive layouts, and glassmorphism elements.
- **Kanban Board**: Organized, horizontally-scrollable responsive Kanban layout with distinct task cards.
- **Robust API**: RESTful architecture featuring global error handling and intelligent request logging.
- **Production-Ready configuration**: Configured for deployment with Netlify (frontend SPA routing) and Railway (backend Express server).

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB account (Atlas or local)
- Git

### 2. Clone the Repository
```bash
git clone https://github.com/Zeeshan-py/-Task-Management-Web-App-with-Authentication-.git
cd "-Task-Management-Web-App-with-Authentication-"
```

### 3. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```
Run the backend:
```bash
npm run dev
```

### 4. Frontend Setup
```bash
# Open a new terminal
cd frontend
npm install
```
Create a `.env` file in the `frontend/` directory (Optional for local dev as Vite proxies `/api` requests):
```env
VITE_API_URL=http://localhost:5000/api
```
Run the frontend:
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🌍 Production Deployment

This project is configured to deploy the Frontend on **Netlify** and the Backend on **Railway**.

### Backend (Railway)
1. Link your GitHub repository to a new Railway project.
2. Select the `backend` folder as the root directory (or let it run via the `start` script).
3. Add the required Environment Variables in the Railway dashboard:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=...` *(Note: The code dynamically parses and URL-encodes special characters in your password!)*
   - `JWT_SECRET=...`
   - `FRONTEND_URL=https://your-frontend-netlify-app.netlify.app`

### Frontend (Netlify)
1. Link your GitHub repository to Netlify.
2. Build Command: `npm run build`
3. Publish directory: `dist`
4. Base directory: `frontend`
5. Add the required Environment Variables:
   - `VITE_API_URL=https://your-backend-railway-app.up.railway.app/api`
6. SPA routing is automatically handled via the included `public/_redirects` file.

---

## 🛡️ License
This project is licensed under the ISC License.
