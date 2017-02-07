import mongoose from "mongoose";
import BaseSchema from "./Base";

let SessionSchema = new mongoose.Schema({
  sid: { type: String, required: true },
  sess: { type: mongoose.Schema.Types.Mixed, required: true },
  ttl: { type: Date, required: true }
});

/*
 * index section
 */
SessionSchema.index({
  sid: 1
});

let Session = mongoose.model("Session", BaseSchema);
export default Session.discriminator("SessionSchema", SessionSchema);
