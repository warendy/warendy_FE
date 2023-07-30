import React from "react";
import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import "../styles/reset.css";
import "../styles/main.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
