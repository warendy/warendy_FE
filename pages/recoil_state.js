import { atom } from "recoil";

const searchBarState = atom({
  key: "searchBarState",
  default: false,
});

const slideState = atom({
  key: "slideState",
  default: "slideout",
});

export { searchBarState, slideState };
