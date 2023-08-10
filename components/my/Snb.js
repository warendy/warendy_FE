import styles from "./Snb.module.css";

const Snb = () => {
  return (
    <div className={styles.snbArea}>
      <button onClick={() => handleSnbLinkClick("my")} className="resetBtn btn">
        <h2 className={styles.mainTitle}>마이페이지</h2>
      </button>
      <nav>
        <div>
          <strong className={styles.snbTitle}>내 정보</strong>
          <ul>
            <li className={styles.menuItem}>
              <button
                onClick={() => handleSnbLinkClick("profile")}
                className="resetBtn btn"
              >
                로그인 정보
              </button>
            </li>
            <li className={styles.menuItem}>
              <button
                onClick={() => handleSnbLinkClick("profile-edit")}
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
