import Link from "next/link";
import Image from "next/image";
import styles from "./wine-collection.module.css";

const WineCollection = () => {
  return (
    <>
      <div className={styles.container + " inner"}>
        <div></div>
        <div className={styles.contentArea}>
          <div className={styles.wineCollection}>
            <div className={styles.contentTitle}>
              <div className={styles.title}>
                <h3 className={styles.mainTitle}>나만의 와인 컬렉션</h3>
              </div>
            </div>
            <div className={styles.collectionList}>
              <div className={styles.left}>
                <div className={styles.collectionListTab}>
                  <div className={`${styles.tabItem} ${styles.tabOn}`}>
                    <Link href="#" className={styles.tabLink}>
                      <dl className={styles.tabBox}>
                        <dt className={styles.title}>내가 좋아하는 레드와인</dt>
                        <dd className={styles.count}>0</dd>
                      </dl>
                    </Link>
                  </div>
                  <div className={styles.tabItem}>
                    <Link href="#" className={styles.tabLink}>
                      <dl className={styles.tabBox}>
                        <dt className={styles.title}>도전해보고 싶은 와인</dt>
                        <dd className={styles.count}>0</dd>
                      </dl>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.collectionHead}>
                  <div className={styles.filter}>
                    <Link href="#" className={styles.btnFilter}>
                      전체
                      <Image />
                    </Link>
                  </div>
                </div>
                <div className={styles.collectionArea}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WineCollection;
