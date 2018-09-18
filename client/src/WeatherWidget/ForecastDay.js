import React from "react";
import { format } from "../lib/date";
import PropTypes from "prop-types";

const ForecastDay = ({ date, description, icon, tempMin, tempMax }) => {
  return (
    <div data-testid="forecast-day">
      <h3 title={format(date, "DD/MM/YYYY")}>{format(date, "dddd")}</h3>
      <img
        src={`http://openweathermap.org/img/w/${icon}.png`}
        alt={description}
      />
      <div>
        {tempMin}° / {tempMax}°
      </div>
      <div>{description}</div>
    </div>
  );
};

ForecastDay.propTypes = {
  date: PropTypes.string.isRequired,
  tempMin: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ForecastDay;
