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
import DishModal from "../../../../../components/DishModal/DishModal";

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

interface Dish {
  id: number;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  imageUrl: string;
  restaurantId: number;
  restaurantName: string;
  dishCategoryId: number;
  categoryName: string;
}

function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [dishesLoading, setDishesLoading] = useState(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // FETCH RESTAURANT
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

  // FETCH CATEGORIES
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
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [id]);

  // FETCH DISHES
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await fetch(
          `https://utown-api.habsida.net/api/dishes/restaurant/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setDishes(data?.content ?? []);
        console.log("Dishes:", data?.content);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      } finally {
        setDishesLoading(false);
      }
    };

    fetchDishes();
  }, [id]);
  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const handleAddToOrder = (
    dish: any,
    quantity: number,
    selectedOption: string
  ) => {
    console.log("Adding to order:", { dish, quantity, selectedOption });
    //order logic
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMenuAction = (action: string) => {
    console.log("Menu action:", action);
    setIsMenuOpen(false);

    switch (action) {
      case "call":
        // Handle call action
        window.location.href = "tel:+1234567890"; // Replace with actual phone
        break;
      case "share":
        // Handle share action
        if (navigator.share) {
          navigator.share({
            title: restaurant?.title,
            url: window.location.href,
          });
        }
        break;
      case "report":
        // Handle report action
        alert("Report functionality");
        break;
    }
  };

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
              <div className={styles.menuContainer}>
                <button
                  className={styles.btn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuToggle();
                  }}
                >
                  ...
                </button>

                {isMenuOpen && (
                  <>
                    <div
                      className={styles.menuOverlay}
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <div className={styles.dropdownMenu}>
                      <button
                        className={styles.menuItem}
                        onClick={() => handleMenuAction("call")}
                      >
                        <span className={styles.menuIcon}>📞</span>
                        Call
                      </button>
                      <button
                        className={styles.menuItem}
                        onClick={() => handleMenuAction("share")}
                      >
                        <span className={styles.menuIcon}>📤</span>
                        Share
                      </button>
                      <button
                        className={styles.menuItem}
                        onClick={() => handleMenuAction("report")}
                      >
                        <span className={styles.menuIcon}>⚠️</span>
                        Report
                      </button>
                    </div>
                  </>
                )}
              </div>
              <FavouritesButton restaurantId={restaurant.id} />
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

      {/* DISHES SECTION */}
      <section className={styles.dishes}>
        <h2>Menu</h2>
        {dishesLoading && (
          <div className={styles.spinner}>
            <Spin />
          </div>
        )}
        {dishes.length === 0 && !dishesLoading && <p>No dishes available</p>}
        {dishes.length > 0 && (
          <div className={styles.dishList}>
            {dishes
              .filter((dish) => dish.isActive)
              .map((dish) => (
                <div
                  key={dish.id}
                  className={styles.dishCard}
                  onClick={() => {
                    handleDishClick(dish);
                  }}
                >
                  <div className={styles.dishInfo}>
                    <h3 className={styles.dishTitle}>{dish.title}</h3>
                    <p className={styles.dishDescription}>{dish.description}</p>
                    <p className={styles.dishPrice}>
                      {dish.price.toLocaleString()} ₩
                    </p>
                  </div>
                  <div className={styles.dishImageContainer}>
                    <img
                      src={dish.imageUrl}
                      alt={dish.title}
                      className={styles.dishImage}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToOrder={handleAddToOrder}
        />
      )}
    </div>
  );
}

export default RestaurantDetail;
