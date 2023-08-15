import { atom } from "recoil";

export const emailState = atom({
  key: "emailState",
  default: "",
});

export const passwordState = atom({
  key: "passwordState",
  default: "",
});

export const passwordConfirmState = atom({
  key: "passwordConfirmState",
  default: "",
});

export const nicknameState = atom({
  key: "nicknameState",
  default: "",
});

export const isValidEmailState = atom({
  key: "isValidEmailState",
  default: true,
});

export const isValidPasswordState = atom({
  key: "isValidPasswordState",
  default: true,
});

export const isValidNicknameState = atom({
  key: "isValidNicknameState",
  default: true,
});
