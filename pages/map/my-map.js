import React, { useEffect } from "react";

export default function MyMap() {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 사용자의 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latlng = new window.kakao.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              );

              // 지도 중심을 사용자의 위치로 이동
              map.setCenter(latlng);

              // 사용자 위치에 마커 추가
              const marker = new window.kakao.maps.Marker({
                position: latlng,
              });
              marker.setMap(map);
            },
            (error) => {
              console.error("Error getting user's location:", error);

              // 위치 정보를 가져오는 데에 실패한 경우 기본 위치로 설정
              const defaultLatlng = new window.kakao.maps.LatLng(
                33.450701,
                126.570667
              );
              map.setCenter(defaultLatlng);

              // 기본 위치에 마커 추가
              const marker = new window.kakao.maps.Marker({
                position: defaultLatlng,
              });
              marker.setMap(map);
            }
          );
        } else {
          console.error("Geolocation is not supported.");

          // 위치 정보를 지원하지 않는 경우 기본 위치로 설정
          const defaultLatlng = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );
          map.setCenter(defaultLatlng);

          // 기본 위치에 마커 추가
          const marker = new window.kakao.maps.Marker({
            position: defaultLatlng,
          });
          marker.setMap(map);
        }
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }} />;
}
