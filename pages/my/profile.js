import styles from "./profile.module.css";

const Profile = () => {
  return (
    <>
      <div className={styles.profile}>
        <h3 className={styles.title}>로그인 정보</h3>
        <div className={styles.profileInfo}>
          <div className={styles.profileGroup}>
            <h4 className={styles.groupTitle}>내 계정</h4>
            <div className={styles.unit}>
              <h5 className={styles.unitTitle}>이메일 주소</h5>
              <div className={styles.unitContent}>
                <p className={styles.content}>waren@warendy.com</p>
                <button className={styles.btnModify + " outline "}>변경</button>
              </div>
            </div>
            <div className={styles.modify}></div>
            <div className={styles.unit}>
              <h5 className={styles.unitTitle}>비밀번호</h5>
              <div className={styles.unitContent}>
                <p className={styles.content}>*****</p>
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

export default Profile;
