import styles from "./loved-wine.module.css";

export default function LovedWine() {
  return (
    <>
      <div className={styles.lovedWineContainer}>
        <div className={styles.lovedWines}>
          <h3 className="title">많은 사랑을 받고 있어요!</h3>
          <ul className={styles.lovedWineList}>
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
      </div>
    </>
  );
}
