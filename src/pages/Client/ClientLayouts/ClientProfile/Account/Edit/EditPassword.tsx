import React, { useState } from "react";
import styles from "./EditPassword.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../../../components/Button/Button";
import Logo from "../../../../../../components/Logo/Logo";
import Input from "../../../../../../components/Input/Input";
import { useNavigateTo } from "../../../../../../hooks/useNavigateTo";
import { Modal } from "antd";

interface FormValues {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}

function EditPassword() {
  const { navigateTo } = useNavigateTo();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.repeatPassword,
      };
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "https://utown-api.habsida.net/api/users/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed request");

      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
    setShowModal(true);
  };

  const handleModalOk = () => {
    setShowModal(false);
    navigateTo("/login")(); // ⬅ переход на логин
  };

  const newPasswordValue = watch("newPassword");

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <div className={styles.left}>
          <Button typeOfButton="back" />
        </div>

        <div className={styles.logo}>
          <Logo type="small" style={{ width: "42px", height: "24px" }} />
        </div>

        <div className={styles.bell}></div>
      </header>

      <main className={styles.main}>
        <h1>Edit password</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/*CURRENT PASSWORD*/}
          <div className={styles.password}>
            <label htmlFor="currentPassword">Your Current Password</label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Password"
              {...register("currentPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.newPassword && (
              <p className={styles.error}>{errors.newPassword.message}</p>
            )}
          </div>
          {/* NEW PASSWORD */}
          <div className={styles.password}>
            <label htmlFor="newPassword">New Password</label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Password"
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.newPassword && (
              <p className={styles.error}>{errors.newPassword.message}</p>
            )}
          </div>

          {/* REPEAT PASSWORD */}
          <div className={styles.repeat}>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <Input
              id="repeatPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("repeatPassword", {
                validate: (value) =>
                  value === newPasswordValue || "Passwords do not match",
              })}
            />
            {errors.repeatPassword && (
              <p className={styles.error}>{errors.repeatPassword.message}</p>
            )}
          </div>

          <Button type="submit" typeOfButton="secondary" label="Save" />
        </form>

        {/* MODAL */}
        <Modal
          open={showModal}
          onOk={handleModalOk}
          onCancel={() => setShowModal(false)}
          okText="Go to login"
          cancelText="Cancel"
          centered
        >
          <p>Your password has been updated successfully 🎉</p>
        </Modal>
      </main>
    </div>
  );
}

export default EditPassword;
