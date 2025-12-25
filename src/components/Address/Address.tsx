import React from "react";
import styles from "./Address.module.scss";
import map from "../../assets/images/icons/map.svg";

function Address() {
  const userAddress = JSON.parse(sessionStorage.getItem("user") || "{}");
  return (
    <div className={styles.address}>
      <img src={map} alt="" />
      <p>
        {userAddress.fullName ?? "Unknown user"} lives at{" "}
        {userAddress.defaultAddress ?? "no address"}
      </p>
    </div>
  );
}

export default Address;
