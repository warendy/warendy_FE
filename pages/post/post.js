import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< Updated upstream
import { faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";
=======
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
>>>>>>> Stashed changes
import styles from "../post/post.module.css";
import axios from "axios";

<<<<<<< Updated upstream
const seoulOptions = ["강남구", "동작구", "서초구", "관악구", "강북구"];
const gyeonggiOptions = ["용인시", "수원시", "성남시", "안양시", "고양시"];

=======
>>>>>>> Stashed changes
export default function PostSearch() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://warendy.shop/boards/all");
        const postData = response.data.content;
        console.log(postData);
        setSearchResults(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
<<<<<<< Updated upstream
    // 검색 로직
    const filteredResults = searchResults.filter((post) =>
      post.name.includes(searchInput)
=======
    const filteredResults = dummyPosts.filter((post) =>
      post.title.includes(searchInput)
>>>>>>> Stashed changes
    );
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    if (selectedPost) {
      // 게시글 불러오는 API 호출
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

  return (
    <>
      <h2 className="top">동행 게시글</h2>
      <div className="inner">
<<<<<<< Updated upstream
        <div className={styles.postWrap}>{/* ... (이전 코드) */}</div>

        {/* 검색 결과 표시 */}
        <ul className={styles.list}>
          {searchResults.map((post) => (
            <li key={post.name}>
              <Link href={`/posts/detail?postId=${post.boardId}`}>
                {post.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 글쓰기 버튼 */}
        <div className={styles.writeBtnContainer}>
          <Link href="/post/post-create">
            <button className={styles.writeBtn}>
              <FontAwesomeIcon icon={faEdit} /> 글쓰기
            </button>
          </Link>
=======
        <div className={styles.postWrap}>
          {/* 셀렉트 박스 */}
          <div className={styles.selectWrapper}>
            <FontAwesomeIcon icon={faCaretDown} className={styles.selectIcon} />
            <select
              className={styles.select}
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">지역별</option>
              <option value="서울">서울시</option>
              <option value="경기">경기도</option>
              <option value="충북">충청북도</option>
              <option value="충남">충청남도</option>
              <option value="전북">전라북도</option>
              <option value="전남">전라남도</option>
              <option value="경북">경상북도</option>
              <option value="경남">경상남도</option>
              <option value="강원">강원도</option>
              <option value="부산">부산광역시</option>
              <option value="인천">인천광역시</option>
              <option value="대구">대구광역시</option>
              <option value="광주">광주광역시</option>
              <option value="제주">제주도</option>
            </select>
            {selectedLocation && (
              <select
                className={styles.select}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {selectedOption.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            <button className={styles.myBtn}>내가 쓴 글</button>
          </div>
          <ul className={styles.list}>
            {searchResults.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.id}`}
                  onClick={() => setSelectedPost(post.id)}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.listWrap}>
          <ul className={styles.listTitle}>
            <li>글 번호</li>
            <li>제목</li>
            <li>작성자</li>
            <li>지역</li>
            <li>작성일</li>
          </ul>
>>>>>>> Stashed changes
        </div>
      </div>
    </>
  );
}
