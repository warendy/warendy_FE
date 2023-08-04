import { Droppable, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import styles from "./my-collection.module.css";

import { TItemStatus } from "../my/collection-page";

const FixedTab = ({ items = {}, setItems }) => {
  const bookmarkedItems = items[TItemStatus.SELECT];

  return (
    <div className={styles.fixedTab}>
      <h2 className={styles.tabTitle}>{TItemStatus.SELECT}</h2>
      <Droppable droppableId={TItemStatus.SELECT}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.fixed} ${styles.tabContent} ${
              snapshot.isDraggingOver
                ? `${styles.draggingOver}`
                : `${styles.shadow}`
            }`}
          >
            {bookmarkedItems.map((item, index) => (
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default FixedTab;
