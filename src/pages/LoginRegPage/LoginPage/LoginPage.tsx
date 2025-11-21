import React from "react";
//utils
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigateTo } from "../../../hooks/useNavigateTo";
import { login } from "../../../api/login";

//components
import Button from "../../../components/Button/Button";
import style from "./LoginPage.module.scss";
import Logo from "../../../components/Logo/Logo";
import Input from "../../../components/Input/Input";
import { Spin, Alert } from "antd";

type LoginFormData = {
  phoneNumber: string;
  password: string;
};

function LoginPage() {
  const { navigateTo } = useNavigateTo();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await login(data.phoneNumber, data.password);
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("refreshToken", response.refreshToken);
      navigateTo("/client")();
    } catch (err: any) {
      setError("");
      setLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <Button className={style.backButton} typeOfButton="back" />
      <div className={style.logoContainer}>
        <Logo type="small" />
      </div>

      <main className={style.main}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Phone number"
            style={errors.phoneNumber ? { color: "#b50000" } : {}}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phoneNumber && (
            <p className={style.error}>{errors.phoneNumber.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            password={true}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 9,
                message: "Password must be at least 9 characters",
              },
            })}
          />
          {errors.password && (
            <p className={style.error}>{errors.password.message}</p>
          )}
          {/*error alert*/}
          <div>
            {error && (
              <p className={style.error}>
                Couldn't find user. Please check username and password and try
                again
              </p>
            )}
          </div>

          <Button label="Log in" typeOfButton="secondary" type="submit" />
        </form>
        {/* Loading */}
        {loading && (
          <div className={style.loader}>
            <Spin size="large" />
          </div>
        )}
      </main>

      <footer>
        <p>
          Forgot password?{" "}
          <span
            className={style.recover}
            onClick={navigateTo("/recover-password")}
          >
            Recover
          </span>
        </p>
      </footer>
    </div>
  );
}

export default LoginPage;
