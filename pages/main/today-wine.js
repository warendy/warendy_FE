import Image from "next/image";
import styles from "./today-wine.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

export default function TodayWine() {
  return (
    <>
      <div className={styles.todayWinesContainer + " top "}>
        <h3 className="title">오늘의 와인</h3>
        <ul className={styles.todayWineList}>
          <button className="resetBtn btn">
            <FontAwesomeIcon icon={faCaretLeft} className={styles.icon} />
          </button>
          <li className={styles.recommended}>
            <Image
              src="/images/wine.png"
              alt="recommended wine"
              width={30}
              height={120}
            />
          </li>
          <li className={styles.recommended}>
            <Image
              src="/images/wine.png"
              alt="recommended wine"
              width={30}
              height={120}
            />
          </li>
          <li className={styles.recommended}>
            <Image
              src="/images/wine.png"
              alt="recommended wine"
              width={30}
              height={120}
            />
          </li>
          <li className={styles.recommended}>
            <Image
              src="/images/wine.png"
              alt="recommended wine"
              width={30}
              height={120}
            />
          </li>
          <button className="resetBtn btn">
            <FontAwesomeIcon icon={faCaretRight} className={styles.icon} />
          </button>
        </ul>
      </div>
    </>
  );
}
