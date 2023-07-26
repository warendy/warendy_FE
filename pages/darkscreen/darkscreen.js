// Darkscreen.js

import React from "react";
import styles from "./darkscreen.module.css";

export default function Darkscreen() {
  return (
    <div className={styles.fullscreen}>
      <div className={styles.background}></div>
    </div>
  );
}
