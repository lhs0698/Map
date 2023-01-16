import React from "react";
import Map from "./components/Map";
import { RecoilRoot } from "recoil";
import AutoComplete from "./components/autoComplete";

function App() {
  return (
    <RecoilRoot>
      <Map></Map>
      {/* <AutoComplete></AutoComplete> */}
    </RecoilRoot>
  );
}

export default App;
