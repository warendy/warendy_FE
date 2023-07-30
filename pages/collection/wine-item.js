import React from "react";
import Image from "next/image";
import { useDrag } from "react-dnd";

const WineItem = ({ wineItem, onDrop }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "WINE_ITEM",
    item: wineItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <Image
        src={wineItem.imageSrc}
        alt={wineItem.name}
        width={90}
        height={230}
      />
    </li>
  );
};

export default WineItem;
