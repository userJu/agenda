import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { fbInit, myProgress, userInfo } from "../../atoms";
import AppHeader from "../AppHeader";
import { useQuery } from "react-query";
import { oneCallWeather } from "../../service/weather";
import moment from "moment";
import AppNavbar from "../AppNavbar";
import ApexCharts from "react-apexcharts";
import {
  setDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { fStore } from "../../service/fireBase";
import { domMax } from "framer-motion";

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
  width: 100vw;
  display: flex;
  margin-top: 1rem;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const CurWeather = styled.div`
  display: flex;
  flex: 0.3;
  flex-direction: row;
  align-items: center;
  h3 {
    margin-left: 0.3rem;
  }
`;

const DailyWeather = styled.ul`
  display: flex;
  flex-direction: row;
  flex: 0.7;
  padding-left: 10px;
  li {
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
  }
`;

const DateName = styled.span`
  font-weight: bold;
`;

const Chart = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid pink;
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

const todoProgress = [
  {
    name: "0",
    data: [],
  },

  {
    name: "1",
    data: [],
  },
  {
    name: "2",
    data: [],
  },
  {
    name: "3",
    data: [],
  },
  {
    name: "4",
    data: [],
  },
  {
    name: "5",
    data: [],
  },
  {
    name: "6",
    data: [
      {
        x: "W1",
        y: 43,
      },
    ],
  },
];

// interface IChartInput {
//   name: number;
//   data: { x: number; y: number }[];
// }

const MyPage = () => {
  const userI = useRecoilValue(userInfo);
  const navigate = useNavigate();
  const ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // const [atomGoals, setAtomGoals] = useRecoilState(myProgress);
  // const [chartInput, setChartInput] = useState<IChartInput>({
  //   name: 0,
  //   data: [{ x: 0, y: 0 }],
  // });
  // const [chartData, setChartData] = useState<IChartInput[]>([]);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const { isLoading, data } = useQuery<IWeather>(
    "daily_weather",
    () => oneCallWeather(lat, lon) // useQuery에서 위치 사용하기
  );

  const success = (event: any) => {
    const latitude = event.coords.latitude;
    const longitude = event.coords.longitude;
    if (latitude !== 0 && longitude !== 0) {
      setLat(latitude);
      setLon(longitude);
    }
  };

  // // ToDo Progress 데이터
  // const charts = () => {
  //   console.log(atomGoals);
  //   let fal = 1;
  //   let tru = 0;
  //   atomGoals.map((time) => {
  //     if (moment(time.id).isSame(new Date(), "day")) {
  //       time.fin ? (tru += 1) : (fal += 1);
  //     }
  //   });
  //   setChartInput({
  //     name: moment().day(),
  //     data: [{ x: moment().weeksInYear(), y: tru / fal }],
  //   });
  // };
  // // ToDo Progress 데이터 firebase에 업로드
  // const progressRef = collection(fStore, `${userI.uid}`);

  // const uploadTodoProgress = async () => {
  //   await setDoc(doc(progressRef, "todoProgress"), {
  //     chartInput,
  //   });
  // };

  // // ToDo Progress 데이터 firebase에서 가져오기
  // const downloadTodoProgress = async () => {
  //   const array = [];
  //   await onSnapshot(doc(progressRef, "todoProgress"), (doc) => {
  //     console.log(doc.data());
  //   });
  // };

  useEffect(() => {
    if (userI.uid === "") {
      navigate("/");
    } else {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(success, () => {
          console.log("error");
        });
      }
    }
  }, [userI]);

  // useEffect(() => {
  //   charts();
  //   uploadTodoProgress();
  //   downloadTodoProgress();
  // }, [atomGoals]);

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
              {/* <Chart>
                <ApexCharts
                  type="heatmap"
                  height="100%"
                  options={{
                    colors: ["#008FFB"],
                    title: {
                      text: "ToDo Progress",
                    },
                    chart: {
                      width: 500,
                    },
                  }}
                  series={todoProgress}
                ></ApexCharts>
              </Chart> */}
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
