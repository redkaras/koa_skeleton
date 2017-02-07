import co from "co";

class BaseStore {
  constructor(modelClass) {
    this.ModelClass = modelClass;
    this.initBaseMethods();
  }

  initBaseMethods() {
    this.createFromEntity = co.wrap(function* (entity) {
      let doc = new this.ModelClass(entity);
      return yield doc.persist();
    });

    this.get = co.wrap(function* (uid) {
      return yield this.ModelClass.get(uid);
    });

    this.query = co.wrap(function* (queryObject) {
      return yield this.ModelClass.query(queryObject);
    });

    this.update = co.wrap(function* (uid, updateAttrs) {
      let doc = yield self.ModelClass.get(uid);
      if (!doc) {
        throw new Error("Not found");
      }
      doc = yield doc.update(updateAttrs);
      return doc;
    });

    this.removeById = co.wrap(function* (uid) {
      yield this.ModelClass.removeById(uid);
    });

    this.getWithCallback = function(uid, done) {
      this.ModelClass.get(uid).then(function(doc) {
        done(null, doc);
      });
    };
  }

  updateMethods(name, func) {
    if (func instanceof Function) {
      this[name] = func;
    }
  }
}

export default BaseStore;
