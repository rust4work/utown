import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoutes"; // новее
import { UserProvider } from "../utils/UserContext";

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
import Account from "../pages/Client/ClientLayouts/ClientProfile/Account/Account";
import Information from "../pages/Client/ClientLayouts/ClientProfile/Information/Information";
import Contact from "../pages/Client/ClientLayouts/ClientProfile/Contact/Contact";
import EditInfo from "../pages/Client/ClientLayouts/ClientProfile/Account/Edit/EditInfo";
import EditPassword from "../pages/Client/ClientLayouts/ClientProfile/Account/Edit/EditPassword";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";

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
          <Route index element={<Navigate to="home" replace />} />
          {/*Footer navigation*/}
          <Route path="home" element={<ClientHome />} />
          <Route path="favourites" element={<ClientFavourites />} />
          <Route path="profile" element={<ClientProfile />} />
          {/* PROFILE LAYOUT */}
          <Route path="profile/account" element={<Account />} />
          <Route path="profile/edit" element={<EditInfo />} />
          <Route path="profile/edit/password" element={<EditPassword />} />
          <Route path="profile/information" element={<Information />} />
          <Route path="profile/contact" element={<Contact />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        {/* RESTAURATEUR */}
        <Route path="/restaurateur" element={<ReastaraunterDashboard />} />
      </Route>
    </>
  )
);

function AppRoutes() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default AppRoutes;
