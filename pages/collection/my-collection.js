import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./my-collection.module.css";

import FixedTab from "./fixed-tab";
import CreatedTab from "./created-tab";
import CreateTabButton from "./createtab-button";

const MyCollection = ({ items = {}, setItems }) => {
  const [enabled, setEnabled] = useState(false);

  const onDragEnd = ({ source, destination }) => {
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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.myCollectionArea}>
            <FixedTab items={items} setItems={setItems} />
            <div className={styles.createdTab}>
              <CreatedTab items={items} setItems={setItems} />
              <CreateTabButton onCreateTab={handleCreateTab} />
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default MyCollection;
