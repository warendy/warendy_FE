import React from "react";
import { RecoilRoot } from "recoil";
import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
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
