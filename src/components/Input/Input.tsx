import React, { useState } from "react";
import style from "./Input.module.scss";
import clsx from "clsx";
import eye from "../../assets/images/icons/eye.svg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  password?: boolean;
}

function Input({
  icon,
  placeholder,
  password = false,

  type = "text",
  value,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);

  const actualType = password ? (showPassword ? "text" : "password") : type;

  return (
    <div className={style.inputWrapper}>
      {!hasValue && icon && <span className={style.icon}>{icon}</span>}

      <input
        className={clsx(style.input, {
          [style.withIcon]: icon,
          [style.withPasswordToggle]: password,
        })}
        type={actualType}
        placeholder={!hasValue ? placeholder : ""}
        value={value}
        {...rest}
      />

      {password && (
        <button
          type="button"
          className={style.passwordToggle}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <img src={eye} style={{ opacity: "50%" }} />
          ) : (
            <img src={eye} />
          )}
        </button>
      )}
    </div>
  );
}

export default Input;
