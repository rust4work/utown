import React from "react";
import styles from "./Card.module.scss";
import deliver from "../../assets/images/icons/delivery.svg";

function CardRestaurants({
  title,
  image,
  deliveryTime,
  description,
  onClick,
}: {
  title: string;
  image: string;
  deliveryTime: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div className={styles.restaurantsWrapper} onClick={onClick}>
      <img src={image} alt="image" />
      <div className={styles.info}>
        <h4>{title}</h4>
        <p>{description}</p>
        <div className={styles.delivery}>
          <img src={deliver} alt="" />
          <p>3.000 won - </p>
          <p>{deliveryTime}</p>
        </div>
      </div>
    </div>
  );
}

export default CardRestaurants;
