import React from "react";
import ForecastDay from "./ForecastDay";
import { Loader, List } from "semantic-ui-react";
import PropTypes from "prop-types";

const Forecast = ({ days, loading }) => {
  return (
    <div>
      <h3>Pronostico para los proximos 5 días</h3>
      {loading ? (
        <Loader inline active>
          Cargando
        </Loader>
      ) : (
        <List horizontal>
          {days.map((d, i) => (
            <List.Item key={i}>
              <ForecastDay {...d} />
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
};

Forecast.propTypes = {
  days: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

export default Forecast;
