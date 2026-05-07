// ==============================================
// API Service - Axios Configuration
// ==============================================
// Centralised Axios instance so every API call
// uses the same base URL and automatically
// attaches the JWT token to the request headers.
// ==============================================

import axios from "axios";

// Create a reusable Axios instance
const API = axios.create({
  baseURL: "/api",
  // WHY "/api" and not "http://localhost:5000/api"?
  // - Vite's proxy in vite.config.js forwards
  //   any request starting with "/api" to the
  //   backend on port 5000.
  // - This avoids CORS issues during development
  //   and works in production where both frontend
  //   and backend are served from the same domain.
});

// ------------------------------------------
// REQUEST INTERCEPTOR
// ------------------------------------------
// Runs BEFORE every request is sent.
// Automatically attaches the JWT token from
// localStorage to the Authorization header.
//
// WHY use an interceptor?
// - Without it, you'd need to manually add
//   the token to every single API call.
// - With it, any call through this instance
//   automatically includes the token.
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ------------------------------------------
// AUTH API FUNCTIONS
// ------------------------------------------
export const registerUser = (userData) => API.post("/auth/register", userData);

export const loginUser = (userData) => API.post("/auth/login", userData);

export const getProfile = () => API.get("/auth/profile");

// ------------------------------------------
// TASK API FUNCTIONS
// ------------------------------------------
export const createTask = (taskData) => API.post("/tasks", taskData);

export const getTasks = (params) => API.get("/tasks", { params });

export const getSingleTask = (id) => API.get(`/tasks/${id}`);

export const updateTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const moveTask = (id, status) =>
  API.patch(`/tasks/${id}/status`, { status });

export default API;
