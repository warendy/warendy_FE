import React, { useEffect, useState } from "react";
import { fetchNearbyWineStores } from "@/utlis/api";

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

const MAX_DISTANCE = 10; // 보여줄 최대 거리 (단위: km)

const NearbyWineBars = ({ userLocation, wineBars }) => {
  // 주변 와인바 정보가 없을 경우 빈 배열로 초기화
  const nearbyWineBars = wineBars || [];

  // 주변 와인바의 위치 정보와 사용자의 위치를 비교하여 일정 범위 내에 있는 와인바만 필터링
  const filteredWineBars = nearbyWineBars.filter((wineBar) => {
    const distance = getDistance(
      userLocation.latitude,
      userLocation.longitude,
      wineBar.lat,
      wineBar.lnt
    );

    // 일정 거리 이내에 있는 와인바만 보여줌 (MAX_DISTANCE 이내)
    return distance <= MAX_DISTANCE;
  });
  return (
    <ul>
      {filteredWineBars.map((wineBar) => (
        <li key={wineBar.id}>
          {/* 와인바 정보를 리스트로 보여줌 */}
          {wineBar.name} - 거리:{" "}
          {getDistance(
            userLocation.latitude,
            userLocation.longitude,
            wineBar.lat,
            wineBar.lnt
          )}{" "}
          km
        </li>
      ))}
    </ul>
  );
};

export default NearbyWineBars;
