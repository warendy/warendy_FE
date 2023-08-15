import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import styles from "../post/post.module.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userTokenState } from "@/recoil/atoms";

export default function PostSearch() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [myPostsOnly, setMyPostsOnly] = useState(false);
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [myPostsButtonActive, setMyPostsButtonActive] = useState(false);
  const [participantPostsButtonActive, setParticipantPostsButtonActive] =
    useState(false);

  const fetchPosts = async (option, pageNum) => {
    try {
      const response = await axios.get(
        `https://warendy.shop/boards${
          option === "my" ? "" : `/all?page=${pageNum}`
        }`,
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );
      const postData = response.data.content;
      console.log(response.data);
      setTotalPages(response.data.totalPages); // totalPages 설정
      if (option !== "participant") setSearchResults(postData);
      else {
        setSearchResults(
          postData.filter((el) => el.participants.includes(nickname))
        );
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts("all", page);
  }, [page]);

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

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const filteredResults = dummyPosts.filter((post) =>
      post.title.includes(searchInput)
    );
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    if (selectedPost) {
      fetch(`https://example-api.com/posts/${selectedPost}`)
        .then((response) => response.json())
        .then((data) => {
          // 불러온 게시글 데이터를 처리하는 로직
          console.log("Loaded Post:", data);
        })
        .catch((error) => {
          console.error("Error fetching post data:", error);
        });
    }
  }, [selectedPost]);

  const filterPostsByLocation = (posts) => {
    console.log(posts);
    if (!selectedLocation) {
      // 지역을 선택하지 않은 경우 모든 게시글 반환
      return posts;
    }
    // 선택한 지역에 맞는 게시글만 필터링하여 반환
    return posts.filter((post) => post.region === selectedLocation);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // 다음 버튼 클릭 핸들러
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };
  return (
    <>
      <h2 className={styles.top}>동행 게시글</h2>
      <div className="inner">
        <div className={styles.postWrap}>
          <div className={styles.selectWrapper}>
            <FontAwesomeIcon icon={faCaretDown} className={styles.selectIcon} />
            <select
              className={styles.select}
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">지역별</option>
              <option value="서울">서울시</option>
              <option value="경기">경기</option>
              <option value="충북">충청북도</option>
              <option value="충남">충청남도</option>
              <option value="전북">전라북도</option>
              <option value="전남">전라남도</option>
              <option value="경북">경상북도</option>
              <option value="경남">경상남도</option>
              <option value="강원도">강원도</option>
              <option value="부산">부산광역시</option>
              <option value="인천">인천광역시</option>
              <option value="대구">대구광역시</option>
              <option value="광주">광주광역시</option>
              <option value="제주">제주도</option>
            </select>

            <button
              className={`${styles.myBtn} ${
                myPostsButtonActive ? styles.active : ""
              }`}
              onClick={() => {
                setMyPostsOnly(!myPostsOnly);
                fetchPosts("my");
                setMyPostsButtonActive(!myPostsButtonActive);
                setParticipantPostsButtonActive(false);
              }}
            >
              내가 쓴 글
            </button>

            <button
              className={`${styles.myBtn} ${
                participantPostsButtonActive ? styles.active : ""
              }`}
              onClick={() => {
                fetchPosts("participant");
                setParticipantPostsButtonActive(!participantPostsButtonActive);
                setMyPostsButtonActive(false);
              }}
            >
              참여중인 동행
            </button>
          </div>
        </div>
        <div className={styles.listWrap}>
          <ul className={styles.listTitle}>
            <li style={{ width: "15%" }}>글 번호</li>
            <li style={{ width: "20%" }}>제목</li>
            <li style={{ width: "10%" }}>작성자</li>
            <li style={{ width: "10%" }}>지역</li>
            <li style={{ width: "10%" }}>작성일</li>
          </ul>
          <ul className={styles.list}>
            {filterPostsByLocation(searchResults).length === 0 ? (
              <p className={styles.nopost}>게시물이 없습니다.</p>
            ) : (
              filterPostsByLocation(searchResults).map((post) => (
                <li key={post.boardId} className={styles.liststyle}>
                  <Link
                    href={`/posts/${post.boardId}`}
                    onClick={() => setSelectedPost(post.boardId)}
                  >
                    <div className={styles.listbox}>
                      <div>{post.boardId}</div>
                      <div>{post.name}</div>
                      <div>{post.nickname}</div>
                      <div>{post.region}</div>
                      <div>{post.date}</div>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} className={styles.iconButton}>
              &lt;
            </button>
            <span>
              {" "}
              {[...Array(totalPages)].map((_, index) => (
                <span key={index}>
                  <button
                    className={`${styles.pageButton} ${
                      page === index ? styles.currentPage : ""
                    }`}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                  {index < totalPages - 1 && <span> </span>}
                </span>
              ))}
            </span>
            <button onClick={handleNextPage} className={styles.iconButton}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
