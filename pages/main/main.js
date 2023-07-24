// main.js
import React from "react";
import styles from "../../pages/main/main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Main() {
  return (
    <>
      {/* <Headerbg / > */}
      <div className={styles.headerBg}>
        <div className={styles.bgInner}></div>
      </div>
      <div className={styles.todayWinesContainer}>
        <div className={styles.todayWines}>
          <div className={styles.todayWineTitle}>오늘의 와인</div>
          <ul className={styles.todayWineList}>
            <li className={styles.arrowContainer}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </li>
            <li className={styles.todayWineItem}></li>
            <li className={styles.todayWineItem}></li>
            <li className={styles.todayWineItem}></li>
            <li className={styles.todayWineItem}></li>
            <li className={styles.arrowContainer}>
              <FontAwesomeIcon icon={faArrowRight} />
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.todayMoodContainer}>
        <div className={styles.todayMood}>
          <ul className={styles.todayMoodList}>
            <li className={styles.todayMoodItem}>
              <a href="#">비 오는 날</a>
            </li>
            <li className={styles.todayMoodItem}></li>
            <li className={styles.todayMoodItem}></li>
            <li className={styles.todayMoodItem}></li>
            <li className={styles.todayMoodItem}></li>
            <li className={styles.todayMoodItem}></li>
          </ul>
        </div>
      </div>
      <div className={styles.lovedWineContainer}>
        <div className={styles.lovedWines}>
          <div className={styles.lovedWineTitle}>오늘의 와인</div>
          <ul className={styles.lovedWineList}>
            <li className={styles.lovedWineItem}></li>
            <li className={styles.lovedWineItem}></li>
            <li className={styles.lovedWineItem}></li>
            <li className={styles.lovedWineItem}></li>
            <li className={styles.lovedWineItem}></li>
            <li className={styles.lovedWineItem}></li>
            <li className={styles.lovedWineItem}></li>
            <li className={styles.lovedWineItem}></li>
          </ul>
        </div>
      </div>
      <div className={styles.etiquetteContainer}>
        <div className={styles.etiquette}>
          <div className={styles.etiquetteTitle}>와인 에티켓</div>
          <div className={styles.etiquetteList}></div>
        </div>
      </div>
    </>
  );
}
