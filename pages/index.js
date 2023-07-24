import React from "react";
import Header from "../components/header/randingheader";
import RandingPage from "./randing-page/randingPage";
import Darkscreen from "./darkscreen/darkscreen";
import styles from "./darkscreen/darkscreen.module.css"; // Correct import path

import "../styles/main.css";
import "../styles/reset.css";

export default function IndexPage() {
  return (
    <>
      <div className="inner">
        <Header />
        <RandingPage />
      </div>
      <div className={styles.fullscreen}>
        <Darkscreen />
      </div>
    </>
  );
}
