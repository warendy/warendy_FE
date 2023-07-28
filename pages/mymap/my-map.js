import React, { useEffect } from "react";

export default function MyMap() {
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=99d585418706339ae15d964c524e4848";
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }} />;
}
