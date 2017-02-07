import { Strategy } from "passport-local";
import UserService from "../services/UserService";

let service = new UserService();

let serialize = function(user, done) {
  done(null, user._id);
};

let deserialize = function(id, done) {
  service.getWithCallback(id, done);
};

module.exports = function(passport, config) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new Strategy(service.passwordMatchesWithCallback));
};
