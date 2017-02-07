import co from "co";
import BaseStore from "./datastores/BaseStore";

class BaseService {
  constructor(StoreClass) {
    this.store = new StoreClass();
    this.initBaseMethods();
  }

  initBaseMethods() {
    this.createFromEntity = co.wrap(function* (entity) {
      return yield this.store.createFromEntity(entity);
    });

    this.get = co.wrap(function* (uid) {
      return yield this.store.get(uid);
    });

    this.query = co.wrap(function* (queryObject) {
      return yield this.store.query(queryObject);
    });

    this.update = co.wrap(function* (uid, updateAttrs) {
      return yield self.store.get(uid, updateAttrs);
    });

    this.removeOne = co.wrap(function* (uid) {
      yield this.store.removeById(uid);
    });
  }

  updateMethods(name, func) {
    if (func instanceof Function) {
      this[name] = func;
    }
  }
}

export default BaseService;
