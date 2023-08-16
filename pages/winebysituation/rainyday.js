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
          (wine) => wine.body >= 1 && wine.alcohol >= 13
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
            <h2 className={styles.subtitle}>비 오는 날</h2>
            <h1 className={styles.wineName}>까베르네 쇼비뇽</h1>
            <h3 className={styles.wineSub}>
              비 오는 날 그윽한 바디감은
              <br />
              지친 몸을 편안하게 해줄 수 있습니다.
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
