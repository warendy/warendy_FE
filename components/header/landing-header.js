import React from "react";
import styles from "./landing-header.module.css";
import Image from "next/image";

export default function RandingHeader() {
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <Image src="/warendyLogo.svg" alt="Logo" className={styles.img} width={100} height={100} />
      </div>
    </div>
  );
}
