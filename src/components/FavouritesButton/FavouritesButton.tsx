import { useState } from "react";
import styles from "./FavouritesButton.module.scss";
import heart from "../../assets/images/icons/Heart Icon.svg";
import redHeart from "../../assets/images/icons/heart.svg";

interface Props {
  restaurantId: string | number;
}

function FavouritesButton({ restaurantId }: Props) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No auth token");
      return;
    }

    // оптимистично меняем UI
    setActive((prev) => !prev);
    setLoading(true);

    try {
      const res = await fetch(
        `https://utown-api.habsida.net/api/favorites/restaurants/${restaurantId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update favourites");
      }
    } catch (error) {
      console.error(error);
      // откат, если ошибка
      setActive((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={styles.btn} onClick={handleClick} disabled={loading}>
      <span className={styles.icon}>
        <img src={active ? redHeart : heart} alt="Favourite" />
      </span>
    </button>
  );
}

export default FavouritesButton;
