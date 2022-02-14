const APP_ID = "381a72ac573ec56b89a42c72d981a755";

export function weather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly,alerts&appid=${APP_ID}`
  ).then((response) => response.json());
}
