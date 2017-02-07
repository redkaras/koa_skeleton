import path from "path";
import serve from "koa-static-cache";
import session from "koa-generic-session";
import SessionStore from "../services/datastores/SessionStore";
import responseTime from "koa-response-time";
import logger from "koa-logger";
import views from "co-views";
import compress from "koa-compress";
import errorHandler from "koa-error";
import bodyParser from "koa-bodyparser";

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 };

export default function(app, config, passport) {
  if (!config.app.keys) { throw new Error("Please add session secret key in the config file!"); }
  app.keys = config.app.keys;

  if (config.app.env !== "test") {
    app.use(logger());
  }

  app.use(errorHandler());
  if (config.app.env === "production") {
    // app.use(serve(path.join(config.app.root, "build", "public"), SERVE_OPTIONS, STATIC_FILES_MAP));
    app.use(serve(path.join(config.app.root, "public"), SERVE_OPTIONS, STATIC_FILES_MAP));
  } else {
    app.use(require("koa-proxy")({
      host: "http://localhost:2992",
      match: /^\/_assets\//,
    }));
  }

  app.use(session({
    key: "ealgeeye-platform.sid",
    store: new SessionStore(),
  }));

  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function *(next) {
    this.render = views(config.app.root + "/src/views", {
      map: { html: "swig" },
      cache: config.app.env === "development" ? "memory" : false,
    });
    yield next;
  });

  app.use(compress());
  app.use(responseTime());
}
