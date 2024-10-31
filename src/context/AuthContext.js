// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null); // New state for storing token
  const [loading, setLoading] = useState(true);
  const [intendedRoute, setIntendedRoute] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(true);

      if (user) {
        try {
          // Fetch and set the token
          const idToken = await user.getIdToken();
          setToken(idToken);

          // Fetch user role from Firestore based on UID
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setRole(docSnap.data().role); // Set role from Firestore document
          } else {
            console.log("No such document!");
            setRole(null);
          }

          // Redirect to intended route if it exists
          if (intendedRoute) {
            navigate(intendedRoute);
            setIntendedRoute(null); // Clear intended route after redirect
          }
        } catch (error) {
          console.error("Error fetching token or role:", error);
        }
      } else {
        setRole(null);
        setToken(null);
      }

      setLoading(false); // Set loading to false after setting user and role
    });

    return unsubscribe; // Cleanup on unmount
  }, [intendedRoute, navigate]);

  const value = {
    currentUser,
    role,
    token, // Provide token in context value
    loading,
    setIntendedRoute: (path) => {
      if (!intendedRoute) setIntendedRoute(path); // Only set if not already set
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ProtectedRoute component with role-based access
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, role, loading, setIntendedRoute } = useAuth();
  const location = window.location.pathname;

  if (loading) return <div>Loading...</div>; // Wait until loading is false

  if (!currentUser) {
    setIntendedRoute(location); // Store intended route before redirecting
    return <Navigate to='/login' />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to='/' />; // Redirect if role does not match
  }

  return children;
};
