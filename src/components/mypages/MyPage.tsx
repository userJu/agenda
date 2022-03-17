import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { fbInit, userInfo } from "../../atoms";
import AppHeader from "../AppHeader";
import { useQuery } from "react-query";
import { oneCallWeather } from "../../service/weather";
import moment from "moment";
import AppNavbar from "../AppNavbar";

//모바일부터 코딩

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.whiteColor};
`;

const MyHome = styled.div`
  width: 100%;
  height: 95%;
`;

const UsefulThings = styled.div`
  width: 100%;
  height: 40%;
`;

const Weather = styled.div`
  width: 30vw;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const CurWeather = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h3 {
    margin-left: 0.3rem;
  }
`;

const DailyWeather = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const DateName = styled.span`
  font-weight: bold;
`;

interface IDailyWeather_weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
interface IDailyWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: { day: number; night: number; eve: number; morn: number };
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  uvi: number;
  weather: IDailyWeather_weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface ICurrentWeather_weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
interface ICurrentWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: ICurrentWeather_weather[];
}

interface IWeather {
  current: ICurrentWeather;
  daily: IDailyWeather[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

const MyPage = () => {
  const userI = useRecoilValue(userInfo);
  const navigate = useNavigate();
  const ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const { isLoading, data } = useQuery<IWeather>(
    "daily_weather",
    () => oneCallWeather(lat, lon) // useQuery에서 위치 사용하기
  );
  // console.log(lat, lon);
  // console.log(isLoading);

  const success = (event: any) => {
    const latitude = event.coords.latitude;
    const longitude = event.coords.longitude;
    if (latitude !== 0 && longitude !== 0) {
      setLat(latitude);
      setLon(longitude);
    }
  };
  const error = (event: any) => {
    console.log("error");
  };

  useEffect(() => {
    if (userI.uid === "") {
      navigate("/");
    } else {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(success, error);
      }
    }
  }, [userI]);

  return (
    <>
      {userI ? (
        <Container>
          <AppHeader />
          <MyHome>
            <UsefulThings>
              {isLoading ? (
                <h1>Loading</h1>
              ) : (
                <Weather>
                  <CurWeather>
                    <img
                      src={`http://openweathermap.org/img/wn/${data?.current.weather[0].icon}@2x.png`}
                    />
                    <h3>{data?.current.weather[0].main}</h3>
                    <h3>{data?.current.temp}</h3>
                  </CurWeather>
                  <DailyWeather>
                    {data?.daily.slice(0, 5).map((day) => (
                      <li key={day.dt}>
                        <DateName>{ddd[moment(day.dt * 1000).day()]}</DateName>
                        <img
                          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                          alt=""
                        />
                        <span>
                          {day.temp.max.toFixed(0)} / {day.temp.min.toFixed(0)}{" "}
                        </span>
                      </li>
                    ))}
                  </DailyWeather>
                </Weather>
              )}
            </UsefulThings>
            <AppNavbar />
          </MyHome>
        </Container>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
};

export default MyPage;
