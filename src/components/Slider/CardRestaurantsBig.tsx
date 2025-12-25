import React from "react";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";

function CardRestaurantsBig({
  id,
  name,
  description,
  img,
  deliveryTime,
}: {
  id: number;
  name: string;
  description: string;
  img: string;
  deliveryTime: string;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/food/establishments/${id}`);
  };
  return (
    <div className={styles.restaurantsBigWrapper} onClick={handleClick}>
      <img src={img} alt="restaurant" />
      <div className={styles.info}>
        <div className={styles.name}>
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
        <div className={styles.delivery}>{deliveryTime}</div>
      </div>
    </div>
  );
}

export default CardRestaurantsBig;
