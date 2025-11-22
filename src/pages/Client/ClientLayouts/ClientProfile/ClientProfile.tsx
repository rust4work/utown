import React from "react";
import styles from "./ClientProfile.module.scss";
import bell from "../../../../assets/images/icons/bell.svg";
import Logo from "../../../../components/Logo/Logo";
function ClientProfile() {
  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <div className={styles.left}></div>

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

export default ClientProfile;
