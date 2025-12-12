import React from "react";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "../../api/login";
import { fetchUserProfile } from "../../api/auth";
import { useNavigateTo } from "../../hooks/useNavigateTo";

import styles from "./AdminLoginPage.module.scss";

type AdminLoginFormData = {
  username: string;
  password: string;
};

const AdminLoginPage: React.FC = () => {
  const { navigateTo } = useNavigateTo();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await login(data.username, data.password);
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("refreshToken", response.refreshToken);
      const profile = await fetchUserProfile();

      if (!profile.roles.includes("ADMIN")) {
        setError("У этого пользователя нет прав администратора");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        return;
      }

      navigateTo("/admin")();
    } catch (e) {
      console.error(e);
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* левый блок с логотипом */}
      <div className={styles.leftPanel}>
        <Logo type="full" />
        <h1 className={styles.title}>UTOWN Admin</h1>
        <p className={styles.subtitle}>
          Вход в панель управления сервисом доставки.
        </p>
      </div>

      {/* правый блок с формой */}
      <div className={styles.rightPanel}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.formTitle}>Admin login</h2>

          <div className={styles.field}>
            <label className={styles.label}>Username</label>
            <Input
              placeholder="admin"
              {...register("username", {
                required: "Username обязателен",
              })}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <Input
              type="password"
              password
              placeholder="••••••••"
              {...register("password", {
                required: "Пароль обязателен",
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          {error && <p className={styles.globalError}>{error}</p>}

          <Button
            type="submit"
            typeOfButton="primary"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login as admin"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;