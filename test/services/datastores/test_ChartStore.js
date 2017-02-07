import { after, before, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import Chart from "../../../src/models/Chart";
import ChartStore from "../../../src/services/datastores/ChartStore";
import co from "co";
import { openDatabase, dropDatabase } from "../../utils/database";
import mongoose from "mongoose";

describe("ChartStore", () => {
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
        let store = new ChartStore();
        let doc = yield store.createFromEntity({ title: "chart store", type: "create from store" });
        let dbDoc = yield store.get(doc._id);
        expect(dbDoc.title).to.eql(doc.title);
        expect(dbDoc.type).to.eql(doc.type);
      }).then(done, done);
    });
  });
});
