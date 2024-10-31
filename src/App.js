// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import RegisterChoice from "./components/RegisterChoice";
import BuyerRegistration from "./components/BuyerRegistration";
import SupplierRegistration from "./components/SupplierRegistration";
import BuyerHome from "./components/BuyerHome";
import SupplierHome from "./components/SupplierHome";
import { useAuth } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import ProductDetails from "./pages/ProductDetailsPage";
import ChatPage from "./pages/ChatPage";
import ManageListings from "./pages/ManageListings";
import SupplierChatPage from "./pages/SupplierChatPage";
import AddProduct from "./pages/AddProduct";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, role, loading, setIntendedRoute } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) {
    setIntendedRoute(window.location.pathname); // Use setIntendedRoute here
    return <Navigate to='/' />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to='/' />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register-choice' element={<RegisterChoice />} />
      <Route path='/buyer-registration' element={<BuyerRegistration />} />
      <Route path='/supplier-registration' element={<SupplierRegistration />} />
      <Route path='/products/:productId' element={<ProductDetails />} />
      <Route path='/supplier-chat' element={<SupplierChatPage />} />
      {/* Protected Routes with Role-Based Access */}
      <Route
        path='/buyer-home'
        element={
          <ProtectedRoute requiredRole='buyer'>
            <BuyerHome />
          </ProtectedRoute>
        }
      />
      <Route
        path='/supplier-home'
        element={
          <ProtectedRoute requiredRole='supplier'>
            <SupplierHome />
          </ProtectedRoute>
        }
      />
      <Route
        path='/manage-listings'
        element={
          <ProtectedRoute requiredRole='supplier'>
            <ManageListings />
          </ProtectedRoute>
        }
      />
      <Route
        path='/add-product'
        element={
          <ProtectedRoute requiredRole='supplier'>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path='/chat/:productId'
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
