import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./today-wine.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function TodayWine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wineImages, setWineImages] = useState([]);

  const handleNext = () => {
    setActiveIndex((prevActiveIndex) => {
      let newIndex = prevActiveIndex + 4;
      if (newIndex >= 12) newIndex = 0;
      return newIndex;
    });
  };

  const handlePrevious = () => {
    setActiveIndex((prevActiveIndex) => {
      let newIndex = prevActiveIndex - 4;
      if (newIndex < 0) newIndex = 8;
      return newIndex;
    });
  };

  useEffect(() => {
    fetchAllWineDetails().then(setWineImages);
  }, []);

  const renderWines = () => {
    return wineImages.slice(activeIndex, activeIndex + 4).map((wine, index) => (
      <li key={index} className={styles.recommended}>
        <Image src={wine} alt="recommended wine" width={30} height={120} />
      </li>
    ));
  };

  async function fetchWineDetails(wineId) {
    const response = await axios.get(`https://warendy.shop/wines/${wineId}/detail`);
    return response.data.picture;
  }

  async function fetchAllWineDetails() {
    const wineIds = [...Array(30).keys()].map((i) => i + 1); // 와인 ID가 1부터 30까지라고 가정
    const winePictures = [];
    for (let i = 0; i < wineIds.length; i++) {
      const winePicture = await fetchWineDetails(wineIds[i]);
      winePictures.push(winePicture);
    }
    return winePictures;
  }

  return (
    <>
      <div className={styles.todayWinesContainer + " padding "}>
        <h3 className="title">오늘의 와인</h3>
        <ul className={styles.todayWineList}>
          <button className="resetBtn btn" onClick={handlePrevious}>
            <FontAwesomeIcon icon={faCaretLeft} className={styles.icon} />
          </button>
          {renderWines()}
          <button className="resetBtn btn" onClick={handleNext}>
            <FontAwesomeIcon icon={faCaretRight} className={styles.icon} />
          </button>
        </ul>
      </div>
    </>
  );
}

// import Image from "next/image";
// import styles from "./today-wine.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

// export default function TodayWine() {
//   return (
//     <>
//       <div className={styles.todayWinesContainer + " padding "}>
//         <h3 className="title">오늘의 와인</h3>
//         <ul className={styles.todayWineList}>
//           <button className="resetBtn btn">
//             <FontAwesomeIcon icon={faCaretLeft} className={styles.icon} />
//           </button>
//           <li className={styles.recommended}>
//             <Image
//               src="/images/wine.png"
//               alt="recommended wine"
//               width={30}
//               height={120}
//             />
//           </li>
//           <li className={styles.recommended}>
//             <Image
//               src="/images/wine.png"
//               alt="recommended wine"
//               width={30}
//               height={120}
//             />
//           </li>
//           <li className={styles.recommended}>
//             <Image
//               src="/images/wine.png"
//               alt="recommended wine"
//               width={30}
//               height={120}
//             />
//           </li>
//           <li className={styles.recommended}>
//             <Image
//               src="/images/wine.png"
//               alt="recommended wine"
//               width={30}
//               height={120}
//             />
//           </li>
//           <button className="resetBtn btn">
//             <FontAwesomeIcon icon={faCaretRight} className={styles.icon} />
//           </button>
//         </ul>
//       </div>
//     </>
//   );
// }
