// ==============================================
// Auth Context - Global Authentication State
// ==============================================
// Context API provides a way to share state
// across all components without "prop drilling"
// (passing props through every level).
//
// This context stores:
//   - user object (name, email, role, token)
//   - login function
//   - logout function
//   - loading state
//
// Any component can access these via useAuth() hook.
// ==============================================

import { createContext, useContext, useState, useEffect } from "react";
import { loginUser as loginAPI, registerUser as registerAPI } from "../services/api";
import toast from "react-hot-toast";

// ------------------------------------------
// 1. CREATE THE CONTEXT
// ------------------------------------------
const AuthContext = createContext(null);

// ------------------------------------------
// 2. CREATE THE PROVIDER COMPONENT
// ------------------------------------------
// The Provider wraps the entire app and makes
// auth state available to all child components.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------
  // 3. CHECK LOCAL STORAGE ON APP LOAD
  // ------------------------------------------
  // When the app loads (or page refreshes), check
  // if there's a saved user and token in localStorage.
  // This keeps the user logged in across page refreshes.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ------------------------------------------
  // 4. REGISTER FUNCTION
  // ------------------------------------------
  const register = async (name, email, password) => {
    try {
      const { data } = await registerAPI({ name, email, password });

      toast.success("Account created successfully! Please login.");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // ------------------------------------------
  // 5. LOGIN FUNCTION
  // ------------------------------------------
  const login = async (email, password) => {
    try {
      const { data } = await loginAPI({ email, password });

      // Store user data and token in state
      const userData = {
        _id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
      };

      setUser(userData);

      // Persist in localStorage for session survival
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.data.token);

      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // ------------------------------------------
  // 6. LOGOUT FUNCTION
  // ------------------------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  // ------------------------------------------
  // 7. PROVIDE VALUES TO CHILDREN
  // ------------------------------------------
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ------------------------------------------
// 8. CUSTOM HOOK FOR EASY ACCESS
// ------------------------------------------
// Instead of importing useContext + AuthContext
// everywhere, components just call useAuth().
//
// USAGE:
//   import { useAuth } from "../context/AuthContext";
//   const { user, login, logout } = useAuth();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
