import React, { useState } from "react";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/login";
import { fetchUserProfile } from "../../api/auth";
import { useUser } from "../../utils/UserContext"; 

import styles from "./AdminLoginPage.module.scss";

type AdminLoginFormData = {
  username: string;
  password: string;
};

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({ mode: "onBlur" });

  const onSubmit = async (form: AdminLoginFormData) => {
    try {
      setLoading(true);
      setError(null);

      const data = await login({
        username: form.username,
        password: form.password,
      });

      const accessToken = data?.accessToken || data?.token;
      if (!accessToken) {
        setError("Сервер не вернул accessToken");
        return;
      }

      localStorage.setItem("token", accessToken);
      sessionStorage.setItem("token", accessToken);

      if (data?.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
      }

      const profile = await fetchUserProfile();
      setUser(profile);

      navigate("/admin");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <Logo type="full" />
        <h1 className={styles.title}>UTOWN Admin</h1>
        <p className={styles.subtitle}>Вход в панель управления сервисом доставки.</p>
      </div>

      <div className={styles.rightPanel}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.formTitle}>Admin login</h2>

          <div className={styles.field}>
            <label className={styles.label}>Username</label>
            <Input
              placeholder="admin"
              {...register("username", { required: "Username обязателен" })}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <Input
              type="password"
              password
              placeholder="••••••••"
              {...register("password", { required: "Пароль обязателен" })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
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
