import React, { useState, useEffect } from "react";
import styles from "../search/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyMap from "../map/my-map";
import axios from "axios";
import { fetchNearbyWineStores } from "@/utils/api";

//시작
export default function Search() {
  const [showMapF, setShowMapF] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [wineBars, setWineBars] = useState([]);

  const handleToggleMap1 = () => {
    setShowMapF(!showMapF);
  };

  useEffect(() => {
    fetchNearbyWineStores(37.0, 128.0);
  }, []);

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
            {showMapF && (
              <li>
                <MyMap
                  kakaoMapApiKey={process.env.KAKAO_MAP_KEY}
                  wineBars={wineBars}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
