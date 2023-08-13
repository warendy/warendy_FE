import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { userTokenState } from "@/recoil/atoms";
import { getMyReview } from "@/services/api";
import Filter from "../filter/Filter";
import styles from "./Review.module.css";

const MAX_CONTENT_LENGTH = 20;

const Review = () => {
  const [wineReviews, setWineReviews] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    wineType: "",
    winePairing: "",
    wineRating: "",
  });
  const token = useRecoilValue(userTokenState);

  const [loadedReviewCount, setLoadedReviewCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [editingReviewIndex, setEditingReviewIndex] = useState(-1);

  useEffect(() => {
    getWineReviewsFromServer(token);
  }, [token]);

  const getWineReviewsFromServer = async (token) => {
    try {
      const wineReviews = await getMyReview(token);
      const wineReviewsArray = Object.values(wineReviews.content);
      setWineReviews(wineReviewsArray);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const loadMoreReviews = useCallback(async () => {
    if (!hasMoreReviews || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const newReviews = await getMyReview(token, loadedReviewCount, 3);

      if (newReviews && newReviews.content && newReviews.content.length > 0) {
        setWineReviews((prevReviews) => [
          ...prevReviews,
          ...newReviews.content,
        ]);
        setLoadedReviewCount((prevCount) => prevCount + 3);
      } else {
        setHasMoreReviews(false);
      }
    } catch (error) {
      console.error("Error loading more reviews:", error);
    }

    setIsLoading(false);
  }, [hasMoreReviews, isLoading, loadedReviewCount, token]);

  const applyFilters = (reviews) => {
    return reviews.filter((review) => {
      const wineTypeCondition =
        !filterOptions.wineType ||
        review.wineType.includes(filterOptions.wineType);

      const winePairingCondition =
        !filterOptions.winePairing ||
        review.winePairing.includes(filterOptions.winePairing);

      const wineRatingCondition =
        !filterOptions.wineRating ||
        (review.wineRating >= filterOptions.wineRating.min &&
          review.wineRating <= filterOptions.wineRating.max);

      return wineTypeCondition && winePairingCondition && wineRatingCondition;
    });
  };

  const filteredWineReviews = applyFilters(wineReviews).slice(
    0,
    loadedReviewCount
  );

  const lastReviewRef = useRef();

  useEffect(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            await loadMoreReviews();
          }
        },
        { root: null, rootMargin: "0px", threshold: 1 }
      );

      if (lastReviewRef.current) {
        observer.observe(lastReviewRef.current);
      }

      return () => observer.disconnect();
    } else {
    }
  }, []);

  return (
    <div className={styles.reviewPage}>
      <Filter
        onFilterChange={(newFilterOptions) => {
          setFilterOptions(newFilterOptions);
        }}
      />
      <div className={styles.reviewArea}>
        {filteredWineReviews.map((post, index) => (
          <div className={styles.reviewCard} key={index}>
            <div className={styles.img}>
              <Image
                src={post.winePicture}
                alt="Wine"
                width={55}
                height={210}
              />
            </div>
            <div className={styles.contentArea}>
              <div className={styles.date}>작성일{post.createdAt}</div>
              <div className={styles.wineName}>{post.wineName}</div>
              <div className={styles.wineRating}>{post.wineRating}/5.0</div>
              {editingReviewIndex === index ? (
                <input
                  type="text"
                  value={post.contents}
                  onChange={(e) => {
                    const newWineReviews = [...wineReviews];
                    newWineReviews[index].contents = e.target.value;
                    setWineReviews(newWineReviews);
                  }}
                  className={styles.input + " input "}
                />
              ) : (
                <div className={styles.reviewContent}>
                  {post.contents.length > MAX_CONTENT_LENGTH ? (
                    <>{post.contents.substring(0, MAX_CONTENT_LENGTH)}</>
                  ) : (
                    post.contents
                  )}
                </div>
              )}
            </div>
            {editingReviewIndex === index ? (
              <button
                className={styles.btnReview + " btn outline "}
                type="button"
                onClick={() => {
                  setEditingReviewIndex(-1);
                }}
              >
                저장하기
              </button>
            ) : (
              <button
                className={styles.btnReview + " btn outline "}
                type="button"
                onClick={() => {
                  setEditingReviewIndex(index);
                }}
              >
                수정하기
              </button>
            )}
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
        {hasMoreReviews && <div ref={lastReviewRef}></div>}{" "}
      </div>
    </div>
  );
};

export default Review;
