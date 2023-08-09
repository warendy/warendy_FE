import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "sessionStorage", // 고유한 key 값
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
  key: "wineListState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
