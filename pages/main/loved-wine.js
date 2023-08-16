import Image from "next/image";
import styles from "./loved-wine.module.css";
import Link from "next/link";

export default function LovedWine({ List }) {
  return (
    <div className={styles.lovedWineContainer}>
      <div className="inner">
        <div className={styles.lovedWines}>
          <h3 className="maintitle">많은 사랑을 받고 있어요!</h3>
          <ul className={styles.lovedWineList}>
            {List &&
              List.slice(0, 10).map((el, idx) => (
                <li key={idx} className={styles.lovedWineItem}>
                  <Link href={`/detail/${el.id}`} legacyBehavior>
                    <a>
                      <Image src={el.picture} alt={el.wineName} width={100} height={230} />
                      <p>{el.wineName}</p>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
