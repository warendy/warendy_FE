import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./main.module.css";

import TodayWine from "./today-wine";
import TodayMood from "./today-mood";
import LovedWine from "./loved-wine";
import SearchBar from "../../pages/searchbar/search-bar";
import { getRecommendedWineList } from "@/services/api";
import { wineListState } from "@/recoil/atoms";
import { userTokenState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";

const Main = () => {
  const [wineList, setWineList] = useRecoilState(wineListState);

  useEffect(() => {
    const getWineData = async () => {
      try {
        const data = await getRecommendedWineList();
        setWineList(data);
      } catch (error) {
        console.error(error);
      }
    };

    getWineData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="inner">
          <div className={styles.mainCarousel}>
            <Image
              src="/images/mainbg.svg"
              alt="main Carousel"
              width={850}
              height={450}
            />
          </div>
          <SearchBar />
          <div className={styles.contentArea}>
            <TodayWine />
            <TodayMood wines={wineList} />
            {wineList ? (
              <LovedWine List={wineList} />
            ) : (
              <p>와인 리스트가 없습니다.</p>
            )}
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
