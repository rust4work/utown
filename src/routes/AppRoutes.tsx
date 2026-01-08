import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoutes";
import { UserProvider } from "../utils/UserContext";

// Public
import LoginRegPage from "../pages/LoginRegPage/LoginRegPage";
import LoginPage from "../pages/LoginRegPage/LoginPage/LoginPage";
import RegisterPage from "../pages/LoginRegPage/RegisterPage/RegisterPage";
import RecoverPasswordPage from "../pages/LoginRegPage/LoginPage/RecoverPasswordPage/RecoverPasswordPage";
import Verification from "../pages/LoginRegPage/RegisterPage/Verification/Verification";

// Client
import ClientDashboard from "../pages/Client/ClientDashboard";
import ClientHome from "../pages/Client/ClientLayouts/ClientHome/ClientHome";
import ClientFavourites from "../pages/Client/ClientLayouts/ClientFavourites/ClientFavourites";
import ClientProfile from "../pages/Client/ClientLayouts/ClientProfile/ClientProfile";
import Account from "../pages/Client/ClientLayouts/ClientProfile/Account/Account";
import Information from "../pages/Client/ClientLayouts/ClientProfile/Information/Information";
import Contact from "../pages/Client/ClientLayouts/ClientProfile/Contact/Contact";
import EditInfo from "../pages/Client/ClientLayouts/ClientProfile/Account/Edit/EditInfo";
import EditPassword from "../pages/Client/ClientLayouts/ClientProfile/Account/Edit/EditPassword";

// UTFood
import UtFood from "../pages/UTFood/UtFood";
import FoodHome from "../pages/UTFood/FoodHome/FoodHome";
import Establishments from "../pages/UTFood/FoodHome/Establishments/Establishments";

// Admin
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminAddClientPage from "../pages/Admin/AddClientPage/AdminAddClientPage";
import AdminEditClientPage from "../pages/Admin/EditClientPage/AdminEditClientPage";
import AdminEstablishmentsPage from "../pages/Admin/EstablishmentsPage/AdminEstablishmentsPage";

// Restaurateur
import ReastaraunterDashboard from "../pages/Restaurateur/RestaurateurDashboard";
import RecoverVerification from "../pages/LoginRegPage/LoginPage/RecoverPasswordPage/RecoverVerification/RecoverVerification";
import NewPassword from "../pages/LoginRegPage/LoginPage/RecoverPasswordPage/NewPassword/NewPassword";
import RestaurantDetails from "../pages/UTFood/FoodHome/Establishments/RestaurantsDetails/RestaurantsDetail";

import Checkout from "../pages/UTFood/FoodHome/Establishments/RestaurantsDetails/CheckoutPage/Checkout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public */}
      <Route path="/" element={<LoginRegPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/recover-password" element={<RecoverPasswordPage />} />
      <Route path="/recover-verification" element={<RecoverVerification />} />
      <Route path="/new-password" element={<NewPassword />} />

      {/* Admin login MUST be public */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        {/* CLIENT */}
        <Route path="/client" element={<ClientDashboard />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<ClientHome />} />
          <Route path="favourites" element={<ClientFavourites />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="profile/account" element={<Account />} />
          <Route path="profile/edit" element={<EditInfo />} />
          <Route path="profile/edit/password" element={<EditPassword />} />
          <Route path="profile/information" element={<Information />} />
          <Route path="profile/contact" element={<Contact />} />
        </Route>

        {/* UTFOOD */}
        <Route path="/food" element={<UtFood />}>
          <Route index element={<FoodHome />} />
          <Route path="establishments" element={<Establishments />} />
          <Route path="establishments/:id" element={<RestaurantDetails />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/clients/add" element={<AdminAddClientPage />} />
        <Route path="/admin/clients/:id/edit" element={<AdminEditClientPage />} />
        <Route path="/admin/establishments" element={<AdminEstablishmentsPage />} />

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
