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

export function AdBig({
  title,
  image,
  description,
}: {
  title?: string;
  image: string;
  description?: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "95%",
        height: "260px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h4 style={{ color: "white", paddingLeft: "16px" }}>{title}</h4>
      <p style={{ color: "white" }}>{description}</p>
    </div>
  );
}

export function CategoriesCard({
  image,
  title,
  amount,
}: {
  image: string;
  title: string;
  amount: number;
}) {
  return (
    <div className={styles.categoriesCard}>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>{amount} establishments</p>
    </div>
  );
}
