import React, { useEffect, useState } from "react";
import axios from "axios";
import MapComponent from "./map-component";

const proxyServerAddress =
  "https://warendy.shop/winebars/around?lnt={lnt}&lat={lat}";

export default function MyMap({ userLocation }) {
  const [wineBars, setWineBars] = useState([]);

  useEffect(() => {
    const loadKakaoMap = async () => {
      try {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.async = true;
          script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&autoload=false`;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });

        window.kakao.maps.load(() => {
          // Kakao 지도 API 로드 후 초기화
          if (userLocation) {
            initializeMap();
          }
        });
      } catch (error) {
        console.error("Error loading Kakao Map API:", error);
      }
    };

    loadKakaoMap();
  }, [userLocation]);

  const initializeMap = async () => {
    // 서버 API 호출하여 주변 와인바 정보를 받아옴
    await fetchWineBarsNearby(userLocation);
  };

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

  return (
    <div>
      <h2>MyMap Component</h2>
      {userLocation && (
        <MapComponent userLocation={userLocation} wineBars={wineBars} />
      )}
    </div>
  );
}
