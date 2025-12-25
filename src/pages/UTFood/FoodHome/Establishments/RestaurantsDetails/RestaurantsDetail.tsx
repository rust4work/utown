// pages/RestaurantDetail/RestaurantDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RestaurantDetail.module.scss";
import Button from "../../../../../components/Button/Button";

interface Restaurant {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  deliveryTime: string;
  // Add other fields from your API
}

function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(
          `https://utown-api.habsida.net/api/public/restaurants/${id}`
        );
        const data = await res.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!restaurant) {
    return <div className={styles.error}>Restaurant not found</div>;
  }

  return (
    <div className={styles.container}>
      <Button typeOfButton="back" />

      <img
        src={restaurant.imageUrl}
        alt={restaurant.title}
        className={styles.mainImage}
      />

      <h1 className={styles.title}>{restaurant.title}</h1>
      <p className={styles.description}>{restaurant.description}</p>
      <p className={styles.deliveryTime}>
        Delivery time: {restaurant.deliveryTime}
      </p>

      {/* Add more restaurant details here */}
    </div>
  );
}

export default RestaurantDetail;
