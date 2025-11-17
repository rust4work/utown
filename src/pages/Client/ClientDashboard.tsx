import React from "react";
import { useLocation } from "react-router-dom";

function ClientDashboard() {
  const { state: userData } = useLocation();
  return (
    <div>
      <h1>Client dashboard</h1>
      <h3>Phone: {userData?.token}</h3>
      <h4>Password: {userData?.password}</h4>
    </div>
  );
}

export default ClientDashboard;
