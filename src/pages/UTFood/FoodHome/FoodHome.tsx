import { useState, useEffect } from "react";

import { useNavigateTo } from "../../../hooks/useNavigateTo";
import styles from "./FoodHome.module.scss";
import map from "../../../assets/images/icons/map.svg";
import Input from "../../../components/Input/Input";
import searchNormal from "../../../assets/images/icons/search-normal.svg";
import { CardSwitcher } from "../../../components/Slider/CardSwitcherAd";
import { CardSlider } from "../../../components/Slider/CardSlider";
import CardRestaurants from "../../../components/Slider/CardRestaurants";
import { AdBig, CategoriesCard } from "../../../components/Slider/Cards";
import ad1 from "../../../assets/images/ads/Ad-1.svg";
import ad2 from "../../../assets/images/ads/Ad-2.svg";
import ad3 from "../../../assets/images/ads/coffe.png";
import { set } from "react-hook-form";
import { Spin } from "antd";
import ButtonMore from "../../../components/ButtonMore/ButtonMore";

function FoodHome() {
  const { navigateTo } = useNavigateTo();
  const userAddress = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [categories, setCategories] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://utown-api.habsida.net/api/categories", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.content ?? []);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
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
      <div className={styles.address}>
        <img src={map} alt="" />
        <p>
          {userAddress.fullName ?? "Unknown user"} lives at{" "}
          {userAddress.defaultAddress ?? "no address"}
        </p>
      </div>
      <div className={styles.searchBar}>
        <Input
          icon={<img src={searchNormal} alt="" />}
          type="text"
          placeholder="Search for cafes, restaraunts and dishes"
          style={{
            fontSize: "18px",
            backgroundColor: "#eaeaea",
            width: "105%",
            borderRadius: "18px",
          }}
        />
      </div>
      {/*----------   AD ----------*/}
      <div className={styles.adsSection}>
        <CardSwitcher
          items={[
            <AdBig title="" image={ad1} />,
            <AdBig title="" image={ad2} />,
            <AdBig
              title="Delicious coffee"
              description="Short promotional text -20% on everything"
              image={ad3}
            />,
          ]}
          autoplay={true}
          delay={3000}
        />
      </div>
      {/*----------   CATEGORIES ----------*/}
      <div className={styles.categoriesSection}>
        <h2>Categories</h2>
        {loading && (
          <div className={styles.spinner}>
            <Spin />
          </div>
        )}
        {categories.length === 0 && !loading && <p>No categories available</p>}
        {categories.length > 0 && (
          <CardSlider
            cards={categories
              .filter((c) => c.isActive)
              .map((c) => (
                <CategoriesCard
                  key={c.id}
                  title={c.name}
                  image={c.imageUrl}
                  amount={c.sort}
                />
              ))}
            spaceBetween={10}
            slidesPerView={2.5}
          />
        )}
      </div>
      {/*----------   ESTABLISHMENTS AKA RESTAURANTS ----------*/}
      <div className={styles.establishmentsSection}>
        <div className={styles.establishmentsHeader}>
          <h4>Establishments</h4>
          <ButtonMore path="establishments" />
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
      <div>
        <h3>fastest delivery</h3>
      </div>
      <div>
        <h3>fastest delivery</h3>
      </div>
    </div>
  );
}

export default FoodHome;
