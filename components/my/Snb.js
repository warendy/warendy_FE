import styles from "./Snb.module.css";

const Snb = ({ onPageLinkClick }) => {
  return (
    <div className={styles.snbArea}>
      <button onClick={() => onPageLinkClick("my")} className="resetBtn btn">
        <h2 className={styles.mainTitle}>마이페이지</h2>
      </button>
      <nav>
        <div>
          <strong className={styles.snbTitle}>내 정보</strong>
          <ul>
            <li className={styles.menuItem}>
              <button
                onClick={() => onPageLinkClick("myInfo")}
                className="resetBtn btn"
              >
                로그인 정보
              </button>
            </li>
            <li className={styles.menuItem}>
              <button
                onClick={() => onPageLinkClick("editProfile")}
                className="resetBtn btn"
              >
                프로필 관리
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Snb;
