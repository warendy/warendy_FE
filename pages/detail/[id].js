import React, { useState, useEffect } from "react";
import styles from "./detail.module.css";
import Image from "next/image";
import StarRating from "./star-rating";
import { addWineToFavorite, getWineDetail } from "../services/api";
import { useRouter } from "next/router";

const WineDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [WineDetail, setWineDetail] = useState({});
  const [ratings, setRatings] = useState([0, 0, 0]);
  const [reviewText, setReviewText] = useState("");
  const [body, setBody] = useState(0);
  const [dry, setDry] = useState(0);
  const [tannin, setTannin] = useState(0);
  const [acidity, setAcidity] = useState(0);
  const handleSetRating = (reviewIndex, newRating) => {
    setRatings((prevRatings) => {
      const updatedRatings = [...prevRatings];
      updatedRatings[reviewIndex] = newRating;
      return updatedRatings;
    });
  };
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

  const addToFavorite = (wineId) => {
    const data = {
      wineId: id,
    };
    addWineToFavorite(data);
  };

  const WineAttributeBox = ({ leftLabel, rightLabel, style }) => {
    return (
      <div className={styles.figureBox}>
        <div className={styles.label}>{leftLabel}</div>
        <div className={`${styles.progress}`}>
          <div className={`${styles.progressFill}`} style={style}></div>
        </div>
        <div className={styles.label}>{rightLabel}</div>
      </div>
    );
  };

  const pairingData = WineDetail?.pairing ? WineDetail.pairing.split(", ") : [];

  const handleReviewSubmit = (reviewIndex) => {
    const rating = ratings[reviewIndex];
    const text = reviewText;
    setReviewText("");
  };

  useEffect(() => {
    const getWineDetailData = async () => {
      const { id } = router.query;
      try {
        const data = await getWineDetail(id);
        const region = data.region;
        const generalRegion = getGeneralRegion(region);
        data.generalRegion = generalRegion;
        setBody(data.body);
        setDry(data.dry);
        setTannin(data.tannin);
        setAcidity(data.acidity);
        setWineDetail(data);
      } catch (error) {
        console.error(error);
      }
    };

    getWineDetailData();
  }, [id]);

  console.log(WineDetail);
  if (WineDetail?.hasOwnProperty("wineName")) {
    return (
      <>
        <div className="container">
          <div className="inner padding">
            <h3 className="title">와인 상세 페이지</h3>

            <div className={styles.detailContainer}>
              <div className={styles.wineImage}>
                <div className={styles.img}>
                  <img src={WineDetail?.picture || "/images/winedetail.svg"} alt="Wine" style={{ width: "50%", height: "100%" }} />
                </div>
              </div>
              <div className={styles.introBox}>
                <div className={styles.introFirst}>
                  <div className={styles.fromBadge}>From</div>
                  <div className={styles.wineRegion}>{WineDetail.generalRegion}</div>
                  <div className="heartBadge" onClick={() => addToFavorite(wineId)}></div>
                </div>
                <div className={styles.introTitle}>{WineDetail.wineName}</div>
                <WineAttributeBox leftLabel="Light" rightLabel="Bold" style={progressStyles.body} />
                <WineAttributeBox leftLabel="Tannic" rightLabel="Smooth" style={progressStyles.dry} />
                <WineAttributeBox leftLabel="Dry" rightLabel="Sweet" style={progressStyles.tannin} />
                <WineAttributeBox leftLabel="Soft" rightLabel="Acidic" style={progressStyles.acidity} />

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
              <div className={styles.detailVintage}>Vintage : {WineDetail?.vintage}</div>
              <div className={styles.detailGrapes}>Grape : {WineDetail?.grapes}</div>
              <div className={styles.detailWinery}>WINERY : {WineDetail?.winery}</div>
              <div className={styles.detailPrice}>PRICE : {WineDetail?.price}</div>
              <div className={styles.detailRating}>
                RATING : <StarRating rating={WineDetail?.rating} isInteractive={false} />
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
                  스위트 와인이라고 되어 있었지만.. 글쎄요. 너무 씁쓸했어요 ㅜㅜ 단 거 엄청 좋아하시는 분은 비추요.
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
  } else {
    return (
      <>
        <h1>와인 정보를 불러오는중 입니다</h1>
      </>
    );
  }
};

export default WineDetail;
