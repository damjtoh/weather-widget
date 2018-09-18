import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import LocationSelector from "./LocationSelector";

afterEach(cleanup);

describe("LocationSelector", () => {
  const props = {
    onLocationChange: jest.fn(),
    onRefresh: jest.fn(),
    loading: false,
    lastUpdate: null
  };
  it("should render location selector with default description as the current one", () => {
    const { container } = render(<LocationSelector {...props} />);
    const selectedLocation = container.querySelector("[aria-checked='true']");
    expect(selectedLocation.innerHTML).toMatch(/actual/);
  });

  it("should render select with rosario's option selected", () => {
    const { container } = render(
      <LocationSelector {...props} location="rosario" />
    );
    const selectedLocation = container.querySelector("[aria-checked='true']");
    expect(selectedLocation.innerHTML.toLowerCase()).toMatch(/rosario/);
  });

  it("should open up dorpdown on click", () => {
    const { container } = render(
      <LocationSelector {...props} location="rosario" />
    );
    const closedDropdown = container.querySelector("[aria-checked='false']");
    expect(closedDropdown).toBeDefined();
    const selectedLocation = container.querySelector("[aria-checked='true']");
    fireEvent.click(selectedLocation);
    const openedDropdown = container.querySelector("[aria-expanded='true']");
    expect(openedDropdown).toBeDefined();
  });
  it("should call locationChanged on location change", () => {
    const onLocationChange = jest.fn();
    const { getByText } = render(
      <LocationSelector {...props} onLocationChange={onLocationChange} />
    );
    fireEvent.click(getByText(/Rosario/));
    expect(onLocationChange).toHaveBeenCalledTimes(1);
  });
  it("should refresh the current weather", () => {
    const { container } = render(<LocationSelector {...props} />);
    const refreshButtonNode = container.querySelector("button");
    fireEvent.click(refreshButtonNode);
    expect(props.onRefresh).toHaveBeenCalledTimes(1);
  });
});
