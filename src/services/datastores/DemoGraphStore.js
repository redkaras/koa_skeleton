import BaseStore from "./BaseStore";
import DemoGraph from "../../models/DemoGraph";

class DemoGraphStore extends BaseStore {
  constructor() {
    super(DemoGraph);
  }
}

export default DemoGraphStore;
