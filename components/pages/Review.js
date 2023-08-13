import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false); // 로딩 중인지 여부를 나타내는 상태
  const [hasMoreReviews, setHasMoreReviews] = useState(true); // 더 불러올 리뷰가 있는지 여부를 나타내는 상태
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

  const loadMoreReviews = async () => {
    if (!hasMoreReviews || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      // 새로운 리뷰를 가져와서 추가하는 로직
      const newReviews = await getMyReview(token, loadedReviewCount, 3); // 예시: 서버에서 3개의 리뷰를 불러옴

      if (newReviews && newReviews.content && newReviews.content.length > 0) {
        setWineReviews((prevReviews) => [
          ...prevReviews,
          ...newReviews.content,
        ]);
        setLoadedReviewCount((prevCount) => prevCount + 3); // 불러온 리뷰 개수 업데이트
      } else {
        setHasMoreReviews(false); // 더 이상 불러올 리뷰가 없음
      }
    } catch (error) {
      console.error("Error loading more reviews:", error);
    }

    setIsLoading(false);
  };

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
            await loadMoreReviews(); // 더 많은 리뷰 불러오기 함수를 호출
          }
        },
        { root: null, rootMargin: "0px", threshold: 1 }
      );

      if (lastReviewRef.current) {
        observer.observe(lastReviewRef.current);
      }

      return () => observer.disconnect();
    } else {
      // IntersectionObserver를 지원하지 않을 경우, 폴백 로직을 추가
      // 이 부분에 다른 로직을 추가하여 스크롤 시 더 많은 리뷰를 로드하는 방식을 구현할 수 있습니다.
    }
  }, [lastReviewRef.current]);

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
                    <>
                      {post.contents.substring(0, MAX_CONTENT_LENGTH)}
                      {"..."}
                    </>
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
