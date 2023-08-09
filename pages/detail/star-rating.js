import React, { useState } from "react";
import styles from "./star-rating.module.css";

const StarRating = ({ rating, setRating, isInteractive = true }) => {
  const MAX_STARS = 5;
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (clickedStarIndex) => {
    if (isInteractive) {
      const newRating = clickedStarIndex + 1;
      setRating(newRating);
    }
  };

  const handleStarHover = (hoveredStarIndex) => {
    if (isInteractive) {
      setHoveredRating(hoveredStarIndex + 1);
    }
  };

  const handleStarHoverLeave = () => {
    if (isInteractive) {
      setHoveredRating(0);
    }
  };

  return (
    <div className={styles.starRating} onMouseLeave={handleStarHoverLeave}>
      {[...Array(MAX_STARS)].map((_, index) => {
        const starClass = index < rating ? styles.filled : isInteractive && hoveredRating > index ? styles.filled : styles.unfilled;
        return (
          <span
            key={index}
            className={`${styles.star} ${starClass}`}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
