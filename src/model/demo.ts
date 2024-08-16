import { Schema, Model } from "mongoose";
import { IDemo } from "../typings";

const DemoSchema = new Schema<IDemo, Model<IDemo>>({
  _id: { type: Schema.Types.ObjectId, default: 'DEFAULT_VALUE' },
  testName: { type: String, default: 'DEFAULT_VALUE' },
});

export { DemoSchema };