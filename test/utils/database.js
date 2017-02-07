import co from "co";
import User from "../../src/models/User";
import Session from "../../src/models/Session";
import Chart from "../../src/models/Chart";
import mongoose from "mongoose";
import config from "../../config";

let Models = [
  Chart,
  User,
  Session,
];

let dropCollection = function(Model) {
  return new Promise(function(resolve, reject) {
    Model.collection.remove(function(err) {
      if (err) { return reject(err); }
      resolve();
    });
  });
};

let openDatabase = function(cb) {
  if (mongoose.connection.readyState !== 0) {
    return cb();
  }
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongo.url);
  cb();
};

let dropDatabase = function(cb) {
  co(function *() {
    yield Models.map(dropCollection);
  }).then(cb);
};

export { openDatabase, dropDatabase };
