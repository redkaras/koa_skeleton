import config from "../../config";
import mongoose from "mongoose";
import bluebird from "bluebird";

// mongoose.Promise = bluebird;
mongoose.Promise = Promise;

class Database {
  static open() {
    return mongoose.connect(config.mongo.url);
  }

  static close() {
    return mongoose.disconnect();
  }
}

export default Database;
