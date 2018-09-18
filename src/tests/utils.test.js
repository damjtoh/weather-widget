import { toUTCDate } from "../lib/util";
const should = require("should");

describe("Utils exposed methods", function() {
  it("Should transform timestamp to UTC date", function() {
    const timestamp = 1537196400;
    should(toUTCDate(timestamp)).be.exactly("2018-09-17 15:00");
  });
});
