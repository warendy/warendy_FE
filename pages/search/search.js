import React, { useState, useEffect } from "react";
import styles from "../search/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyMap from "../map/my-map";

export default function Search() {
  // 각 버튼에 대한 상태를 독립적으로 관리하기 위한 state 변수들
  const [showMapF, setShowMapF] = useState(false);
  const [showMapS, setShowMapS] = useState(false);
  const [showMapT, setShowMapT] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  const handleToggleMap1 = () => {
    setShowMapF(!showMapF);
  };

  const handleToggleMap2 = () => {
    setShowMapS(!showMapS);
  };

  const handleToggleMap3 = () => {
    setShowMapT(!showMapT);
  };

  const handleSearchLocation = (e) => {
    setSearchLocation(e.target.value);
  };
  const kakaoMapApiKey = process.env.VITE_KAKAO_MAP_API_KEY;

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
            {showMapF && (
              <li>
                <MyMap kakaoMapApiKey={kakaoMapApiKey} />
              </li>
            )}
            <li>
              와인두잔 <button onClick={handleToggleMap2}>+</button>
            </li>
            {showMapS && (
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
            {showMapT && (
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
