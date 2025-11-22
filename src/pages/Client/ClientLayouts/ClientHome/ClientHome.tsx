import React from "react";
import styles from "./ClientHome.module.scss";
import Logo from "../../../../components/Logo/Logo";
import bell from "../../../../assets/images/icons/bell.svg";
function ClientHome() {
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
        <h1>main page</h1>
      </main>
    </div>
  );
}

export default ClientHome;
