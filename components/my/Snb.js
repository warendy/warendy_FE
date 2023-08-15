import styles from "./Snb.module.css";

const Snb = ({ onPageLinkClick }) => {
  return (
    <div className={styles.snbArea}>
      <button
        onClick={() => onPageLinkClick("myHome")}
        className={styles.mainTitle + " resetBtn btn "}
      >
        마이페이지
      </button>
      <nav className={styles.snb}>
        <strong className={styles.snbTitle}>내 정보</strong>
        <button
          onClick={() => onPageLinkClick("editInfo")}
          className="resetBtn btn"
        >
          로그인 정보
        </button>
        <button
          onClick={() => onPageLinkClick("editProfile")}
          className="resetBtn btn"
        >
          프로필 관리
        </button>
      </nav>
    </div>
  );
};

export default Snb;
