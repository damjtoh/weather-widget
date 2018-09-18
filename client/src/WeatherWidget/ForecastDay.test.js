import React from "react";
import { render } from "react-testing-library";
import ForecastDay from "./ForecastDay";
import { format } from "../lib/date";

const forecast = {
  date: "2018-09-18 00:00",
  description: "lluvia ligera",
  icon: "10d",
  tempMin: 16.78,
  tempMax: 17.4
};

describe("ForecastDay", () => {
  const props = forecast;
  it("renders the ForecastDay", () => {
    const { queryByText } = render(<ForecastDay {...props} />);
    const day = queryByText(/martes/i);
    expect(day.innerHTML).toBe(format(forecast.date, "dddd"));
    const description = queryByText("lluvia ligera");
    expect(description.innerHTML).toBe(forecast.description);
  });
});
