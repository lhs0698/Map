import userEvent from "@testing-library/user-event";
import React, { useState } from "react";

function Search() {

  return (
    <div>
      <div>
        주소 : <input type="text" name="address" />
        <button style={{ marginLeft: "5px" }}>주소 입력하기</button>
      </div>
    </div>
  );
}


