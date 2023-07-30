import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./my.module.css";

import MyReview from "./my-review";

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
                href="/my/profile-edit"
                className="outline btn"
                type="button"
              >
                프로필 관리
              </Link>
              <Link
                href="/my/my-collection"
                className={styles.wineCollection + " btn outline "}
                type="button"
              >
                나만의 와인 컬렉션
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.userType}>그래프</div>
      </div>
      <div className={styles.myHomeTitle}>
        <h3 className={styles.title}>내가 쓴 게시글</h3>
        <Link href="/my/post" className={styles.btnMore}>
          <span className={styles.btnText}>더보기</span>
          <FontAwesomeIcon icon={faAngleRight} className={styles.arrowRight} />
        </Link>
      </div>
      <div className={styles.contentBox}>
        <div>1</div>
        <div>2</div>
      </div>
      <MyReview />
    </div>
  );
};

export default My;
