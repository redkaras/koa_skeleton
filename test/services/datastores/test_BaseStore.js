import { after, before, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import BaseSchema from "../../../src/models/Base";
import BaseStore from "../../../src/services/datastores/BaseStore";
import co from "co";
import { openDatabase, dropDatabase } from "../../utils/database";
import mongoose from "mongoose";

let Base = mongoose.model("Base", BaseSchema);

describe("BaseStore", () => {
  before(function(done) {
    openDatabase(done);
  });

  after(function(done) {
    dropDatabase(done);
  });

  beforeEach((done) => {
    co(function* () {
      yield Base.remove({});
    }).then(done, done);
  });

  describe("create", () => {
    it("createFromEntity", (done) => {
      co(function* () {
        let store = new BaseStore(Base);
        let doc = yield store.createFromEntity({});
        let dbDoc = yield store.get(doc._id);
        expect(dbDoc.updated_at).to.eql(doc.updated_at);
      }).then(done, done);
    });
  });

  describe("get", () => {
    it("get not existing document", (done) => {
      co(function* () {
        let store = new BaseStore(Base);
        let doc = yield store.get("584113d91827e62ad80e04b4");
        expect(doc).to.eql(null);
      }).then(done, done);
    });
  });
});
