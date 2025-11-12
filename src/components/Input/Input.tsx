import React from "react";
import style from "./Input.module.scss";

interface InputProps {
  type?: string;
  placeholder: string;
  name: string;
  [key: string]: any;
}

function Input({ placeholder, type = "text", name, ...rest }: InputProps) {
  return (
    <input
      className={style.input}
      type={type}
      placeholder={placeholder}
      name={name}
      {...rest}
    />
  );
}

export default Input;
