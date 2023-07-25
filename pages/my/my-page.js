import { useState } from "react";
import styles from "./my-page.module.css";

import My from "./my";
import Profile from "./profile";
import ProfileEdit from "./profile-edit";

const MyPage = () => {
  const [selectedPage, setSelectedPage] = useState("my");

  const handleSnbLinkClick = (page) => {
    setSelectedPage(page);
  };

  const renderContentArea = () => {
    switch (selectedPage) {
      case "my":
        return <My />;
      case "profile":
        return <Profile />;
      case "profile-edit":
        return <ProfileEdit />;

      default:
        return <div>페이지를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <>
      <div className="container">
        <div className="inner top">
          <div className={styles.snbArea}>
            <button
              onClick={() => handleSnbLinkClick("my")}
              className={styles.menuBtn + " btn "}
            >
              <h2 className={styles.mainTitle}>마이페이지</h2>
            </button>
            <nav>
              <div>
                <strong className={styles.snbTitle}>내 정보</strong>
                <ul>
                  <li className={styles.menuItem}>
                    <button
                      onClick={() => handleSnbLinkClick("profile")}
                      className={styles.menuBtn + " btn "}
                    >
                      로그인 정보
                    </button>
                  </li>
                  <li className={styles.menuItem}>
                    <button
                      onClick={() => handleSnbLinkClick("profile-edit")}
                      className={styles.menuBtn + " btn "}
                    >
                      프로필 관리
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className={styles.contentArea}>{renderContentArea()}</div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
