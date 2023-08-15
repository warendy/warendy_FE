import Image from "next/image";
import styles from "./loved-wine.module.css";
import Link from "next/link";

export default function LovedWine({ List }) {
  console.log(List);

  return (
    <div className={styles.lovedWineContainer}>
      <div className={styles.lovedWines}>
        <h3 className="title">많은 사랑을 받고 있는 와인</h3>
        <ul className={styles.lovedWineList}>
          {List &&
            List.map((el, idx) => (
              <li key={idx} className={styles.lovedWineItem}>
                <Link href={`/detail/${el.id}`}>
                  {" "}
                  <a>
                    <Image
                      src={el.picture}
                      alt={el.wineName}
                      width={100}
                      height={230}
                    />
                    <p>{el.wineName}</p>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
