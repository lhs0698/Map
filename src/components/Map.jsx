// const { kakao } = window;
import React, { useState } from "react";
import { MapTypeId, Map } from "react-kakao-maps-sdk";
import { IoCarSportSharp, IoLockClosed, IoLockOpen } from "react-icons/io5";
import styled from "styled-components";

import SearchInput from "./SearchInput";
// import Weather from "./Weather";

import { useRecoilValue } from "recoil";
import { mapPosState } from "../store/mapPos";

const Container = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  z-index: 999;
  top: 2%;
  left: 86%;
`;

const ButtonNav = styled.div`
  width: 180px;
  height: 60px;
  background-color: #f5f5f5;
  border-radius: 25px;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EventButton = styled.button`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid;
  background-color: #ffffff;
  margin: 10px;
`;

function Maps() {
  console.log("맵 컴포넌트 생성");
  const [mapTypeId, setMapTypeId] = useState(); // 지도 타입
  const [draggable, setDraggable] = useState(true); // 지도 드래그 이동
  const [zoomable, setZoomable] = useState(true); // 지도 확대 축소
  // const [position, setPosition] = useState({
  //   lat: null,
  //   lng: null,
  // }); // 마커 생성

  const mapPos = useRecoilValue(mapPosState);

  // 교통상황 버튼
  const traffifBtn = () => {
    if (!mapTypeId) {
      setMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    } else {
      setMapTypeId(false);
    }
  };
  // 지도 이동 및 확대 축소 막기
  const draggBtn = () => {
    if (!draggable) {
      setDraggable(true);
      setZoomable(true);
    } else {
      setDraggable(false);
      setZoomable(false);
    }
  };

  return (
    <>
      <Map
        center={{ lat: mapPos.lat, lng: mapPos.lng }}
        style={{
          width: "100%",
          height: "100vh",
        }}
        level={4} // 지도의 확대 레벨
        isPanto={true}
        draggable={draggable}
        zoomable={zoomable}
      >
        {mapTypeId && <MapTypeId type={mapTypeId} />}

        <Container>
          <ButtonNav>
            <EventButton onClick={traffifBtn}>
              {mapTypeId ? (
                <IoCarSportSharp size="26" color="#FF4500" />
              ) : (
                <IoCarSportSharp size="26" />
              )}
            </EventButton>
            <EventButton onClick={draggBtn}>
              {draggable ? (
                <IoLockOpen size="26" />
              ) : (
                <IoLockClosed size="25" color="#FF4500" />
              )}
            </EventButton>
          </ButtonNav>
        </Container>

        <SearchInput />
      </Map>
      {/* <Weather /> */}
    </>
  );
}

export default Maps;
