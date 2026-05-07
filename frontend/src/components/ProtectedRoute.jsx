// ==============================================
// Protected Route Component
// ==============================================
// This component acts as a "guard" for routes
// that require authentication.
//
// HOW IT WORKS:
// 1. Checks if a user is logged in (from AuthContext)
// 2. If YES → renders the child component (Dashboard)
// 3. If NO  → redirects to the login page
//
// USAGE in App.jsx:
//   <Route path="/dashboard" element={
//     <ProtectedRoute>
//       <Dashboard />
//     </ProtectedRoute>
//   } />
// ==============================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loader while checking auth state
  // (prevents flash of login page on refresh)
  if (loading) {
    return <Loader />;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected page
  return children;
};

export default ProtectedRoute;
