import React, {useState} from "react"
import {Map, MapTypeId, MapMarker, Roadview} from "react-kakao-maps-sdk";

function View(){
  const [isError, setIsError] = useState(false)

  const [center, setCenter] = useState({
    lat: 33.450422139819736,
    lng: 126.5709139924533,
  })

  return (
    <div style={{ display: "flex" }}>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.44515668255684,
          lng: 126.80018674028275,
        }}
        style={{
          // 지도의 크기
          width: isError ? "100%" : "50%",
          height: "600px",
        }}
        level={3}
        onClick={(_, mouseEvent) => {
          setCenter({
            // @ts-ignore
            lat: mouseEvent.latLng.getLat(),
            // @ts-ignore
            lng: mouseEvent.latLng.getLng(),
          })
          setIsError(false)
        }}
      >
        <MapMarker
          position={center}
          draggable={true}
          onDragEnd={(marker) => {
            setCenter({
              // @ts-ignore
              lat: marker.getPosition().getLat(),
              // @ts-ignore
              lng: marker.getPosition().getLng(),
            })
            setIsError(false)
          }}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
            size: { width: 26, height: 46 },
            options: {
              spriteSize: { width: 1666, height: 168 },
              spriteOrigin: { x: 705, y: 114 },
              offset: { x: 13, y: 46 },
            },
          }}
        />
      </Map>
      <Roadview // 로드뷰를 표시할 Container
        position={{ ...center, radius: 50 }}
        style={{
          // 지도의 크기
          width: isError ? "0" : "50%",
          height: "500px",
        }}
        onErrorGetNearestPanoId={() => setIsError(true)}
      ></Roadview>
    </div>
  )
}

export default View;
