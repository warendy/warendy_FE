import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./drop-target.module.css";

const DropTarget = () => {
  const [tabLists, setTabLists] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(data);
    event.target.appendChild(draggableElement);
  };

  const handleIconClick = () => {
    setTabLists((prevTabLists) => [...prevTabLists, "내가 만든 와인 컬렉션"]);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={styles.tabContent}
      >
        {tabLists.map((tabList, index) => (
          <div className={styles.tabList} key={index}>
            <div className={styles.title}>{tabList}</div>
            <div className={styles.tabContent}></div>
          </div>
        ))}
      </div>
      <FontAwesomeIcon
        icon={faCirclePlus}
        className={styles.plus}
        onClick={handleIconClick}
      />
    </>
  );
};

export default DropTarget;
