import React from "react";

import styles from "./Account.module.scss";
import Logo from "../../../../../components/Logo/Logo";
import bell from "../../../../../assets/images/icons/bell.svg";
import Button from "../../../../../components/Button/Button";
import profilePic from "../../../../../assets/images/icons/profile-circle.svg";
import arrowRight from "../../../../../assets/images/arrow-right.svg";

function Account() {
  return (
    <div className={styles.container}>
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
      <main className={styles.main}>
        <h2>Account settings</h2>
        <div className={styles.info}>
          <img src={profilePic} alt="" />

          <p>Name</p>
        </div>
        <div className={styles.edit}>
          <button className={styles.buttonWrapper}>
            Edit Personal Information <img src={arrowRight} alt="" />
          </button>

          <button className={styles.buttonWrapper}>
            Password <img src={arrowRight} alt="" />
          </button>
        </div>
        <footer className={styles.footer}>
          <button> Delete Account</button>
        </footer>
      </main>
    </div>
  );
}

export default Account;
