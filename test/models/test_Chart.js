import mongoose from "mongoose";
import { after, before, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import Chart from "../../src/models/Chart";
import co from "co";
import { openDatabase, dropDatabase } from "../utils/database";

describe("Chart", () => {
  before(function(done) {
    openDatabase(done);
  });

  after(function(done) {
    dropDatabase(done);
  });

  beforeEach((done) => {
    co(function* () {
      yield Chart.remove({});
    }).then(done, done);
  });

  describe("new chart", () => {
    it("persist", (done) => {
      co(function* () {
        let entity = { title: "call co wrap method", type: "test" };
        let chart = new Chart(entity);
        yield chart.persist();
        let charts = yield Chart.query({ title: "call co wrap method" });
        let dbChart = charts[0];
        expect(dbChart.type).to.eql("test");
      }).then(done, done);
    });
  });

  describe("query chart", () => {
    it("query", (done) => {
      co(function* () {
        let charts = yield Chart.query({ title: "yield" });
        expect(charts.length).to.eql(0);
      }).then(done, done);
    });

    it("get", (done) => {
      co(function* () {
        let entity = { title: "get by id", type: "test" };
        let chart = new Chart(entity);
        yield chart.persist();
        let dbChart = yield Chart.get(chart._id);
        expect(dbChart.type).to.eql(chart.type);
        expect(dbChart._id).to.eql(chart._id);
      }).then(done, done);
    });
  });

  describe("update chart", () => {
    it("update", (done) => {
      co(function* () {
        let entity = { title: "orignal", type: "old" };
        let chart = new Chart(entity);
        yield chart.persist();
        let attrs = { title: "future", type: "new" };
        yield chart.update(attrs);
        expect(chart.title).to.eql(attrs.title);
        expect(chart.type).to.eql(attrs.type);
      }).then(done, done);
    });
  });

  describe("remove", () => {
    it("remove", (done) => {
      co(function* () {
        let entity = { title: "to be remove", type: "delete" };
        let chart = new Chart(entity);
        let uid = chart._id;
        yield chart.persist();
        yield Chart.removeById(uid);
        let ghostChart = yield Chart.get(uid);
        expect(ghostChart).to.eql(null);
      }).then(done, done);
    });
  });
});
