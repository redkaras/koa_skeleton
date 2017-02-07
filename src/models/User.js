import co from "co";
import BaseSchema from "./Base";
import { genSalt, hash, compare } from "../libs/bcrypt_thunk"; // version that supports yields
import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
}, {
  toJSON: {
    transform: function(doc, ret, options) {
      delete ret.password;
    },
  },
});

UserSchema.pre("save", function(done) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    co.wrap(function*() {
      try {
        let salt = yield genSalt();
        let hashValue = yield hash(this.password, salt);
        this.password = hashValue;
        done();
      } catch (err) {
        done(err);
      }
    }).call(this).then(done);
  } else {
    done();
  }
});

/*
 * index section
 */
UserSchema.index({
  username: 1
});

/**
 * method section
 */
UserSchema.methods.comparePassword = function *(candidatePassword) {
  return yield compare(candidatePassword, this.password);
};

/**
 * class method section
 */

UserSchema.statics.passwordMatches = function *(username, password) {
  var user = yield this.findOne({ username: username.toLowerCase() }).exec();
  if (user === null) {
    return false;
  }

  if (yield user.comparePassword(password)) {
    return user;
  }

  throw new Error("Password does not match");
};

let User = mongoose.model("User", BaseSchema);
export default User.discriminator("UserModel", UserSchema);
