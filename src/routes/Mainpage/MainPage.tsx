import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { IUserInfo } from "../../atoms";
import AppNavbar from "../../components/MainpageParts/MainNavbar";
import MyPage from "../../components/MainpageParts/MainTop";
import { oneCallWeather } from "../../service/weather";

interface ICurrentWeather_weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

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

export interface IWeather {
  current: ICurrentWeather;
  daily: IDailyWeather[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

interface IMainPage {
  userI: IUserInfo;
}

const MainPage = ({ userI }: IMainPage) => {
  const navigate = useNavigate();

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const { isLoading, data } = useQuery<IWeather | undefined>(
    "daily_weather",
    () => oneCallWeather(lat, lon) // useQuery에서 위치 사용하기
  );

  const getUserPosition = (event: any) => {
    setLat(event.coords.latitude);
    setLon(event.coords.longitude);
  };

  useEffect(() => {
    if (userI.uid === "") {
      console.log(userI);

      navigate("/");
    }

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(getUserPosition, () => {
        console.log("error");
      });
    }
  }, [userI]);

  return (
    <>
      <MyPage isLoading={isLoading} data={data} />
      <AppNavbar />
    </>
  );
};

export default MainPage;
