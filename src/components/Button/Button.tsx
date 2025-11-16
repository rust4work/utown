import React from "react";
import style from "./Button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  onSubmit?: () => void;
  type?: "button" | "submit" | "reset";
  typeOfButton?: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  label,
  onClick,
  onSubmit,
  type = "button",
  typeOfButton,
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={typeOfButton === "back" ? () => window.history.back() : onClick}
      className={`${style[typeOfButton || "primary"]} ${className || ""}`}
      onSubmit={typeOfButton === "submit" ? onSubmit : undefined}
      disabled={disabled}
    >
      {children || label}
    </button>
  );
};

export default Button;
