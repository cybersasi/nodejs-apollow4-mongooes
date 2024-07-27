import { Schema, Model } from "mongoose";
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import mongooseAggregatePaginateV2 from 'mongoose-aggregate-paginate-v2';
import { IDemo } from "../typings";

const DemoSchema = new Schema<IDemo, Model<IDemo>>({
  _id: { type: Schema.Types.ObjectId, default: 'DEFAULT_VALUE' },
  testName: { type: String, default: 'DEFAULT_VALUE' },
});

DemoSchema.plugin(mongoosePaginateV2);
DemoSchema.plugin(mongooseAggregatePaginateV2);

export { DemoSchema };