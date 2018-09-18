import React from "react";
import { Dropdown, Grid, Button, Icon } from "semantic-ui-react";
import { format } from "../lib/date";

import PropTypes from "prop-types";

const locations = [
  { key: "current", value: "current", text: "Ubiación actual" },
  { key: "cordoba", value: "cordoba", text: "Córdoba" },
  { key: "rosario", value: "rosario", text: "Rosario" },
  { key: "mendoza", value: "mendoza", text: "Mendoza" },
  { key: "ushuaia", value: "ushuaia", text: "Ushuaia" },
  { key: "salta", value: "salta", text: "Salta" }
];

const LocationSelector = ({
  location,
  onLocationChange,
  lastUpdate,
  onRefresh,
  loading
}) => {
  const selectedLocation = location || locations[0].value;
  return (
    <Grid>
      <Grid.Column width={12} verticalAlign="middle">
        <Dropdown
          selection
          fluid
          disabled={loading}
          placeholder="Seleccione una ubicación"
          defaultValue={selectedLocation}
          onChange={onLocationChange}
          options={locations}
        />
      </Grid.Column>
      <Grid.Column width={4} verticalAlign="middle">
        {!loading ? (
          <span>Actualizado {format(lastUpdate, "HH:mm")}</span>
        ) : null}
        <Button loading={loading} icon size="tiny" onClick={() => onRefresh()}>
          <Icon name="refresh" />
        </Button>
      </Grid.Column>
    </Grid>
  );
};

LocationSelector.propTypes = {
  location: PropTypes.string,
  lastUpdate: PropTypes.instanceOf(Date),
  onLocationChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default LocationSelector;
