import React from "react";
import styles from "./Features.module.scss";
import reserve from "../../assets/images/icons/reserve.svg";
import jobIcon from "../../assets/images/icons/jobs-icon.svg";
import services from "../../assets/images/icons/services.svg";
import mobile from "../../assets/images/icons/mobile-connection.svg";

type TabProps = {
  typeOfTab: "grid" | "flex";
};

function TabNavigation({ typeOfTab }: TabProps) {
  const mobileText = typeOfTab === "grid" ? "Mobile connection" : "Connection";
  const foodDelivery = typeOfTab === "grid" ? "Food Delivery" : "Delivery";
  return (
    <div className={`${styles.container} ${styles[typeOfTab]}`}>
      <div className={`${styles.featureTab} ${styles.foodDelivery}`}>
        <img src={reserve} alt="" />
        <p>{foodDelivery}</p>
      </div>
      <div className={`${styles.featureTab} ${styles.mobile}`}>
        <img src={mobile} alt="" />
        <p>{mobileText}</p>
      </div>
      <div className={`${styles.featureTab} ${styles.services}`}>
        <img src={services} alt="" />
        <p>Services</p>
      </div>
      <div className={`${styles.featureTab} ${styles.jobs}`}>
        <img src={jobIcon} alt="" />
        <p>Jobs</p>
      </div>
    </div>
  );
}

export default TabNavigation;
