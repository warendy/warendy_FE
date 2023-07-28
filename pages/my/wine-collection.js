// import styles from "./wine-collection.module.css";
import Collection from "../collection/collection.js";

const WineCollection = () => {
  return (
    <>
      <div className="container">
        <div className="inner padding">
          <h3 className="title">나만의 와인 컬렉션</h3>
          <Collection />
        </div>
      </div>
    </>
  );
};

export default WineCollection;
