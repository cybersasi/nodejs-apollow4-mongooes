import mongoose, { Schema, Model, Types } from "mongoose";
import { encryptPassword } from "../util/authentication";

export interface IDemo {
  _id: Types.ObjectId,
  name: string,
  email: string,
  password: string,
  created_at: string,
  updated_at: string,
}

const DemoSchema = new Schema<IDemo, Model<IDemo>>({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { Type: String, required: true, set: (val: string) => encryptPassword(val) },
  created_at: { Type: String, required: true, default: new Date().toISOString() },
  updated_at: { Type: String, required: true, default: new Date().toISOString() },
});

const Demo = mongoose.model("Demo", DemoSchema, 'demo');

export default Demo