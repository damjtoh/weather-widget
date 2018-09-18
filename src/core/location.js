import axios from "axios";

export const getLocation = () =>
  axios.get(`http://ip-api.com/json`).then(res => res.data);
