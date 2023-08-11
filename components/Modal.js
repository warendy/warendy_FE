import styles from "./Modal.module.css";

const Modal = () => {
  return (
    <div className={styles.modal}>
      <p className={styles.text}>이메일 또는 비밀번호를 확인해주세요</p>
    </div>
  );
};

export default Modal;
