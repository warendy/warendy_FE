import axios from "axios";
import { userTokenState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

const instance = axios.create({
  baseURL: "https://warendy.shop",
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰을 포함한 헤더 생성 함수
const headersWithToken = () => {
  const token = useRecoilValue(userTokenState);
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const requestWithToken = async (method, url, data = null) => {
  const headers = headersWithToken();

  try {
    const response = await instance.request({
      method,
      url,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postApi = async (path, data) => {
  try {
    const response = await instance.post(path, data);
    return response.data;
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};

export const getApi = async (path) => {
  try {
    return requestWithToken("get", path);
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
};
