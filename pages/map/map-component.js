import React, { useEffect, useRef } from "react";

export default function MapComponent({ wineBars, userLocation }) {
  const mapRef = useRef(null);

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

    loadKakaoMap();
  }, []);

  useEffect(() => {
    if (userLocation && window.kakao && window.kakao.maps) {
      initializeMap();
    }
  }, [wineBars, userLocation]);

  const initializeMap = () => {
    const container = mapRef.current;
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
  };

  const displayWineBarMarkers = (wineBarData, map) => {
    wineBarData.forEach((wineBar) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(wineBar.lat, wineBar.lng),
      });
      marker.setMap(map);
    });
  };

  return <div ref={mapRef} style={{ width: "501px", height: "400px" }} />;
}
