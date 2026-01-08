import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  fullName?: string;
  phoneNumber?: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          "https://utown-api.habsida.net/api/users/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();

        setUser(data);
      } catch (err) {
        console.error("Profile load error:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
};
