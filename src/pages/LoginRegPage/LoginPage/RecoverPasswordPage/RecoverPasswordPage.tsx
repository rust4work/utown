import React from "react";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import style from "./RecoverPassword.module.scss";
import call from "../../../../assets/images/icons/call.svg";
import { useForm } from "react-hook-form";

function RecoverPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phoneNumber: string }>({
    mode: "onBlur",
  });

  const onSubmit = (data: { phoneNumber: string }) => {
    console.log("Recover password for phone number:", data.phoneNumber);
  };
  return (
    <div className={style.container}>
      <Button typeOfButton="back"></Button>
      <main className={style.main}>
        <h1 className={style.header}>Recover password</h1>
        <p className={style.paragraph}>
          Enter the phone number you registered earlier
        </p>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <h5 className={style.form__header}>Phone number</h5>

          <Input
            type="text"
            placeholder="Phone number"
            icon={<img src={call} alt="call icon" />}
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
          <Button type="submit" typeOfButton="secondary">
            Reset password
          </Button>
        </form>
      </main>
    </div>
  );
}

export default RecoverPasswordPage;
