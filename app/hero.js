import styles from "./utils.module.css";

export default function Hero() {
  return (
    <div
      className={styles.container}
      style={{
        width: "500px",
        height: "225px",
      }}
    >
      <img
        src="/hero-background.jpg"
        width={500}
        height={225}
        className={styles.background}
      />
    </div>
  );
}
