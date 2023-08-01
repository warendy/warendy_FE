import React from "react";
import Image from "next/image";
import styles from "./main.module.css";

import TodayWine from "./today-wine";
import TodayMood from "./today-mood";
import LovedWine from "./loved-wine";
import SearchBar from "../../pages/searchbar/search-bar";

const Main = () => {
  return (
    <>
      <div className="container">
        <div className="inner">
          <div className={styles.mainCarousel}>
            <Image src="/images/mainbg.svg" alt="main Carousel" width={850} height={450} />
          </div>
          <SearchBar />
          <div className={styles.contentArea}>
            <TodayWine />
            <TodayMood />
            <LovedWine />
            <div className={styles.etiquetteContainer}>
              <div className={styles.etiquette}>
                <div className={styles.etiquetteTitle}>와인 에티켓</div>
                <div className={styles.etiquetteList}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
