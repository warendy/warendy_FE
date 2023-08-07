import React from "react";
import { RecoilRoot } from "recoil";
import { RecoilPersist } from "recoil-persist";
import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
// import { userTokenState } from "../recoil/atoms"; // Recoil Atom을 임포트합니다.
import "../styles/reset.css";
import "../styles/main.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      <Footer />
      {/* <RecoilPersist /> */}
    </RecoilRoot>
  );
};

export default MyApp;
