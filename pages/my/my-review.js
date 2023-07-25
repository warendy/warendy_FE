import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./my-review.module.css";

const MyReview = () => {
  return (
    <>
      <div className={styles.myHomeTitle}>
        <h3 className={styles.title}>내가 쓴 리뷰</h3>
        <Link href="/review/review-page" className={styles.btnMore}>
          <span className={styles.btnText}>더보기</span>
          <FontAwesomeIcon icon={faAngleRight} className={styles.arrowRight} />
        </Link>
      </div>
      <div className={styles.contentBox}>
        <div>1</div>
        <div>2</div>
      </div>
    </>
  );
};

export default MyReview;
