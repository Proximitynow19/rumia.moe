import styles from "./grid.module.css";

export default function Grid({ children, cols }) {
  return (
    <div
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}
    >
      {children}
    </div>
  );
}
