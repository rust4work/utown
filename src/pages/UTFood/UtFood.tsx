import React from "react";
import styles from "./UtFood.module.scss";
import { useNavigateTo } from "../../hooks/useNavigateTo";
import { Outlet } from "react-router-dom";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import bell from "../../assets/images/icons/bell.svg";
import food from "../../assets/images/CategoryFood.svg";

function UtFood() {
  const { navigateTo } = useNavigateTo();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button typeOfButton="backWhite" />
        <div className={styles.logo}>
          <Logo type="white" />
          <img src={food} alt="" />
        </div>
        <img src={bell} alt="" />
      </header>

      <Outlet />
    </div>
  );
}

export default UtFood;
