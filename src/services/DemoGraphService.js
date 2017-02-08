import BaseService from "./BaseService";
import DemoGraphStore from "./datastores/DemoGraphStore";

class DemoGraphService extends BaseService {
  constructor() {
    super(DemoGraphStore);
  }
}

export default DemoGraphService;
