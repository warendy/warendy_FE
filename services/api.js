import axios from "axios";

const instance = axios.create({
  baseURL: "https://warendy.shop",
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(function (config) {
//   const accessToken = sessionStorage.getItem("userStateToken");
//   config.headers.common["Authorization"] = accessToken;
//   return config;
// });

// postSigninApi
export const postLogin = async (loginInform) => {
  try {
    const response = await instance.post("/signin", loginInform);
    return response.headers.authorization;
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
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("getUserInfo failed");
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
export const postMyBoard = async (dataToSend, token) => {
  try {
    const response = await instance.post("/boards", dataToSend);
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

// getMyBoardApi
export const getMyBoard = async (token) => {
  try {
    const response = await instance.get(
      "/boards",
      // dataToSend,
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

// getMyReiewApi
export const getMyReview = async (token) => {
  try {
    const response = await instance.get("/reviews/my", {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

// getWineReviewsApi
export const getWineReviews = async (token) => {
  try {
    const response = await instance.get("/reviews/my", {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

// getMyWineListApi
export const getMyWineList = async (token) => {
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
    const response = await instance.post("/collections/add/wine", dataToSend, {
      headers: { Authorization: token },
    });
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