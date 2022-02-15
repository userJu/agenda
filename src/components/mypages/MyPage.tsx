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
  background-color: gray;
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
const NavBar = styled(motion.ul)`
  display: flex;
  flex-direction: row;
  height: 2rem;
  li {
    flex: 30%;
    position: relative;
    button {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      color: ${(props) => props.theme.colors.whiteColor};
      background-color: ${(props) => props.theme.colors.grayColor};
    }
  }
`;

const Line = styled(motion.div)`
  width: 30%;
  height: 2px;
  background-color: ${(props) => props.theme.colors.whiteColor};
  position: absolute;
  bottom: 3px;
  left: 0;
  right: 0;
  margin: auto;
  /* 이부분 기억하기!! */
  /* left: 0;
  right: 0;
  margin: auto; */
  /* transform: scale(5); // transform이 안먹는다 */
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
  const { isLoading, data } = useQuery<IWeather>(
    "daily_weather",
    oneCallWeather
  );

  const match = useMatch(`/mypage/*`)?.params["*"];
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
  console.log(data?.daily[0].dt);
  console.log((data?.daily[0].dt! / (60 * 60 * 24)) % 30);
  console.log(moment(data?.daily[0].dt! * 1000).day());
  const ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
            </UsefulThings>
            <NavBar>
              <li>
                <Link to={`/mypage/calendar`}>
                  <button>calendar</button>
                </Link>
                {match === "calendar" && <Line layoutId="line" />}
              </li>
              <li>
                <Link to={`/mypage/todo`}>
                  <button>todo</button>
                </Link>
                {match === "todo" && <Line layoutId="line" />}
              </li>
              <li>
                <Link to={`/mypage/project`}>
                  <button>project</button>
                </Link>
                {match === "project" && <Line layoutId="line" />}
              </li>
            </NavBar>
            <Routes>
              <Route path="calendar" element={<ShowCalendar />} />
              <Route path="todo" element={<ShowToDo userId={userId} />} />
              <Route path="project" element={<ShowProject userId={userId} />} />
            </Routes>
          </MyHome>
        </Container>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
};

export default MyPage;
