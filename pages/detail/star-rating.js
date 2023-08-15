import React, { useState } from "react";
import styles from "./star-rating.module.css";

const StarRating = ({ rating, setRating, reviewText, setReviewText }) => {
  const MAX_STARS = 5;
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (clickedStarIndex) => {
    const newRating = clickedStarIndex + 1;
    setRating(newRating);
  };

  const handleStarHover = (hoveredStarIndex) => {
    setHoveredRating(hoveredStarIndex + 1);
  };

  const handleStarHoverLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className={styles.starRating} onMouseLeave={handleStarHoverLeave}>
      {[...Array(MAX_STARS)].map((_, index) => {
        const starClass = index < rating ? styles.filled : hoveredRating > index ? styles.filled : styles.unfilled;
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
