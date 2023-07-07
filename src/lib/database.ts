import mongoose from "mongoose";

let db: any;

const init = async () => {
  // Connection Operational Database
  db = mongoose.createConnection(`https://database`)
}


const collection = (collectionName: string) => db?.collection(collectionName);


export { init, collection }