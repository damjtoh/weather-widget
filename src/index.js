import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import api from "./api";
import config from "./config.json";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

if (!process.env.OPENWEATHER_API_KEY)
  throw "OPENWEATHER_API_KEY wasn't setted up";

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan("dev"));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

// api router
app.use("/v1", api({ config }));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
}

if (!module.parent) {
  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
}

export default app;
