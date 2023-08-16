import { Droppable, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import styles from "./Collection.module.css";

const BookmarkedTab = ({ items }) => {
  return (
    <>
      <div className={styles.bookmarkedTab}>
        <h2 className={styles.bookmarkedTitle}>Wine List</h2>
        <Droppable droppableId="Wine List">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${styles.fixedContent} ${
                styles.bookMarkedTabContent
              } ${
                snapshot.isDraggingOver
                  ? `${styles.draggingOver}`
                  : `${styles.shadow}`
              }`}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.wine_id}
                  draggableId={item.wine_id.toString()}
                  index={index}
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
                        src={item.wine_img}
                        alt="Wine Image"
                        width={35}
                        height={140}
                      />
                      <div className={styles.wineName}>{item.wine_name}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default BookmarkedTab;
