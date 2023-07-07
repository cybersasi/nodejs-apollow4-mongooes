import mongoose from "mongoose";
import Config from "./config";

let db: any;

const init = async () => {
  // Connection Operational Database
  db = mongoose.createConnection(`${Config.databaseUrl}/${Config.databaseName}`)
}


const collection = (collectionName: string) => db?.collection(collectionName);


export { init, collection }