import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./search-bar.module.css";

const SearchBar = () => {
  return (
    <>
      <div className="cotainer">
        <div className="inner">
          <div className={styles.searchContainer}>
            <form className={styles.searchInner}>
              <FontAwesomeIcon icon={faSearch} className={styles.icon} />
              <input
                type="search"
                placeholder="어떤 와인이 궁금하신가요?"
                required
                className={styles.searchBar}
              />
            </form>
            <div className={styles.currentContainer}>
              <h1 className={styles.currentSearchTitle}>최근검색어</h1>
              <ul className={styles.currentSearch}>
                <li className={styles.currentSearchItem}>
                  프리미티보 디 만두리아
                </li>
                <li className={styles.currentSearchItem}>루이자도 샤블리</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
