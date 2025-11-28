import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./EditInfo.module.scss";
import Button from "../../../../../../components/Button/Button";
import Logo from "../../../../../../components/Logo/Logo";
import Input from "../../../../../../components/Input/Input";
import { useNavigateTo } from "../../../../../../hooks/useNavigateTo";
import { Modal } from "antd";

interface FormValues {
  name: string;
  phone: string;
  address?: string;
}

function EditInfo() {
  const { navigateTo } = useNavigateTo();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        fullName: data.name,
        defaultAddress: data.address,
      };
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "https://utown-api.habsida.net/api/users/profile",
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
  };

  const handleModalOk = () => {
    setShowModal(false);
    navigateTo("/client/profile")();
  };

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
        <h1>Personal Information</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <div className={styles.name}>
            <label htmlFor="name">Your Name</label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          {/* PHONE */}
          <div className={styles.phone}>
            <label htmlFor="phone">Your Phone Number</label>
            <Input
              id="phone"
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                pattern: {
                  value: /^\d+$/,
                  message: "Phone must contain only numbers",
                },
              })}
            />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>

          {/* ADDRESS */}
          <div className={styles.address}>
            <label htmlFor="address">Your Address (for delivery)</label>
            <Input
              id="address"
              type="text"
              placeholder="Address"
              {...register("address")}
            />
          </div>

          <Button type="submit" typeOfButton="secondary" label="Save" />
        </form>

        {/* ===== MODAL ===== */}
        <Modal
          open={showModal}
          onOk={handleModalOk}
          onCancel={() => setShowModal(false)}
          okText="OK"
          cancelText="Cancel"
          centered
          style={{ minHeight: "200px" }}
        >
          <p>Your information has been updated successfully 🎉</p>
        </Modal>
      </main>
    </div>
  );
}

export default EditInfo;
