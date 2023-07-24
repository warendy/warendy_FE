import React from "react";
import Randingpage from "./randingpage";
import Bookcomponent from "./bookcomponent";
import Login from "./login";

export default function index() {
  return (
    <div className={styles.wrapper}>
      <Randingpage />
      <Bookcomponent />
      <Login />
    </div>
  );
}
