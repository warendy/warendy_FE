import styles from "./today-mood.module.css";
import Link from "next/link";

export default function TodayMood() {
  return (
    <>
      <div className={styles.todayMoodContainer}>
        <div className={styles.todayMood}>
          <ul className={styles.todayMoodList}>
            <li className={styles.todayMoodItem}>
              <Link href="/winebysituation/rainyday" legacyBehavior>
                <a>비오는 날</a>
              </Link>
            </li>
            <li className={styles.todayMoodItem}>
              <Link href="/winebysituation/drinkingday" legacyBehavior>
                <a>취하고 싶은 날</a>
              </Link>
            </li>
            <li className={styles.todayMoodItem}>
              <Link href="/winebysituation/aloneday" legacyBehavior>
                <a>혼술하는 날</a>
              </Link>
            </li>
            <li className={styles.todayMoodItem}>
              <Link href="/winebysituation/depressedday" legacyBehavior>
                <a>우울한 날</a>
              </Link>
            </li>
            <li className={styles.todayMoodItem}>
              <Link href="/winebysituation/travelday" legacyBehavior>
                <a>여행가는 날</a>
              </Link>
            </li>
            <li className={styles.todayMoodItem}>
              <Link href="/winebysituation/dateday" legacyBehavior>
                <a>데이트하는 날</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
