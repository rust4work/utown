import React from "react";
import styles from "./WeatherCard.module.scss";
import mapPin from "../../assets/images/icons/map-pin.svg";
import sun from "../../assets/images/icons/weather-sunny.svg";
function WeatherCard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={mapPin} alt="" />
        <p>City name</p>
      </div>
      <div className={styles.main}>
        <h3>+12°</h3>
        <img src={sun} alt="" />
      </div>
      <div className={styles.weatherFooter}>
        <p>Sunny</p>
        <div className={styles.weatherLowest}>↓+10°</div>
        <div className={styles.weatherHighest}>↑+17°</div>
      </div>
    </div>
  );
}

export default WeatherCard;
