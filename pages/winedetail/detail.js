import React, { useState, useEffect } from "react";
import styles from "./detail.module.css";
import StarRating from "./star-rating";
import { wineState } from "@/pages/recoil_state";
import { useRecoilValue } from "recoil";

export default function Detail() {
  const wine = useRecoilValue(wineState);
  const [ratings, setRatings] = useState([0, 0, 0]);
  const [reviewText, setReviewText] = useState(" ");
  const [wineData, setWineData] = useState(null);
  const wineId = wine.id;
  const [body, setBody] = useState(0);
  const [dry, setDry] = useState(0);
  const [tannin, setTannin] = useState(0);
  const [acidity, setAcidity] = useState(0);

  const progressStyles = {
    body: { width: `${(body / 5) * 100}%` },
    dry: { width: `${(dry / 5) * 100}%` },
    tannin: { width: `${(tannin / 5) * 100}%` },
    acidity: { width: `${(acidity / 5) * 100}%` },
  };

  function getGeneralRegion(region) {
    const parts = region.split("/");
    return parts.slice(0, 2).join(" / ");
  }

  useEffect(() => {
    fetch(`https://warendy.shop/wines/${wineId}/detail`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const region = data.region;
        const generalRegion = getGeneralRegion(region);
        setBody(data.body);
        setDry(data.dry);
        setTannin(data.tannin);
        setAcidity(data.acidity);
        setWineData({ ...data, generalRegion });
      })
      .catch((error) => console.error(error));
  }, []);

  const pairingData = wineData?.pairing ? wineData.pairing.split(", ") : [];

  const handleSetRating = (reviewIndex, newRating) => {
    setRatings((prevRatings) => {
      const updatedRatings = [...prevRatings];
      updatedRatings[reviewIndex] = newRating;
      return updatedRatings;
    });
  };

  const handleReviewSubmit = (reviewIndex) => {
    const rating = ratings[reviewIndex];
    const text = reviewText;
    // You may want to do something with the 'rating' and 'text' variables here
    setReviewText(" ");
  };

  return (
    <>
      <div className="container">
        <div className="inner padding">
          <h3 className="title">와인 상세 페이지</h3>

          <div className={styles.detailContainer}>
            <div className={styles.wineImage}>
              <div className={styles.img}>
                <img src={wineData?.picture || "/images/winedetail.svg"} alt="Wine" style={{ width: "50%", height: "100%" }} />
              </div>
            </div>
            <div className={styles.introBox}>
              <div className={styles.introFirst}>
                <div className={styles.fromBadge}>From</div>
                <div className={styles.wineRegion}>{wineData?.generalRegion}</div>
                <div className="heartBadge margin"></div>
              </div>
              <div className={styles.introTitle}>{wineData?.wineName}</div>
              <div className={styles.figureBox}>
                <div className={styles.label}>Light</div>
                <div className={`${styles.progress} ${styles.bodyProgress}`}>
                  <div className={styles.progressFill} style={progressStyles.body}></div>
                </div>
                <div className={styles.label}>Bold</div>
              </div>
              <div className={styles.figureBox}>
                <div className={styles.label}>Smooth</div>
                <div className={`${styles.progress} ${styles.dryrogress}`}>
                  <div className={styles.progressFill} style={progressStyles.dry}></div>
                </div>
                <div className={styles.label}>Tannic</div>
              </div>
              <div className={styles.figureBox}>
                <div className={styles.label}>Dry</div>
                <div className={`${styles.progress} ${styles.tanninProgress}`}>
                  <div className={styles.progressFill} style={progressStyles.tannin}></div>
                </div>
                <div className={styles.label}>Sweet</div>
              </div>
              <div className={styles.figureBox}>
                <div className={styles.label}>Soft</div>
                <div className={`${styles.progress} ${styles.acidityProgress}`}>
                  <div className={styles.progressFill} style={progressStyles.acidity}></div>
                </div>
                <div className={styles.label}>Acidic</div>
              </div>

              <div className={styles.withFood}>
                <div className={styles.withFoodTitle}>이런 음식과 함께 해요!</div>
                <div className={styles.foodPairings}>
                  {pairingData.map((item, index) => (
                    <div key={index} className={styles.circle}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailList}>
            <div className={styles.detailVintage}>Vintage : {wineData?.vintage}</div>
            <div className={styles.detailGrapes}>GRAPES : {wineData?.grapes}</div>
            <div className={styles.detailWinery}>WINERY : {wineData?.winery}</div>
            <div className={styles.detailPrice}>PRICE : {wineData?.price}</div>
            <div className={styles.detailRating}>
              RATING : <StarRating rating={wineData?.rating} isInteractive={false} />
            </div>
          </div>

          <div className={styles.reviewContainer}>
            <div className={styles.reviewBox}>
              <StarRating rating={ratings[0]} isInteractive={false} setRating={(newRating) => handleSetRating(0, newRating)} />
              <div className={styles.reviewComment}>가성비가 좋은 와인은 아닌 것 같았어요,, 그냥 딱 가격 정도의 맛</div>
            </div>
            <div className={styles.reviewBox}>
              <StarRating rating={ratings[1]} isInteractive={false} setRating={(newRating) => handleSetRating(1, newRating)} />
              <div className={styles.reviewComment}>가족끼리 같이 먹었는데 어른들은 좀 좋아하셨고 20대에겐 좀 무거운 맛</div>
            </div>
            <div className={styles.reviewBox}>
              <StarRating rating={ratings[2]} isInteractive={false} setRating={(newRating) => handleSetRating(2, newRating)} />
              <div className={styles.reviewComment}>
                스위트 와인이라고 되어 있었지만.. 글쎄요. 너무 씁쓸했어요 ㅜㅜ 단 거 엄청 좋아하시는 분은 비추,,,
              </div>
            </div>
          </div>

          <div className={styles.reviewSubmit}>
            <StarRating rating={ratings[3]} setRating={(newRating) => handleSetRating(3, newRating)} />
            <input type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="한줄리뷰를 작성해주세요." />
            <button onClick={() => handleReviewSubmit(2)}>등록</button>
          </div>
        </div>
      </div>
    </>
  );
}
