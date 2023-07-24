import React from "react";
import RandingHeader from "../components/header/randingheader";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import "../styles/reset.css";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <RandingHeader /> */}
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
