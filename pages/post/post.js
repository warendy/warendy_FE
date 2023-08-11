import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "../post/post.module.css";
import axios from "axios";

const seoulOptions = ["강남구", "동작구", "서초구", "관악구", "강북구"];
const gyeonggiOptions = ["용인시", "수원시", "성남시", "안양시", "고양시"];

export default function PostSearch() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    const filteredResults = searchResults.filter((post) =>
      post.name.includes(searchInput)
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <h2 className="top">동행 게시글</h2>
      <div className="inner">
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
        </div>
      </div>
    </>
  );
}
