import React, { useState } from "react";
import styles from "./collection.module.css";
import DraggableElement from "./draggable-element.js";
import DropTarget from "./drop-target.js";

const Collection = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("와인 종류별");

  const handleFilterClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedFilter(option);
    setShowDropdown(false);
  };

  return (
    <div className={styles.myCollection}>
      <div className={styles.filter}>
        <div className={styles.filterMain}>
          <div onClick={handleFilterClick}>
            <span className={styles.result}>{selectedFilter}</span>
            <span className={styles.arrow}>{showDropdown ? "▲" : "▼"}</span>
          </div>
          {showDropdown && (
            <div className={styles.dropdownWrapper}>
              <div className={styles.dropdown}>
                <div
                  className={styles.option}
                  onClick={() => handleOptionClick("와인 종류별")}
                >
                  와인 종류별
                </div>
                <div
                  className={styles.option}
                  onClick={() => handleOptionClick("화이트 와인")}
                >
                  화이트 와인
                </div>
                <div
                  className={styles.option}
                  onClick={() => handleOptionClick("레드 와인")}
                >
                  레드 와인
                </div>
                <div
                  className={styles.option}
                  onClick={() => handleOptionClick("스파클링 와인")}
                >
                  스파클링 와인
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Content /> */}
      <DropTarget />
      <DraggableElement />
    </div>
  );
};

export default Collection;
