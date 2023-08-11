import React from "react";
import styles from "./landing-text.module.css";

export default function LandingText({ text }) {
  return <div className={styles.content}>{text}</div>;
}
