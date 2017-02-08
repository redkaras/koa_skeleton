"use strict";
var path = require("path");
var _ = require("lodash");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
env = env.trim();

var base = {
  app: {
    root: path.normalize(path.join(__dirname, "/..")),
    env: env,
  },
};

var specific = {
  development: {
    app: {
      port: 3001,
      name: "EagleEye platform v2 - Dev",
      keys: [ "Refactoring" ],
    },
    mongo: {
      url: "mongodb://localhost/eagleEyeDatabase_dev",
    },
  },
  test: {
    app: {
      port: 3002,
      name: "EagleEye platform v2 - Test",
      keys: [ "Refactoring" ],
    },
    mongo: {
      url: "mongodb://localhost/eagleEyeDatabase_test",
    },
    isTest: true,
  },
  production: {
    app: {
      port: process.env.PORT || 3003,
      name: "Refactoring",
      keys: [ "Refactoring" ],
    },
    mongo: {
      url: "mongodb://localhost/eagleEyeDatabase_prod",
    },
  },
};

module.exports = _.merge(base, specific[env]);
