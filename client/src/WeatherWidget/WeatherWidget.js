import React, { Component } from "react";
import CurrentWeather from "./CurrentWeather";
import LocationSelector from "./LocationSelector";
import { fetchWeather, fetchForecast } from "./api";
import Forecast from "./Forecast";
import { Segment, Divider, Button } from "semantic-ui-react";

const styles = {
  segment: {
    width: "60%",
    margin: "0 auto",
    textAlign: "center"
  }
};

export default class WeatherWidget extends Component {
  state = {
    currentWeatherLoader: true,
    forecastLoader: true,
    lastUpdate: null,
    currentWeather: null,
    forecast: null,
    selectedLocation: "current",
    error: null
  };

  fetchWeather = async location => {
    this.setState({ currentWeatherLoader: true });
    try {
      const currentWeather = await fetchWeather(location);
      this.setState({
        currentWeather,
        currentWeatherLoader: false,
        lastUpdate: new Date()
      });
    } catch (error) {
      this.setState({
        error: true,
        currentWeatherLoader: false
      });
    }
  };

  fetchForecast = async location => {
    this.setState({ forecastLoader: true });
    try {
      const forecast = await fetchForecast(location);
      this.setState({
        forecast,
        forecastLoader: false
      });
    } catch (error) {
      this.setState({
        error: true,
        forecastLoader: false
      });
    }
  };

  componentDidMount() {
    this.fetchWeather();
    this.fetchForecast();
  }

  handleRefresh = () => {
    if (this.state.error) this.setState({ error: null });
    this.fetchWeather(this.state.selectedLocation);
    this.fetchForecast(this.state.selectedLocation);
  };

  handleLocationChange = (evt, { value }) => {
    if (value === this.state.selectedLocation) return;
    this.setState({ selectedLocation: value });
    this.fetchWeather(value);
    this.fetchForecast(value);
  };

  render() {
    if (this.state.error)
      return (
        <Segment style={styles.segment}>
          Ocurrió un error al obtener el clima.{" "}
          <Button onClick={() => this.handleRefresh()}>Reintentar</Button>
        </Segment>
      );
    return (
      <Segment style={styles.segment}>
        <div className="locationSelector" data-testid="location-selector">
          <LocationSelector
            onLocationChange={this.handleLocationChange}
            onRefresh={this.handleRefresh}
            lastUpdate={this.state.lastUpdate}
            loading={
              this.state.currentWeatherLoader || this.state.forecastLoader
            }
          />
        </div>
        <Divider />
        <div className="currentWeather" data-testid="current-weather">
          <CurrentWeather
            {...this.state.currentWeather}
            loading={this.state.currentWeatherLoader}
          />
        </div>
        <Divider />
        <div className="forecast" data-testid="forecast-days">
          <Forecast
            days={this.state.forecast}
            loading={this.state.forecastLoader}
          />
        </div>
      </Segment>
    );
  }
}
