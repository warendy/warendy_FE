import axios from "axios";

const instance = axios.create({
  baseURL: "https://warendy.shop",
  headers: {
    "Content-Type": "application/json",
  },
});

// postSigninApi
export const postLogin = async (loginInform, token) => {
  try {
    const response = await instance.post("/signin", loginInform, {
      headers: { Authorization: token },
    });
    if (response.data.status === "success") {
      return response.headers.authorization;
    }
  } catch (error) {
    throw new Error("Signin failed");
    console.error("Error fetching data:", error);
    return null;
  }
};

// getUserInfoApi
export const getUserInfo = async (token) => {
  try {
    const response = await instance.get("/members", {
      headers: { Authorization: token },
    });
    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// postSignupApi
export const postSignup = async (signupInform) => {
  try {
    const response = await instance.post("/signup", signupInform);
    return response.data;
  } catch (error) {
    throw new Error("Signup failed");
    console.error("Error fetching data:", error);
    return null;
  }
};

// postMyBoardApi
export const postMyBoard = async (token, dataToSend) => {
  try {
    const response = await instance.post("/boards", dataToSend);
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

export const postCurrentPassword = async (token, currentPassword) => {
  const dataToSend = {
    password: currentPassword,
  };
  try {
    const response = await instance.post("/members/check", dataToSend, {
      headers: { Authorization: token },
    });
    if (response.data.status === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

export const patchUserInfo = async (token, dataToUpdate) => {
  try {
    const response = await instance.patch("/members", dataToUpdate, {
      headers: { Authorization: token },
    });
    if (response.data.status === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

// getMyBoardApi
export const getMyBoard = async (token) => {
  try {
    const response = await instance.get("/boards", {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

// getMyReiewApi
export const getMyReview = async (token) => {
  try {
    const response = await instance.get("/reviews/my", {
      headers: { Authorization: token },
    });
    // if (response.data.status !== "success") {
    //   throw new Error("Review update failed");
    // }
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

export const updateMyReview = async (
  reviewId,
  newContents,
  updatedRating,
  token
) => {
  console.log(reviewId);
  console.log(newContents);
  console.log(updatedRating);
  const updatedData = {
    contents: newContents,
    rating: updatedRating,
  };
  try {
    const response = await instance.put(`/reviews/${reviewId}`, updatedData, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw new Error("Review update failed");
  }
};

export const deleteMyReview = async (reviewId, token) => {
  try {
    const response = await instance.delete(`/reviews/${reviewId}`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw new Error("Review deletion failed");
  }
};

// getMyCollectionApi
export const getMyCollection = async (token) => {
  try {
    const response = await instance.get("/collections/wines", {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// postMyCollectionApi
export const saveMyCollection = async (dataToSend, token) => {
  try {
    const response = await instance.post(
      "/collections/update/category",
      dataToSend,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

// deleteMyCollectionApi
export const deleteMyCollection = async (dataToSend, token) => {
  try {
    const response = await instance.delete(
      "/collections/delete/wine",
      dataToSend,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

// 와인 상세정보 요청
export const getWineDetail = async (wineId) => {
  try {
    const response = await instance.get(`/wines/${wineId}/detail`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// 와인 컬랙션에 추가
export const addWineToFavorite = async (dataToSend, token) => {
  console.log(dataToSend, token);
  try {
    const response = await instance.post("/collections/add/wines", dataToSend, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

//와인 추천 리스트 조회
export const getRecommendedWineList = async () => {
  try {
    const token = sessionStorage.getItem("userTokenState");
    const response = await instance.get("/wines/recommendation", {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

export const fetchNearbyWineStores = async (longitude, latitude) => {
  try {
    const response = await fetch(
      `${process.env.API_KEY}winebars/around?lnt=${longitude}&lat=${latitude}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching nearby wine stores:", error);
  }
};

export default instance;
