import React from "react";
import { useNavigateTo } from "../../hooks/useNavigateTo";
import styles from "./ButtonMore.module.scss";

interface ButtonMoreProps {
  path: string;
}

function ButtonMore({ path }: ButtonMoreProps) {
  const { navigateTo } = useNavigateTo();
  return (
    <button className={styles.button} onClick={navigateTo(path)}>
      More
    </button>
  );
}

export default ButtonMore;
