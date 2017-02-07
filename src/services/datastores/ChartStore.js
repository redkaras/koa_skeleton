import BaseStore from "./BaseStore";
import Chart from "../../models/Chart";

class ChartStore extends BaseStore {
  constructor() {
    super(Chart);
  }
}

export default ChartStore;
