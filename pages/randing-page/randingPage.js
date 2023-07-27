import React from "react";
import styles from "./randingPage.module.css";

export default function randingpage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <div className={styles.book}>
          <div className={styles.leftPage}></div>
          <div className={styles.rightPage}></div>
          <div className={styles.spine}></div>
          <div className={styles.content}>무거운 거 말고 부담스럽지 않은 가벼운 게 최고야!</div>
          <div className={styles.contentTwo}>씁쓸한 아메리카노 말고 달달한 에이드가 좋아~</div>
          <div className={styles.contentThree}>혼자 마시는 것보단 당연히 친구들이랑 마셔야지~ </div>
        </div>
      </div>
    </div>
  );
}
