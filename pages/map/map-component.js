import React, { useEffect } from "react";

export default function MapComponent({ userLocation, wineBars }) {
  console.log("userLocation in MapComponent:", userLocation);
  console.log("wineBars in MapComponent:", wineBars);

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
      } catch (error) {
        console.error("Error loading Kakao Map API:", error);
      }
    };

    loadKakaoMap().then(() => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    });
  }, []);

  const initializeMap = () => {
    // 지도 객체 생성 및 초기화
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      ),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    if (userLocation) {
      const userMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        ),
        map: map,
        title: "내 위치",
      });
    }

    // wineBars 배열을 사용하여 와인바 마커 생성 및 추가
    displayWineBarMarkers(wineBars, map);
  };

  const displayWineBarMarkers = (wineBarData, map) => {
    wineBarData.forEach((wineBar) => {
      console.log("WineBar lat:", wineBar.lat);
      console.log("WineBar lng:", wineBar.lng);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(wineBar.lat, wineBar.lng),
        map: map,
        title: wineBar.name,
      });
    });
  };

  return <div id="map" style={{ width: "1920px", height: "400px" }} />;
}
