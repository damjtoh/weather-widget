import React from "react";
import { Loader, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

const CurrentWeather = ({ city, temp, icon, description, loading }) => {
  return (
    <div>
      {loading ? (
        <Loader inline active>
          Cargando
        </Loader>
      ) : (
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h2>{city}</h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="right" verticalAlign="middle">
              <img
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt={description}
              />
            </Grid.Column>
            <Grid.Column textAlign="left" verticalAlign="middle">
              <h3>{temp}°</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h4>{description}</h4>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
};

CurrentWeather.propTypes = {
  city: PropTypes.string,
  temp: PropTypes.number,
  icon: PropTypes.string,
  description: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default CurrentWeather;
