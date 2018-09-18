import axios from "axios";
import { URLSearchParams } from "url";
import { toUTCDate } from "../lib/util";

export const generateParams = ({ lat, lon }) =>
  new URLSearchParams({
    appid: process.env.OPENWEATHER_API_KEY,
    units: "metric",
    lang: "es",
    lat,
    lon
  });

export const getWeather = ({ lat, lon }) => {
  const params = generateParams({ lat, lon });
  return axios
    .get(`http://api.openweathermap.org/data/2.5/weather?${params}`)
    .then(res => res.data)
    .then(rawWeather => ({
      description: rawWeather.weather[0].description,
      icon: rawWeather.weather[0].icon,
      temp: Math.round(rawWeather.main.temp),
      city: rawWeather.name
    }))
    .catch(err => {
      console.error("Error on getting weather: ", err);
      throw err;
    });
};
export const getForecast = ({ lat, lon }) => {
  const params = generateParams({ lat, lon });
  return axios
    .get(`http://api.openweathermap.org/data/2.5/forecast?${params}`)
    .then(res => res.data)
    .then(rawWeather => {
      const reducedByDate = rawWeather.list.reduce(function(m, d) {
        const date = d.dt_txt.match(/(\d{4,4}-\d{2,2}-\d{2,2})/)[0];
        if (!m[date]) {
          m[date] = {
            date: toUTCDate(d.dt),
            description: d.weather[0].description,
            icon: d.weather[0].icon,
            tempMin: Math.round(d.main.temp_min),
            tempMax: Math.round(d.main.temp_max)
          };
          return m;
        }
        m[date].tempMin = Math.round(
          Math.min(m[date].tempMin, d.main.temp_min)
        );
        m[date].tempMax = Math.round(
          Math.max(m[date].tempMax, d.main.temp_max)
        );
        return m;
      }, {});

      const sortedForecastByDate = Object.values(reducedByDate).sort(
        (a, b) => +new Date(a.date) - +new Date(b.date)
      );
      if (sortedForecastByDate.length > 5) sortedForecastByDate.shift();
      return sortedForecastByDate;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};
