import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styles from "./my-collection.module.css";
import { TItemStatus } from "../my/collection-page";
import { saveMyCollection } from "../services/api";

const CollectionTab = ({
  items = {},
  setItems,
  disableDragAndDrop,
  setDisableDragAndDrop,
  savedData,
  setSavedData,
}) => {
  const [selectedTabContent, setSelectedTabContent] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const otherTabsItems = Object.entries(items).filter(
    ([key]) => key !== TItemStatus.SELECT
  );

  const handleDragStart = () => {
    setShowSaveButton(true); // Show the "저장하기" button when dragging starts
  };

  const handleDragEnd = () => {
    setShowSaveButton(false); // Hide the "저장하기" button when dragging ends
  };

  return (
    <div className={styles.tabArea}>
      {otherTabsItems.map(([key, tabItems]) => (
        <Droppable
          key={key}
          droppableId={key}
          isDropDisabled={disableDragAndDrop}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${styles.createdContent} ${styles.tabContent} ${
                snapshot.isDraggingOver
                  ? `${styles.draggingOver}`
                  : `${styles.shadow}`
              }`}
            >
              <h3 className={styles.tabTitle}>{key.toLocaleUpperCase()}</h3>
              <div className={styles.createdContentArea}>
                {tabItems.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={disableDragAndDrop}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.draggingItem} ${
                          snapshot.isDragging
                            ? `${styles.dragging} ${styles.shadow}`
                            : `${styles.shadow}`
                        }`}
                      >
                        <Image
                          src="/images/redWine.svg"
                          alt="Logo"
                          width={32}
                          height={110}
                        />
                        <h5 className={styles.wineName}>{item.title}</h5>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default CollectionTab;
