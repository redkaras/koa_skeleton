import { after, before, beforeEach, describe, it } from "mocha";
import co from "co";
import { expect } from "chai";
import app from "../../server.js";
import test from "supertest";
import { dropDatabase } from "../utils/database";
import ChartService from "../../src/services/ChartService";

let request = null;
let service = new ChartService();
var URLS = {
  create: "/createChart",
  get: "/getChart"
};

describe("chart controller", () => {
  before(function(done) {
    request = test.agent(app.listen());
    done();
  });

  after(function(done) {
    dropDatabase(done);
  });

  // beforeEach((done) => {
  // });
  let chartEntity = {
    title: "Create by contorller",
    type: "test",
  };

  describe("Create chart", () => {
    it("should create a chart entity", (done) => {
      request.post(URLS.create)
      .set("Content-Type", "application/json")
      .send(chartEntity)
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body.chart).be.exist;
        expect(res.body.chart.title).to.eql(chartEntity.title);
        expect(res.body.chart.type).to.eql(chartEntity.type);
        done();
      });
    });
  });

  describe("Get chart", () => {
    it("should get a chart entity", (done) => {
      co(function* () {
        let chart = yield service.createFromEntity(chartEntity);
        request.get(URLS.get + "/" + chart._id)
        .accept("json")
        .expect(200)
        .end(function(err, res) {
          if (err) { return done(err); }
          expect(res.body.chart).be.exist;
          expect(res.body.chart.title).to.eql(chartEntity.title);
          expect(res.body.chart.type).to.eql(chartEntity.type);
          done();
        });
      });
    });
  });
});
