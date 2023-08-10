import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../recoil/atoms";
import {
  getMyWineList,
  getMyCollection,
  saveMyCollection,
} from "../../services/api";
import styles from "./collection-page.module.css";

import Layout from "../../components/Layout";
import BookmarkedTab from "../../components/collection/BookmarkedTab";
import CollectionTab from "../../components/collection/CollectionTab";
import CreateTabButton from "../../components/collection/CreateTabButton";

const CollectionPage = () => {
  const [tab, setTab] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [collectionTabs, setCollectionTabs] = useState([]);

  const token = useRecoilValue(userTokenState);

  useEffect(() => {
    getMyWineListFromServer(token);
    getMyCollectionFromServer(token);
  }, [token]);

  // getMyWineListApi
  const getMyWineListFromServer = async (token) => {
    try {
      const wines = await getMyWineList(token);
      const winesArray = Object.values(wines.list);
      setBookmarkedItems(winesArray);
    } catch (error) {
      console.error("Error fetching wines:", error);
    }
  };

  // getMyCollectionApi
  const getMyCollectionFromServer = async (token) => {
    try {
      const response = await getMyCollection(token);
      const categories = response.categoryList;
      const tabsData = categories.map((category) => ({
        id: category.name, // 사용자가 입력한 고유한 값으로 수정해야 할 수 있음
        title: category.name,
        items: category.wines,
      }));
      setCollectionTabs(tabsData);
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  };

  // postMyCollectionApi
  const handleSaveCollection = async (token) => {
    const dataToSend = collectionTabs.map((tab) => ({
      name: tab.title,
      wines: tab.items.map((item) => ({
        wine_id: item.wine_id,
      })),
    }));

    try {
      const response = await saveMyCollection(
        { categoryList: dataToSend },
        token
      );
      console.log("Collection saved successfully:", response);
    } catch (error) {
      console.error("Error saving collection:", error);
    }
  };

  // dndFunction
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceKey = source.droppableId;
    const destinationKey = destination.droppableId;

    const updatedTabs = collectionTabs.map((tab) => {
      if (tab.id === destinationKey) {
        const updatedItems = Array.from(tab.items);
        const [targetItem] = bookmarkedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, targetItem);

        return {
          ...tab,
          items: updatedItems,
        };
      }
      return tab;
    });

    setCollectionTabs(updatedTabs);
  };

  // const onDragEnd = async ({ source, destination }) => {
  //   if (!destination) return;

  //   const sourceKey = source.droppableId;
  //   const destinationKey = destination.droppableId;
  //   const _items = JSON.parse(JSON.stringify(items));
  //   const [targetItem] = _items[sourceKey].splice(source.index, 1);
  //   _items[destinationKey].splice(destination.index, 0, targetItem);
  //   setItems(_items);
  // };

  // useEffect(() => {
  //   const animation = requestAnimationFrame(() => setEnabled(true));

  //   return () => {
  //     cancelAnimationFrame(animation);
  //     setEnabled(false);
  //   };
  // }, []);

  // if (!enabled) {
  //   return null;
  // }

  // createTab
  const handleCreateTab = (title) => {
    const newTabName = title.trim();
    if (newTabName !== "") {
      setCollectionTabs((prevTabs) => [
        ...prevTabs,
        { id: newTabName, title: newTabName, items: [] },
      ]);
    }
  };

  if (bookmarkedItems.length > 0) {
    return (
      <>
        <Layout>
          <h1 className="title">나만의 와인 컬렉션</h1>
          <div className={styles.collectionPage}>
            <DragDropContext onDragEnd={onDragEnd}>
              <button
                onClick={handleSaveCollection}
                className={styles.saveBtn + " btn outline "}
              >
                저장하기
              </button>
              <div className={styles.collectionContainer}>
                <BookmarkedTab items={bookmarkedItems} />
                <div className={styles.collectionTabContainer}>
                  <div className={styles.collectionTabs}>
                    {collectionTabs.map((tab) => (
                      <CollectionTab
                        key={tab.id}
                        title={tab.title}
                        items={tab.items}
                      />
                    ))}
                  </div>
                  <CreateTabButton onCreateTab={handleCreateTab} />
                </div>
              </div>
            </DragDropContext>
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <h1>와인정보 불러오는중</h1>
      </>
    );
  }
};

export default CollectionPage;
