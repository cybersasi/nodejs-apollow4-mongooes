import mongoose from "mongoose";
import config from "./config";
import { DemoSchema } from "../model/demo";

let db: any;
// let loggingDB: any;

const init = async () => {
  // Connection Operational Database
  db = await mongoose.createConnection(`${config.databaseUrl}/${config.databaseName}`).asPromise();

  // Connection Logging Database
  // loggingDB = await mongoose.createConnection(`${config.databaseUrl}/${config.loggingDatabaseName}`).asPromise();
}

export { init, db }