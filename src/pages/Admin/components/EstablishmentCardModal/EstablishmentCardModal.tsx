import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EstablishmentCardModal.module.scss";
import type { AdminRestaurant } from "../../../api/adminRestaurants";

type Props = {
  open: boolean;
  onClose: () => void;
  restaurant: AdminRestaurant | null;
};

const EstablishmentCardModal: React.FC<Props> = ({ open, onClose, restaurant }) => {
  const navigate = useNavigate();

  if (!open || !restaurant) return null;

  const image = restaurant.imageUrl || "";

  const onEdit = () => {
    onClose();
    navigate(`/admin/establishments/${restaurant.id}/edit`);
  };

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className={styles.top}>
          <div className={styles.imageWrap}>
            {image ? (
              <img className={styles.image} src={image} alt={restaurant.title} />
            ) : (
              <div className={styles.imagePlaceholder} />
            )}
          </div>

          <div className={styles.rightTop}>
            <div className={styles.rightTopButtons}>
              <button className={styles.actionBtn} type="button" onClick={onEdit}>
                Edit account <span className={styles.arrow}>→</span>
              </button>
              <button className={styles.actionBtn} type="button">
                Menu <span className={styles.arrow}>→</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.title}>{restaurant.title}</div>

          <div className={styles.grid}>
            <div className={styles.col}>
              <div className={styles.block}>
                <div className={styles.blockTitle}>Description:</div>
                <div className={styles.blockText}>{restaurant.description || "—"}</div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockTitle}>City:</div>
                <div className={styles.blockText}>{restaurant.city || restaurant.address?.city || "—"}</div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockTitle}>Address:</div>
                <div className={styles.blockText}>
                  {restaurant.fullAddress || restaurant.address?.fullAddress || "—"}
                </div>
              </div>
            </div>

            <div className={styles.col}>
              <div className={styles.block}>
                <div className={styles.blockTitle}>Phone:</div>
                <div className={styles.blockText}>{restaurant.phone || "—"}</div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockTitle}>Establishment Category:</div>
                <div className={styles.blockText}>{restaurant.category || "—"}</div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockTitle}>Min. order:</div>
                <div className={styles.blockText}>
                  {typeof restaurant.minOrderAmount === "number" ? restaurant.minOrderAmount : "—"}
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockTitle}>Orders:</div>
                <div className={styles.blockText}>
                  {typeof restaurant.ordersCount === "number" ? restaurant.ordersCount : "—"}
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockTitle}>Status:</div>
                <div className={styles.blockText}>{restaurant.isActive ? "Active" : "Inactive"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentCardModal;