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
        position: new window.kakao.maps.LatLng(wineBar.lat, wineBar.lng),
        map: map,
        title: wineBar.name,
      });
      console.log(marker);
      marker.setMap(map);
    });
  };

  return (
    <div>
      <h2>MyMap Component</h2>
      {userLocation && (
        <div>
          {/* 각 버튼을 눌렀을 때 해당 지도 데이터를 설정하는 함수 호출 */}
          {/* <button onClick={() => handleMapSelection(null)}>전체 지도</button> */}
          {/* {wineBars.map((wineBar) => (
            <button
              key={wineBar.winebarId}
              onClick={() => handleMapSelection(wineBar)}
            >
              {wineBar.name} 지도
            </button>
          ))} */}
          {/* 선택한 지도 데이터가 있을 때만 해당 지도를 표시 */}
          {/* {selectedMapData && ( */}
          <div id="map" style={{ width: "100%", height: "400px" }} />
          {/* )} */}
        </div>
      )}
    </div>
  );
};
export default MapComponent;
