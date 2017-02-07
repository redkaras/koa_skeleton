import BaseService from "./BaseService";
import co from "co";
import UserStore from "./datastores/UserStore";

class UserService extends BaseService {
  constructor() {
    super(UserStore);
    this.updateMethods("passwordMatches", co.wrap(function* (username, password) {
      return yield this.store.passwordMatches(username, password);
    }));
    let _this = this;
    this.updateMethods("passwordMatchesWithCallback", function(username, password, done) {
      _this.store.passwordMatches(username, password)
      .then((user) => done(null, user));
    });

    this.updateMethods("getWithCallback", function(uid, done) {
      this.store.getWithCallback(uid, done);
    });
  }
}

export default UserService;
