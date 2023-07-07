require('dotenv').config()

interface IConfig {
  databaseUrl: string;
  databaseName: string;
}

const Config: IConfig = {
  databaseUrl: process.env.MONGO_DB || "MONGO_DB",
  databaseName: process.env.MONGO_DB_NAME || "MONGO_DB_NAME",
}

export default Config