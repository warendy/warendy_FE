import Image from "next/image";
import styles from "./EditProfile.module.css";

const ProfileEdit = () => {
  return (
    <>
      <div className={styles.profileEditProfile}>
        <h3 className={styles.title}>프로필 관리</h3>
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
                <button className="btn outline" type="button">
                  이미지 변경
                </button>
                <button
                  className={styles.delete + " btn outline "}
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileGroup}>
            <h4 className={styles.groupTitle}>프로필 정보</h4>
            <div className={styles.unit}>
              <h5 className={styles.unitTitle}>닉네임</h5>
              <div className={styles.unitContent}>
                <p className={styles.content}>내 이름은 동우기</p>
                <button className={styles.btnModify + " outline "}>변경</button>
              </div>
            </div>
            <div className={styles.modify}></div>
          </div>
          <div className={styles.profileGroup}>
            <h4 className={styles.groupTitle}>와인 취향</h4>
            <div className={styles.unit}>
              <h5 className={styles.unitTitle}></h5>
              <div className={styles.unitContent}>
                <p className={styles.content}>화이트 와인</p>
                <button className={styles.btnModify + " outline "}>변경</button>
              </div>
            </div>
            <div className={styles.modify}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
