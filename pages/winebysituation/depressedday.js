import { useEffect, useState } from "react";
import styles from "./winebysituation.module.css";
import { addWineToFavorite, getWineDetail, getRecommendedWineList } from "../services/api";
import { wineListState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";
import axios from "axios";

export default function WineBySituation() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const recommendedWines = await getRecommendedWineList();
        const filteredWines = recommendedWines.filter((wine) => wine.alcohol >= 13 && wine.body >= 2.5);
        setWines(filteredWines);
      } catch (error) {
        console.error("와인 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchWines();
  }, []);
  return (
    <>
      <div className={styles.headerBg}>
        <div className={styles.bgInner}>
          <h3 className="title">상황별 와인 추천</h3>
        </div>
      </div>
      <div className={styles.wineExplainContainer}>
        <div className={styles.wineExplainContents}>
          <h2 className="title">우울한 날</h2>
          <h1 className={styles.wineName}>까베르네 쇼비뇽</h1>
          <h3 className={styles.wineSub}>
            적정의 알코올과 무거운 바디감의 와인은
            <br />한 잔만으로도 우울감을 씻겨드릴 수 있습니다.
          </h3>
        </div>
      </div>
      <div className={styles.lovedWines}>
        <ul className={styles.lovedWineList}>
          {wines.map((wine) => (
            <li key={wine.id} className={styles.lovedWineItem}>
              <img src={wine.picture} alt={`Wine ${wine.id}`} width={100} height={250} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pageContainer}>
        <ul className={styles.pageNumber}>
          <li className={styles.number}>1</li>
          <li className={styles.number}>2</li>
          <li className={styles.number}>3</li>
          <li className={styles.number}>4</li>
        </ul>
      </div>
    </>
  );
}
