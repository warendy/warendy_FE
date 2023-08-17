import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userTokenState } from "@/recoil/atoms";
import { useRouter } from "next/router";
import styles from "./postid.module.css";

const PostId = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [nickname, setNickname] = useState("");

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

  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {
        try {
          console.log(postId);
          const response = await axios.get(
            `https://warendy.shop/boards/${postId}/detail`,
            {
              headers: {
                Authorization: `${userToken}`,
              },
            }
          );
          const postData = response.data;
          console.log(response.data);
          setPost(postData);
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      }
    };

    fetchPostData();
  }, [postId, userToken]);

  const addToParticipants = async () => {
    try {
      const response = await axios.put(
        `https://warendy.shop/boards/participants?board-id=${postId}`,
        {},
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );
      // API 요청 성공 시 수행할 작업
      console.log("API 요청 성공:", response.data);
      console.log(response);
      // 게시글 작성이 성공하면 페이지 이동
      router.push(`../post/post`);
    } catch (error) {
      // API 요청 실패 시 수행할 작업
      console.error("Error fetching winebar data:", error);
    }
  };

  const removeFromParticipants = async () => {
    try {
      const response = await axios.put(
        `https://warendy.shop/boards/participants-out?board-id=${postId}`,
        {},
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );
      // API 요청 성공 시 수행할 작업
      console.log("API 요청 성공:", response.data);
      console.log(response);
      // 게시글 작성이 성공하면 페이지 이동
      router.push(`../post/post`);
    } catch (error) {
      // API 요청 실패 시 수행할 작업
      console.error("Error fetching winebar data:", error);
    }
  };
  if (!post) {
    return <div>Loading...</div>;
  }

  const deletePost = async () => {
    if (postId) {
      try {
        console.log(postId);
        const response = await axios.delete(
          `https://warendy.shop/boards/${postId}`,
          {
            headers: {
              Authorization: `${userToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error deleting winebar data:", error);
      }
    }
  };
  const handleEditPost = () => {
    router.push(`/post/post-create?postId=${postId}`);
  };
  const handleDeletePost = () => {
    if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      deletePost();
      router.push("/post/post");
    }
  };

  return (
    <div className={styles.contents}>
      <h2 className={styles.top}>동행 게시글</h2>
      <div className="inner">
        <div className={styles.storeTitle}>
          {post.winebarName}
          {post.winebarAddress}
        </div>
        <div className={styles.formWrap}>
          <div className={styles.formRow}>
            <div className={styles.flexContainer}>
              <label className={styles.titleName}>제목</label>
              <p
                style={{
                  width: "41rem",
                  height: "7.8rem",
                  border: "1px solid",
                  fontSize: "2.5rem",
                  paddingLeft: "4rem",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {post.name}
              </p>
            </div>
            <div className={styles.flexContainer}>
              <label className={styles.titleName}>시간</label>
              <div className={styles.timeContainer}>
                <p
                  style={{
                    width: "41rem",
                    height: "7.8rem",
                    border: "1px solid",
                    fontSize: "2.5rem",
                    paddingLeft: "4rem",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {post.time}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.flexContainer}>
              <label className={styles.titleName}>날짜</label>
              <p
                className={styles.datePickerInput}
                style={{
                  width: "41rem",
                  height: "7.8rem",
                  border: "1px solid",
                  fontSize: "2.5rem",
                  paddingLeft: "4rem",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {post.date}
              </p>
            </div>
            <div className={styles.flexContainer}>
              <label className={styles.titleName}>인원</label>
              <p
                style={{
                  width: "41rem",
                  height: "7.8rem",
                  border: "1px solid",
                  fontSize: "2.5rem",
                  paddingLeft: "4rem",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {post.headcount}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contentsRow}>
          <p className={styles.textareaBox}>{post.contents}</p>
        </div>
        <div className={styles.btn}>
          {nickname !== post.nickname &&
          !post.participants.includes(nickname) ? (
            <button
              className={styles.button}
              onClick={() => {
                if (!post) {
                  alert("게시글 정보를 불러오는 중입니다.");
                  return;
                }
                addToParticipants();
              }}
            >
              동행 참여하기
            </button>
          ) : null}
          {nickname !== post.nickname &&
          post.participants.includes(nickname) ? (
            <button
              className={styles.button}
              onClick={() => {
                if (!post) {
                  alert("게시글 정보를 불러오는 중입니다.");
                  return;
                }
                removeFromParticipants();
              }}
            >
              동행 취소하기
            </button>
          ) : null}
          {nickname === post.nickname ? (
            <>
              <button className={styles.button} onClick={handleEditPost}>
                수정
              </button>
              <button className={styles.button} onClick={handleDeletePost}>
                삭제
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default PostId;
