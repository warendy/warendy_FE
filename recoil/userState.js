import { atom } from "recoil";

export const userIdState = atom({
  key: "userIdState",
  default: null,
});
console.log(userIdState);
