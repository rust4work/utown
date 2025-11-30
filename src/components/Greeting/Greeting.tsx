import { useState, useEffect } from "react";
import React from "react";

function Greeting() {
  const [profile, setProfile] = useState<{ fullName?: string }>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(
          "https://utown-api.habsida.net/api/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>
        Hello, {profile.fullName || "user"}!
      </h2>
    </div>
  );
}

export default Greeting;
