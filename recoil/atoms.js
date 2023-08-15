import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

// Bearer Token을 담을 Recoil Atom 생성
export const userTokenState = atom({
  key: "userTokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// 와인 리스트 전역 상태 관리
export const wineListState = atom({
  key: "wineListState",
  default: [],
});

//한줄리뷰 전역 상태 관리
export const wineReviewListState = atom({
  key: "wineReviewListState",
  default: [],
});
