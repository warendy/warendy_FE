import React, { useState, useEffect } from "react";
import styles from "../search/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyMap from "../map/my-map";
import axios from "axios";
import { fetchNearbyWineStores } from "@/utlis/api";
import NearbyWineBars from "../map/nearby-winebars";
import useGeolocation from "@/hooks/useGeolocation";

export default function Search() {
  const [showMapF, setShowMapF] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredWineBars, setFilteredWineBars] = useState([]);
  const [selectedWineBar, setSelectedWineBar] = useState(null); // 변경된 상태 추가
  const [displayedWineBars, setDisplayedWineBars] = useState([]);

  // 성공에 대한 로직
  const onSuccess = (location) => {
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  // 에러에 대한 로직
  const onError = (error) => {
    setUserLocation({
      error,
    });
  };
  const handleToggleMap1 = () => {
    setShowMapF(!showMapF);
  };

  const handleWineBarClick = (wineBar) => {
    // 이미 있는 와인바인지 확인
    if (filteredWineBars.some((bar) => bar.name === wineBar.name)) {
      console.log(wineBar);
      setSelectedWineBar(wineBar);
      setShowMapF(true);
    }
  };

  useEffect(() => {
    console.log(userLocation);
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
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    var options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
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
                onWineBarClick={handleWineBarClick}
              />
            </>
          )}
        </div>
      </div>
      {selectedWineBar && showMapF && (
        <div className={styles.map}>
          <MyMap
            userLocation={userLocation}
            selectedWineBar={selectedWineBar ? selectedWineBar : {}}
            wineBars={filteredWineBars}
          />
          <button className={styles.writeButton}>글쓰기</button>
        </div>
      )}
    </>
  );
}
