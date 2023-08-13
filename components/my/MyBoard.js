import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyPost.module.css";

const ITEMS_PER_PAGE = 3;

const MyBoard = ({ myBoards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(myBoards.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBoards = myBoards.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
        {currentBoards.map((post, index) => (
          <div key={index} className={styles.myPostInfo}>
            <p className={styles.index}>{startIndex + index + 1}</p>
            <p className={styles.name}>{post.name}</p>
            <p className={styles.barName}>{post.winebarName}</p>
            <p className={styles.date}>{post.date}</p>
          </div>
        ))}
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? styles.activePage : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MyBoard;
