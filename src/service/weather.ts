const APP_ID = "381a72ac573ec56b89a42c72d981a755";

const EXCLUDE = "minutely,hourly,alerts";
const UNITS = "metric";

export function oneCallWeather(LAT: number, LON: number) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&units=${UNITS}&exclude=${EXCLUDE}&appid=${APP_ID}`
  ).then((response) => response.json());
}
