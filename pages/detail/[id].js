import React, { useState, useEffect } from "react";
import styles from "./detail.module.css";
import Image from "next/image";
import StarRating from "./star-rating";
import {
  addWineToFavorite,
  getWineDetail,
  postWineReview,
} from "@/services/api";
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { userTokenState, wineReviewListState } from "@/recoil/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { userIdState } from "@/recoil/userState";

const WineDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [WineDetail, setWineDetail] = useState({});
  const [ratings, setRatings] = useState(0);
  const [contents, setContents] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [body, setBody] = useState(0);
  const [dry, setDry] = useState(0);
  const [tannin, setTannin] = useState(0);
  const [acidity, setAcidity] = useState(0);
  const token = useRecoilValue(userTokenState);
  const [reviews, setReviews] = useRecoilState(wineReviewListState);
  const memberId = useRecoilValue(userIdState);
  const [isFavorited, setIsFavorited] = useState(false);

  const sendReviewData = async () => {
    const data = {
      contents: contents,
      rating: parseFloat(ratings),
      wineId: id,
      memberId: memberId,
      nickname: sessionStorage.getItem("usernickname"),
    };
    setReviews((prevReviews) => {
      const updatedReviews = [data, ...prevReviews];
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
      return updatedReviews;
    });
    try {
      const response = await postWineReview(data, token);
      if (response.status === 200) {
        const savedReview = response.data;
        setWineDetail((prevDetail) => ({
          ...prevDetail,
          reviewList: [...prevDetail.reviewList, savedReview],
        }));
        setContents("");
        setRatings(0);
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const handleRating = (e) => {
    setRatings(e);
  };

  const progressStyles = {
    body: { width: `${((body || 0.5) / 5) * 100}%` },
    dry: { width: `${((dry || 0.5) / 5) * 100}%` },
    tannin: { width: `${((tannin || 0.5) / 5) * 100}%` },
    acidity: { width: `${((acidity || 0.5) / 5) * 100}%` },
  };

  function getGeneralRegion(region) {
    const parts = region.split("/");
    return parts.slice(0, 2).join(" / ");
  }

  const addToFavorite = (id) => {
    const data = {
      wineId: Number(id),
    };
    const token = sessionStorage.getItem("userTokenState");
    addWineToFavorite(data, token);
    setIsFavorited((prevFav) => !prevFav); // toggle the favorite state
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

  const pairingData =
    WineDetail?.pairing && WineDetail.pairing !== ""
      ? WineDetail.pairing
          .replace(/\s*\([^)]*\)/g, "")
          .replace(/^\"|\"$/g, "")
          .split("/")
          .filter(Boolean)
      : [];

  const handleReviewSubmit = (reviewIndex) => {
    const rating = ratings[reviewIndex];
    const text = reviewText;
    setReviewText("");
  };

  const handleEditReview = (index) => {
    const updatedReviewText = prompt(
      "수정하실 리뷰를 적어주세요",
      reviews[index].contents
    );
    if (updatedReviewText !== null) {
      setReviews((prevReviews) => {
        const updatedReview = {
          ...prevReviews[index],
          contents: updatedReviewText,
        };
        const newReviews = [
          ...prevReviews.slice(0, index),
          updatedReview,
          ...prevReviews.slice(index + 1),
        ];
        localStorage.setItem("reviews", JSON.stringify(newReviews));
        return newReviews;
      });
    }
  };

  const handleDeleteReview = (index) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews((prevReviews) => {
        const newReviews = [...prevReviews];
        newReviews.splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(newReviews));
        return newReviews;
      });
    }
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

        // const localReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        // combinedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        // setReviews([...localReviews, ...data.reviewList]);
        setReviews(data.reviewList);
      } catch (error) {
        console.error(error);
      }
    };
    if (id != undefined) {
      getWineDetailData();
    }
  }, [id]);
  console.log(reviews);

  if (WineDetail?.hasOwnProperty("wineName")) {
    return (
      <>
        <div className="container">
          <h3 className={styles.subtitle}>와인 상세 페이지</h3>
          <div className="inner padding">
            <div className={styles.detailContainer}>
              <div className={styles.wineImage}>
                <div className={styles.img}>
                  <Image
                    src={WineDetail?.picture || "/images/winedetail.svg"}
                    alt="Wine"
                    width={70}
                    height={200}
                  />
                </div>
              </div>
              <div className={styles.introBox}>
                <div className={styles.introFirst}>
                  <div className={styles.fromBadge}>From</div>
                  <div className={styles.wineRegion}>
                    {WineDetail.generalRegion}
                  </div>
                  <div
                    className={`heartBadge ${!isFavorited ? "favorited" : ""}`}
                    onClick={() => addToFavorite(id)}
                  ></div>
                </div>
                <div className={styles.introTitle}>{WineDetail.wineName}</div>
                <WineAttributeBox
                  leftLabel="Light"
                  rightLabel="Bold"
                  style={progressStyles.body}
                />

                <WineAttributeBox
                  leftLabel="Tannic"
                  rightLabel="Smooth"
                  style={progressStyles.dry}
                />

                <WineAttributeBox
                  leftLabel="Dry"
                  rightLabel="Sweet"
                  style={progressStyles.tannin}
                />

                <WineAttributeBox
                  leftLabel="Soft"
                  rightLabel="Acidic"
                  style={progressStyles.acidity}
                />

                <div className={styles.withFood}>
                  <div className={styles.withFoodTitle}>
                    이런 음식과 함께 해요!
                  </div>
                  <div className={styles.foodPairings}>
                    {pairingData.length === 0 ||
                    pairingData.every(
                      (item) => item.trim() === "" || item === '""'
                    ) ? (
                      <div className={styles.noData}>
                        페어링 종류 데이터가 없습니다.
                      </div>
                    ) : (
                      pairingData.slice(0, 3).map(
                        (item, index) =>
                          item.trim() !== "" &&
                          item !== '""' && (
                            <div key={index} className={styles.circle}>
                              {item}
                            </div>
                          )
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.detailList}>
              <div className={styles.detailVintage}>
                Vintage : {WineDetail?.vintage}
              </div>
              <div className={styles.detailGrapes}>
                Grape : {WineDetail?.grapes}
              </div>
              <div className={styles.detailWinery}>
                WINERY : {WineDetail?.winery}
              </div>
              <div className={styles.detailPrice}>
                PRICE : {WineDetail?.price}
              </div>
              <div className={styles.detailAlcohol}>
                alcohol : {WineDetail?.alcohol}
              </div>
              <div className={styles.detailRating}>
                RATING :{" "}
                <StarRating rating={WineDetail?.rating} isInteractive={false} />
              </div>
            </div>

            <div className={styles.reviewContainer}>
              {reviews.slice(0, 6).map((review, index) => (
                <div key={index} className={styles.reviewBox}>
                  <StarRating
                    rating={review.rating}
                    isInteractive={false}
                    setRating={(newRating) => handleSetRating(0, newRating)}
                  />

                  <div className={styles.reviewContent}>
                    <div className={styles.reviewComment}>
                      {review.contents}
                    </div>

                    <div className={styles.reviewWriter}>
                      <FontAwesomeIcon icon={faUser} className={styles.icon} />
                      {review.nickname}
                    </div>

                    {review.memberId === memberId && (
                      <div className={styles.buttonsContainer}>
                        <button
                          className={styles.button}
                          onClick={() => handleEditReview(index)}
                        >
                          수정하기
                        </button>
                        <button
                          className={styles.button}
                          onClick={() => handleDeleteReview(index)}
                        >
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className={styles.reviewSubmit}>
                <StarRating
                  rating={ratings}
                  setRating={(newRating) => handleRating(newRating)}
                />
                <input
                  type="text"
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                  placeholder="한줄리뷰를 작성해주세요."
                />
                <button onClick={() => sendReviewData()}>등록</button>
              </div>
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
