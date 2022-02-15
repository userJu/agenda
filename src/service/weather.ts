const APP_ID = "381a72ac573ec56b89a42c72d981a755";

const LAT = 33.44;
const LON = -94.04;
const EXCLUDE = "minutely,hourly,alerts";
const UNITS = "metric";

export function oneCallWeather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&units=${UNITS}&exclude=${EXCLUDE}&appid=${APP_ID}`
  ).then((response) => response.json());
}
