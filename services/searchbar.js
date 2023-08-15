import { atom } from "recoil";

export const searchBarState = atom({
  key: "searchBarState",
  default: false,
});

export const slideState = atom({
  key: "slideState",
  default: "slideout",
});
