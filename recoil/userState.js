import { atom } from "recoil";

export const userIdState = atom({
  key: "userIdState",
  default: null,
});

export const userIdState = atom({
  key: "userIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
