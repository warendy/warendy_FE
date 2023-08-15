import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

//1. 아무것도 설정 안 하고 쓰는 경우
//localStorage에 저장되며, key 이름은 'recoil-persist'로 저장됨
// const { persistAtom } = recoilPersist();

//2. sessionStorage에 저장하고 싶은 경우
//Next.js를 쓴다면 sessionStorage는 아래와 같이 따로 설정 필요
const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

export const { persistAtom } = recoilPersist({
  key: "내맘대로 정하는 키 이름",
  storage: sessionStorage,
});

//Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
export const myAtom = atom({
  key: "myAtomKey",
  default: {
    email: null,
    token: null,
  },
  effects_UNSTABLE: [persistAtom],
});
