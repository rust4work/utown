// pages/RestaurantDetail/RestaurantDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RestaurantDetail.module.scss";
import verified from "../../../../../assets/images/icons/Verified Icon.svg";
import delivery from "../../../../../assets/images/icons/delivery.svg";
import FavouritesButton from "../../../../../components/FavouritesButton/FavouritesButton";
import Input from "../../../../../components/Input/Input";
import clock from "../../../../../assets/images/icons/Clock icon.svg";
import info from "../../../../../assets/images/icons/info-circle.svg";
import search from "../../../../../assets/images/icons/search-normal.svg";
import { Spin } from "antd";
import { CardSlider } from "../../../../../components/Slider/CardSlider";
import { CategoriesCard } from "../../../../../components/Slider/Cards";
interface Restaurant {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  deliveryTime: string;
  ratings: number;
  minOrderAmount: number;
}
interface Category {
  id: number;
  name: string;
  imageUrl: string;
  sort: number;
  isActive: boolean;
}

function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  // FEETCH RESTAURANTS
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

  //  FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `https://utown-api.habsida.net/api/categories`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setCategories(data?.content ?? []);
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!restaurant) {
    return <div className={styles.error}>Restaurant not found</div>;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.headerContent}>
            {/* Rating */}
            <div className={styles.infoCard}>
              <span className={styles.icon}>
                <img src={verified} alt="" />
              </span>
              <span className={styles.value}>
                {restaurant.ratings || "4.5"}
              </span>
            </div>

            {/* Delivery Time */}
            <div className={styles.infoCard}>
              <span className={styles.icon}>
                <img
                  src={delivery}
                  alt=""
                  style={{ filter: "brightness(0)" }}
                />
              </span>
              <span className={styles.value}>
                {restaurant.deliveryTime || "30-40 min"}
              </span>
            </div>

            {/* Buttons */}
            <div className={styles.actions}>
              <button className={styles.btn}>...</button>
              <FavouritesButton />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{restaurant.title}</h1>
        <p className={styles.description}>{restaurant.description}</p>
        <p className={styles.minOrder}>
          <span>
            <img src={info} alt="" />
          </span>
          Minimum order: {restaurant.minOrderAmount}
        </p>
        <p className={styles.deliveryTime}>
          <span>
            <img src={clock} alt="" />
          </span>
          Delivery time: {restaurant.deliveryTime}
        </p>
      </div>
      <Input
        onFocus={() => setIsSearching(true)}
        onBlur={() => setIsSearching(false)}
        icon={<img src={search} alt="" />}
        type="text"
        placeholder={`Search in ${restaurant.title}`}
        style={{
          fontSize: "18px",
          backgroundColor: "#eaeaea",
          width: "100%",
          borderRadius: "18px",
        }}
      />
      <div className={styles.categories}>
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
    </div>
  );
}

export default RestaurantDetail;
