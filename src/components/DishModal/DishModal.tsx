// components/DishModal/DishModal.tsx
import { useState } from "react";
import styles from "./DishModal.module.scss";
import closeIcon from "../../assets/images/icons/close.svg"; // Or use X character

interface DishModalProps {
  dish: {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToOrder: (dish: any, quantity: number, selectedOption: string) => void;
}

function DishModal({ dish, isOpen, onClose, onAddToOrder }: DishModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("no-options");

  const options = [
    { id: "no-options", label: "No options", price: 0 },
    { id: "large-portion", label: "Large portion", price: 1000 },
    { id: "small-portion", label: "Small portion", price: 500 },
  ];

  const selectedOptionPrice =
    options.find((opt) => opt.id === selectedOption)?.price || 0;

  const totalPrice = (dish.price + selectedOptionPrice) * quantity;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToOrder = () => {
    onAddToOrder(dish, quantity, selectedOption);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        {/* Hero Image with Close Button */}
        <div className={styles.imageContainer}>
          <img
            src={dish.imageUrl}
            alt={dish.title}
            className={styles.heroImage}
          />
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className={styles.content}>
          {/* Product Info */}
          <div className={styles.productInfo}>
            <h2 className={styles.title}>{dish.title}</h2>
            <p className={styles.price}>{dish.price.toLocaleString()} ₩</p>
          </div>

          {/* Description */}
          <p className={styles.description}>{dish.description}</p>

          {/* Selection Menu */}
          <div className={styles.selectionSection}>
            <div className={styles.selectionHeader}>
              <h3>Select option</h3>
              <span className={styles.mandatory}>Mandatory item</span>
            </div>

            <div className={styles.optionsList}>
              {options.map((option) => (
                <label key={option.id} className={styles.optionItem}>
                  <input
                    type="radio"
                    name="portion"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className={styles.radio}
                  />
                  <span className={styles.optionLabel}>{option.label}</span>
                  <span className={styles.optionPrice}>
                    {option.price > 0
                      ? `+ ${option.price.toLocaleString()}`
                      : "+ 0"}{" "}
                    ₩
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className={styles.footer}>
          <div className={styles.quantitySelector}>
            <button
              className={styles.quantityButton}
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button className={styles.quantityButton} onClick={handleIncrement}>
              +
            </button>
          </div>

          <button className={styles.addButton} onClick={handleAddToOrder}>
            Add to order · {totalPrice.toLocaleString()} ₩
          </button>
        </div>
      </div>
    </>
  );
}

export default DishModal;
