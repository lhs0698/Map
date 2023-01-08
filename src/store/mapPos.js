import { atom } from "recoil";

// map 기본 위치 지정
export const mapPosState = atom({
  key: "mapPos",
  default: {
    lat: 37.44510253603426,
    lng: 126.80013603123734,
  },
});
