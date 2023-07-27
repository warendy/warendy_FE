import React, { useState } from "react";
import styles from "../search/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  // 각 버튼에 대한 상태를 독립적으로 관리하기 위한 state 변수들ㅇ
  const [showMap1, setShowMap1] = useState(false);
  const [showMap2, setShowMap2] = useState(false);
  const [showMap3, setShowMap3] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  const handleToggleMap1 = () => {
    setShowMap1(!showMap1);
  };

  const handleToggleMap2 = () => {
    setShowMap2(!showMap2);
  };

  const handleToggleMap3 = () => {
    setShowMap3(!showMap3);
  };

  const handleSearchLocation = (e) => {
    setSearchLocation(e.target.value);
  };

  return (
    <>
      <h2 className="top">주변 와인가게 찾기</h2>
      <div className="inner">
        <div className={styles.searchWrap}>
          <div>
            <label>지역 검색:</label>
            <input
              type="text"
              placeholder="지역을 입력하세요"
              value={searchLocation}
              onChange={handleSearchLocation}
            />
            <button className={styles.button}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <h3 className={styles.title}>주변 와인바 리스트</h3>
          <ul>
            <li>
              와인한잔 <button onClick={handleToggleMap1}>+</button>
            </li>
            {showMap1 && (
              <li>
                <div style={{ border: "1px solid black", height: "200px" }}>
                  {/* 카카오맵 지도를 이곳에 추가하면 됩니다 */}
                  카카오맵 지도 표시 영역
                </div>
              </li>
            )}
            <li>
              와인두잔 <button onClick={handleToggleMap2}>+</button>
            </li>
            {showMap2 && (
              <li>
                <div style={{ border: "1px solid black", height: "200px" }}>
                  {/* 카카오맵 지도를 이곳에 추가하면 됩니다 */}
                  카카오맵 지도 표시 영역
                </div>
              </li>
            )}
            <li>
              와인세잔 <button onClick={handleToggleMap3}>+</button>
            </li>
            {showMap3 && (
              <li>
                <div style={{ border: "1px solid black", height: "200px" }}>
                  {/* 카카오맵 지도를 이곳에 추가하면 됩니다 */}
                  카카오맵 지도 표시 영역
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
