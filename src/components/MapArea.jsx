import React, { useState } from "react";
import { MapTypeId, Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;

function MapArea() {
  const [mapTypeId, setMapTypeId] = useState();
  const [position, setPosition] = useState();

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
        onClick={(_t, mouseEvent) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {mapTypeId && <MapTypeId type={mapTypeId} />}
        {position && <MapMarker position={position} />}
      </Map>
      <button
        onClick={() => {
          setMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        }}
      >
        교통정보 보기
      </button>
      <button
        onClick={() => {
          setMapTypeId(false);
        }}
      >
        효과 지우기
      </button>
      {position && <p>{'클릭한 위치의 위도는 ' + position.lat + ' 이고, 경도는 ' + position.lng + ' 입니다'}</p>}
    </>
  );
}

export default MapArea;
