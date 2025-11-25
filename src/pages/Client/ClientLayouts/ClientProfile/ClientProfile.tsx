import React from "react";
import styles from "./ClientProfile.module.scss";
import Logo from "../../../../components/Logo/Logo";
import Features from "../../../../components/Features/Features";

//icons
import bell from "../../../../assets/images/icons/bell.svg";
import account from "../../../../assets/images/icons/profile-circle.svg";
import settings from "../../../../assets/images/icons/setting-2.svg";
import favourite from "../../../../assets/images/icons/star-white.svg";
import contact from "../../../../assets/images/icons/sms-tracking.svg";
import logout from "../../../../assets/images/icons/logout.svg";

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
        <h2>Hello, User!</h2>
        <Features typeOfTab="flex" />
        <ul>
          <li>
            <img src={account} alt="" />
            <p>Account</p>
          </li>
          <li>
            <img src={settings} alt="" />
            <p>Information</p>
          </li>
          <li>
            <img src={favourite} alt="" />
            <p>Favourites</p>
          </li>
          <li>
            <img src={contact} alt="" />
            <p>Contact Sup port</p>
          </li>
          <li>
            <img src={logout} alt="" />
            <p>Log Out</p>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default ClientProfile;
