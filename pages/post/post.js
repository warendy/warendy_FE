import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "../post/post.module.css";
import axios from "axios";

const PostSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://warendy.shop/boards");
        const data = response.data;
        setSearchResults(data);
        setFilteredResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const updatedResults = searchResults.filter((post) =>
      post.title.includes(searchInput)
    );
    setFilteredResults(updatedResults);
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

        <ul className={styles.list}>
          {filteredResults.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PostSearch;
