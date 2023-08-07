import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyPost.module.css";

const MyReview = () => {
  return (
    <>
      <div className={styles.myHomeTitle}>
        <h3 className={styles.title}>내가 쓴 리뷰</h3>
        <Link href="/review/review-page" className={styles.btnMore}>
          <span className={styles.btnText}>전체보기</span>
          <FontAwesomeIcon icon={faAngleRight} className={styles.arrowRight} />
        </Link>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.contentTitle}>
          <p className={styles.contentIndex}>번호</p>
          <p>제목</p>
          <p className={styles.contentDate}>작성일</p>
        </div>
        <div className={styles.contentInfo}>
          <p className={styles.index}>1</p>
          <p>시험 끝나고 와인 한잔 하실 분</p>
          <p className={styles.date}>2023.02.07</p>
        </div>
      </div>
    </>
  );
};

export default MyReview;
