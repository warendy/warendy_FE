import React from "react";
import Image from "next/image";
import styles from "./LandingHeader.module.css";

export default function LandingHeader() {
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <Image
          src="/logo.svg"
          alt="Logo"
          className={styles.img}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
