import React from "react";
import styles from "./HeaderDark.module.scss";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import bell from "../../assets/images/icons/bell.svg";

function HeaderDark() {
  return (
    <div>
      <header className={styles.headerContainer}>
        <div className={styles.left}>
          <Button typeOfButton="backWhite" />
        </div>

        <div className={styles.logo}>
          <Logo type="white" />
        </div>

        <div className={styles.bell}>
          <img src={bell} alt="" />
        </div>
      </header>
    </div>
  );
}

export default HeaderDark;
