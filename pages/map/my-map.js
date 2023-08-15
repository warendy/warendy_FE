import React, { useEffect } from "react";

const MapComponent = ({ userLocation, selectedWineBar, wineBars }) => {
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
          initializeMap();
        });
      } catch (error) {
        console.error("Error loading Kakao Map API:", error);
      }
    };

    loadKakaoMap();
  }, [selectedWineBar]);

  const initializeMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        selectedWineBar.lat,
        selectedWineBar.lnt
      ),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    displayWineBarMarkers(wineBars, map);
  };

  const displayWineBarMarkers = (wineBarData, map) => {
    console.log(wineBarData);
    wineBarData.forEach((wineBar) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(wineBar.lat, wineBar.lnt),
        map: map,
        title: wineBar.name,
      });
      console.log(marker);
      marker.setMap(map);
    });
  };

  return (
    <div>
      {userLocation && (
        <div>
          <div
            id="map"
            style={{ width: "50%", height: "400px", margin: "0 auto" }}
          />
        </div>
      )}
    </div>
  );
};
export default MapComponent;
