import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import "semantic-ui-css/semantic.min.css";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<WeatherWidget />, document.getElementById("root"));
registerServiceWorker();
