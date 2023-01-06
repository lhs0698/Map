import { atom } from "recoil";

export const mkPosState = atom({
  key: "mkPosState",
  default: {
    lat: null,
    lng: null,
  },
});
