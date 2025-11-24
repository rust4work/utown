import React from "react";
import styles from "./ActiveOrders.module.scss";
import shop from "../../assets/images/icons/shopping-cart.svg";

function ActiveOrders() {
  return (
    <div className={styles.container}>
      <img src={shop} alt="" />
      <p>
        Your <br /> active <br /> orders
      </p>
    </div>
  );
}

export default ActiveOrders;
