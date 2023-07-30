import styles from "./todayswine.module.css";

const ReviewPage = () => {
  return (
    <>
      <div className="container">
        <div className={styles.myReview + " inner "}>
          <h3 className="title">오늘의 와인</h3>
          <div className={styles.reviewPage}>
            <div className={styles.filter}>
              <h3 className={styles.filterName}>필터</h3>
              <div className={styles.filterMain}>
                <div className={styles.filterType}>와인 종류</div>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  화이트와인
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  레드와인
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  스파클링와인
                </label>
                <div className={styles.filterType}>당도</div>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  낮음
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  중간
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  높음
                </label>
                <div className={styles.filterType}>산미</div>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  낮음
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  중간
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  높음
                </label>
                <div className={styles.filterType}>탄닌</div>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  낮음
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  중간
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  높음
                </label>
                <div className={styles.filterType}>바디감</div>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  낮음
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  중간
                </label>
                <label className={styles.type}>
                  <input type="checkbox" className={styles.input} />
                  높음
                </label>
              </div>
            </div>
            <div className={styles.contentArea}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
