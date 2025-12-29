import React, { useEffect, useState } from "react";
import Logo from "../../../../components/Logo/Logo";
import styles from "./ClientFavourites.module.scss";
import bell from "../../../../assets/images/icons/bell-dark.svg";
import Button from "../../../../components/Button/Button";
import { useNavigateTo } from "../../../../hooks/useNavigateTo";

interface Address {
  city: string;
  fullAddress: string;
}

interface Restaurant {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  deliveryTime: string;
  ratings: number;
  isActive: boolean;
  address: Address;
}

interface Favourite {
  id: number;
  restaurant: Restaurant;
}

function ClientFavourites() {
  const { navigateTo } = useNavigateTo();
  const [favourites, setFavourites] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Not authorized");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://utown-api.habsida.net/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch favourites");
        }

        const data = await res.json();
        const restaurants = data
          .map((item: Favourite) => item.restaurant)
          .filter((r: Restaurant) => r?.isActive);
        setFavourites(restaurants);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <div className={styles.left}>
          <Button typeOfButton="back" />
        </div>

        <div className={styles.logo}>
          <Logo type="small" style={{ width: "42px", height: "24px" }} />
        </div>

        <div className={styles.bell}>
          <img src={bell} alt="" />
        </div>
      </header>

      <main className={styles.main}>
        <h1>Your favourites</h1>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && favourites.length === 0 && (
          <p>You have no favourites yet</p>
        )}

        <div className={styles.list}>
          {favourites.map((restaurant) => (
            <div
              key={restaurant.id}
              className={styles.card}
              onClick={navigateTo(`/food/establishments/${restaurant.id}`)}
            >
              <img
                src={restaurant.imageUrl}
                alt={restaurant.title}
                className={styles.image}
              />
              <div className={styles.info}>
                <h3>{restaurant.title}</h3>
                <p>{restaurant.description}</p>
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ClientFavourites;
