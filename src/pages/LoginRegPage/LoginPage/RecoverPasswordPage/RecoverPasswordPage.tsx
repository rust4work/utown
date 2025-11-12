import React from "react";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import style from "./RecoverPassword.module.scss";

function RecoverPasswordPage() {
  return (
    <div>
      <Button typeOfButton="back"></Button>
      <main className={style.main}>
        <h1 className={style.header}>Recover password</h1>
        <p className={style.paragraph}>
          Enter the phone number you registered earlier
        </p>
        <form className={style.form}>
          <h5 className={style.form__header}>Phone number</h5>
          <Input name="phoneNumber" type="text" placeholder="Phone number" />
          <Button type="submit" typeOfButton="secondary">
            Reset password
          </Button>
        </form>
      </main>
    </div>
  );
}

export default RecoverPasswordPage;
