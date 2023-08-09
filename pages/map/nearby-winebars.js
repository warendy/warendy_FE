import React from "react";
import MapComponent from "./map-component";

const MAX_DISTANCE = 10; // 보여줄 최대 거리 (단위: km)

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구 반지름 (단위: km)

  // 라디안 단위로 변환
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;

  // 두 지점의 위도, 경도 차이 계산
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  // Haversine 공식 적용
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

const NearbyWineBars = ({ userLocation, wineBars, onWineBarClick }) => {
  // 주변 와인바 정보가 없을 경우 빈 배열로 초기화
  const nearbyWineBars = wineBars || [];

  const filteredWineBars = nearbyWineBars
    .map((wineBar) => {
      const distance = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        wineBar.lat,
        wineBar.lnt
      );
      const key = `${wineBar.address.replace(/\s/g, "_")}_${wineBar.lnt}_${
        wineBar.lat
      }`;
      console.log("Generated key:", key);

      return {
        ...wineBar,
        distance: distance,
        key: key,
      };
    })
    .filter((wineBar) => {
      return wineBar.distance <= MAX_DISTANCE;
    });

  const generatedKeys = filteredWineBars.map((wineBar) => {
    const key = `${wineBar.address.replace(/\s/g, "_")}_${wineBar.lnt}_${
      wineBar.lat
    }`;
    console.log("Generated key:", key);
    return key;
  });

  const hasDuplicates = new Set(generatedKeys).size !== generatedKeys.length;

  console.log(
    "Filtered WineBars with Keys:",
    filteredWineBars.map((wineBar) => wineBar.key)
  );
  console.log("Duplicate keys:", hasDuplicates ? "Yes" : "No");

  return (
    <div>
      <ul>
        {filteredWineBars.map((wineBar) => (
          <li key={wineBar.key}>
            {wineBar.name} - 거리: {wineBar.distance.toFixed(2)} km
            <button onClick={() => onWineBarClick(wineBar)}>+</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyWineBars;
