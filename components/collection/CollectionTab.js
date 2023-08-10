import Image from "next/image";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./Collection.module.css";

const CollectionTab = ({ title, items }) => {
  return (
    <>
      <div className={styles.collectionTab}>
        <Droppable droppableId={title}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${styles.collectionContent} ${styles.tabContent} ${
                snapshot.isDraggingOver
                  ? `${styles.draggingOver}`
                  : `${styles.shadow}`
              }`}
            >
              <h3 className={styles.collectionTitle}>
                {title.toLocaleUpperCase()}
              </h3>
              <div className={styles.draggingItemArea}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.wine_id}
                    draggableId={item.wine_id}
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
                        {/* <h5 className={styles.wineName}>{item.title}</h5> */}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default CollectionTab;
