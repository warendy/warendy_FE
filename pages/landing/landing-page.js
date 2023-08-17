import React from "react";
import styles from "./landing-page.module.css";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <div className={styles.book}>
          <div className={styles.leftPage}></div>
          <div className={styles.rightPage}></div>
          <div className={styles.spine}></div>
          <div className={styles.content}>
            무거운 거 말고 부담스럽지 않은 가벼운 게 최고야!
          </div>
          <div className={styles.contentTwo}>
            씁쓸한 아메리카노 말고 달달한 에이드가 좋아~
          </div>
          <div className={styles.contentThree}>
            혼자 마시는 것보단 당연히 친구들이랑 마셔야지~{" "}
          </div>
        </div>

        <div className={styles.resultCotnainer}>
          <div className={styles.resultAnimal}>
            <Image
              src="/images/otter.svg"
              alt="Logo"
              className={styles.img}
              width={40}
              height={40}
            />
          </div>
          <h2 className={styles.resultTitle}>
            혼자 있는 걸 좋아하는 고독한 당신
          </h2>
          <div className={styles.resultContent}>
            <div className={styles.resultWine}>
              <Image
                src="/images/wine.svg"
                alt="Logo"
                className={styles.img}
                width={40}
                height={40}
              />
            </div>
            <div className={styles.resultExplain}>
              <h2 className={styles.resultTitleOne}>
                깊은 풍미의 레드와인으로 분위기를 잡아보는 건 어떠신가요? <br />{" "}
                짙은 과육이 당신의 스트레스를 천천히 녹여줄거에요.
              </h2>
              <h2 className={styles.resultTitleTwo}>
                까베르네 소비뇽, 리오하를 추천합니다!
              </h2>
            </div>
          </div>

          <div className={styles.shareContainer}>
            <h3 className={styles.share}>
              친구들에게 결과를 공유해보세요!
              <FontAwesomeIcon
                icon={faShareFromSquare}
                className={styles.shareIcon}
              />
            </h3>
          </div>
        </div>

        <div className={styles.suggestionCotnainer}>
          <h2 className={styles.suggetionTitle}>
            와인의 세계를
            <br /> 더 알고 싶지 않으세요?
          </h2>
          <div className={styles.buttonContainer}>
            <button className={`btn outline ${styles.memberLogin}`}>
              회원 로그인
            </button>
            <button className={`btn outline ${styles.nonMemberLogin}`}>
              비회원 회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
