import mongoose from "mongoose";
import BaseSchema from "./Base";

let ChartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
});

let Chart = mongoose.model("Chart", BaseSchema);
export default Chart.discriminator("ChartModel", ChartSchema);
