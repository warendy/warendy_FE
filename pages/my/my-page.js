import React, { useState, useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../recoil/atoms";
import { getUserInfo, getMyReview, getMyBoard } from "../../services/api";
import Layout from "@/components/Layout";
import MyHome from "@/components/my/MyHome";
import Snb from "@/components/my/Snb";
import EditInfo from "@/components/my/EditInfo";
import EditProfile from "@/components/my/EditProfile";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [myBoards, setMyBoards] = useState([]);
  const [selectedPage, setSelectedPage] = useState("myHome");

  const token = useRecoilValue(userTokenState);

  useEffect(() => {
    getUserDataFromServer(token);
  }, [token]);

  const getUserDataFromServer = async (token) => {
    try {
      const userInfos = await getUserInfo(token);
      if (userInfos.status === "success") {
        const reviews = await getMyReview(token);
        const boards = await getMyBoard(token);

        const userInfoData = userInfos.data;
        const reviewsArray = Object.values(reviews.content);
        console.log(reviewsArray);
        const boardsArray = Object.values(boards.content);

        setUserInfo(userInfoData);
        setMyReviews(reviewsArray);
        setMyBoards(boardsArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSnbLinkClick = useCallback((page) => {
    setSelectedPage(page);
  }, []);

  // if (userInfo.length > 0) {
  return (
    <Layout>
      <Snb onPageLinkClick={handleSnbLinkClick} />
      {selectedPage === "myHome" && (
        <MyHome userInfo={userInfo} myReviews={myReviews} myBoards={myBoards} />
      )}
      {selectedPage === "editInfo" && (
        <EditInfo userInfo={userInfo} token={token} />
      )}
      {selectedPage === "editProfile" && (
        <EditProfile userInfo={userInfo} token={token} />
      )}
    </Layout>
  );
};
//    else {
//     return (
//       <>
//         <h1>와인정보 불러오는중</h1>
//       </>
//     );
//   }
// };

export default MyPage;
