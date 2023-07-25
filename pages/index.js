import React from "react";
import Header from "../components/header/randingheader";
import RandingPage from "./randing-page/randingPage";
import Darkscreen from "./darkscreen/darkscreen";
import styles from "./darkscreen/darkscreen.module.css"; // Correct import path
import Main from "./main/main";
import "../styles/main.css";
import "../styles/reset.css";

export default function IndexPage() {
  return (
    <>
      <Main />
    </>
  );
}
