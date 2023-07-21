import React from "react";
import styles from "./randingpage.module.css";

export default function Randingpage() {
  // Base64로 인코딩된 이미지 데이터
  const base64ImageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAb..."; // 계속 이어지는 Base64 데이터

  return (
    <div className={styles.main}>
      <svg width="180" height="62" viewBox="0 0 180 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="180" height="61.0526" fill="url(#pattern0)" />
        <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <image xlinkHref={base64ImageData} />
          </pattern>
        </defs>
      </svg>
    </div>
  );
}
