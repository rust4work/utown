import React, { useEffect, useState } from "react";
import { RegisterResponse, UserProfile } from "../../api/auth";
import { Spin } from "antd";
import styles from "./ClientDashboard.module.scss";

import { NavLink, Outlet } from "react-router-dom";

//icons
import Logo from "../../components/Logo/Logo";
import bell from "../../assets/images/icons/bell.svg";
import homeDefault from "../../assets/images/icons/home-default.svg";
import homeActive from "../../assets/images/icons/home-active.svg";
import starDefault from "../../assets/images/icons/star-default.svg";
import starActive from "../../assets/images/icons/star-active.svg";
import userDefault from "../../assets/images/icons/user-square-default.svg";
import userActive from "../../assets/images/icons/user-square-active.svg";

function ClientDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [customHeader, setCustomHeader] = useState<React.ReactNode | null>(
    null
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://utown-api.habsida.net/api/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`, // если нужен токен
            },
          }
        );

        const data: UserProfile = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {/** --- Layouts --- */}
        <main className={styles.content}>
          {profile ? (
            <Outlet context={{ profile, setCustomHeader }} />
          ) : (
            <Spin size="large" style={{ alignSelf: "center" }} />
          )}
        </main>
        {/** --- Footer --- */}
        <footer className={styles.footer}>
          <NavLink to="/client" className={styles.navItem}>
            {({ isActive }) => (
              <>
                <img src={isActive ? homeActive : homeDefault} alt="Home" />
                <p className={isActive ? styles.activeText : ""}>Home</p>
              </>
            )}
          </NavLink>
          <NavLink to="/client/favourites" className={styles.navItem}>
            {({ isActive }) => (
              <>
                <img src={isActive ? starActive : starDefault} alt="Home" />

                <p className={isActive ? styles.activeText : ""}>Favourites</p>
              </>
            )}
          </NavLink>
          <NavLink to="/client/profile" className={styles.navItem}>
            {({ isActive }) => (
              <>
                <img src={isActive ? userActive : userDefault} alt="Home" />
                <p className={isActive ? styles.activeText : ""}>Profile</p>
              </>
            )}
          </NavLink>
        </footer>
      </div>
    </>
  );
}

export default ClientDashboard;
