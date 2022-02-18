import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import {
  Link,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "../../atoms";
import ShowCalendar from "./ShowCalendar/ShowCalendar";
import { auth } from "../../service/fireBase";
import { useState } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import ShowToDo from "./ShowTodo/ShowToDo";
import ShowProject from "./ShowProject/ShowProject";
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
  border: 1px solid black;
`;

const UsefulThings = styled.div`
  width: 100%;
  height: 40%;
`;

const Weather = styled.div`
  width: 100%;
  img {
    width: 3rem;
    height: 3rem;
  }
`;

const CurWeather = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  justify-content: space-between;
  align-items: center;
`;

const DailyWeather = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  li {
    display: flex;
    flex-direction: column;
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
  const [userId, setUserId] = useRecoilState(userInfo);
  const navigate = useNavigate();
  const ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const { isLoading, data } = useQuery<IWeather>(
    "daily_weather",
    oneCallWeather
  );

  useEffect(() => {
    if (userId === "") {
      navigate("/");
    }
  }, [userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        navigate("/");

        console.log("로그인을 해주세요");
      }
    });
  }, []);

  // setInterval 말고 다른 방법으로 계속 시간 + 날씨를 찍을 방법
  // console.log(moment(data?.current.dt! * 1000).format("HH:mm"));
  //
  //

  // const clock = setTimeout(() => {
  //   console.log(nowTime);
  // }, 1000;
  // return () => clearTimeout(clock);
  // setInterval을 쓸 수 없는 이유들

  // setInterval(() => {
  //   console.log(nowTime);
  //   // nowtime을 useState를 이용해서 계속 업데이트 하는건 좋지 않을 것 같다는 생각이 든다
  //   // 이유
  //   // 1. 계속 state가 업데이트되면서 재랜더될 가능성이 높음 => memo로 해결할 수 있을까?
  // }, 1000;
  return (
    <>
      {userId ? (
        <Container>
          <AppHeader />
          <Sidebar />
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
                    <h3>{data?.current.temp} ºC</h3>
                  </CurWeather>
                  <DailyWeather>
                    {data?.daily.slice(0, 5).map((day) => (
                      <li key={day.dt}>
                        <DateName>{ddd[moment(day.dt * 1000).day()]}</DateName>
                        <img
                          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                          alt=""
                        />
                        <span>{day.temp.max.toFixed(1)} ºC </span>
                        <span> {day.temp.min.toFixed(1)} ºC</span>
                      </li>
                    ))}
                  </DailyWeather>
                </Weather>
              )}
              <div>Clock</div>
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
