import React, { useEffect, useState } from "react";
import axios from "axios";
import MapComponent from "./map-component";

const proxyServerAddress =
  "https://warendy.shop/winebars/around?lnt={lnt}&lat={lat}";

export default function MyMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [wineBars, setWineBars] = useState([]);
  const [userMarkerPosition, setUserMarkerPosition] = useState(null);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.addEventListener("load", () => {
      onLoadKakaoAPI(); // onLoadKakaoAPI 함수 호출
    });

    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setUserLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error getting user's location:", error);
    }
  };

  const onLoadKakaoAPI = async () => {
    window.kakao.maps.load(async () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      if (userLocation) {
        // 사용자의 위치에 마커 표시
        const userMarkerPosition = new window.kakao.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        );

        const userMarker = new window.kakao.maps.Marker({
          position: userMarkerPosition,
        });

        userMarker.setMap(map);
        setUserMarkerPosition(userMarkerPosition);

        // 주변 와인바 정보 먼저 받아오기
        await fetchWineBarsNearby(userLocation, map);
      }
    });
  };
  useEffect(() => {
    console.log("wineBars:", wineBars);
  }, [wineBars]);

  useEffect(() => {
    console.log("userLocation:", userLocation);
  }, [userLocation]);

  // 서버 API 호출하여 주변 와인바 정보를 받아옴
  const fetchWineBarsNearby = async (location) => {
    try {
      const apiUrl = proxyServerAddress
        .replace("{lat}", location.latitude)
        .replace("{lnt}", location.longitude);

      const response = await axios.get(apiUrl);
      const data = response.data;

      setWineBars(data);
    } catch (error) {
      console.error("Error fetching nearby wine bars:", error);
    }
  };

  // 최초 렌더링 시에만 위치 정보 가져오기
  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <div>
      <h2>MyMap Component</h2>
      <MapComponent wineBars={wineBars} userLocation={userLocation} />{" "}
      {/* MapComponent로 userLocation 전달 */}
    </div>
  );
}
