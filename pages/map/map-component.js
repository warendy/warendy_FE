import React, { useEffect } from "react";

export default function MapComponent({ wineBars, userLocation }) {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !userLocation) {
      return;
    }

    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      ),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    if (wineBars.length > 0) {
      displayWineBarMarkers(wineBars, map);
    } else {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        ),
      });
      marker.setMap(map);
    }
  }, [wineBars, userLocation]); // userLocation을 의존성 배열에 추가하여 변경될 때마다 useEffect 호출

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
