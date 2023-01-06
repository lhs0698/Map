import { atom } from "recoil";

export const mapPosState = atom({
  key: "mapPos",
  default: {
    lat: 37.44510253603426,
    lng: 126.80013603123734,
  },
});
