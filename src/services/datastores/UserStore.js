import BaseStore from "./BaseStore";
import co from "co";
import User from "../../models/User";

class UserStore extends BaseStore {
  constructor() {
    super(User);
    this.updateMethods("passwordMatches", co.wrap(function* (username, password) {
      let user = yield this.ModelClass.passwordMatches(username, password);
      return user;
    }));
  }
}

export default UserStore;
