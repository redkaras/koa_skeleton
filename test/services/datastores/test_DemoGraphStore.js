import { after, before, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import DemoGraph from "../../../src/models/DemoGraph";
import DemoGraphStore from "../../../src/services/datastores/DemoGraphStore";
import co from "co";
import { openDatabase, dropDatabase } from "../../utils/database";
import mongoose from "mongoose";

describe("DemoGraphStore", () => {
  before(function(done) {
    openDatabase(done);
  });

  after(function(done) {
    dropDatabase(done);
  });

  beforeEach((done) => {
    co(function* () {
      yield DemoGraph.remove({});
    }).then(done, done);
  });

  describe("create", () => {
    it("createFromEntity", (done) => {
      co(function* () {
        let store = new DemoGraphStore();
        let doc = yield store.createFromEntity({
          name: "test",
          nodes: [
            { id: 0, text: "null" },
            { id: 1, text: "foo" },
            { id: 2, text: "bar" },
            { id: 3, text: "hello" },
            { id: 4, text: "world" },
            { id: 5, text: "class" },
            { id: 6, text: "for" },
            { id: 7, text: "switch" },
            { id: 8, text: "break" }
          ],
          links: [
            { id: 0, from: 1, to: 2, text: "next" },
            { id: 1, from: 3, to: 4, text: "next" },
            { id: 2, from: 5, to: 6, text: "in" },
            { id: 3, from: 5, to: 7, text: "in" },
            { id: 4, from: 5, to: 8, text: "in" },
            { id: 5, from: 2, to: 5, text: "close" },
            { id: 6, from: 4, to: 5, text: "close" },
          ]
        });
        let dbDoc = yield store.get(doc._id);
        expect(dbDoc.name).to.eql(doc.name);
        expect(dbDoc.nodes[3].text).to.eql("hello");
        expect(dbDoc.links[5].text).to.eql("close");
      }).then(done, done);
    });
  });
});
