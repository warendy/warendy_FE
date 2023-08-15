import React, { useState, useEffect, useRef } from "react";
import styles from "./new-landing.module.scss";
import Image from "next/image";
import { getRecommendedWineList } from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare, faForward } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { bodyState, tanninState, acidityState, dryState } from "@/recoil/winetype";

export default function NewLanding() {
  const [hovered, setHovered] = useState(false);
  const [showNewElement, setShowNewElement] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const newElementRef = useRef(null);
  const [recommendedWine, setRecommendedWine] = useState(null);
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [body, setBody] = useRecoilState(bodyState);
  const [dry, setDry] = useRecoilState(dryState);
  const [tannin, setTannin] = useRecoilState(tanninState);
  const [acidity, setAcidity] = useRecoilState(acidityState);

  const [likesCount, setLikesCount] = useState(0);
  const [soSoCount, setSoSoCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const router = useRouter();

  console.log("바디= " + body, "드라이= " + dry, "탄닌= " + tannin, "산미= " + acidity);
  const handleSkipClick = () => {
    router.push("/");
  };

  const texts = [
    "사람들과 먹는 것보단 혼자 취하고 싶다~",
    "씁쓸한 것보단 달달한 와인이 최고지~",
    "난 살짝 떫은 맛이 좋아!",
    "난 산미가 있는 와인이 좋아.",
  ];

  const handleOptionClick = (option) => {
    setButtonClickCount((prevCount) => prevCount + 1);
    if (currentIndex == 0) {
      if (option === "like") {
        setBody(3);
      } else if (option === "soSo") {
        setBody(2);
      } else if (option === "dislike") {
        setBody(1);
      }
    }
    if (currentIndex == 1) {
      if (option === "like") {
        setDry(1);
      } else if (option === "soSo") {
        setDry(2);
      } else if (option === "dislike") {
        setDry(3);
      }
    }
    if (currentIndex == 2) {
      if (option === "like") {
        setTannin(3);
      } else if (option === "soSo") {
        setTannin(2);
      } else if (option === "dislike") {
        setTannin(1);
      }
    }
    if (currentIndex == 3) {
      if (option === "like") {
        setAcidity(3);
      } else if (option === "soSo") {
        setAcidity(2);
      } else if (option === "dislike") {
        setAcidity(1);
      }
    }
    if (currentIndex < texts.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (buttonClickCount >= 3) {
      (async () => {
        try {
          const wineData = await getRecommendedWineList();
          let filteredWines;

          if (likesCount === 3) {
            filteredWines = wineData.filter((wine) => wine.body >= 2 && wine.tannin <= 2);
          } else if (soSoCount === 3) {
            filteredWines = wineData;
          } else if (dislikeCount === 3) {
            filteredWines = wineData.filter((wine) => wine.body <= 2 && wine.dry <= 2 && wine.tannin <= 2);
          } else {
            filteredWines = wineData.filter((wine) => wine.body >= 2);
          }

          const shuffledWines = filteredWines.sort(() => 0.5 - Math.random());
          const selectedWines = shuffledWines.slice(0, 2);

          setRecommendedWine(selectedWines);

          console.log("Selected Wines:", selectedWines);
        } catch (error) {
          console.error("Failed to fetch recommended wine:", error);
        }
      })();
    }
  }, [buttonClickCount, likesCount, soSoCount, dislikeCount]);

  return (
    <div className={styles.container}>
      <div className={styles.haus}>
        <figure className={styles.book} style={{ display: buttonClickCount >= 4 ? "none" : "flex" }}>
          <ul className={styles.hardcoverBack}>
            <li></li>
            <li></li>
          </ul>

          <ul className={styles.hardcoverFront}>
            <li>
              <div className={styles.coverDesign}></div>
            </li>
            <li></li>
          </ul>

          <ul className={styles.page}>
            <li className={styles.firstPage}></li>
            <li className={styles.secondPage}></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li className={`${styles.lastButOnePage} ${styles.leftPageCon}`}>
              <div className={styles.leftPage}>{texts[currentIndex]}</div>
            </li>

            <li
              className={`${styles.lastOnePage} ${styles.rightPageCon}`}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => {
                setHovered(false);
                setShowNewElement(false);
              }}
            >
              <div ref={newElementRef} className={`${styles.newElement} ${hovered ? styles.animate : ""}`}>
                <h2>답변을 골라주세요!</h2>
                <div className={styles.like} onClick={() => handleOptionClick("like")}>
                  너무 좋아!
                </div>
                <div className={styles.soSo} onClick={() => handleOptionClick("soSo")}>
                  그냥 그래.
                </div>
                <div className={styles.disLike} onClick={() => handleOptionClick("dislike")}>
                  난 별로야!
                </div>
              </div>
            </li>
          </ul>

          <ul className={styles.bookSpine}>
            <li></li>
            <li></li>
          </ul>
        </figure>
        <div className={styles.resultContainer} style={{ display: buttonClickCount >= 4 ? "flex" : "none" }}>
          <div className={styles.resultAnimal}>
            <Image
              src={
                dislikeCount === 4
                  ? "/images/cat.svg"
                  : soSoCount === 4
                  ? "/images/quokka.svg"
                  : likesCount === 4
                  ? "/images/otter.svg"
                  : "/images/quokka.svg"
              }
              alt="Logo"
              className={styles.img}
              width={40}
              height={40}
            />
          </div>
          <h2 className={styles.resultTitle}>
            {likesCount === 3
              ? "고독한 시간을 즐기고 싶은 당신"
              : soSoCount === 3
              ? "이제 와인의 세계로 입문하려는 당신"
              : dislikeCount === 3
              ? "광란의 파티에 흠뻑 빠지고 싶은 당신"
              : "이제 와인의 세계로 입문하려는 당신"}
          </h2>
          <div className={styles.resultContent}>
            <div className={styles.resultWine}>
              {recommendedWine && recommendedWine.length > 0 && recommendedWine[0].picture && (
                <Image src={recommendedWine[0].picture} alt="Recommended Wine 1" className={styles.img} width={40} height={40} />
              )}
            </div>
            <div className={styles.resultWine}>
              {recommendedWine && recommendedWine.length > 1 && recommendedWine[1].picture && (
                <Image src={recommendedWine[1].picture} alt="Recommended Wine 2" className={styles.img} width={40} height={40} />
              )}
            </div>
            <div className={styles.resultExplain}>
              <h2 className={styles.resultTitleOne}>
                {dislikeCount === 3 ? (
                  <>
                    좋은 사람들과 함께
                    <br />
                    오랜 시간 와인을 음미해보세요.
                    <br />
                    호불호 없는 와인을 추천드립니다.
                  </>
                ) : (
                  <>
                    깊은 풍미의 와인으로
                    <br />
                    하루의 스트레스를 날려보세요.
                    <br />
                    짙은 바디감이 특징입니다.
                  </>
                )}
              </h2>
              <h2 className={styles.resultTitleTwo}>
                당신만의 와인을
                <br />
                와인컬렉션에 담아보세요!
              </h2>
            </div>
          </div>
          <div className={styles.nextBtn} onClick={() => setShowSuggestion(true)}>
            <FontAwesomeIcon icon={faForward} className={styles.icon} />
          </div>
          <div className={styles.shareContainer} style={{ display: buttonClickCount >= 3 ? "flex" : "none" }}>
            <h3 className={styles.share}>
              친구들에게 결과를 공유해보세요!
              <FontAwesomeIcon icon={faShareFromSquare} className={styles.shareIcon} style={{ backgroundColor: "transparent" }} />
            </h3>
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
        <div className={styles.skipContainer} style={{ display: buttonClickCount >= 4 ? "none" : "block" }}>
          <button onClick={handleSkipClick}>SKIP</button>
        </div>
      </div>
    </div>
  );
}
