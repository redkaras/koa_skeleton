import mongoose from "mongoose";
import BaseSchema from "./Base";

let DemoGraphSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nodes: [ {
    uid: { type: Number, required: true },
    text: { type: String, required: true },
  } ],
  links: [ {
    uid: { type: Number, required: true },
    text: String,
    from: Number,
    to: Number
  } ],
});

let Graph = mongoose.model("DemoGraph", BaseSchema);
export default Graph.discriminator("DemoGraphModel", DemoGraphSchema);
