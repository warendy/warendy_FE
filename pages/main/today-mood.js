import styles from "./today-mood.module.css";

export default function TodayMood() {
  return (
    <>
      <div className={styles.todayMoodContainer}>
        <div className={styles.todayMood}>
          <ul className={styles.todayMoodList}>
            <li className={styles.todayMoodItem}>
              <a href="#">비 오는 날</a>
            </li>
            <li className={styles.todayMoodItem}></li>
            <li className={styles.todayMoodItem}></li>
            <li className={styles.todayMoodItem}></li>
            <li className={styles.todayMoodItem}></li>
            <li className={styles.todayMoodItem}></li>
          </ul>
        </div>
      </div>
    </>
  );
}
