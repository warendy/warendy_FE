// MapComponent.js
import React, { useEffect } from "react";

export default function MapComponent({ wineBars, userLocation }) {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      return;
    }

    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    if (userLocation) {
      // 주변 와인바 리스트가 있는 경우, 마커를 표시
      if (wineBars.length > 0) {
        displayWineBarMarkers(wineBars, map);
      } else {
        // 주변 와인바 리스트가 없는 경우, 기본 위치에 마커 추가
        const defaultLatlng = new window.kakao.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        );
        map.setCenter(defaultLatlng);
        const marker = new window.kakao.maps.Marker({
          position: defaultLatlng,
        });
        marker.setMap(map);
      }
    }
  }, [wineBars, userLocation]);

  const displayWineBarMarkers = (wineBarData, map) => {
    wineBarData.forEach((wineBar) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(wineBar.lat, wineBar.lng),
      });
      marker.setMap(map);
    });
  };

  return <div id="map" style={{ width: "500px", height: "400px" }} />;
}
