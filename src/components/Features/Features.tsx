import React from "react";
import styles from "./Features.module.scss";
import reserve from "../../assets/images/icons/reserve.svg";
import jobIcon from "../../assets/images/icons/jobs-icon.svg";
import services from "../../assets/images/icons/services.svg";
import mobile from "../../assets/images/icons/mobile-connection.svg";
import { useNavigateTo } from "../../hooks/useNavigateTo";

type TabProps = {
  typeOfTab: "grid" | "flex";
};

function TabNavigation({ typeOfTab }: TabProps) {
  const mobileText = typeOfTab === "grid" ? "Coming soon..." : "Soon...";
  const foodDelivery = typeOfTab === "grid" ? "Food Delivery" : "Food";
  const { navigateTo } = useNavigateTo();

  return (
    <div className={`${styles.container} ${styles[typeOfTab]}`}>
      <div
        className={`${styles.featureTab} ${styles.foodDelivery}`}
        onClick={navigateTo("/food")}
      >
        <img src={reserve} alt="" />
        <p>{foodDelivery}</p>
      </div>
      <div className={`${styles.featureTab} ${styles.mobile}`}>
        <img src={mobile} alt="" />
        <p>Soon...</p>
      </div>
      <div className={`${styles.featureTab} ${styles.services}`}>
        <img src={services} alt="" />
        <p>Soon...</p>
      </div>
      <div className={`${styles.featureTab} ${styles.jobs}`}>
        <img src={jobIcon} alt="" />
        <p>Soon...</p>
      </div>
    </div>
  );
}

export default TabNavigation;
