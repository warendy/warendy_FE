import React, { useState } from "react";
import Image from "next/image";
import styles from "./draggable-element.module.css";

const DraggableElement = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [imgCount, setImgCount] = useState(1);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleRemoveImg = () => {
    if (imgCount >= 0) {
      setImgCount(imgCount + 1);
    }
  };

  return (
    <>
      <div className={styles.draggableElement}>
        <div
          draggable="true"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className={styles.elementArea}
        >
          <div className={styles.bookmarkTitle}>북마크</div>
          <div className={styles.bookmarkContent}>
            {Array.from({ length: imgCount }).map((_, index) => (
              <div key={index} className={styles.img}>
                <Image
                  src="/images/wine.png"
                  alt="bookmarked Wine"
                  width={30}
                  height={120}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleRemoveImg} disabled={imgCount <= 0}>
        제거하기{" "}
      </button>
    </>
  );
};

export default DraggableElement;
