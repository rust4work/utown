import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoutes"; // новее

// Pages
import LoginRegPage from "../pages/LoginRegPage/LoginRegPage";
import LoginPage from "../pages/LoginRegPage/LoginPage/LoginPage";
import RegisterPage from "../pages/LoginRegPage/RegisterPage/RegisterPage";
import RecoverPasswordPage from "../pages/LoginRegPage/LoginPage/RecoverPasswordPage/RecoverPasswordPage";
import ClientDashboard from "../pages/Client/ClientDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ReastaraunterDashboard from "../pages/Restaurateur/RestaurateurDashboard";
import Verification from "../pages/LoginRegPage/RegisterPage/Verification/Verification";
import ClientHome from "../pages/Client/ClientLayouts/ClientHome/ClientHome";
import ClientFavourites from "../pages/Client/ClientLayouts/ClientFavourites/ClientFavourites";
import ClientProfile from "../pages/Client/ClientLayouts/ClientProfile/ClientProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public */}
      <Route path="/" element={<LoginRegPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/recover-password" element={<RecoverPasswordPage />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/client" element={<ClientDashboard />}>
          <Route index element={<ClientHome />} />
          <Route path="home" element={<ClientHome />} />
          <Route path="favourites" element={<ClientFavourites />} />
          <Route path="profile" element={<ClientProfile />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* RESTAURATEUR */}
        <Route path="/restaurateur" element={<ReastaraunterDashboard />} />
      </Route>
    </>
  )
);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
