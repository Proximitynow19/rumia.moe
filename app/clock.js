"use client";

import { useEffect, useState } from "react";

import styles from "./utils.module.css";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date(), 1000));

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={styles.container}
      style={{ width: "225px", height: "100px" }}
    >
      {date.toLocaleTimeString("en-NZ", { timeZone: "Pacific/Auckland" })}
    </div>
  );
}
