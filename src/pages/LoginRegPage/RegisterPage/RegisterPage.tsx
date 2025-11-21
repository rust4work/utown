import React from "react";
import { useForm } from "react-hook-form";
import { useNavigateTo } from "../../../hooks/useNavigateTo";
import style from "./RegisterPage.module.scss";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

// Icons
import call from "../../../assets/images/icons/call.svg";
import lock from "../../../assets/images/icons/lock.svg";

type RegisterFormData = {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

function RegisterPage() {
  const { navigateTo } = useNavigateTo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    mode: "onBlur",
  });

  const passwordValue = watch("password");

  const onSubmit = (data: RegisterFormData) => {
    navigateTo("/verification", data)();
  };

  return (
    <div className={style.wrapper}>
      <Button typeOfButton="back" />
      <main className={style.main}>
        <h1>User registration</h1>
        <p className={style.paragraph}>
          Register to access all the benefits of the app
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Phone number */}
          <label htmlFor="phone">Phone number</label>
          <Input
            type="text"
            placeholder="Enter your phone number without dashes"
            id="phone"
            icon={<img src={call} alt="call icon" />}
            style={errors.phoneNumber ? { borderColor: "#b50000" } : {}}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid phone number format",
              },
            })}
          />
          {errors.phoneNumber && (
            <p className={style.error}>{errors.phoneNumber.message}</p>
          )}

          {/* Password */}
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            password={true}
            id="password"
            icon={<img src={lock} alt="lock icon" />}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 9,
                message: "Password must be at least 9 characters long",
              },
            })}
          />
          {errors.password && (
            <p className={style.error}>{errors.password.message}</p>
          )}

          {/* Confirm password */}

          <Input
            type="password"
            placeholder="Repeat your password"
            password={true}
            id="confirmPassword"
            icon={<img src={lock} alt="lock icon" />}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className={style.error}>{errors.confirmPassword.message}</p>
          )}

          <Button type="submit" typeOfButton="secondary">
            Register
          </Button>
        </form>
      </main>

      <footer>
        <div className={style.loginRedirect}>
          <p onClick={navigateTo("/login")}>Already have an account?</p>
        </div>
        <div className={style.terms}>
          <p>
            By registering, you agree to the Terms of Service and Privacy
            Policy, as well as the Cookie Policy
          </p>
        </div>
      </footer>
    </div>
  );
}

export default RegisterPage;
