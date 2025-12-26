import { useState } from "react";
import styles from "./FavouritesButton.module.scss";
import heart from "../../assets/images/icons/Heart Icon.svg";

function FavouritesButton() {
  const [active, setActive] = useState(false);

  return (
    <button className={styles.btn} onClick={() => setActive((prev) => !prev)}>
      <span className={`${styles.icon} ${active ? styles.active : ""}`}>
        <img src={heart} alt="Add to favourites" />
      </span>
    </button>
  );
}

export default FavouritesButton;
