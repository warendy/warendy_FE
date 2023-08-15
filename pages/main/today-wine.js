import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./today-wine.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";
import { getWineDetail } from "@/services/api";

export default function TodayWine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wineImages, setWineImages] = useState([]);

  const handleNext = () => {
    setActiveIndex((prevActiveIndex) => {
      const newIndex = (prevActiveIndex + 4) % 12;
      return newIndex;
    });
  };

  const handlePrevious = () => {
    setActiveIndex((prevActiveIndex) => {
      let newIndex = prevActiveIndex - 4;
      if (newIndex < 0) newIndex += 12;
      return newIndex;
    });
  };

  useEffect(() => {
    getRecommendedWineList()
      .then((data) => {
        console.log("Received wine data:", data);
        setWineImages(data);
      })
      .catch((error) => {
        console.error("Error fetching recommended wines:", error);
      });
  }, []);

  const renderWines = () => {
    return wineImages.slice(activeIndex, activeIndex + 4).map((wine) => (
      <li key={wine.id} className={styles.recommended}>
        <Link href={`/detail/${wine.id}`} legacyBehavior>
          <a>
            <Image src={wine.picture} alt={`Wine ${wine.id}`} width={30} height={120} />
          </a>
        </Link>
      </li>
    ));
  };

  async function getRecommendedWineList() {
    try {
      const wineDetails = await Promise.all([...Array(20).keys()].map((i) => getWineDetail(i + 1)));
      return wineDetails.filter((wine) => wine !== null && wine !== undefined);

      wineDetails.sort(() => Math.random() - 0.5);

      return wineDetails;
    } catch (error) {
      console.error("와인 상세 정보 가져오기 오류:", error);
      throw error;
    }
  }
  return (
    <>
      <div className={styles.todayWinesContainer + " padding "}>
        <h3 className="title">오늘의 와인</h3>
        <ul className={styles.todayWineList}>
          <button className="resetBtn btn" onClick={handlePrevious}>
            <FontAwesomeIcon icon={faCaretLeft} className={styles.icon} />
          </button>
          {renderWines()}
          <button className="resetBtn btn" onClick={handleNext}>
            <FontAwesomeIcon icon={faCaretRight} className={styles.icon} />
          </button>
        </ul>
      </div>
    </>
  );
}
