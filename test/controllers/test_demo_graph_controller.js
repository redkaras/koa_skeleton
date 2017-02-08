import { after, before, beforeEach, describe, it } from "mocha";
import co from "co";
import { expect } from "chai";
import app from "../../server.js";
import test from "supertest";
import { dropDatabase } from "../utils/database";
import DemoGraphService from "../../src/services/DemoGraphService";

let request = null;
let service = new DemoGraphService();
var URLS = {
  create: "/createDemoGraph",
  get: "/getDemoGraph"
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
  let demoGraphEntity = {
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
  };

  describe("Create demo graph", () => {
    it("should create a demo graph entity", (done) => {
      request.post(URLS.create)
      .set("Content-Type", "application/json")
      .send(demoGraphEntity)
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body.graph).be.exist;
        expect(res.body.graph.name).to.eql(demoGraphEntity.name);
        done();
      });
    });
  });

  describe("Get demo graph", () => {
    it("should get a demo graph entity", (done) => {
      co(function* () {
        let graph = yield service.createFromEntity(demoGraphEntity);
        request.get(URLS.get + "/" + graph._id)
        .accept("json")
        .expect(200)
        .end(function(err, res) {
          if (err) { return done(err); }
          expect(res.body.graph).be.exist;
          expect(res.body.graph.name).to.eql(demoGraphEntity.name);
          done();
        });
      });
    });
  });
});
