import { atom } from "recoil";

// map 마커 표시
export const mkPosState = atom({
  key: "mkPosState",
  default: {
    lat: null,
    lng: null,
  },
});
