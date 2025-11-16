import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import LoginRegPage from "../pages/LoginRegPage/LoginRegPage";
import LoginPage from "../pages/LoginRegPage/LoginPage/LoginPage";
import RegisterPage from "../pages/LoginRegPage/RegisterPage/RegisterPage";
import RecoverPasswordPage from "../pages/LoginRegPage/LoginPage/RecoverPasswordPage/RecoverPasswordPage";
import ClientDashboard from "../pages/Client/ClientDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ReastaraunterDashboard from "../pages/Restaraunter/RestaraunterDashboard";
import Verification from "../pages/LoginRegPage/RegisterPage/Verification/Verification";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginRegPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/recover-password" element={<RecoverPasswordPage />} />
      <Route path="/client" element={<ClientDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/restaraunter" element={<ReastaraunterDashboard />} />
    </>
  )
);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
