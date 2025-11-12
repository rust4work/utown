import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  onSubmit?: () => void;
  type?: "button" | "submit" | "reset";
  typeOfButton?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  label,
  onClick,
  onSubmit,
  type = "button",
  typeOfButton,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={typeOfButton === "back" ? () => window.history.back() : onClick}
      className={`${styles[typeOfButton || "primary"]} ${className || ""}`}
      onSubmit={typeOfButton === "submit" ? onSubmit : undefined}
    >
      {children || label}
    </button>
  );
};

export default Button;
