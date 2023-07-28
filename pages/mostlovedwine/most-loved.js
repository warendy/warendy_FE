import styles from "./most-loved.module.css";

export default function MostLovedWine() {
  return (
    <>
      <div className={styles.headerBg}>
        <div className={styles.bgInner}>
          <h3 className="title plusTitle">현재 사랑을 많이 받고 있는 와인</h3>
        </div>
      </div>
      <div className={styles.wineExplainContainer}>
        <div className={styles.wineExplainContents}>
          <h2 className="title">분위기 있는 날</h2>
          <h1 className={styles.wineName}>까베르네 쇼비뇽</h1>
          <h3 className={styles.wineSub}>
            한 모금 마실 때마다 시간이 멈춘 듯<br />
            풍미가 남아 있는 동안 혀의 끝에서 탱고가 펼쳐집니다.
          </h3>
        </div>
      </div>
      <div className={styles.lovedWines}>
        <ul className={styles.lovedWineList}>
          <li className={styles.lovedWineItem}></li>
          <li className={styles.lovedWineItem}></li>
          <li className={styles.lovedWineItem}></li>
          <li className={styles.lovedWineItem}></li>
          <li className={styles.lovedWineItem}></li>
          <li className={styles.lovedWineItem}></li>
          <li className={styles.lovedWineItem}></li>
          <li className={styles.lovedWineItem}></li>
          <li className={styles.lovedWineItem}></li>
        </ul>
      </div>
      <div className={styles.pageContainer}>
        <ul className={styles.pageNumber}>
          <li className={styles.number}>1</li>
          <li className={styles.number}>2</li>
          <li className={styles.number}>3</li>
          <li className={styles.number}>4</li>
        </ul>
      </div>
    </>
  );
}
