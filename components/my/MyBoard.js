import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyPost.module.css";

const MyBoard = ({ myBoards }) => {
  return (
    <>
      <div className={styles.myPostHeader}>
        <h3 className={styles.headerTitle}>내가 쓴 게시글</h3>
        <Link href="/post/post" className={styles.btnAll}>
          <span className={styles.text}>전체보기</span>
          <FontAwesomeIcon icon={faAngleRight} className={styles.arrowRight} />
        </Link>
      </div>
      <div className={styles.myPostArea}>
        <div className={styles.myBoardTitle}>
          <p className={styles.index}>번호</p>
          <p className={styles.name}>제목</p>
          <p className={styles.barName}>와인바이름</p>
          <p className={styles.date}>작성일</p>
        </div>
        {myBoards.map((post, index) => (
          <div key={index} className={styles.myPostInfo}>
            <p className={styles.index}>{index + 1}</p>
            <p className={styles.name}>{post.name}</p>
            <p className={styles.barName}>{post.winebarName}</p>
            <p className={styles.date}>{post.date}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBoard;
