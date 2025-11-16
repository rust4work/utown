import React from "react";
import { useForm } from "react-hook-form";
import { useNavigateTo } from "../../../hooks/useNavigateTo";
import Button from "../../../components/Button/Button";
import style from "./LoginPage.module.scss";
import Logo from "../../../components/Logo/Logo";
import Input from "../../../components/Input/Input";
import { login } from "../../../api/login";

type LoginFormData = {
  phoneNumber: string;
  password: string;
};

function LoginPage() {
  const { navigateTo } = useNavigateTo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data.phoneNumber, data.password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      navigateTo("/client")();
    } catch (err: any) {
      console.error("Login error:", err.message);
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

          <Button label="Log in" typeOfButton="secondary" type="submit" />
        </form>
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
