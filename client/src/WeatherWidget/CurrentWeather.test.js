import React from "react";
import { render, cleanup } from "react-testing-library";
import CurrentWeather from "./CurrentWeather";

const weather = {
  description: "lluvia ligera",
  icon: "10d",
  temp: 16.78,
  city: "San Nicolás"
};

afterEach(cleanup);

describe("CurrentWeather", () => {
  it("should display a loading message instead of current weather", () => {
    const { queryByText, queryByTestId } = render(
      <CurrentWeather loading={true} />
    );
    const loaderIndicator = queryByText(/Cargando/i);
    expect(loaderIndicator.innerHTML).toBeDefined();
    const weatherContainerElement = queryByTestId("current-weather");
    expect(weatherContainerElement).toBeNull();
  });
  it("should display a current weather instead of a loading message", () => {
    const { queryByText, queryByTestId } = render(
      <CurrentWeather loading={false} {...weather} />
    );
    const loaderIndicator = queryByText(/Cargando/i);
    expect(loaderIndicator).toBeNull();
    const weatherContainerElement = queryByTestId("current-weather");
    expect(weatherContainerElement).toBeDefined();
    const city = queryByText("San Nicolás");
    expect(city.innerHTML).toEqual(weather.city);
    const weatherDescription = queryByText("lluvia ligera");
    expect(weatherDescription.innerHTML).toEqual(weather.description);
    // TODO: Keep adding stuff here;
  });
});
