import ChartService from "../services/ChartService";

const service = new ChartService();

exports.createChart = function *() {
  if (!this.request.body.title) {
    this.throw("Missing title", 400);
  }
  if (!this.request.body.type) {
    this.throw("Missing type", 400);
  }

  let chartEntity = {
    title: this.request.body.title,
    type: this.request.body.type,
  };

  let chart = yield service.createFromEntity(chartEntity);
  this.status = 200;
  this.body = { chart: chart };
};

exports.getChart = function *() {
  this.status = 200;
  if (!this.params.id) {
    this.throw("Missing id", 400);
  }
  let chart = yield service.get(this.params.id);
  this.body = {
    chart: chart
  };
};
