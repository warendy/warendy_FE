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
      id: `${i}`,
      title: `레드 ${i + 1}000`,
      status: TItemStatus.SELECT,
    })),
  });

<<<<<<< Updated upstream
  return (
    <Layout>
      <h1 className={styles.pageTitle + " title "}>나만의 와인 컬렉션</h1>
      <MyCollection items={items} setItems={setItems} />
    </Layout>
  );
=======
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
>>>>>>> Stashed changes
};

export default CollectionPage;
