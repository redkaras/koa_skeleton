import { after, before, beforeEach, describe, it } from "mocha";
import DemoGraph from "../../src/models/DemoGraph";
import DemoGraphService from "../../src/services/DemoGraphService";
import co from "co";
import { openDatabase, dropDatabase } from "../utils/database";
import { expect } from "chai";
import mongoose from "mongoose";

describe("DemoGraph service", () => {
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
        let service = new DemoGraphService();
        let doc = yield service.createFromEntity({
          name: "test",
          nodes: [
            { uid: 0, text: "null" },
            { uid: 1, text: "foo" },
            { uid: 2, text: "bar" },
            { uid: 3, text: "hello" },
            { uid: 4, text: "world" },
            { uid: 5, text: "class" },
            { uid: 6, text: "for" },
            { uid: 7, text: "switch" },
            { uid: 8, text: "break" }
          ],
          links: [
            { uid: 0, from: 1, to: 2, text: "next" },
            { uid: 1, from: 3, to: 4, text: "next" },
            { uid: 2, from: 5, to: 6, text: "in" },
            { uid: 3, from: 5, to: 7, text: "in" },
            { uid: 4, from: 5, to: 8, text: "in" },
            { uid: 5, from: 2, to: 5, text: "close" },
            { uid: 6, from: 4, to: 5, text: "close" },
          ]
        });
        let dbDoc = yield service.get(doc._id);

        expect(dbDoc.name).to.eql(doc.name);
        expect(dbDoc.nodes[3].text).to.eql("hello");
        expect(dbDoc.links[5].text).to.eql("close");
      }).then(done, done);
    });
  });
});
