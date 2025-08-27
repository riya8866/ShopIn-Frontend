import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CustomerLoginPage from "./pages/CustomerLoginPage";
import CustomerRegisterPage from "./pages/CustomerRegisterPage";
import CustomerPortal from "./pages/CustomerPortal";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";

function App() {

  // Protected route for customer
  const CustomerRoute = ({ children }) => {
    const customerData = JSON.parse(localStorage.getItem("user")); // check dynamically
    return customerData && customerData.role === "CUSTOMER" ? children : <Navigate to="/login" />;
  };

  // Protected route for admin
  const AdminRoute = ({ children }) => {
    const adminData = JSON.parse(localStorage.getItem("admin")); // check dynamically
    return adminData && adminData.role === "ADMIN" ? children : <Navigate to="/admin-login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/register" element={<CustomerRegisterPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Protected routes */}
        <Route
          path="/customer"
          element={
            <CustomerRoute>
              <CustomerPortal />
            </CustomerRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Redirect unknown routes to customer login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
