import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useNavigateTo } from "../../../../../hooks/useNavigateTo";
import { resetPassword, ResetPasswordPayload } from "../../../../../api/auth";

import styles from "./NewPassword.module.scss";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Input/Input";
import lock from "../../../../../assets/images/icons/lock.svg";

type NewPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

function NewPassword() {
  const { navigateTo } = useNavigateTo();
  const location = useLocation();
  const state = location.state as { username: string; code: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<NewPasswordFormData>({
    mode: "onBlur",
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: NewPasswordFormData) => {
    try {
      console.log({
        username: state.username,
        code: "123456",
        newPassword: data.newPassword,
      });

      await resetPassword({
        username: state.username,
        code: "123456",
        newPassword: data.newPassword,
      });

      navigateTo("/login")();
      alert(
        "Password changed successfully. Please log in with your new password."
      );
    } catch (error: any) {
      const code = error.response?.data?.code;
      alert(error.response?.data?.message || "Unknown error");
      // axios error
      if (code === "WRONG_OLD_PASSWORD") {
        setError("confirmPassword", {
          type: "server",
          message: "Current password is incorrect",
        });
        return;
      }
      if (code === "PASSWOrDS_DO_NOT_MATCH") {
        setError("confirmPassword", {
          type: "server",
          message: "Passwords do not match",
        });
        return;
      }

      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Button typeOfButton="back" />

      <main className={styles.main}>
        <h1 className={styles.header}>New Password</h1>
        <p className={styles.paragraph}>
          Enter a new password to access <br /> your account
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* NEW PASSWORD */}
          <label htmlFor="newPassword">New password</label>
          <Input
            icon={<img src={lock} alt="lock icon" />}
            type="password"
            password={true}
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className={styles.error}>{errors.newPassword.message}</p>
          )}
          {/* CONFIRM PASSWORD */}
          <Input
            icon={<img src={lock} alt="lock icon" />}
            type="password"
            password={true}
            placeholder="Confirm new password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}

          <Button type="submit" typeOfButton="secondary">
            Set new password
          </Button>
        </form>
      </main>
    </div>
  );
}

export default NewPassword;
