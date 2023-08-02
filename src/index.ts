import { Application } from "express";
import { Environment } from "./config/enviroment";
import api from "./api";
import { config } from "./config/config";
import database from "./database";
import { createServer } from "http";
import { Server } from "socket.io";

Environment.setup();

async function startDatabase() {
  await database.setup();
}

async function startApiServer() {
  const app: Application = await api.server();
  // app.listen(config.SERVER_PORT, () => {
  //   console.log(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
  // })

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(">>> User connected websocket", socket.id);

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
    socket.on("newMessage", (data) => {
      io.emit("messageResponse", data);
    });
  });

  httpServer.listen(config.SERVER_PORT, () => {
    console.log(
      `Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`
    );
  });
}

startDatabase();
startApiServer();
