import React, { useState, useEffect } from "react";
import styles from "./ClientHome.module.scss";
import { useNavigateTo } from "../../../../hooks/useNavigateTo";
//components
import Logo from "../../../../components/Logo/Logo";
import WeatherCard from "../../../../components/WeatherCard/WeatherCard";
import ActiveOrders from "../../../../components/ActiveOrders/ActiveOrders";
import Features from "../../../../components/Features/Features";
import Greeting from "../../../../components/Greeting/Greeting";
import { CardSlider } from "../../../../components/Slider/CardSlider";
import { Card, CustomCard } from "../../../../components/Slider/Cards";
import { CardMore } from "../../../../components/Slider/CardMore";
import CardRestaurants from "../../../../components/Slider/CardRestaurants";
//images
import bell from "../../../../assets/images/icons/bell.svg";
import ad1 from "../../../../assets/images/ads/Ad-1.svg";
import ad2 from "../../../../assets/images/ads/Ad-2.svg";
import { set } from "react-hook-form";
import { Spin } from "antd";
import ButtonMore from "../../../../components/ButtonMore/ButtonMore";

function ClientHome() {
  const { navigateTo } = useNavigateTo();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://utown-api.habsida.net/api/public/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data.content);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <div className={styles.left}></div>

        <div className={styles.logo}>
          <Logo type="white" />
        </div>

        <div className={styles.bell}>
          <img src={bell} alt="" />
        </div>
      </header>

      <main className={styles.main}>
        <Greeting />
        <div className={styles.headerTabs}>
          <WeatherCard />
          <ActiveOrders />
        </div>
        <div className={styles.features}>
          <Features typeOfTab="grid" />
        </div>
        {/* ------ ADS --------*/}
        <div className={styles.ads}>
          <CardSlider
            cards={[
              <Card title="" image={ad1} />,
              <Card title="" image={ad2} />,
              <CustomCard />,
            ]}
          />
        </div>
        {/* ------ RESTAURANTS --------*/}
        <div className={styles.restaurants}>
          <div className={styles.restaurantsHeader}>
            <h3>Food Delivery</h3>
            <ButtonMore path="/food" />
          </div>
          {loading && (
            <div className={styles.spinner}>
              <Spin />
            </div>
          )}
          {restaurants.length > 0 && (
            <CardSlider
              cards={restaurants
                .filter((r) => r.isActive)
                .map((r) => (
                  <CardRestaurants
                    key={r.id}
                    title={r.title}
                    image={
                      r.imageUrl ||
                      "https://static.vecteezy.com/system/resources/previews/020/398/609/non_2x/restaurant-building-with-flat-style-isolated-on-white-background-vector.jpg"
                    }
                    description={r.description}
                    deliveryTime={r.deliveryTime}
                  />
                ))}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default ClientHome;
