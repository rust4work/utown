import React from "react";
import styles from "./ClientHome.module.scss";
import Logo from "../../../../components/Logo/Logo";
import bell from "../../../../assets/images/icons/bell.svg";
import WeatherCard from "../../../../components/WeatherCard/WeatherCard";
import ActiveOrders from "../../../../components/ActiveOrders/ActiveOrders";
import Features from "../../../../components/Features/Features";
import Greeting from "../../../../components/Greeting/Greeting";
import { CardSlider } from "../../../../components/Slider/CardSlider";
import { Card, CustomCard } from "../../../../components/Slider/Card";
import ad1 from "../../../../assets/images/ads/Ad-1.svg";
import ad2 from "../../../../assets/images/ads/Ad-2.svg";
import { CardMore } from "../../../../components/Slider/CardMore";

function ClientHome() {
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
        <div className={styles.ads}>
          <CardSlider
            cards={[
              <Card title="" image={ad1} />,
              <Card title="" image={ad2} />,
              <CustomCard />,
              <CardMore onClick={() => console.log("clicked")} />,
            ]}
          />
        </div>
      </main>
    </div>
  );
}

export default ClientHome;
