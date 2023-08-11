import React, { useState } from "react";
import styles from "./landing-page.module.css";
import Image from "next/image";
import LandingText from "./landing-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare, faY, faN, faForward } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  const [textIndex, setTextIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [imagePath, setImagePath] = useState("");
  const [resultTitle, setResultTitle] = useState("");
  const [resultDescription, setResultDescription] = useState("");
  const [resultTitleTwo, setResultTitleTwo] = useState("");

  const texts = [
    "좀 가볍게 먹을 수 있는 와인이 좋아!",
    "씁쓸한 아메리카노 말고 달달한 에이드가 최고야~",
    "혼자 맛있는 것보단 당연히 다 같이 마셔야지!",
  ];

  const handleYesClick = () => {
    setButtonClickCount(buttonClickCount + 1);
    if (textIndex < texts.length - 1) {
      setAnswers([...answers, "yes"]);
      setTextIndex(textIndex + 1);
    } else {
      calculateResult([...answers, "yes"]);
    }
  };

  const handleNoClick = () => {
    setButtonClickCount(buttonClickCount + 1);
    setAnswers([...answers, "no"]);
    if (textIndex < texts.length - 1) {
      setTextIndex(textIndex + 1);
    } else {
      calculateResult([...answers, "no"]);
    }
  };

  const calculateResult = (finalAnswers) => {
    const yesCount = finalAnswers.filter((answer) => answer === "yes").length;
    const noCount = finalAnswers.filter((answer) => answer === "no").length;

    if (yesCount >= 3) {
      setImagePath("/images/cat.svg");
      setResultTitle("남들과 격하게 한탕하고 싶은 당신!");
      setResultDescription("어쩌고저쩌고");
      setResultTitleTwo("어쩌고 와인을 추천합니다!");
      console.log('You selected "Yes" three or more times.');
    } else if (noCount >= 3) {
      setImagePath("/images/otter.svg");
      setResultTitle("혼자 있는 것을 좋아하는 당신!");
      setResultDescription("깊은 맛의 레드 와인으로 분위기를 조성해보는 것은 어떨까요? 짙은 과육이 당신의 스트레스를 천천히 녹여줄 거예요.");
      setResultTitleTwo("Cabernet Sauvignon, Rioja를 추천합니다!");
      console.log('You selected "No" three or more times.');
    } else {
      console.log('You selected "No" less than three times.');
    }
  };

  const [showSuggestion, setShowSuggestion] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <div className={styles.book} style={{ display: buttonClickCount >= 3 ? "none" : "block" }}>
          <div className={styles.leftPage}></div>
          <div className={styles.rightPage}></div>
          <div className={styles.spine}></div>
          <LandingText text={texts[textIndex]} />
          <div className={styles.btnContainer}>
            <button className={styles.Btn} onClick={handleYesClick} disabled={textIndex > texts.length - 1}>
              <FontAwesomeIcon icon={faY} className={styles.icon} />
            </button>
            <button className={styles.Btn} onClick={handleNoClick} disabled={textIndex > texts.length - 1}>
              <FontAwesomeIcon icon={faN} className={styles.icon} />
            </button>
          </div>
        </div>

        <div className={styles.resultContainer} style={{ display: buttonClickCount >= 3 ? "flex" : "none" }}>
          <div className={styles.resultAnimal}>
            <Image src={imagePath} alt="Logo" className={styles.img} width={40} height={40} />
          </div>
          <h2 className={styles.resultTitle}>{resultTitle}</h2>
          <div className={styles.resultContent}>
            <div className={styles.resultWine}>
              <Image src="/images/wine.svg" alt="Logo" className={styles.img} width={40} height={40} />
            </div>
            <div className={styles.resultExplain}>
              <h2 className={styles.resultTitleOne}>{resultDescription}</h2>
              <h2 className={styles.resultTitleTwo}>{resultTitleTwo}</h2>
            </div>
          </div>
        </div>
        <div className={styles.nextBtn} onClick={() => setShowSuggestion(true)}>
          <FontAwesomeIcon icon={faForward} className={styles.icon} />
        </div>

        <div className={styles.shareContainer} style={{ display: buttonClickCount >= 3 ? "flex" : "none" }}>
          <h3 className={styles.share}>
            친구들에게 결과를 공유해보세요!
            <FontAwesomeIcon icon={faShareFromSquare} className={styles.shareIcon} />
          </h3>
        </div>
      </div>

      <div className={styles.suggestionCotnainer} style={{ display: showSuggestion ? "flex" : "none" }}>
        <h2 className={styles.suggetionTitle}>
          와인의 세계를
          <br /> 더 알고 싶지 않으세요?
        </h2>
        <div className={styles.buttonContainer}>
          <button className={`btn outline ${styles.memberLogin}`}>회원 로그인</button>
          <button className={`btn outline ${styles.nonMemberLogin}`}>비회원 회원가입</button>
        </div>
      </div>
    </div>
  );
}
