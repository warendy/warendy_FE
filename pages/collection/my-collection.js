import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./my-collection.module.css";
import { TItemStatus } from "../my/collection-page";
import BookmarkedTab from "./bookmarked-tab";
import CollectionTab from "./collection-tab";
import CreateTabButton from "./createtab-button";
import { saveMyCollection, getWine } from "../services/api";

const MyCollection = ({ items = {}, setItems }) => {
  const [enabled, setEnabled] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const [token, setToken] = useState();
  useEffect(() => {
    const storedToken = localStorage.getItem("bearerToken");
    if (storedToken != null) {
      setToken(storedToken);
    }
  }, []);
  console.log(token);

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;

    const sourceKey = source.droppableId;
    const destinationKey = destination.droppableId;
    const _items = JSON.parse(JSON.stringify(items));
    const [targetItem] = _items[sourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const handleSaveButtonClick = async () => {
    const list = Object.entries(items)
      .filter(([key]) => key !== TItemStatus.SELECT)
      .map(([key, tabItems]) => ({
        name: key,
        wineIds: tabItems.map((item) => item.id).join(","),
      }));
    getWine(token);
    const dataToSend = {
      list: [
        {
          name: "test",
          wineIds: "1,2,4,6",
        },
        {
          name: "test1",
          wineIds: "3,5,7",
        },
      ],
    };

    try {
      const response = await saveMyCollection(dataToSend, token);
      console.log("Save Response:", response);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  const handleCreateTab = (title) => {
    const newTabName = title.trim();
    if (newTabName !== "") {
      setItems({
        ...items,
        [newTabName]: [],
      });
    }
  };

  return (
    <>
      <div className={styles.myCollectionContainer}>
        <button
          onClick={handleSaveButtonClick}
          className={styles.saveBtn + " btn outline "}
        >
          저장하기
        </button>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.myCollectionArea}>
            <BookmarkedTab items={items} setItems={setItems} />
            <div className={styles.createdTab}>
              <CollectionTab
                items={items}
                setItems={setItems}
                savedData={savedData}
                setSavedData={setSavedData}
              />
              <CreateTabButton onCreateTab={handleCreateTab} />
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default MyCollection;
