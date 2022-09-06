import React, { useEffect, useState } from "react";
import { MapTypeId, Map } from "react-kakao-maps-sdk";
const { kakao } = window;

function MapArea() {
  const [mapTypeId, setMapTypeId] = useState();

  return (
    <>
      <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 37.566826,
            lng: 126.9786567,
          }}
          style={{
            width: "100%",
            height: "90vh",
          }}
          level={4} // 지도의 확대 레벨
        >
          {mapTypeId && <MapTypeId type={mapTypeId}/>}
        </Map>
        <button
          onClick={() => {
            setMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
          }}
        >
          교통정보 보기 test
        </button>
    </>
  );
}

export default MapArea;
