import { useEffect, useState } from "react";
import styles from "./winebysituation.module.css";
import { getRecommendedWineList } from "@/services/api";
import Link from "next/link";
import Image from "next/image";

export default function WineBySituation() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const recommendedWines = await getRecommendedWineList();
        console.log("Recommended Wines:", recommendedWines);
        const filteredWines = recommendedWines.filter(
          (wine) => wine.alcohol <= 12 && wine.acidity >= 2
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
        <h3 className="title">상황별 와인 추천</h3>
      </div>
      <div className="inner">
        <div className={styles.wineExplainContainer}>
          <div className={styles.wineExplainContents}>
            <h2 className={styles.subtitle}>여행가는 날</h2>
            <h1 className={styles.wineName}>까베르네 쇼비뇽</h1>
            <h3 className={styles.wineSub}>
              하루를 정리하고 내일의 멋진 여행을 위해서
              <br />
              저알코올의 와인을 추천드립니다.
            </h3>
          </div>
        </div>
        <div className={styles.lovedWines}>
          <ul className={styles.lovedWineList}>
            {wines.map((wine) => (
              <li key={wine.id} className={styles.lovedWineItem}>
                <Link href={`/detail/${wine.id}`}>
                  {" "}
                  <Image
                    src={wine.picture}
                    alt={`Wine ${wine.id}`}
                    width={100}
                    height={250}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
