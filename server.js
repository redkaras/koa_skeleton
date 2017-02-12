import bluebird from "bluebird";
global.Promise = bluebird;

import koa from "koa";
import passport from "koa-passport";

import config from "./config";
import configApp from "./src/web/KoaApp";
import configPassport from "./src/web/Passport";
import configRouter from "./src/web/Router";
import Database from "./src/libs/database";

console.log("Environment: " + config.app.env);
Database.open();
console.log("Loading database: " + config.mongo.url);

const app = koa();
configPassport(passport, config);
configApp(app, config, passport);
configRouter(app, passport);

app.listen(config.app.port);
console.log("Server started, listening on port: " + config.app.port);

export default app;
