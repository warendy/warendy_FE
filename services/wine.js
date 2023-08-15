import { atom } from "recoil";

const wineState = atom({
  key: "wineState",
  default: {
    id: 1,
    name: "Chablis 1er Cru Vaillons",
    vintage: 2001,
    price: 32000,
    picture: "url",
    body: 2.2,
    dry: 3.3,
    tannins: 3.1,
    acidity: 2,
    alcohol: 12,
    grapes: "Chablis",
    pairing: ["beef", "seafood"],
    region: "france",
    type: "white",
    winery: "Domaine Besson",
    rating: 4.2,
  },
});
