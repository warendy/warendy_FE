import React, { useState } from "react";
import Image from "next/image";
import styles from "../index.module.css";

const ReviewCard = ({
  post,
  onSaveReview,
  onDeleteReview,
  updateMyReview,
  token,
  filteredReviews,
  setFilteredReviews,
}) => {
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.contents);
  const [updatedRating, setUpdatedRating] = useState(post.rating);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    if (updatedContent !== post.contents || updatedRating !== post.rating) {
      try {
        await onSaveReview(post.reviewId, updatedContent, updatedRating);
        await updateMyReview(
          post.reviewId,
          updatedContent,
          updatedRating,
          token
        );
      } catch (error) {
        console.error("Error updating review:", error);
      }
    }
    setEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      await onDeleteReview(post.reviewId);
      setFilteredReviews((prevFilteredReviews) =>
        prevFilteredReviews.filter(
          (review) => review.reviewId !== post.reviewId
        )
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleRatingChange = (e) => {
    setUpdatedRating(e.target.value);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setUpdatedContent(post.contents);
    setUpdatedRating(post.rating);
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.img}>
        <Image src={post.winePicture} alt="Wine" width={55} height={210} />
      </div>
      <div className={styles.contentArea}>
        <div className={styles.date}>작성일: {post.createdAt}</div>
        <button onClick={handleDeleteClick}>Delete</button>
        <div className={styles.wineName}>{post.wineName}</div>
        <div className={styles.wineRating}>
          전문가 평점: {post.wineRating}/5.0
        </div>
        {editing ? (
          <div className={styles.editingArea}>
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              placeholder="리뷰를 작성해주세요..."
            />
            <select value={updatedRating} onChange={handleRatingChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div>
              <button
                onClick={handleSaveClick}
                className={styles.saveBtn + " btn outline "}
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className={styles.saveBtn + " btn outline "}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.editingArea}>
            <p>{updatedContent}</p>
            <p>별점: {updatedRating}/5.0</p>
            <div>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
