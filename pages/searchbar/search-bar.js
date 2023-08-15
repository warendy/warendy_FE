import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./search-bar.module.css";
import { searchBarState, slideState } from "@/recoil/searchbar";
import { useRecoilState } from "recoil";

const SearchBar = () => {
  const [searchState, setSearchState] = useRecoilState(searchBarState);
  const [animationClass, setAnimationClass] = useRecoilState(slideState);

  const closeSearchBar = () => {
    setAnimationClass("slideout");
    setTimeout(() => setSearchState(false), 1500);
  };

  if (searchState == true) {
    return (
      <>
        <div className="inner">
          <div className={`${styles.searchContainer} ${styles[animationClass]}`}>
            <form className={styles.searchInner}>
              <FontAwesomeIcon icon={faSearch} className={styles.icon} />
              <input type="search" placeholder="어떤 와인이 궁금하신가요?" required className={styles.searchBar} />
            </form>
            <div className={styles.currentContainer}>
              <h1 className={styles.currentSearchTitle}>최근검색어</h1>
              <div className={styles.closeBtn}>
                <FontAwesomeIcon icon={faXmark} onClick={closeSearchBar} />
              </div>
              <ul className={styles.currentSearch}>
                <li className={styles.currentSearchItem}>프리미티보 디 만두리아</li>
                <li className={styles.currentSearchItem}>루이자도 샤블리</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default SearchBar;
