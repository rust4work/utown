import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../utils/UserContext"; 

type Props = {
  adminOnly?: boolean;
};

const ProtectedRoutes: React.FC<Props> = ({ adminOnly = false }) => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const { isAdmin, loadingProfile } = useUser();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (adminOnly && loadingProfile) {
    return null;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
