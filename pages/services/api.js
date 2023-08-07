import axios from "axios";

const instance = axios.create({
  baseURL: "https://warendy.shop",
  headers: {
    "Content-Type": "application/json",
  },
});

// 로그인 API 호출
export const postLogin = async (loginInform) => {
  console.log(loginInform);
  try {
    const response = await instance.post("/signin", loginInform);
    console.log(response);
    // localStorage.setItem("bearerToken", response.headers.authorization);
    return response.headers.authorization;
  } catch (error) {
    throw new Error("Signin failed");
    console.error("Error fetching data:", error);
    return null;
  }
};

// 회원 가입 API 호출
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

// 와인 컬렉션 API 호출
export const saveMyCollection = async (dataToSend, token) => {
  console.log(dataToSend, token);
  try {
    const response = await instance.post(
      "/collections/add/category",
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

// 와인 정보 요청
export const getWine = async (token) => {
  try {
    const response = await instance.get("/collections/wines", {
      headers: { Authorization: token },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export default instance;
