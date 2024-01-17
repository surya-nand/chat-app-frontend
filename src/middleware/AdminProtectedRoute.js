import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ element }) => {
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const isAuthenticated = userInfo && userInfo.role === "admin";

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
};

export default AdminProtectedRoute;
