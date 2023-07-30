import React, { useState } from "react";
import styles from "./detail.module.css";
import Image from "next/image";
import StarRating from "./star-rating";

export default function Detail() {
  const [ratings, setRatings] = useState([0, 0, 0]); // Initialize ratings for each review
  const [reviewText, setReviewText] = useState(""); // State for the review text input

  const handleSetRating = (reviewIndex, newRating) => {
    setRatings((prevRatings) => {
      const updatedRatings = [...prevRatings];
      updatedRatings[reviewIndex] = newRating;
      return updatedRatings;
    });
  };

  const handleReviewSubmit = (reviewIndex) => {
    // You can now access the star rating and review text for each review.
    const rating = ratings[reviewIndex];
    const text = reviewText;

    // Here you can perform any actions you need to save the review, like sending it to a server or storing it in a state.

    // Clear the review text after submitting.
    setReviewText("");
  };
  return (
    <>
      <div className="container">
        <div className="inner padding">
          <h3 className="title">와인 상세 페이지</h3>

          <div className={styles.detailContainer}>
            <div className={styles.wineImage}>
              <div className={styles.img}>
                <Image src="/images/winedetail.svg" alt="Logo" layout="responsive" width={100} height={100} />
              </div>
            </div>
            <div className={styles.introBox}>
              <div className={styles.introFirst}>
                <div className={styles.typeBadge}>White</div>
                <div className={styles.wineTitle}>프랑스</div>
                <div className="heartBadge"></div>
              </div>
              <div className={styles.introTitle}>Domaine Besson, Chablis 1er Cru Vailllons</div>
              <div className={styles.figureBox}>
                <div className={styles.label}>Bitter</div>
                <div className={`${styles.progress} ${styles.sweetnessProgress}`}></div>
                <div className={styles.label}>Sweet</div>
              </div>
              <div className={styles.figureBox}>
                <div className={styles.label}>Light</div>
                <div className={`${styles.progress} ${styles.bodyProgress}`}></div>
                <div className={styles.label}>Full Body</div>
              </div>
              <div className={styles.figureBox}>
                <div className={styles.label}>Low</div>
                <div className={`${styles.progress} ${styles.tanninsProgress}`}></div>
                <div className={styles.label}>High Tannins</div>
              </div>
              <div className={styles.figureBox}>
                <div className={styles.label}>Low</div>
                <div className={`${styles.progress} ${styles.acidityProgress}`}></div>
                <div className={styles.label}>High Acidity</div>
              </div>

              <div className={styles.withFood}>
                <div className={styles.withFoodTitle}>이런 음식과 함께 해요!</div>
                <div className={styles.foodPairings}>
                  <div className={styles.circle}>Beef</div>
                  <div className={styles.circle}>Lamb</div>
                  <div className={styles.circle}>Poultry</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailList}>
            <div className={styles.detailRegion}>REGION</div>
            <div className={styles.detailWinery}>WINERY</div>
            <div className={styles.detailRating}>RATING</div>
            <div className={styles.detailPrice}>PRICE</div>
          </div>

          <div className={styles.reviewContainer}>
            <div className={styles.reviewBox}>
              <StarRating rating={ratings[0]} setRating={(newRating) => handleSetRating(0, newRating)} />
              <div className={styles.reviewComment}>가성비가 좋은 와인은 아닌 것 같았어요,, 그냥 딱 가격 정도의 맛</div>
            </div>
            <div className={styles.reviewBox}>
              <StarRating rating={ratings[1]} setRating={(newRating) => handleSetRating(1, newRating)} />
              <div className={styles.reviewComment}>가족끼리 같이 먹었는데 어른들은 좀 좋아하셨고 20대에겐 좀 무거운 맛</div>
            </div>
            <div className={styles.reviewBox}>
              <StarRating rating={ratings[2]} setRating={(newRating) => handleSetRating(2, newRating)} />
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
