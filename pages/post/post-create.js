import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { userTokenState } from "@/recoil/atoms";
import styles from "./post.module.css";

const locationOptions = ["강남구", "동작구", "서초구", "관악구", "강북구"];

export default function PostDetail() {
  const router = useRouter();
  const { winebarId } = router.query;
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [winebar, setWinebar] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [headcount, setHeadcount] = useState("");
  const [amOrPm, setAmOrPm] = useState("");
  const [time, setTime] = useState("");
  const [contents, setContents] = useState("");

  const postWinebarData = async () => {
    try {
      console.log(userToken);
      const res = await axios.post(
        `https://warendy.shop/boards/winebars?winebar-id=${winebarId}`,
        {
          memberId: 1,
          name: name,
          nickname: "이름",
          date: date.toISOString().split("T")[0],
          wineName: "와인병 이름",
          headcount: headcount,
          contents: "게시물 글",
          time: time + amOrPm,
        },
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error("Error fetching winebar data:", error);
    }
  };

  useEffect(() => {
    // fetchWinebarData();
  }, [winebarId]);

  const handleDateChange = (e) => {
    // TODO: Handle the selected date
    const dateString1 = new Date().toISOString().split("T")[0];
    const dateString2 = e.toISOString().split("T")[0];
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    if (date1 <= date2) setDate(e);
    else {
      alert("다른날을 선택하세요.");
    }
  };

  // if (!winebar) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={styles.container}>
      <h2 className="top">와인바 상세 정보</h2>
      <div className="inner">
        {/* <div>
          <h1>{winebar.name}</h1>
          {winebar.description && <p>{winebar.description}</p>}
        </div> */}

        <div className={styles.formWrap}>
          {" "}
          {/* 모듈 CSS 클래스를 적용합니다. */}
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <label>제목</label>
              {/* <select>
            {locationOptions.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select> */}
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{
                  width: "41rem", // 원하는 너비 값
                  height: "7.8rem", // 원하는 높이 값
                  // 추가로 원하는 스타일 속성들을 지정할 수 있습니다.
                }}
              />
            </div>
            <div className={styles.flexContainer}>
              <label>시간</label>
              <div className={styles.timeContainer}>
                <select
                  value={amOrPm}
                  onChange={(e) => handleAmPmChange(e.target.value)}
                  className={styles.amPmSelect}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <input
                  type="number"
                  placeholder="시간을 입력하세요"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={styles.timeInput}
                />
              </div>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <label>날짜</label>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                customInput={
                  <input
                    className={styles.datePickerInput}
                    style={{
                      width: "41rem",
                      height: "7.8rem",
                      // 원하는 추가 스타일을 여기에 추가할 수 있습니다.
                    }}
                  />
                }
              />
            </div>
            <div className={styles.formColumn}>
              <label>인원</label>
              <input
                type="number"
                placeholder="인원수를 입력하세요"
                value={headcount}
                onChange={(e) => {
                  setHeadcount(e.target.value);
                }}
                style={{
                  width: "41rem", // 원하는 너비 값
                  height: "7.8rem", // 원하는 높이 값
                  // 추가로 원하는 스타일 속성들을 지정할 수 있습니다.
                }}
              />
            </div>
          </div>
          <div className={styles.contentsRow}>
            <label>모임에 참여하도록 글을 써보세요 !</label>
            <textarea
              className={styles.textareaBox} // 클래스명 추가
              placeholder="글을 입력하세요"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </div>
        </div>

        <button
          className={styles.button}
          onClick={() => {
            if (12 < time || 1 > time) {
              alert("");
              return;
            }
            postWinebarData();
          }}
        >
          post
        </button>
      </div>
    </div>
  );
}
