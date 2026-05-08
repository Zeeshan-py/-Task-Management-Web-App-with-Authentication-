// ==============================================
// API Service - Axios Configuration
// ==============================================
// Centralised Axios instance so every API call
// uses the same base URL and automatically
// attaches the JWT token to the request headers.
// ==============================================

import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const isDev = import.meta.env.DEV;

// In production, never fallback to "/api" because Netlify won't proxy
// backend routes unless explicitly configured. This avoids silent 404s.
const baseURL = rawApiUrl || (isDev ? "/api" : "");
export const API_BASE_URL = baseURL;

if (!baseURL) {
  console.error(
    "[API] Missing VITE_API_URL in production. Set it in Netlify to your Railway backend URL, e.g. https://<service>.up.railway.app/api"
  );
}

// Create a reusable Axios instance
const API = axios.create({
  // Development uses Vite proxy (/api -> localhost backend).
  // Production must use VITE_API_URL (Railway URL ending with /api).
  baseURL,
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
    if (!baseURL) {
      return Promise.reject(
        new Error(
          "API is not configured. Set VITE_API_URL in Netlify to your Railway backend URL (ending with /api)."
        )
      );
    }

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

export const getOAuthUrl = (provider) => {
  if (!baseURL) {
    throw new Error(
      "API is not configured. Set VITE_API_URL to your backend URL ending with /api."
    );
  }
  return `${baseURL.replace(/\/$/, "")}/auth/${provider}`;
};

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
