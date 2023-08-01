import React from "react";
import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import "../styles/reset.css";
import "../styles/main.css";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <RecoilRoot>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </RecoilRoot>
    </>
  );
};

export default MyApp;
