// ==============================================
// Main Entry Point - React App
// ==============================================
// This file bootstraps the React application:
// 1. Imports the global CSS (Tailwind + custom)
// 2. Wraps App in AuthProvider (context)
// 3. Renders into the DOM
// ==============================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
