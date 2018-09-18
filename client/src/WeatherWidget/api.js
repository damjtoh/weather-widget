import axios from "axios";

export const fetchWeather = async location => {
  return await axios
    .get(
      `${process.env.REACT_APP_API_URL}/current/${
        !location || location === "current" ? "" : location
      }`
    )
    .then(res => res.data);
};
export const fetchForecast = async location => {
  return await axios
    .get(
      `${process.env.REACT_APP_API_URL}/forecast/${
        !location || location === "current" ? "" : location
      }`
    )
    .then(res => res.data);
};
