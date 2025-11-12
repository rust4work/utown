import React from "react";
import style from "./Input.module.scss";
import clsx from "clsx"; // удобная утилита для объединения классов (npm i clsx)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

function Input({
  icon,
  placeholder,
  type = "text",
  value,
  ...rest
}: InputProps) {
  const hasValue = Boolean(value && String(value).length > 0);

  return (
    <div className={style.inputWrapper}>
      {!hasValue && icon && <span className={style.icon}>{icon}</span>}
      <input
        className={clsx(style.input, { [style.withIcon]: icon })}
        type={type}
        placeholder={!hasValue ? placeholder : ""}
        value={value}
        {...rest}
      />
    </div>
  );
}

export default Input;
