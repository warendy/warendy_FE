import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./winebysituation.module.css";
import {
  addWineToFavorite,
  getWineDetail,
  getRecommendedWineList,
} from "@/services/api";
import { wineListState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";
import axios from "axios";
import Link from "next/link";

export default function WineBySituation() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const recommendedWines = await getRecommendedWineList();
        console.log("Recommended Wines:", recommendedWines);
        const filteredWines = recommendedWines.filter(
          (wine) => wine.body <= 2.5
        );
        console.log(filteredWines);
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
          <h2 className="title">혼술하는 날</h2>
          <h1 className={styles.wineName}>까베르네 쇼비뇽</h1>
          <h3 className={styles.wineSub}>
            무겁지 않은 안주와 함께 혼술을 할 때
            <br />
            중간 이하의 바디감으로만 구성된 와인들을 추천드립니다.
          </h3>
        </div>
      </div>
      <div className={styles.lovedWines}>
        <ul className={styles.lovedWineList}>
          {wines.map((wine) => (
            <li key={wine.id} className={styles.lovedWineItem}>
              <Link href={`/detail/${wine.id}`}>
                <a>
                  <Image
                    src={wine.picture}
                    alt={`Wine ${wine.id}`}
                    width={100}
                    height={250}
                  />
                </a>
              </Link>
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
