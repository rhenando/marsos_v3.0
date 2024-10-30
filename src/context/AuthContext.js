// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom"; // Added Navigate to imports

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [intendedRoute, setIntendedRoute] = useState(null); // State to store intended route

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Current User in AuthProvider:", user); // Debugging line to check user
      setCurrentUser(user); // Set current user when auth state changes
      setLoading(false); // Set loading to false after user is determined

      // Redirect to intended route after login
      if (user && intendedRoute) {
        navigate(intendedRoute);
        setIntendedRoute(null); // Clear intended route after redirect
      }
    });

    return unsubscribe; // Cleanup on unmount
  }, [intendedRoute, navigate]);

  // Pass loading state to context to allow other components to handle loading state
  const value = {
    currentUser,
    loading,
    setIntendedRoute,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ProtectedRoute component for route guarding based on authentication
export const ProtectedRoute = ({ children }) => {
  const { currentUser, setIntendedRoute } = useAuth();
  const location = window.location.pathname;

  if (!currentUser) {
    setIntendedRoute(location); // Store intended route before redirecting
    return <Navigate to='/login' />;
  }

  return children;
};
