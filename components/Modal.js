import styles from "./Modal.module.css";

export const ErrorModal = () => {
  return (
    <>
      <div className={styles.modal}>
        <p className={styles.text}>이메일 또는 비밀번호를 확인해주세요.</p>
      </div>
    </>
  );
};

export const LogoutModal = () => {
  return (
    <>
      <div className={styles.modal}>
        <p className={styles.text}>로그아웃 되었습니다.</p>
      </div>
    </>
  );
};
