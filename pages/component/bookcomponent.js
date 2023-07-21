import React from "react";
import styles from "./bookcomponent.module.css";

export default function bookcomponent() {
  return (
    <div className={styles.center}>
      <div className={styles.book}>
        <div className={styles.leftPage}></div>
        <div className={styles.rightPage}></div>
        <div className={styles.spine}></div>
        <div className={styles.content}>Your book content goes here</div>
      </div>
    </div>
  );
}
