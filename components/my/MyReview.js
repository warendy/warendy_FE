import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Pagination";
import styles from "./MyPost.module.css";

const ITEMS_PER_PAGE = 3;

const MyReview = ({ myReviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(myReviews.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReviews = myReviews.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className={styles.myPostHeader}>
        <h3 className={styles.headerTitle}>내가 작성한 리뷰</h3>
        <Link href="/review-page" className={styles.btnAll}>
          <span className={styles.text}>전체보기</span>
          <FontAwesomeIcon icon={faAngleRight} className={styles.arrowRight} />
        </Link>
      </div>
      <div className={styles.myPostArea}>
        <div className={styles.myReviewTitle}>
          <p className={styles.index}>번호</p>
          <p className={styles.name}>와인이름</p>
          <p className={styles.rating}>별점</p>
          <p className={styles.date}>작성일</p>
        </div>
        {currentReviews.map((post, index) => (
          <div key={index} className={styles.myPostInfo}>
            <p className={styles.index}>{startIndex + index + 1}</p>
            <p className={styles.name}>{post.wineName}</p>
            <p className={styles.rating}>{post.rating}</p>
            <p className={styles.date}>{post.createdAt}</p>
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default MyReview;
