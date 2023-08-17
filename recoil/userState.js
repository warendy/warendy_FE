import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const userIdState = atom({
  key: "userIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
console.log(userIdState);
