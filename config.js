"use strict";
var path = require("path");
var _ = require("lodash");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
env = env.trim();
console.log("Env: " + env);
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
      name: "Graph demo - Dev",
      keys: [ "Demo" ],
    },
    mongo: {
      url: "mongodb://localhost/graphDemoDatabase_dev",
    },
  },
  test: {
    app: {
      port: 3002,
      name: "Graph demo - Test",
      keys: [ "Demo" ],
    },
    mongo: {
      url: "mongodb://localhost/graphDemoDatabase_test",
    },
    isTest: true,
  },
  production: {
    app: {
      port: process.env.PORT || 3003,
      name: "Graph demo - Production",
      keys: [ "Demo" ],
    },
    mongo: {
      url: "mongodb://localhost/graphDemoDatabase_prod",
    },
  },
};

module.exports = _.merge(base, specific[env]);
