import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100px;
  height: 100px;
`;

function Weather() {
  const [temp, setTemp] = useState();
  // const [weather, setWeather] = useState();

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&APPID=c589715e003eecd5a01a5884809d0bf8&units=metric"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const temp = data.main.temp;
        const temps = temp.toFixed([1]); // toFixed는 소수점 반올림 시 사용한다.
        // const weather = data.weather[0].main;
        setTemp(temps); //온도
        // setWeather(weather); //날씨
      });
  });
  return (
    <Container>
      날씨 :{temp}도
    </Container>
  );
}

export default Weather;
