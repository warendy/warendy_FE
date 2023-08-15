import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userTokenState } from "@/recoil/atoms";
import { getMyReview, updateMyReview, deleteMyReview } from "@/services/api";
import Layout from "@/components/Layout";
import Filter from "@/components/filter/Filter";
import ReviewCard from "./components/ReviewCard";
import styles from "./index.module.css";

const ReviewPage = () => {
  const [wineReviews, setWineReviews] = useState([]);
  console.log(wineReviews);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    wineType: "",
    winePairing: "",
    wineRating: "",
  });

  const token = useRecoilValue(userTokenState);

  useEffect(() => {
    getWineReviewsFromServer(token);
  }, [token]);

  const getWineReviewsFromServer = async (token) => {
    try {
      const wineReviewsData = await getMyReview(token);
      const wineReviewsArray = Object.values(wineReviewsData.content);
      setWineReviews(wineReviewsArray);
      applyFilters(wineReviewsArray);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const applyFilters = (reviews) => {
    const filtered = reviews.filter((review) => {
      const wineTypeCondition =
        !filterOptions.wineType ||
        (review.wineType && review.wineType.includes(filterOptions.wineType));

      const winePairingCondition =
        !filterOptions.winePairing ||
        (review.winePairing &&
          review.winePairing.includes(filterOptions.winePairing));

      const wineRatingCondition =
        !filterOptions.wineRating ||
        (review.wineRating >= filterOptions.wineRating.min &&
          review.wineRating <= filterOptions.wineRating.max);

      return wineTypeCondition && winePairingCondition && wineRatingCondition;
    });

    setFilteredReviews(filtered);
  };

  useEffect(() => {
    applyFilters(wineReviews);
  }, [filterOptions, wineReviews]);

  const handleSaveReview = async (reviewId, updatedContent) => {
    console.log(reviewId);
    console.log(updatedContent);
    if (reviewId !== undefined) {
      try {
        await updateMyReview(reviewId, updatedContent, updatedRating, token);
        const updatedReviews = wineReviews.map((review) =>
          review.id === reviewId
            ? { ...review, contents: updatedContent, rating: updatedRating }
            : review
        );
        setWineReviews(updatedReviews);
      } catch (error) {
        console.error("Error updating review:", error);
      }
    } else {
      console.error("Invalid reviewId");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteMyReview(reviewId, token);
      setFilteredReviews((prevFilteredReviews) =>
        prevFilteredReviews.filter((review) => review.reviewId !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <Layout>
      <h3 className="title">내가 쓴 리뷰</h3>
      <div className={styles.reviewPage}>
        <Filter
          onFilterChange={(newFilterOptions) => {
            setFilterOptions(newFilterOptions);
          }}
        />
        <div className={styles.reviewArea}>
          {filteredReviews.map((post, index) => (
            <ReviewCard
              key={index}
              post={post}
              onSaveReview={handleSaveReview}
              onDeleteReview={handleDeleteReview}
              updateMyReview={updateMyReview}
              token={token}
              filteredReviews={filteredReviews}
              setFilteredReviews={setFilteredReviews}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ReviewPage;
