import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { userTokenState } from "@/recoil/atoms";
import styles from "./post-create.module.css";

export default function PostDetail() {
  const router = useRouter();
  const { winebarId, winebarName, winebarAddress, region, postId } =
    router.query;
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [winebar, setWinebar] = useState(null);
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [headcount, setHeadcount] = useState("");
  const [amOrPm, setAmOrPm] = useState("AM");
  const [time, setTime] = useState("");
  const [contents, setContents] = useState("");
  const [newWinebarName, setNewWinebarName] = useState(null);
  const [newWinebarAddress, setNewWinebarAddress] = useState(null);

  useEffect(() => {
    const getNickname = async () => {
      try {
        const res = await axios.get(`https://warendy.shop/members`, {
          headers: {
            Authorization: `${userToken}`,
          },
        });
        setNickname(res.data.data.nickname);
      } catch (error) {
        console.error("Error fetching winebar data:", error);
      }
    };
    getNickname();
  }, []);
  const postWinebarData = async () => {
    try {
      const res = await axios.post(
        `https://warendy.shop/boards/winebars?winebar-id=${winebarId}`,
        {
          memberId: 1,
          name: name,
          nickname: nickname,
          date: date.toISOString().split("T")[0],
          headcount: headcount,
          contents: contents,
          time: time + amOrPm,
          region: region,
        },
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );
      console.log(res);
      // 게시글 작성이 성공하면 페이지 이동
      router.push(`/post/post`);
    } catch (error) {
      console.error("Error posting winebar data:", error);
    }
  };
  const putWinebarData = async () => {
    try {
      const res = await axios.put(
        `https://warendy.shop/boards/${postId}`,
        {
          memberId: 1,
          name: name,
          nickname: nickname,
          date: date.toISOString().split("T")[0],
          headcount: headcount,
          contents: contents,
          time: time + amOrPm,
          region: region,
        },
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );
      console.log(res);
      // 게시글 수정이 성공하면 페이지 이동
      router.push(`/posts/${postId}`);
    } catch (error) {
      console.error("Error editing winebar data:", error);
    }
  };

  useEffect(() => {
    if (postId) {
      const fetchPostData = async () => {
        try {
          console.log(postId);
          const { data } = await axios.get(
            `https://warendy.shop/boards/${postId}/detail`,
            {
              headers: {
                Authorization: `${userToken}`,
              },
            }
          );
          console.log(data);
          setName(data.name);
          setDate(new Date(data.date));
          setHeadcount(data.headcount);
          setContents(data.contents);
          setAmOrPm(data.time.slice(-2));
          setTime(parseInt(data.time.slice(0, -2)));
          setNewWinebarName(data.winebarName);
          setNewWinebarAddress(data.winebarAddress);
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      };
      fetchPostData();
    }
  }, []);

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
      <h2 className={styles.top}>{postId ? "게시글 수정" : "게시글 작성"}</h2>
      <div className="inner">
        <div className={styles.storeTitle}>
          {winebarName ? winebarName : newWinebarName}
          {winebarAddress ? winebarAddress : newWinebarAddress}
        </div>
        <div className={styles.formWrap}>
          <div className={styles.formRow}>
            <div className={styles.flexContainer}>
              <label className={styles.titleName}>제목</label>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{
                  width: "41rem",
                  height: "7.8rem",
                  border: "1px solid",
                  fontSize: "2.5rem",
                  paddingLeft: "4rem",
                }}
              />
            </div>
            <div className={styles.flexContainer}>
              <label className={styles.titleName}>시간</label>
              <div className={styles.timeContainer}>
                <select
                  value={amOrPm}
                  onChange={(e) => setAmOrPm(e.target.value)}
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
            <div className={styles.flexContainer}>
              <label className={styles.titleName}>날짜</label>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                customInput={
                  <input
                    className={styles.datePickerInput}
                    style={{
                      width: "41rem",
                      height: "7.8rem",
                      border: "1px solid",
                      fontSize: "2.5rem",
                      paddingLeft: "4rem",
                    }}
                  />
                }
              />
            </div>
            <div className={styles.flexContainer}>
              <label className={styles.titleName}>인원</label>
              <input
                type="number"
                placeholder="인원수를 입력하세요"
                value={headcount}
                onChange={(e) => {
                  setHeadcount(e.target.value);
                }}
                style={{
                  width: "41rem",
                  height: "7.8rem",
                  border: "1px solid",
                  fontSize: "2.5rem",
                  paddingLeft: "4rem",
                }}
              />
            </div>
          </div>
          <div className={styles.contentsRow}>
            <label className={styles.titleName}>
              모임에 참여하도록 글을 써보세요 !
            </label>
            <textarea
              className={styles.textareaBox}
              placeholder="글을 입력하세요"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <button
            className={styles.button}
            onClick={() => {
              if (12 < time || 1 > time) {
                alert("");
                return;
              }
              if (postId) putWinebarData();
              postWinebarData();
            }}
          >
            글 올리기
          </button>
        </div>
      </div>
    </div>
  );
}
