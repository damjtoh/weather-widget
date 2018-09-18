import config from "../config.json";

export const checkCityExists = (req, res, next) => {
  if (!config.citiesMap[req.params.cityCode])
    return res.status(404).json({ error: "Ciudad no encontrada." });
  next();
};
