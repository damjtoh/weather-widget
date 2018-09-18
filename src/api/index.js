import { version } from "../../package.json";
import { Router } from "express";
import { getLocation } from "../core/location";
import { getWeather, getForecast } from "../core/weather";
import { checkCityExists } from "../middlewares/";

export default ({ config }) => {
  let api = Router();

  api.get("/", (req, res) => {
    res.json({ version });
  });

  api.route("/location").get((req, res) => {
    getLocation().then(location => res.json(location));
  });

  api.route("/current").get((req, res) => {
    return getLocation()
      .then(getWeather)
      .then(weather => res.status(200).json(weather))
      .catch(
        err =>
          console.error("Ocurrio un error", err) ||
          res.status(500).send({
            error:
              "Ocurrió un error al obtener el pronostico de tu actual ubicación."
          })
      );
  });

  api.route("/current/:cityCode?").get(checkCityExists, (req, res) => {
    const { city, lat, lon } = config.citiesMap[req.params.cityCode];
    getWeather({ city, lat, lon })
      .then(weather => res.json({ ...weather, city }))
      .catch(
        () =>
          console.error("Estoy saliendo por el catch") ||
          res.status(500).send({
            error: `Ocurrió un error al obtener el pronostico de ${city}.`
          })
      );
  });

  api.route("/forecast").get((req, res) => {
    getLocation()
      .then(getForecast)
      .then(forecast => res.json(forecast))
      .catch(() =>
        res.status(500).send({
          error:
            "Ocurrió un error al obtener el pronostico extendido de tu actual ubicación."
        })
      );
  });

  api.route("/forecast/:cityCode?").get(checkCityExists, (req, res) => {
    const { city, lat, lon } = config.citiesMap[req.params.cityCode];
    getForecast({ city, lat, lon })
      .then(forecast => res.json(forecast))
      .catch(
        () =>
          console.error("Estoy saliendo por el catch") ||
          res.status(500).send({
            error: `Ocurrió un error al obtener el pronostico extendido de ${city}.`
          })
      );
  });

  return api;
};
