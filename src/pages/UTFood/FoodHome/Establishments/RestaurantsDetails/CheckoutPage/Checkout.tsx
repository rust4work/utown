import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Checkout.module.scss";
import { Spin } from "antd";
import deliver from "../../../../../../assets/images/icons/delivery.svg";
import map from "../../../../../../assets/images/icons/map.svg";

interface CheckoutState {
  restaurantName: string;
  deliveryTime: string;
  totalPrice: number;
  cartItems: any[];
}
interface CartData {
  id: number;
  deliveryPrice: number;
  sumOrder: number;
  totalDish: number;
  totalSum: number;
}

interface DeliveryAddress {
  id?: number;
  street: string;
  building: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  instructions?: string;
}

type PaymentMethod = "card" | "cash" | "samsung-pay" | "apple-pay";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: CheckoutState };
  const { restaurantName, deliveryTime, totalPrice, cartItems } = state;

  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: "",
    building: "",
  });
  const [noteForDelivery, setNoteForDelivery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await fetch("https://utown-api.habsida.net/api/my-cart", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCartData(data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        alert("Failed to load cart data");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [navigate]);

  const handlePayment = async () => {
    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCVC) {
        alert("Please fill in all card details");
        return;
      }
    }

    setIsProcessing(true);

    try {
      // PAYMENT LOGIC

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Order placed successfully!");
      navigate("/orders"); // Navigate to orders page
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (!cartData) {
    return <div className={styles.error}>No cart data found</div>;
  }
  if (!state) {
    navigate("/food");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Order Payment</h1>
      </div>
      <h2 className={styles.restaurantName}>{restaurantName}</h2>
      {/* Delivery Info Section */}
      <section className={styles.section}>
        <div className={styles.deliveryInfo}>
          <p className={styles.deliveryTime}>
            <span className={styles.icon}>
              <img src={deliver} alt="" />
            </span>
            <span>Delivery in {deliveryTime}</span>
          </p>
        </div>
      </section>

      {/* Delivery Address Section */}
      <section className={styles.section}>
        <div className={styles.deliveryInfo}>
          <p className={styles.deliveryTime}>
            <span className={styles.icon}>
              <img src={map} alt="" />
            </span>
            <span>deliveryAddress</span>
          </p>
        </div>
      </section>

      {/* Note for Delivery Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Note for the courier (Optional)</h3>
        <textarea
          placeholder="Add any special instructions for the delivery driver..."
          value={noteForDelivery}
          onChange={(e) => setNoteForDelivery(e.target.value)}
          className={styles.textarea}
          rows={3}
        />
      </section>

      {/* Payment Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Payment</h3>

        <div className={styles.paymentMethods}>
          <button
            className={`${styles.paymentMethod} ${
              paymentMethod === "card" ? styles.active : ""
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            💳 Credit/Debit Card
          </button>
          <button
            className={`${styles.paymentMethod} ${
              paymentMethod === "cash" ? styles.active : ""
            }`}
            onClick={() => setPaymentMethod("cash")}
          >
            💵 Cash
          </button>
          <button
            className={`${styles.paymentMethod} ${
              paymentMethod === "samsung-pay" ? styles.active : ""
            }`}
            onClick={() => setPaymentMethod("samsung-pay")}
          >
            📱 Samsung Pay
          </button>
          <button
            className={`${styles.paymentMethod} ${
              paymentMethod === "apple-pay" ? styles.active : ""
            }`}
            onClick={() => setPaymentMethod("apple-pay")}
          >
            🍎 Apple Pay
          </button>
        </div>

        {paymentMethod === "card" && (
          <div className={styles.cardForm}>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={styles.input}
              maxLength={19}
            />
            <div className={styles.cardRow}>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                className={styles.input}
                maxLength={5}
              />
              <input
                type="text"
                placeholder="CVC"
                value={cardCVC}
                onChange={(e) => setCardCVC(e.target.value)}
                className={styles.input}
                maxLength={3}
              />
            </div>
          </div>
        )}
      </section>

      {/* Order Summary */}
      <section className={styles.summary}>
        <h3 className={styles.sectionTitle}>Total</h3>
        <div className={styles.summaryRow}>
          <span>Order amount ({cartData.totalDish} items)</span>
          <span>{cartData.sumOrder.toLocaleString()} ₩</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Delivery</span>
          <span>{cartData.deliveryPrice.toLocaleString()} ₩</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>
            {cartData.totalSum.toLocaleString()} ₩
          </span>
        </div>
      </section>

      {/* Payment Button */}
      <div className={styles.paymentButtonContainer}>
        <button
          className={styles.paymentButton}
          onClick={handlePayment}
          //disabled={isProcessing || !deliveryAddress.street}
        >
          {isProcessing
            ? "Processing..."
            : `Pay ${cartData.totalSum.toLocaleString()} ₩`}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
