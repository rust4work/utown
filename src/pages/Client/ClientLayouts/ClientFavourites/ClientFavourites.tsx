import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Logo from "../../../../components/Logo/Logo";
import styles from "./ClientFavourites.module.scss";
import bell from "../../../../assets/images/icons/bell-dark.svg";
import Button from "../../../../components/Button/Button";

function ClientFavourites() {
  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <div className={styles.left}>
          <Button typeOfButton="back" />
        </div>

        <div className={styles.logo}>
          <Logo type="small" style={{ width: "42px", height: "24px" }} />
        </div>

        <div className={styles.bell}>
          <img src={bell} alt="" />
        </div>
      </header>
      <main className={styles.main}>
        <h1>Your favourites</h1>
      </main>
    </div>
  );
}

export default ClientFavourites;
