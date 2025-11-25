import React from "react";
import styles from "./ClientProfile.module.scss";
import bell from "../../../../assets/images/icons/bell.svg";
import Logo from "../../../../components/Logo/Logo";
import Features from "../../../../components/Features/Features";
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
      <main className={styles.main}>
        <Features typeOfTab="flex" />
      </main>
    </div>
  );
}

export default ClientProfile;
