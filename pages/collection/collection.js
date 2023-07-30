import React from "react";
import Image from "next/image";

const Collection = ({ collection, onRemove }) => {
  return (
    <ul>
      {collection.map((wineItem) => (
        <li key={wineItem.id}>
          <Image src={wineItem.imageSrc} alt={wineItem.name} />
          <button onClick={() => onRemove(wineItem.id)}>제거</button>
        </li>
      ))}
    </ul>
  );
};
// my
export default Collection;
