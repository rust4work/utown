import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../utils/UserContext"; 

const AdminProtectedRoute: React.FC = () => {
  const { user, loading } = useUser();
  const location = useLocation();

  const token = sessionStorage.getItem("token");

  if (loading) return null; 

  if (!token || !user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const roles = user.roles || [];
  if (!roles.includes("ADMIN")) {
    return <Navigate to="/client" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;