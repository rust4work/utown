import React from "react";
import styles from "./Card.module.scss";
import bg from "../../assets/images/ads/bgc.png";

export function Card({ title, image }: { title: string; image: string }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export function CustomCard() {
  return (
    <div
      className={styles.customWrapper}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <p>
        This website was made by
        <a href="https://github.com/rust4work">Rustam Bakhtiyorov aka Ruby</a>
      </p>
    </div>
  );
}
