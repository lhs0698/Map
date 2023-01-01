// const { kakao } = window;
import React, { useState } from "react";
import { MapTypeId, Map, MapMarker } from "react-kakao-maps-sdk";
import { IoCarSportSharp } from "react-icons/io5";
import styled from "styled-components";

import Weather from "./Weather";

const ButtonNav = styled.div`
  width: 180px;
  height: 60px;
  background-color: #F5F5F5;
  border-radius: 25px;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid;
  background-color: #FFFFFF;
  margin: 10px;
`

function Maps() {
  const [mapTypeId, setMapTypeId] = useState(); // 지도 타입
  const [position, setPosition] = useState({
    lat: null,
    lng: null,
  }); // 마커 생성
  const [searchAddress, SetSearchAddress] = useState();
  const [state, setState] = useState({
    center: { lat: 37.44510253603426, lng: 126.80013603123734 }, // 지도의 초기 위치
    isPanto: true, // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
  });
  const [addressList, setAddressList] = useState([]); //주소 검색

  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const SearchMap = () => {
    // 주소-좌표간 변환 서비스 객체를 생성한다.
    const geocoder = new kakao.maps.services.Geocoder();
    // result = 결과 목록(array), status = 응답 코드
    let callback = function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        // console.log(newSearch)
        // 검색이 완료 됐으면 지도의 위치를 setState를 이용해 지도 위치 변경
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
        // 주소 이동 button 틀릭 시 경도 위도 가져오기
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // console.log(coords)
        setPosition({
          ...position,
          lat: coords.Ma,
          lng: coords.La,
        });
        // 관련 주소 목록 가져오기
        const List = result;
        setAddressList((state) => [...state, ...List]);
      } else {
        // 등록된 주소가 없을 시 alert창으로 알림
        alert("등록된 주소가 없습니다. 다시 입력해주세요");
      }
    };
    geocoder.addressSearch(`${searchAddress}`, callback);
  };

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value);
  };

  // 교통상황 버튼
  const traffifBtn =  () => {
    if(!mapTypeId) {
      setMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
    } else {
      setMapTypeId(false)
    }
  }
  return (
    <>
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "90vh",
        }}
        level={4} // 지도의 확대 레벨
        isPanto={state.isPanto}
      >
        {mapTypeId && <MapTypeId type={mapTypeId} />}
        {position && <MapMarker position={position} />}

        <ButtonNav>
          <Button onClick={traffifBtn}>
            {mapTypeId ? <IoCarSportSharp size='26' color="#00FF00"/> : <IoCarSportSharp size='26'/>}
          </Button>
          <Button
            onClick={() => {setMapTypeId(false)}}>
            효과 지우기
          </Button>
        </ButtonNav>
        <div>
          주소 : <input onChange={handleSearchAddress} />
          <button onClick={SearchMap} style={{ margin: "10px" }}>
            주소로 이동
          </button>
        </div>
        
        <div>
          {addressList.map((eachAddress, index) => {
            return (
              // jsx에서 map함수 사용 시 key를 넣어줘야하는데 이 값은 고유한 값이어야한다. 고유한 값이 없다면 함수를 사용할 때 설정하는 콜백 함수의 두번째 파라미터 index를 key로 설정한다
              <div key={index}>
                <span>{eachAddress.address_name}</span>
              </div>
            );
          })}
        </div>
        <Weather></Weather>
      </Map>
    </>
  );
}

// 날씨 데이터도 가져와 보기

export default Maps;
