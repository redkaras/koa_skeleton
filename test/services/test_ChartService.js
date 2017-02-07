import { after, before, beforeEach, describe, it } from "mocha";
import Chart from "../../src/models/Chart";
import ChartService from "../../src/services/ChartService";
import co from "co";
import { openDatabase, dropDatabase } from "../utils/database";
import { expect } from "chai";
import mongoose from "mongoose";

describe("Chart service", () => {
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

  describe("create", () => {
    it("createFromEntity", (done) => {
      co(function* () {
        let service = new ChartService();
        let doc = yield service.createFromEntity({ title: "service create", type: "create from service" });
        let dbDoc = yield service.get(doc._id);
        expect(dbDoc.title).to.eql(doc.title);
        expect(dbDoc.type).to.eql(doc.type);
      }).then(done, done);
    });
  });
});
