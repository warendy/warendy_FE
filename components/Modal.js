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

export const SuccessModal = () => {
  return (
    <>
      <div className={styles.modal}>
        <p className={styles.text}>로그인 되었습니다.</p>
      </div>
    </>
  );
};

export const NicknameUpdateModal = () => {
  return (
    <>
      <div className={styles.nicknameModal}>
        <p className={styles.text}>닉네임이 변경되었습니다.</p>
      </div>
    </>
  );
};

export const PasswordUpdateModal = () => {
  return (
    <>
      <div className={styles.passwordModal}>
        <p className={styles.text}>비밀번호가 변경되었습니다.</p>
      </div>
    </>
  );
};

export const CollectionUpdateModal = () => {
  return (
    <>
      <div className={styles.passwordModal}>
        <p className={styles.text}>나만의 와인 컬렉션이 업데이트되었습니다.</p>
      </div>
    </>
  );
};
