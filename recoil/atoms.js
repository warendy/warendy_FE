import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

export const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const userTokenState = atom({
  key: "userTokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const wineListState = atom({
  key: "wineListState",
  default: [],
});
