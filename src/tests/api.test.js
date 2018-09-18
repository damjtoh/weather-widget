import "babel-polyfill";

const request = require("supertest");
import app from "..";
import { version } from "../../package.json";
const should = require("should");
import nock from "nock";
import {
  forecast,
  weather,
  location,
  weatherCordoba,
  forecastCordoba
} from "./mocks.json";

describe("GET /v1", function() {
  it("respond with json containing a API version", function(done) {
    request(app)
      .get("/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        res.body.should.have.key("version").which.is.equal(version);
        done();
      });
  });
});

nock("http://ip-api.com")
  .persist()
  .get("/json")
  .reply(200, location);

nock("http://api.openweathermap.org/data/2.5")
  .persist()
  .get(
    "/weather?appid=f6e66150574fa8839e3aed9fb3ce9f2a&units=metric&lang=es&lat=-34.5754&lon=-58.436"
  )
  .reply(200, weather);
nock("http://api.openweathermap.org/data/2.5")
  .persist()
  .get(
    "/forecast?appid=f6e66150574fa8839e3aed9fb3ce9f2a&units=metric&lang=es&lat=-34.5754&lon=-58.436"
  )
  .reply(200, forecast);
nock("http://api.openweathermap.org/data/2.5")
  .persist()
  .get(
    "/weather?appid=f6e66150574fa8839e3aed9fb3ce9f2a&units=metric&lang=es&lat=-31.417339&lon=-64.183319"
  )
  .reply(200, weatherCordoba);
nock("http://api.openweathermap.org/data/2.5")
  .persist()
  .get(
    "/forecast?appid=f6e66150574fa8839e3aed9fb3ce9f2a&units=metric&lang=es&lat=-31.417339&lon=-64.183319"
  )
  .reply(200, forecastCordoba);

describe("GET /v1/location", function() {
  it("respond with json containing current location", function(done) {
    request(app)
      .get("/v1/location")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        res.body.should.have.a
          .property("lat")
          .which.is.a.Number()
          .and.equals(-34.5754);
        res.body.should.have.a
          .property("lon")
          .which.is.a.Number()
          .and.equals(-58.436);
        done();
      })
      .catch(err => done(err));
  });
});
describe("GET /v1/current", function() {
  it("respond with json containing current location's weather", function(done) {
    request(app)
      .get("/v1/current")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        res.body.should.have.a
          .property("description")
          .which.is.an.String()
          .and.equals("bruma");
        res.body.should.have.a
          .property("icon")
          .which.is.an.String()
          .and.equals("50d");
        res.body.should.have.a
          .property("city")
          .which.is.a.String()
          .and.equals("Colegiales");
        res.body.should.have.a
          .property("temp")
          .which.is.a.Number()
          .and.equals(17);
        done();
      })
      .catch(err => done(err));
  });
  it("respond with json containing cordoba's weather", function(done) {
    request(app)
      .get("/v1/current/cordoba")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        res.body.should.have.a.property("city").which.equals("Cordoba");
        done();
      })
      .catch(err => done(err));
  });
  it("given a nonexisting city respond with 404 http status code and an error message", function(done) {
    request(app)
      .get("/v1/current/notExistentCity")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        res.body.should.have.a.property("error").which.match(/encontrada/);
        done(err);
      });
  });
  describe("GET /v1/forecast", function() {
    it("respond with json containing current location's forecast", function(done) {
      request(app)
        .get("/v1/forecast")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          res.body.should.be.an.Array().which.has.length(5);
          res.body[0].should.have.a
            .property("date")
            .which.is.an.String()
            .and.equals("2018-09-18 00:00");
          res.body[0].should.have.a
            .property("description")
            .which.is.an.String()
            .and.equals("cielo claro");
          res.body[0].should.have.a
            .property("icon")
            .which.is.an.String()
            .and.equals("01n");
          res.body[0].should.have.a
            .property("tempMin")
            .which.is.a.Number()
            .and.equals(14);
          res.body[0].should.have.a
            .property("tempMax")
            .which.is.a.Number()
            .and.equals(23);
          done();
        })
        .catch(err => done(err));
    });
    it("respond with json containing cordoba's forecast", function(done) {
      request(app)
        .get("/v1/forecast/cordoba")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          res.body.should.be.an.Array().which.has.length(5);
          done();
        })
        .catch(err => done(err));
    });
    it("given a nonexisting city respond with 404 http status code and an error message", function(done) {
      request(app)
        .get("/v1/forecast/notExistentCity")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err, res) => {
          res.body.should.have.a.property("error").which.match(/encontrada/);
          done(err);
        });
    });
  });
});
