import React from "react";
import { render, cleanup, wait } from "react-testing-library";
import WeatherWidget from "./WeatherWidget";
import axiosMock from "axios";

const weatherResponse = {
  description: "bruma",
  icon: "50d",
  temp: 17,
  city: "Colegiales"
};

// TODO: add snapshot tests.

const forecastResponse = [
  {
    date: "2018-09-18 00:00",
    description: "cielo claro",
    icon: "01n",
    tempMin: 14,
    tempMax: 23
  },
  {
    date: "2018-09-19 00:00",
    description: "algo de nubes",
    icon: "02n",
    tempMin: 12,
    tempMax: 21
  },
  {
    date: "2018-09-20 00:00",
    description: "cielo claro",
    icon: "02n",
    tempMin: 8,
    tempMax: 18
  },
  {
    date: "2018-09-21 00:00",
    description: "cielo claro",
    icon: "01n",
    tempMin: 11,
    tempMax: 20
  },
  {
    date: "2018-09-22 00:00",
    description: "lluvia ligera",
    icon: "10n",
    tempMin: 15,
    tempMax: 18
  }
];

afterEach(cleanup);

describe("WeatherWidget", () => {
  const props = {};
  it("should render location selector with default description as the current one", async () => {
    axiosMock.get
      .mockReturnValueOnce(
        new Promise(resolve => resolve({ data: weatherResponse }))
      )
      .mockReturnValueOnce(
        new Promise(resolve => resolve({ data: forecastResponse }))
      );
    const { queryAllByText, getByAltText, queryByText, getByText } = render(
      <WeatherWidget {...props} />
    );
    expect(queryAllByText(/Cargando/)).toHaveLength(2);
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(queryAllByText("Cargando")).toHaveLength(2);
    expect(queryByText("Colegiales")).toBeNull();

    await wait(() => getByText("Colegiales"));
    expect(getByText("Colegiales")).toBeTruthy();
    expect(getByText("bruma")).toBeTruthy();
    expect(getByAltText("bruma")).toBeTruthy();
    expect(getByText("17°")).toBeTruthy();
    expect(getByText("martes")).toBeTruthy();
    expect(getByText("algo de nubes")).toBeTruthy();
    expect(getByText("14° / 23°")).toBeTruthy();
  });
});
