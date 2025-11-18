import React, { useEffect, useState } from "react";
import { RegisterResponse } from "../../api/auth";
import { Spin } from "antd";

function ClientDashboard() {
  const [profile, setProfile] = useState<RegisterResponse | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://utown-api.habsida.net/api/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // если нужен токен
            },
          }
        );

        const data: RegisterResponse = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Spin size="large" style={{ alignSelf: "center" }} />;
  }
  return (
    <div>
      <h1>Client dashboard</h1>
      <h3>Phone: {profile.username}</h3>
      <h4>ID: {profile.id}</h4>
      <h4>Full name: {profile.fullName}</h4>
      <h4>Active: {profile.isActive ? "Yes" : "No"}</h4>
    </div>
  );
}

export default ClientDashboard;
