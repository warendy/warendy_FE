import React, { useState } from "react";
import styles from "../post/Post.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const seoulOptions = ["강남구", "동작구", "서초구", "관악구", "강북구"];
const gyeonggiOptions = ["용인시", "수원시", "성남시", "안양시", "고양시"];

// 가상의 묵시적 게시글 데이
const dummyPosts = [
  { id: 1, title: "게시글 1", location: "강남구" },
  { id: 2, title: "게시글 2", location: "동작구" },
  { id: 3, title: "게시글 3", location: "서초구" },
  // ... 추가 게시글 데이터
];

export default function PostSearch() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);

    if (location === "서울") {
      setSelectedOption(seoulOptions);
    } else if (location === "경기") {
      setSelectedOption(gyeonggiOptions);
    } else {
      setSelectedOption([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    // 검색 로직
    const filteredResults = dummyPosts.filter((post) =>
      post.title.includes(searchInput)
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <h2 className="top">동행 게시글</h2>
      <div className="inner">
        <div className={styles.postWrap}>
          <select
            className={styles.select}
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">지역별</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
          </select>

          {selectedLocation && (
            <select className={styles.select} value={selectedOption}>
              {selectedOption.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          <input
            type="text"
            placeholder="검색어 입력"
            value={searchInput}
            onChange={handleInputChange}
            className={styles.Input}
          />

          <button className={styles.button} onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>

          <button className={styles.myBtn}>내가 쓴 글</button>
        </div>

        {/* 검색 결과 표시 */}
        <ul className={styles.list}>
          {searchResults.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
