import co from "co";
import mongoose from "mongoose";
import bluebird from "bluebird";

mongoose.Promise = bluebird;

/*
 * Schema section
 */
let BaseSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

/*
 * index section
 */
BaseSchema.index({
  created_at: -1
});

BaseSchema.index({
  updated_at: -1
});

/*
 * method section
 */

/* !
 * Save one document
 *
 * @return this
 */
BaseSchema.methods.persist = co.wrap(function* () {
  yield this.save();
  return this;
});

/* !
 * Update and save one document
 *
 * @param {Object} attrs
 * @return this
 */
BaseSchema.methods.update = co.wrap(function* (attrs) {
  for (let key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      this[key] = attrs[key];
      this.markModified(key);
    }
  }
  return yield this.persist();
});

/*
 * class method section
 */

/* !
 * Get one document by objectId
 *
 * @param {objectId} uid
 * @return this
 */
BaseSchema.statics.get = co.wrap(function* (uid) {
  let doc = null;
  try {
    doc = yield this.findOne({ _id: uid }).exec();
  } catch (e) {
    return {
      error: e.message,
      id: uid
    };
  }

  return doc;
});

/* !
 * Update and save one document
 *
 * @param {Object} queryObject
 * @return this
 */
BaseSchema.statics.query = co.wrap(function* (queryObject) {
  return yield this.find(queryObject).exec();
});

/* !
 * Remove one document by objectId
 *
 * @param {objectId} uid
 */
BaseSchema.statics.removeById = co.wrap(function* (uid) {
  let uuid = typeof uid === "string" ? new mongoose.Schema.ObjectId(uid) : uid;
  yield this.remove({ _id: uuid }).exec();
});

export default BaseSchema;
