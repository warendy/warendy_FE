import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../recoil/atoms";
import { getMyCollection, saveMyCollection } from "@/services/api";
import styles from "./collection-page.module.css";

import Layout from "../../components/Layout";
import BookmarkedTab from "../../components/collection/BookmarkedTab";
import CollectionTab from "../../components/collection/CollectionTab";
import CreateTabButton from "../../components/collection/CreateTabButton";

const CollectionPage = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [collectionTabs, setCollectionTabs] = useState([]);

  const token = useRecoilValue(userTokenState);

  useEffect(() => {
    getMyWineListFromServer(token);
    getMyCollectionFromServer(token);
  }, [token]);

  const getMyWineListFromServer = async (token) => {
    try {
      const wines = await getMyCollection(token);
      const winesArray = Object.values(wines.list);
      setBookmarkedItems(winesArray);
    } catch (error) {
      console.error("Error fetching wines:", error);
    }
  };

  const getMyCollectionFromServer = async (token) => {
    try {
      const response = await getMyCollection(token);
      const categories = response.categoryList;
      const tabsData = categories.map((category) => ({
        id: category.name,
        title: category.name,
        items: category.wines,
      }));
      setCollectionTabs(tabsData);
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  };

  // postMyCollectionApi
  const handleSaveCollection = async () => {
    const dataToSend = {
      list: collectionTabs.map((item) => ({
        name: item.id,
        wineIds: item.items.map((wine) => wine.wine_id).join(","),
      })),
    };
    try {
      const response = await saveMyCollection(dataToSend, token);
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
    const updatedTabs = collectionTabs.map((tab, index) => {
      console.log(tab);
      if (destinationKey === "Wine List" && tab.id === sourceKey) {
        const updatedItems = Array.from(tab.items);
        const [targetItem] = updatedItems.splice(source.index, 1);
        bookmarkedItems.splice(destination.index, 0, targetItem);
        setBookmarkedItems(bookmarkedItems);
        return {
          ...tab,
          items: updatedItems,
        };
      }
      if (sourceKey === destinationKey && tab.id === destinationKey) {
        const updatedItems = Array.from(tab.items);
        const [targetItem] = updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, targetItem);
        return { ...tab, items: updatedItems };
      }
      if (tab.id === destinationKey) {
        const updatedItems = Array.from(tab.items);
        if (sourceKey == "Wine List") {
          const [targetItem] = bookmarkedItems.splice(source.index, 1);
          updatedItems.splice(destination.index, 0, targetItem);
        } else {
          for (let i = 0; i < collectionTabs.length; i++) {
            if (collectionTabs[i].title === sourceKey) {
              const [targetItem] = collectionTabs[i].items.splice(
                source.index,
                1
              );
              updatedItems.splice(destination.index, 0, targetItem);
              break;
            }
          }
        }
        return {
          ...tab,
          items: updatedItems,
        };
      }
      return tab;
    });
    setCollectionTabs(updatedTabs);
  };

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
