import React from "react";
import Randingpage from "./randingpage";
import Bookcomponent from "./bookcomponent";
import Login from "./login";
import styles from "./style.module.css";

export default function index() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Randingpage />
        <Bookcomponent />
        <Login />
      </div>
    </div>
  );
}
