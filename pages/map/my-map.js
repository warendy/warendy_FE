import React, { useEffect, useState } from "react";
import axios from "axios";
import MapComponent from "./map-componen";

const proxyServerAddress = "https://warendy.shop/winebars?Lng={lng}&Lat={lat}"; //수정요망

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

  // 서버 API 호출하여 주변 와인바 정보를 받아옴
  const fetchWineBarsNearby = async (location) => {
    try {
      const apiUrl = proxyServerAddress
        .replace("{lng}", location.longitude)
        .replace("{lat}", location.latitude);

      const response = await axios.get(apiUrl);
      const data = response.data;

      setWineBars(data);
    } catch (error) {
      console.error("Error fetching nearby wine bars:", error);
    }
  };

  return (
    <div>
      <h2>MyMap Component</h2>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {/* MapComponent에 주변 와인바 리스트를 전달하여 지도에 마커를 표시 */}
      <MapComponent wineBars={wineBars} userLocation={userLocation} />
    </div>
  );
}
