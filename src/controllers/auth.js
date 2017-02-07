import passport from "koa-passport";
import User from "../models/User";
import UserService from "../services/UserService";

const service = new UserService();

exports.signIn = function *() {
  let _this = this;
  yield* passport.authenticate("local", function*(err, user, info) {
    if (err) {
      throw err;
    }

    if (user === false) {
      _this.status = 401;
    } else {
      yield _this.login(user);
      _this.body = { user: user };
    }
  }).call(this);
};

exports.getCurrentUser = function *() {
  if (this.passport.user) {
    this.body = { user: this.passport.user };
  }
  this.status = 200;
};

exports.signOut = function *() {
  this.logout();
  this.session = null;
  this.status = 204;
};

exports.createUser = function *() {
  if (!this.request.body) {
    this.throw("The body is empty", 400);
  }

  if (!this.request.body.username) {
    this.throw("Missing username", 400);
  }
  if (!this.request.body.password) {
    this.throw("Missing password", 400);
  }
  if (!this.request.body.email) {
    this.throw("Missing email", 400);
  }

  try {
    var user = yield service.createFromEntity({
      username: this.request.body.username.toLowerCase(),
      password: this.request.body.password,
      email: this.request.body.email
    });
    yield this.login(user);
  } catch (err) {
    this.throw(err);
  }

  this.status = 200;
  this.body = { user: this.passport.user };
};
