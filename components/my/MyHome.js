import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./MyHome.module.css";
import MyBoard from "../../components/my/MyBoard";
import MyReview from "../../components/my/MyReview";

const MyHome = ({ userInfo, myReviews, myBoards }) => {
  return (
    <>
      <div className={styles.myHomeContainer}>
        <div className={styles.userMembership}>
          <div className={styles.userDetail}>
            {userInfo.avatar ? (
              <Image
                src={userInfo.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={styles.userThumb}
              />
            ) : (
              <Image
                src="/images/profile.svg"
                alt="Default Avatar"
                width={120}
                height={120}
                className={styles.userThumb}
              />
            )}
            <div className={styles.userInfo}>
              <strong className={styles.name}>{userInfo.nickname}</strong>
              <p className={styles.email}>{userInfo.email}</p>
              <Link
                href="/my/collection-page"
                className={styles.wineCollection + " btn outline "}
                type="button"
              >
                나만의 와인 컬렉션
              </Link>
              {/* <Link
                href="/my/collection-page"
                className="btn outline"
                type="button"
              >
                참여중인 동행
              </Link> */}
            </div>
          </div>
          {/* <div className={styles.userType}>그래프</div> */}
        </div>
      </div>
      <div className={styles.myPostContainer}>
        <MyBoard myBoards={myBoards} />
        <MyReview myReviews={myReviews} />
      </div>
    </>
  );
};

export default MyHome;
