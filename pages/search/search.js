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
  const [wineBars, setWineBars] = useState([]);

  const handleToggleMap1 = () => {
    setShowMapF(!showMapF);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wineBarsData = await fetchNearbyWineStores(
          userLocation.longitude,
          userLocation.latitude
        );
        setWineBars(wineBarsData);
      } catch (error) {
        console.error("Error fetching nearby wine stores:", error);
      }
    };

    // userLocation이 변경되었을 때만 fetchData 함수 호출
    if (userLocation) {
      fetchData();
    }
  }, [userLocation]); // userLocation만 의존성 배열에 넣음

  console.log(userLocation);
  console.log(wineBars);

  // useEffect 내부에서의 userLocation 값 업데이트를 위한 함수
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });

          // 마커 위치를 업데이트하기 위해 MyMap 컴포넌트에 userLocation 전달
          // MyMap 컴포넌트에서 userLocation을 다시 MapComponent로 전달
          // MapComponent에서 마커 위치를 업데이트
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  };

  // 최초 렌더링 시에만 위치 정보 가져오기
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
          {userLocation && ( // userLocation이 null이 아닐 때에만 NearbyWineBars 컴포넌트 렌더링
            <>
              <h3 className={styles.title}>주변 와인바 리스트</h3>
              <NearbyWineBars userLocation={userLocation} wineBars={wineBars} />
            </>
          )}
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
