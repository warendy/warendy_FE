import React from "react";
import styles from "./darkscreen.module.css";

export default function DarkScreen() {
  return (
    <div className={styles.fullScreen}>
      <div className={styles.backGround}></div>
    </div>
  );
}
