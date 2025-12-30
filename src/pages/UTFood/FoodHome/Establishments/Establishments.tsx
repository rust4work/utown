import React, { useEffect } from "react";
import styles from "./Establishments.module.scss";
import Address from "../../../../components/Address/Address";
import CardRestaurantsBig from "../../../../components/Slider/CardRestaurantsBig";

function Establishments() {
  const [establishments, setEstablishments] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchEstablishments = async () => {
      const res = await fetch(
        "https://utown-api.habsida.net/api/public/restaurants"
      );
      const establishments = await res.json();
      setEstablishments(establishments.content);
    };

    fetchEstablishments();
  }, []);

  return (
    <div className={styles.container}>
      <Address />
      <h1 className={styles.title}>Establishments</h1>
      <div className={styles.establishments}>
        {establishments.map((e: any) => (
          <CardRestaurantsBig
            key={e.id}
            id={e.id}
            name={e.title}
            description={e.description}
            img={e.imageUrl}
            deliveryTime={e.deliveryTime}
          />
        ))}
      </div>
    </div>
  );
}

export default Establishments;
