import DemoGraphService from "../services/DemoGraphService";

const service = new DemoGraphService();

exports.createDemoGraph = function *() {
  let demoGraphEntity = {
    name: "test",
    nodes: [
      { uid: 0, text: "null" },
      { uid: 1, text: "foo" },
      { uid: 2, text: "bar" },
      { uid: 3, text: "hello" },
      { uid: 4, text: "world" },
      { uid: 5, text: "class" },
      { uid: 6, text: "for" },
      { uid: 7, text: "switch" },
      { uid: 8, text: "break" }
    ],
    links: [
      { uid: 0, from: 1, to: 2, text: "next" },
      { uid: 1, from: 3, to: 4, text: "next" },
      { uid: 2, from: 5, to: 6, text: "in" },
      { uid: 3, from: 5, to: 7, text: "in" },
      { uid: 4, from: 5, to: 8, text: "in" },
      { uid: 5, from: 2, to: 5, text: "close" },
      { uid: 6, from: 4, to: 5, text: "close" },
    ]
  };

  let graph = yield service.createFromEntity(demoGraphEntity);
  this.status = 200;
  this.body = { graph: graph };
};

exports.getDemoGraph = function *() {
  this.status = 200;
  if (!this.params.id) {
    this.throw("Missing id", 400);
  }
  let graph = yield service.get(this.params.id);
  this.body = {
    graph: graph
  };
};

exports.getGraph = function *() {
  this.status = 200;
  let graphs = yield service.query({});
  this.body = {
    graph: graphs[0] ? graphs[0] : null
  };
};
