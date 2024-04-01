import styles from "./flex.module.css";

export default function Flex({ children, vertical }) {
  return (
    <div
      className={styles.flex}
      style={{ flexDirection: vertical && "column" }}
    >
      {children}
    </div>
  );
}
