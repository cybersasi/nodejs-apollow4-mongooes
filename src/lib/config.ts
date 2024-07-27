require('dotenv').config()

interface IConfig {
  appVersion: string,
  databaseUrl: string,
  databaseName: string,
  // loggingDatabaseName: string,
  secret: string,
  tokenExp: number,
  port: string,
}

const Config: IConfig = {
  appVersion: "0.0.0",
  databaseUrl: process.env.MONGO_DB || "MONGO_DB",
  databaseName: process.env.MONGO_DB_NAME || "MONGO_DB_NAME",
  // loggingDatabaseName: process.env.MONGO_DB_LOGGING_NAME || "MONGO_DB_LOGGING_NAME",
  secret: process.env.JWT_SECRET || "JWT_SECRET",
  tokenExp: 604800, // one week = 60sec * 60min * 24hr * 7days
  port: process.env.SERVER_PORT || "SERVER_PORT",
}

export default Config