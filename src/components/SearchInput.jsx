import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useSetRecoilState, useRecoilState } from "recoil";
import { mapPosState } from "../store/mapPos";
import { mkPosState } from "../store/mkPos";
import { MapMarker } from "react-kakao-maps-sdk";

const SearchContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
  top: 10px;
  left: 38%;
`;
const Input = styled.input`
  width: 300px;
  height: 30px;
  border: 2px solid;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const SearchBtn = styled.button`
  width: 60px;
  height: 38px;
  border: 2px solid;
  border-radius: 40px;
  background-color: #ffffff;

  .SearchIcon {
    font-size: 26px;
    &:hover {
      color: #ff4500;
    }
  }
`;

const ListTable = styled.div`
  width: 296px;
  margin: 5px;
  z-index: 999;
  position: absolute;
  top: 7%;
  left: 38.8%;

  #box:active {
    border: 1px solid;
    text-shadow: 0px 0px 10px #9900ff;
    box-shadow: 1px 2px 4px gray;
  }
`;
const ListBtn = styled.button`
  background-color: #ffffff;
  width: 300px;
  padding: 5px;
  border: 1px solid;
  border-radius: 10px;
  margin: 2px;
  cursor: pointer;
`;
const AddList = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
`;

const SearchInput = () => {
  console.log("검색 컴포넌트 생성");

  const [searchAddress, setSearchAddress] = useState();
  const setMapPosState = useSetRecoilState(mapPosState);

  const [position, setPosition] = useRecoilState(mkPosState);
  const [addressList, setAddressList] = useState([]); //주소 검색

  const handleSearchAddress = (e) => {
    setSearchAddress(e.target.value);
  };

  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const SearchMap = () => {
    // 주소-좌표간 변환 서비스 객체를 생성한다.
    const geocoder = new kakao.maps.services.Geocoder();
    // result = 결과 목록(array), status = 응답 코드
    let callback = function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        console.log(result);

        // 검색이 완료 됐으면 지도의 위치를 setState를 이용해 지도 위치 변경
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setMapPosState({
          lat: newSearch.y,
          lng: newSearch.x,
        });
        // 주소 이동 button 틀릭 시 경도 위도 가져오기
        setPosition({
          ...position,
          lat: coords.Ma,
          lng: coords.La,
        });
        // 관련 주소 목록 가져오기
        const list = result;
        // setAddressList((state) => [...state, ...List]);
        setAddressList(list);
      } else {
        // alert("등록된 주소가 없습니다. 다시 입력해주세요");
      }
    };
    geocoder.addressSearch(`${searchAddress}`, callback);
  };

  return (
    <>
      <SearchContainer>
        <Input
          onChange={handleSearchAddress}
          value={searchAddress}
          placeholder="주소를 입력하세요"
        />
        <SearchBtn onClick={SearchMap} style={{ margin: "5px" }}>
          <IoSearch className="SearchIcon" />
        </SearchBtn>
        {position && <MapMarker position={position} />}
      </SearchContainer>
      <ListTable>
        {addressList.map((eachAddress, index) => {
          return (
            <ListBtn key={index} id="box">
              <AddList>{eachAddress.address_name}</AddList>
            </ListBtn>
          );
        })}
      </ListTable>
    </>
  );
};

export default SearchInput;
