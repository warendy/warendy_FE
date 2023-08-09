import React, { useState, useEffect } from "react";
import styles from "../search/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyMap from "../map/my-map";
import axios from "axios";
import { fetchNearbyWineStores } from "@/utlis/api";
import NearbyWineBars from "../map/nearby-winebars";

export default function Search() {
  const [showMapF, setShowMapF] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredWineBars, setFilteredWineBars] = useState([]);
  const [selectedWineBar, setSelectedWineBar] = useState(null); // 변경된 상태 추가
  const [displayedWineBars, setDisplayedWineBars] = useState([]);

  const handleToggleMap1 = () => {
    setShowMapF(!showMapF);
  };

  const handleWineBarClick = (wineBar) => {
    // 이미 있는 와인바인지 확인
    if (!filteredWineBars.some((bar) => bar.name === wineBar.name)) {
      setSelectedWineBar(wineBar);
      setShowMapF(true);

      // 함수형 업데이트를 사용하여 기존의 filteredWineBars 배열과 새로운 와인바를 합쳐서 새로운 배열을 생성
      setFilteredWineBars((prevWineBars) => [...prevWineBars, wineBar]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wineBarsData = await fetchNearbyWineStores(
          userLocation.longitude,
          userLocation.latitude
        );

        setFilteredWineBars(wineBarsData);
      } catch (error) {
        console.error("Error fetching nearby wine stores:", error);
      }
    };

    if (userLocation) {
      fetchData();
    }
  }, [userLocation]);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  };

  useEffect(() => {
    fetchUserLocation();
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
          {userLocation && (
            <>
              <h3 className={styles.title}>주변 와인바 리스트</h3>
              <NearbyWineBars
                userLocation={userLocation}
                wineBars={filteredWineBars}
                onWineBarClick={handleWineBarClick} // 수정된 부분
              />
            </>
          )}
        </div>
      </div>
      {selectedWineBar && showMapF && (
        <div className={styles.map}>
          <MyMap
            kakaoMapApiKey={process.env.KAKAO_MAP_KEY}
            wineBars={[selectedWineBar]}
          />
          <button className={styles.writeButton}>글쓰기</button>
        </div>
      )}
    </>
  );
}
