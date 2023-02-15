import { ReactNode } from "react";
import styles from "@/styles/Box.module.css";

const Box = ({
  size = 1,
  roundness = 1,
  spacing = 1,
  title,
  children,
}: {
  size?: number;
  roundness?: number;
  spacing?: number;
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      title={title}
      className={styles.box}
      style={{
        width: 32 * size,
        height: 32 * size,
        borderRadius: 8 * size * roundness,
      }}
    >
      <div
        className={styles.container}
        style={{
          width: (32 - 8 * roundness * spacing) * size,
          height: (32 - 8 * roundness * spacing) * size,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Box;
