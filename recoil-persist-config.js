import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

export const { persistAtom } = recoilPersist({
  key: "내맘대로 정하는 키 이름",
  storage: sessionStorage,
});

export const myAtom = atom({
  key: "myAtomKey",
  default: {
    email: null,
    token: null,
  },
  effects_UNSTABLE: [persistAtom],
});
