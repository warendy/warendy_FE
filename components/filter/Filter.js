import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Filter.module.css";

const Filter = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showWineTypeOptions, setShowWineTypeOptions] = useState(false);
  const [showWinePairingOptions, setShowWinePairingOptions] = useState(false);
  const [showWineRatingOptions, setShowWineRatingOptions] = useState(false);

  const handleFilterClick = (filter, filterType) => {
    setSelectedFilters([filter]);

    onFilterChange((prevFilterOptions) => {
      if (filterType === "wineRating") {
        const [minRating, maxRating] = filter.split("-");
        return {
          ...prevFilterOptions,
          wineRating: {
            min: parseFloat(minRating),
            max: parseFloat(maxRating),
          },
        };
      }
      return {
        ...prevFilterOptions,
        [filterType]: filter,
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange({
      wineType: "",
      winePairing: "",
      wineRating: "",
    });
  };

  const toggleWineTypeOptions = () => {
    setShowWineTypeOptions(!showWineTypeOptions);
  };

  const toggleWinePairingOptions = () => {
    setShowWinePairingOptions(!showWinePairingOptions);
  };

  const toggleWineRatingOptions = () => {
    setShowWineRatingOptions(!showWineRatingOptions);
  };

  const renderFilterButtons = (filterType, filterOptions, showOptions) => {
    if (!showOptions) {
      return null;
    }
    return filterOptions.map((filter) => (
      <label key={filter} className={styles.filterCheckboxLabel}>
        <input
          type="checkbox"
          className={styles.filterCheckbox}
          checked={selectedFilters.includes(filter)}
          onChange={() => handleFilterClick(filter, filterType)}
        />
        {filter}
      </label>
    ));
  };
  return (
    <div className={styles.filterArea}>
      <h3 className={styles.filterName}>필터</h3>
      <div className={styles.filterGroup}>
        <div className={styles.filterType} onClick={toggleWineTypeOptions}>
          와인종류
          <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
        </div>
        {renderFilterButtons(
          "wineType",
          [
            "Riesling",
            "Sparkling",
            "Sauvignon Blanc",
            "Chardonnay",
            "Cabernet Sauvignon",
            "Red",
          ],
          showWineTypeOptions
        )}
      </div>
      <div className={styles.filterGroup}>
        <div className={styles.filterType} onClick={toggleWinePairingOptions}>
          잘 어울리는 음식
          <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
        </div>
        {renderFilterButtons(
          "winePairing",
          ["Beef", "Shellfish", "Pork"],
          showWinePairingOptions
        )}
      </div>
      <div className={styles.filterGroup}>
        <div className={styles.filterType} onClick={toggleWineRatingOptions}>
          별점
          <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
        </div>
        {renderFilterButtons(
          "wineRating",
          ["3.0-3.9", "4.0-4.9", "5.0"],
          showWineRatingOptions
        )}
      </div>
      <button
        className={styles.clearButton + " btn outline "}
        onClick={clearFilters}
      >
        초기화
      </button>
    </div>
  );
};

export default Filter;
