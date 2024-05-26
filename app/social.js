import styles from "./utils.module.css";

export default function Social({ icon, link, name, color }) {
  return (
    <a
      className={styles.container}
      style={{ width: "100px", height: "100px", backgroundColor: color }}
      href={link}
      target="_blank"
      title={name}
    >
      {icon}
    </a>
  );
}
