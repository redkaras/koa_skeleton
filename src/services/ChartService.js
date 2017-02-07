import BaseService from "./BaseService";
import ChartStore from "./datastores/ChartStore";

class ChartService extends BaseService {
  constructor() {
    super(ChartStore);
  }
}

export default ChartService;
