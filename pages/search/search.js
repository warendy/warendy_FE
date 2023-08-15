import React, { useState, useEffect } from "react";
import styles from "../search/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyMap from "../map/my-map";
import axios from "axios";
import Router from "next/router";

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
      setSelectedWineBar(wineBar);
      setShowMapF(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://warendy.shop/winebars/around?lnt=${userLocation.longitude}&lat=${userLocation.latitude}`
        );
        console.log(data);
        setFilteredWineBars(data);
      } catch (error) {
        console.error("Error fetching nearby wine stores:", error);
      }
    };

    if (userLocation) {
      fetchData();
    }
  }, [userLocation]);

  useEffect(() => {
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
    fetchUserLocation();
  }, []);

  const handleSearchLocation = (e) => {
    setSearchLocation(e.target.value);
  };
  const handleToggleMapForWineBar = (wineBar) => {
    if (selectedWineBar === wineBar) {
      setSelectedWineBar(null);
    } else {
      setSelectedWineBar(wineBar);
    }
  };

  const handleWritePostForWineBar = (wineBar) => {
    Router.push({
      pathname: `/post/post-create`,
      query: {
        winebarId: wineBar.winebarId,
        winebarName: wineBar.name,
        winebarAddress: wineBar.address,
        region: wineBar.region,
      },
    });
  };

  return (
    <>
      <h2 className={styles.top}>주변 와인가게 찾기</h2>
      <div className="inner">
        <div className={styles.searchWrap}>
          {userLocation && (
            <>
              <h3 className={styles.title}>주변 와인바 리스트</h3>
              <ul className={styles.wineBarListwrap}>
                {filteredWineBars &&
                  filteredWineBars.map((wineBar) => (
                    <li key={wineBar.winebarId} className={styles.wineBarList}>
                      <div>
                        <h4 className={styles.subtitle}>{wineBar.name}</h4>
                      </div>
                      <div className={styles.wineBarInfo}>
                        <p className={styles.addressname}>{wineBar.address}</p>
                        <button
                          className={styles.toggleMapButton}
                          onClick={() => handleToggleMapForWineBar(wineBar)}
                        >
                          {selectedWineBar === wineBar ? "-" : "+"}
                        </button>
                      </div>
                      <div className={styles.buttonsContainer}>
                        {selectedWineBar === wineBar && (
                          <div className={styles.mapContainer}>
                            <MyMap
                              userLocation={userLocation}
                              selectedWineBar={
                                selectedWineBar ? selectedWineBar : {}
                              }
                              wineBars={filteredWineBars}
                            />
                          </div>
                        )}
                        <div className={styles.writeButtonwrap}>
                          {selectedWineBar === wineBar && (
                            <button
                              className={styles.writeButton}
                              onClick={() => handleWritePostForWineBar(wineBar)}
                            >
                              글쓰기
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
