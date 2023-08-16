import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faSquareCheck,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../recoil/atoms";
import {
  getUserInfo,
  getMyCollection,
  saveMyCollection,
  deleteMyCollection,
} from "@/services/api";
import { CollectionUpdateModal } from "../../components/Modal";
import styles from "./collection-page.module.css";

import Layout from "../../components/Layout";
import BookmarkedTab from "../../components/collection/BookmarkedTab";
import CollectionTab from "../../components/collection/CollectionTab";
import CreateTabButton from "../../components/collection/CreateTabButton";

const CollectionPage = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [collectionTabs, setCollectionTabs] = useState([]);
  const [userNickname, setUserNickname] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const token = useRecoilValue(userTokenState);

  useEffect(() => {
    getMyWineListFromServer(token);
    getMyCollectionFromServer(token);
    getUserNickname(token);
  }, [token]);

  const getUserNickname = async (token) => {
    try {
      const userInfo = await getUserInfo(token);
      setUserNickname(userInfo.data.nickname);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

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
    const bookmarkedWineIds = bookmarkedItems
      .map((wine) => wine.wine_id)
      .join(",");
    const dataToSend = {
      list: [
        {
          wineIds: bookmarkedWineIds,
        },
        ...collectionTabs.map((item) => ({
          name: item.id,
          wineIds: item.items.map((wine) => wine.wine_id).join(","),
        })),
      ],
    };
    try {
      const response = await saveMyCollection(dataToSend, token);
      console.log("Collection saved successfully:", response);

      setIsEditMode(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error saving collection:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteItem = async (tabId, wineId) => {
    const updatedTabs = collectionTabs.map((tab) => {
      if (tab.id === tabId) {
        const updatedItems = tab.items.filter(
          (items) => items.wine_id !== wineId
        );
        console.log(updatedItems);
        return { ...tab, items: updatedItems };
      }
      console.log(tab);
      return tab;
    });
    setCollectionTabs(updatedTabs);
    try {
      await deleteMyCollection(wineId, token);
      console.log("Item deleted successfully");
      alert("아이템이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleMoveToBookmark = (item) => {
    setBookmarkedItems((prevItems) => [...prevItems, item]);
    const updatedTabs = collectionTabs.map((tab) => {
      const updatedItems = tab.items.filter(
        (existingItem) => existingItem.wine_id !== item.wine_id
      );
      return { ...tab, items: updatedItems };
    });
    setCollectionTabs(updatedTabs);
  };

  // dndFunction
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (isEditMode) {
      return;
    }
    if (!destination) return;

    const sourceKey = source.droppableId;
    const destinationKey = destination.droppableId;
    const draggableId = result.draggableId;

    const updatedTabs = collectionTabs.map((tab, index) => {
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

  const handleDeleteTab = (tabId) => {
    setCollectionTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
  };

  if (bookmarkedItems.length > 0) {
    return (
      <>
        <Layout>
          <h1 className={styles.title + " title "}>
            {userNickname}의 와인 컬렉션
          </h1>
          <div className={styles.collectionPage}>
            <DragDropContext onDragEnd={onDragEnd}>
              {isEditMode ? (
                <button
                  onClick={handleSaveCollection}
                  className={styles.saveButton + " resetBtn "}
                >
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    className={styles.icon}
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsEditMode(true);
                  }}
                  className={styles.editModeButton + " resetBtn "}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={styles.icon}
                  />
                </button>
              )}
              <div className={styles.collectionContainer}>
                <BookmarkedTab items={bookmarkedItems} />
                <div className={styles.collectionTabContainer}>
                  <div className={styles.collectionTabs}>
                    {collectionTabs.map((tab) => (
                      <div key={tab.id} className={styles.tabOutline}>
                        {isEditMode && (
                          <button
                            onClick={() => handleDeleteTab(tab.id)}
                            className={styles.deleteTabButton + " resetBtn "}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className={styles.icon}
                            />
                          </button>
                        )}
                        <CollectionTab
                          title={tab.title}
                          items={tab.items}
                          onDeleteItem={(wineId) =>
                            handleDeleteItem(tab.id, wineId)
                          }
                          onMoveToBookmark={handleMoveToBookmark}
                          isEditMode={isEditMode}
                        />
                      </div>
                    ))}
                  </div>
                  {isEditMode && (
                    <CreateTabButton onCreateTab={handleCreateTab} />
                  )}
                </div>
              </div>
            </DragDropContext>
          </div>
          {showSuccessModal && <CollectionUpdateModal />}
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
