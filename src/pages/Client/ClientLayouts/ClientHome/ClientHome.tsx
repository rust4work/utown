import React from "react";
import styles from "./ClientHome.module.scss";
import Logo from "../../../../components/Logo/Logo";
import bell from "../../../../assets/images/icons/bell.svg";
import WeatherCard from "../../../../components/WeatherCard/WeatherCard";
import ActiveOrders from "../../../../components/ActiveOrders/ActiveOrders";

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
        <h2>Hello, user</h2>
        <div className={styles.headerTabs}>
          <WeatherCard />
          <ActiveOrders />
        </div>
      </main>
    </div>
  );
}

export default ClientHome;
