import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyPost.module.css";

const MyReview = ({ myReviews }) => {
  return (
    <>
      <div className={styles.myPostHeader}>
        <h3 className={styles.headerTitle}>내가 쓴 리뷰</h3>
        <Link href="/my/review-page" className={styles.btnAll}>
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
        {myReviews.map((post, index) => (
          <div key={index} className={styles.myPostInfo}>
            <p className={styles.index}>{index + 1}</p>
            <p className={styles.name}>{post.wineName}</p>
            <p className={styles.rating}>{post.rating}</p>
            <p className={styles.date}>{post.createdAt}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyReview;
