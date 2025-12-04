import React, { useState } from "react";

import styles from "./Account.module.scss";
import Logo from "../../../../../components/Logo/Logo";
import bell from "../../../../../assets/images/icons/bell.svg";
import Button from "../../../../../components/Button/Button";
import profilePic from "../../../../../assets/images/icons/profile-circle.svg";
import arrowRight from "../../../../../assets/images/arrow-right.svg";
import { useNavigateTo } from "../../../../../hooks/useNavigateTo";
import { useEffect } from "react";
import { UserProfile } from "../../../../../api/auth";
import { Modal } from "antd";
import HeaderDark from "../../../../../components/HeaderDark/HeaderDark";

function Account() {
  const { navigateTo } = useNavigateTo();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch(
        "https://utown-api.habsida.net/api/users/profile",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete account");

      // Удаляем токены
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");

      // Отправляем на логин
      navigateTo("/login")();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <HeaderDark />
      <main className={styles.main}>
        <h2>Account settings</h2>
        <div className={styles.info}>
          <img src={profilePic} alt="" />

          <p>Name</p>
        </div>
        <div className={styles.edit}>
          <button
            className={styles.buttonWrapper}
            onClick={navigateTo("/client/profile/edit")}
          >
            Edit Personal Information <img src={arrowRight} alt="" />
          </button>

          <button
            className={styles.buttonWrapper}
            onClick={navigateTo("/client/profile/edit/password")}
          >
            Password <img src={arrowRight} alt="" />
          </button>
        </div>
        <footer className={styles.footer}>
          <button onClick={() => setShowModal(true)}> Delete Account</button>
        </footer>
        {/* Modal */}
        <Modal
          open={showModal}
          onOk={handleDelete}
          onCancel={() => setShowModal(false)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          centered
        >
          <p style={{ fontSize: "16px", marginBottom: "0" }}>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
        </Modal>
      </main>
    </div>
  );
}

export default Account;
