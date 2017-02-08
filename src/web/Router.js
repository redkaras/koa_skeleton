import Router from "koa-router";

import authController from "../controllers/auth";
import chartControlller from "../controllers/chart";
import indexController from "../controllers/index";
import demoGraphController from "../controllers/demo_graph";

let secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

let register = function(app, passport) {
  // register functions
  let router = new Router();

  router.use(function *(next) {
    this.type = "json";
    yield next;
  });

  /*
   * index controller
   */
  router.get("/", function *() {
    this.type = "html";
    yield indexController.index.apply(this);
  });

  /*
   * auth controller
   */
  router.get("/auth", authController.getCurrentUser);
  router.post("/auth", authController.signIn);

  router.all("/signout", authController.signOut);
  router.post("/signup", authController.createUser);

  /*
   * chart controller
   */
  router.post("/createChart", chartControlller.createChart);
  router.get("/getChart/:id", chartControlller.getChart);

  /*
   * demo graph controller
   */
  router.get("/createDemoGraph", demoGraphController.createDemoGraph);
  router.post("/createDemoGraph", demoGraphController.createDemoGraph);
  router.get("/getDemoGraph/:id", demoGraphController.getDemoGraph);

  app.use(router.routes());
};

export default register;
