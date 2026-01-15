import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchUserProfile } from "../api/auth";

export type User = {
  id?: number;
  fullName?: string;
  username?: string;
  email?: string;

  role?: string;
  roles?: string[];
  authorities?: string[];
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAdmin: boolean;
  loadingProfile: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

function extractRoles(u: User | null): string[] {
  if (!u) return [];
  const role1 = u.role ? [String(u.role)] : [];
  const role2 = Array.isArray(u.roles) ? u.roles.map(String) : [];
  const role3 = Array.isArray(u.authorities) ? u.authorities.map(String) : [];
  return Array.from(new Set([...role1, ...role2, ...role3]));
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) return;

    let cancelled = false;

    (async () => {
      try {
        setLoadingProfile(true);
        const profile = await fetchUserProfile();
        if (!cancelled) setUser(profile as User);
      } catch (err) {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshToken");
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const isAdmin = useMemo(() => {
    const roles = extractRoles(user);
    return roles.some((r) => r.toUpperCase().includes("ADMIN"));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, loadingProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
