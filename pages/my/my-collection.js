import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./my-collection.module.css";

import Layout from "../../components/layout/layout";
import WineItem from "../collection/wine-item";
import Collection from "../collection/collection";

const wineList = [
  {
    id: 1,
    name: "와인 1",
    imageSrc: "/images/redWine.svg",
    isBookmarked: true,
  },
  {
    id: 2,
    name: "와인 2",
    imageSrc: "/images/sparklingWine.svg",
    isBookmarked: true,
  },
  {
    id: 3,
    name: "와인 3",
    imageSrc: "/images/sparklingWine.svg",
    isBookmarked: true,
  },
  {
    id: 4,
    name: "와인 4",
    imageSrc: "/images/sparklingWine.svg",
    isBookmarked: true,
  },
  {
    id: 5,
    name: "와인 5",
    imageSrc: "/images/sparklingWine.svg",
    isBookmarked: true,
  },
  {
    id: 6,
    name: "와인 6",
    imageSrc: "/images/sparklingWine.svg",
    isBookmarked: true,
  },
  {
    id: 7,
    name: "와인 7",
    imageSrc: "/images/sparklingWine.svg",
    isBookmarked: true,
  },
  {
    id: 8,
    name: "와인 8",
    imageSrc: "/images/sparklingWine.svg",
    isBookmarked: true,
  },
  // Add more wine items here
];

const MyCollection = () => {
  const [collection, setCollection] = useState([]);
  const [visibleWines, setVisibleWines] = useState(5);

  const handleDrop = (wineItem) => {
    setCollection([...collection, wineItem]);
  };

  const loadMore = () => {
    setVisibleWines((prevVisibleWines) => prevVisibleWines + 5);
  };

  const removeFromCollection = (wineId) => {
    setCollection(collection.filter((item) => item.id !== wineId));
  };

  return (
    <Layout>
      <h3 className="title">나만의 와인 컬렉션</h3>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.collectionArea}>
          <div className={`${styles.myMarked} ${styles.tabOutline}`}>
            <h2 className={styles.title}>찜한 와인</h2>
            <div className={styles.contentArea}>
              <ul className={styles.list}>
                {wineList
                  .filter((wineItem) => wineItem.isBookmarked)
                  .slice(0, visibleWines)
                  .map((wineItem) => (
                    <WineItem
                      key={wineItem.id}
                      wineItem={wineItem}
                      onDrop={handleDrop}
                    />
                  ))}
              </ul>
              {visibleWines <
                wineList.filter((wineItem) => wineItem.isBookmarked).length && (
                <button
                  onClick={loadMore}
                  className={styles.btn + " btn outline "}
                >
                  더 보기
                </button>
              )}
            </div>
          </div>
          <div className={`${styles.myCollection} ${styles.tabOutline}`}>
            <h2 className={styles.title}>나의 컬렉션</h2>
            <Collection
              collection={collection}
              onRemove={removeFromCollection}
              className={styles.list}
            />
          </div>
        </div>
      </DndProvider>{" "}
    </Layout>
  );
};

export default MyCollection;
