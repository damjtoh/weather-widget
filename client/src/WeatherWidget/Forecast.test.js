import React from "react";
import { render, cleanup } from "react-testing-library";
import Forecast from "./Forecast";

const days = [
  {
    date: "2018-09-18 00:00",
    description: "lluvia ligera",
    icon: "10d",
    tempMin: 16.78,
    tempMax: 17.4
  },
  {
    date: "2018-09-18 00:00",
    description: "lluvia ligera",
    icon: "10d",
    tempMin: 16.78,
    tempMax: 17.4
  },
  {
    date: "2018-09-18 00:00",
    description: "lluvia ligera",
    icon: "10d",
    tempMin: 16.78,
    tempMax: 17.4
  },
  {
    date: "2018-09-18 00:00",
    description: "lluvia ligera",
    icon: "10d",
    tempMin: 16.78,
    tempMax: 17.4
  },
  {
    date: "2018-09-18 00:00",
    description: "lluvia ligera",
    icon: "10d",
    tempMin: 16.78,
    tempMax: 17.4
  }
];

afterEach(cleanup);

describe("Forecast", () => {
  it("should display a loading message instead of ForecastDays elements", () => {
    const { queryByText, queryAllByTestId } = render(
      <Forecast days={[...days]} loading={true} />
    );
    const title = queryByText(/Pronostico/i);
    expect(title).toBeDefined();
    const loaderIndicator = queryByText(/Cargando/i);
    expect(loaderIndicator.innerHTML).toBeDefined();
    const forecastDaysElements = queryAllByTestId("forecast-day");
    expect(forecastDaysElements).toHaveLength(0);
  });

  it("should display 5 forecastDays instead of a loader indicator", () => {
    const { queryByText, queryAllByTestId } = render(
      <Forecast days={[...days]} loading={false} />
    );
    const loaderIndicator = queryByText(/Cargando/i);
    expect(loaderIndicator).toBeNull();
    const forecastDaysElements = queryAllByTestId("forecast-day");
    expect(forecastDaysElements).toHaveLength(5);
  });
});
