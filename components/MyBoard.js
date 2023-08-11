import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyPost.module.css";
import { getMyBoard } from "../pages/services/api";

const MyBoard = () => {
  const [myBoards, setMyBoards] = useState([]);
  console.log(myBoards);

  useEffect(() => {
    getMyBoardFromServer();
  }, []);

  const getMyBoardFromServer = async () => {
    try {
      const boards = await getMyBoard();
      const boardsArray = Object.values(boards.content);
      setMyBoards(boardsArray);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  return (
    <>
      <div className={styles.myHomeTitle}>
        <h3 className={styles.title}>내가 쓴 게시글</h3>
        <Link href="/post/post" className={styles.btnMore}>
          <span className={styles.btnText}>전체보기</span>
          <FontAwesomeIcon icon={faAngleRight} className={styles.arrowRight} />
        </Link>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.contentTitle}>
          <p className={styles.contentIndex}>번호</p>
          <p>제목</p>
          <p className={styles.contentDate}>작성일</p>
        </div>
        {myBoards.map((post, index) => (
          <div key={index} className={styles.contentInfo}>
            <p className={styles.index}>{index + 1}</p>
            <p>{post.name}</p>
            <p className={styles.date}>{post.date}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBoard;
