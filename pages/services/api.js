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

    return response.data;
  } catch (error) {
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
    console.error("Error fetching data:", error);
    return null;
  }
};

export default instance;
