import DemoGraphService from "../services/DemoGraphService";

const service = new DemoGraphService();

exports.createDemoGraph = function *() {
  let demoGraphEntity = {
    name: "test",
    nodes: [
      { id: 0, text: "null" },
      { id: 1, text: "foo" },
      { id: 2, text: "bar" },
      { id: 3, text: "hello" },
      { id: 4, text: "world" },
      { id: 5, text: "class" },
      { id: 6, text: "for" },
      { id: 7, text: "switch" },
      { id: 8, text: "break" }
    ],
    links: [
      { id: 0, from: 1, to: 2, text: "next" },
      { id: 1, from: 3, to: 4, text: "next" },
      { id: 2, from: 5, to: 6, text: "in" },
      { id: 3, from: 5, to: 7, text: "in" },
      { id: 4, from: 5, to: 8, text: "in" },
      { id: 5, from: 2, to: 5, text: "close" },
      { id: 6, from: 4, to: 5, text: "close" },
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
