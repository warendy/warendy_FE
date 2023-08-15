import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../recoil/atoms";
import styles from "./Review.module.css";
import { getWineReviews } from "../../services/api";

const Review = () => {
  const [wineReviews, setWineReviews] = useState([]);
  console.log(wineReviews);
  const token = useRecoilValue(userTokenState);
  console.log(token);
  useEffect(() => {
    getWineReviewsFromServer(token);
  }, [token]);

  const getWineReviewsFromServer = async (token) => {
    try {
      const wineReviews = await getWineReviews(token);
      const wineReviewsArray = Object.values(wineReviews.content);
      setWineReviews(wineReviewsArray);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  return (
    <div className={styles.reviewPage}>
      <div className={styles.filter}>
        <h3 className={styles.filterName}>필터</h3>
        <div className={styles.filterMain}>
          <div className={styles.filterType}>와인 종류</div>
          <label className={styles.type}>
            <input type="checkbox" className={styles.input} />
            화이트와인
          </label>
          <label className={styles.type}>
            <input type="checkbox" className={styles.input} />
            레드와인
          </label>
          <label className={styles.type}>
            <input type="checkbox" className={styles.input} />
            스파클링와인
          </label>
        </div>
      </div>
      {wineReviews.map((post, index) => (
        <div className={styles.contentArea} key={index}>
          <div className={styles.reviewCard}>
            <div className={styles.img}>
              <Image
                src={post.winePicture}
                alt="Wine"
                width={35}
                height={140}
              />
            </div>
            <div className={styles.review}>
              <div className={styles.reviewArea}>
                <div className={styles.date}>작성일{post.createdAt}</div>
                <div className={styles.wineName}>{post.wineName}</div>
                <div className={styles.reviewContent}>{post.contents}</div>
              </div>
              <Link
                href="/my/review-page"
                className={styles.btnReview + " btn outline "}
                type="button"
              >
                리뷰보기
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
