import { Application } from "express";
import { Environment } from "./config/enviroment";
import api from "./api"
import { config } from "./config/config";
import database from "./database";

Environment.setup();

async function startDatabase() {
    await database.setup();
}

async function startApiServer() {
  const app: Application = await api.server();
  app.listen(config.NODE_ENV, () => {
    console.log(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
  })
}

startDatabase();
startApiServer();