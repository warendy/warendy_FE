import Link from "next/link";
import Image from "next/image";
import styles from "./my.module.css";

import MyBoard from "../../components/MyBoard";
import MyReview from "../../components/MyReview";

const My = () => {
  return (
    <div className={styles.myHome}>
      <div className={styles.userMembership}>
        <div className={styles.userDetail}>
          <div className={styles.userThumb}>
            <Image
              src="/images/profile.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.infoBox}>
              <strong className={styles.name}>내 이름은 동우기</strong>
              <p className={styles.email}>waren@warendy.com</p>
              <Link
                href="/my/collection-page"
                className={styles.wineCollection + " btn outline "}
                type="button"
              >
                나만의 와인 컬렉션
              </Link>
              <Link
                href="/my/collection-page"
                className="btn outline"
                type="button"
              >
                와인 취향
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.userType}>그래프</div>
      </div>
      <MyBoard />
      <MyReview />
    </div>
  );
};

export default My;
