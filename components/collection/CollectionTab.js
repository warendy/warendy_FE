import Image from "next/image";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./Collection.module.css";

const CollectionTab = ({
  title,
  items,
  onDeleteItem,
  onMoveToBookmark,
  isEditMode,
}) => {
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
                나만의 컬렉션: {title.toLocaleUpperCase()}
              </h3>
              <div className={styles.draggingItemArea}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.wine_id}
                    index={index}
                    draggableId={item.wine_id.toString()}
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
                        <h5 className={styles.wineName}>{item.wine_name}</h5>
                        {isEditMode && (
                          <>
                            <button
                              onClick={() => onDeleteItem(item.wine_id)}
                              className={
                                styles.deleteItemButton + " btn outline "
                              }
                            >
                              삭제하기
                            </button>
                            <button
                              onClick={() => onMoveToBookmark(item)} // Call onMoveToBookmark with item
                              className={
                                styles.moveBookmarkButton + " btn outline "
                              }
                            >
                              북마크로 이동
                            </button>
                          </>
                        )}
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
