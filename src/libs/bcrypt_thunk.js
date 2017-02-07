import bcrypt from "bcrypt";

const genSaltSync = bcrypt.genSaltSync;
const hashSync = bcrypt.hashSync;
const compareSync = bcrypt.compareSync;
const getRounds = bcrypt.getRounds;

let genSalt = function(rounds, ignore) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(rounds, ignore, function(err, salt) {
      if (err) { return reject(err); }
      return resolve(salt);
    });
  });
};

let hash = function(data, salt) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(data, salt, function(err, hashValue) {
      if (err) { return reject(err); }
      return resolve(hashValue);
    });
  });
};

let compare = function(data, hashValue) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(data, hashValue, function(err, matched) {
      if (err) { return reject(err); }
      return resolve(matched);
    });
  });
};

export { genSaltSync, hashSync, compareSync, getRounds, genSalt, hash, compare };
