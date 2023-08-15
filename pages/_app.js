import React from "react";
import { RecoilRoot } from "recoil";
import Header from "../components/header/Header.js";
import Footer from "../components/footer/Footer.js";
import "../styles/reset.css";
import "../styles/main.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
};

export default MyApp;
