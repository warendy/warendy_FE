import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faSquareCheck,
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
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
        <button
          onClick={handleDeleteClick}
          className={styles.deleteBtn + " resetBtn "}
        >
          <FontAwesomeIcon icon={faTrash} className={styles.icon} />
        </button>
        <div className={styles.wineName}>{post.wineName}</div>
        <div className={styles.wineRating}>
          전문가 평점: {post.wineRating}/5.0
        </div>
        {editing ? (
          <div className={styles.editingArea}>
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              placeholder="리뷰를 남겨주세요"
              className={styles.textArea}
            />
            <select
              value={updatedRating}
              onChange={handleRatingChange}
              className={styles.ratingArea}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className={styles.editingBtn}>
              <button
                onClick={handleSaveClick}
                className={styles.saveBtn + " resetBtn "}
              >
                <FontAwesomeIcon icon={faSquareCheck} className={styles.icon} />
              </button>
              <button
                onClick={handleCancelClick}
                className={styles.cancelBtn + " resetBtn"}
              >
                <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.editingArea}>
            <p className={styles.contents}>{updatedContent}</p>
            <p className={styles.rating}>별점: {updatedRating}/5.0</p>
            <button
              onClick={handleEditClick}
              className={styles.editBtn + " resetBtn "}
            >
              <FontAwesomeIcon icon={faPenToSquare} className={styles.icon} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
