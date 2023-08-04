import { Droppable, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styles from "./my-collection.module.css";
import { TItemStatus } from "../my/collection-page";

const CreatedTab = ({ items = {}, setItems }) => {
  const otherTabsItems = Object.entries(items).filter(
    ([key]) => key !== TItemStatus.SELECT
  );

  return (
    <div className={styles.tabArea}>
      {otherTabsItems.map(([key, tabItems]) => (
        <Droppable key={key} droppableId={key}>
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
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        <button className={styles.deleteBtn + " resetBtn "}>
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className={styles.icon}
                          />
                        </button>
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

export default CreatedTab;
