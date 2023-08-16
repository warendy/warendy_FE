import { useEffect, useState } from "react";
import styles from "./winebysituation.module.css";
import { getWineList } from "@/services/api";
import Link from "next/link";
import Image from "next/image";
import { userTokenState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

export default function WineBySituation() {
  const [wines, setWines] = useState([]);
  const token = useRecoilValue(userTokenState);
  useEffect(() => {
    const fetchWines = async () => {
      try {
        const recommendedWines = await getWineList(token);
        const filteredWines = recommendedWines.filter((wine) => wine.alcohol >= 13 && wine.body >= 2);
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
            <h2 className={styles.subtitle}>우울한 날</h2>
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
                <Link href={`/detail/${wine.id}`}>
                  {" "}
                  <Image src={wine.picture} alt={`Wine ${wine.id}`} width={100} height={250} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
