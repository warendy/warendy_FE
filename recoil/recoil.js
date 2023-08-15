import createRecoilPersist from "zustand-persist";
import { recoilPersist } from "recoil";

const { persistAtomTree } = createRecoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

export default function RecoilPersistWrapper({ children }) {
  const { RecoilRoot } = recoilPersist(persistAtomTree);

  return <RecoilRoot>{children}</RecoilRoot>;
}
