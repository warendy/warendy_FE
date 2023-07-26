import Link from "next/link";
import Image from "next/image";
import styles from "./review-page.module.css";

const ReviewPage = () => {
  return (
    <>
      <div className="container">
        <div className="inner top">
          <h3 className="title">내가 쓴 리뷰</h3>
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
            <div className={styles.contentArea}>
              <div className={styles.reviewCard}>
                <div className={styles.img}>
                  <Image
                    src="/images/wine.png"
                    alt="Logo"
                    width={35}
                    height={140}
                  />
                </div>
                <div className={styles.review}>
                  <div className={styles.reviewArea}>
                    <div className={styles.date}>리뷰 작성일 : 23.02.07</div>
                    <div className={styles.wineName}>
                      프리미티보 디 만두리아
                    </div>
                  </div>
                  <Link
                    href="/my/my-review"
                    className={styles.btnReview + " btn outline "}
                    type="button"
                  >
                    리뷰보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
