import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CartModal.module.scss";

interface Dish {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  dish: Dish;
  quantity: number;
  selectedOption?: string;
}

interface Restaurant {
  id: number;
  title: string;
  minOrderAmount: number;
  deliveryTime?: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (
    dishId: number,
    newQuantity: number,
    selectedOption?: string
  ) => void;
  restaurant: Restaurant;
}

function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  restaurant,
}: CartModalProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.dish.price * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    const total = getTotalPrice();
    if (total < restaurant.minOrderAmount) {
      alert(
        `Minimum order amount is ${restaurant.minOrderAmount.toLocaleString()} ₩`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Send each item to the cart endpoint
      const promises = cartItems.map((item) =>
        fetch("https://utown-api.habsida.net/api/my-cart/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            dishId: item.dish.id,
            count: item.quantity,
          }),
        })
      );

      await Promise.all(promises);

      // Navigate to checkout page
      navigate("/food/checkout", {
        state: {
          restaurantName: restaurant.title,
          deliveryTime: restaurant.deliveryTime,
          totalPrice: total,
          cartItems,
        },
      });
    } catch (error) {
      console.error("Failed to add items to cart:", error);
      alert("Failed to process your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Your Order</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.restaurantName}>
          <span>🍽️</span> {restaurant.title}
        </div>

        <div className={styles.itemsList}>
          {cartItems.map((item, index) => (
            <div
              key={`${item.dish.id}-${item.selectedOption || "default"}`}
              className={styles.cartItem}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.dish.title}</h3>
                {item.selectedOption && (
                  <p className={styles.itemOption}>{item.selectedOption}</p>
                )}
                <p className={styles.itemPrice}>
                  {item.dish.price.toLocaleString()} ₩
                </p>
              </div>

              <div className={styles.itemImageContainer}>
                <img
                  src={item.dish.imageUrl}
                  alt={item.dish.title}
                  className={styles.itemImage}
                />

                {hoveredItem === index && (
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        onUpdateQuantity(
                          item.dish.id,
                          item.quantity - 1,
                          item.selectedOption
                        )
                      }
                    >
                      −
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        onUpdateQuantity(
                          item.dish.id,
                          item.quantity + 1,
                          item.selectedOption
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                )}

                {hoveredItem !== index && (
                  <div className={styles.quantityBadge}>×{item.quantity}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{getTotalPrice().toLocaleString()} ₩</span>
          </div>
          {getTotalPrice() < restaurant.minOrderAmount && (
            <div className={styles.minOrderWarning}>
              Minimum order: {restaurant.minOrderAmount.toLocaleString()} ₩
              <br />
              Add{" "}
              {(restaurant.minOrderAmount - getTotalPrice()).toLocaleString()} ₩
              more
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.checkoutButton}
            onClick={handleCheckout}
            disabled={
              getTotalPrice() < restaurant.minOrderAmount || isSubmitting
            }
          >
            {isSubmitting ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </>
  );
}

export default CartModal;
