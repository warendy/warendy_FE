import React, { useState } from "react";
import styles from "./collection-page";
import Layout from "../../components/layout/layout";
import MyCollection from "../collection/my-collection";

export const TItemStatus = {
  SELECT: "Wine List",
  // CREATING: "친구랑 마실 와인",
};

export const TItems = {
  [TItemStatus.SELECT]: [],
};

const CollectionPage = () => {
  const [items, setItems] = useState({
    [TItemStatus.SELECT]: [...Array(5)].map((_, i) => ({
      id: `${i}${i}${i}`,
      title: `레드 ${i + 1}000`,
      status: TItemStatus.SELECT,
    })),
  });

  return (
    <Layout>
      <h1 className={styles.pageTitle + " title "}>나만의 와인 컬렉션</h1>
      <MyCollection items={items} setItems={setItems} />
    </Layout>
  );
};

export default CollectionPage;
