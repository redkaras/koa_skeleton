import config from "../../config";
import mongoose from "mongoose";

class Database {
  static open() {
    mongoose.Promise = global.Promise;
    return mongoose.connect(config.mongo.url);
  }

  static close() {
    return mongoose.disconnect();
  }
}

export default Database;
