import styles from "./Card.module.scss";

export function CardMore({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.moreCard} onClick={onClick}>
      <p>More →</p>
    </div>
  );
}
