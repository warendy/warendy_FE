import createRecoilPersist from "zustand-persist";
import { recoilPersist } from "recoil";

const { persistAtomTree } = createRecoilPersist({
  key: "recoil-persist", // 저장할 키를 지정합니다.
  storage: sessionStorage, // 세션 저장소를 사용합니다.
});

export default function RecoilPersistWrapper({ children }) {
  const { RecoilRoot } = recoilPersist(persistAtomTree);

  return <RecoilRoot>{children}</RecoilRoot>;
}
