import { after, before, beforeEach, describe, it } from "mocha";
import co from "co";
import { expect } from "chai";
import app from "../../server.js";
import test from "supertest";
import { dropDatabase } from "../utils/database";
import UserService from "../../src/services/UserService";

let request = null;

var URLS = {
  auth: "/auth",
  signOut: "/signout",
  signUp: "/signup",
};

describe("auth controller", () => {
  before(function(done) {
    request = test.agent(app.listen());
    done();
  });

  after(function(done) {
    dropDatabase(done);
  });

  // beforeEach((done) => {
  // });

  describe("Anonymous Call", () => {
    it("should return empty body", (done) => {
      request.get(URLS.auth)
      .accept("json")
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body.user).be.not.exist;
        done();
      });
    });
  });

  describe("Auth Call", () => {
    let userEntity = {
      username: "merlin",
      password: "testpwd",
      email: "mmo2@test.com"
    };
    before(function(done) {
      co(function* () {
        let service = new UserService();
        yield service.createFromEntity(userEntity);
      }).then(done, done);
    });

    it("should return the user infos", (done) => {
      request.post(URLS.auth)
      .set("Content-Type", "application/json")
      .send({ username: userEntity.username, password: userEntity.password })
      .redirects(false)
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body).to.exist;
        expect(res.body.user).to.exist;
        expect(res.body.user.username).to.exist;
        expect(res.body.user.username).to.eql(userEntity.username);
        done();
      });
    });
  });
});
