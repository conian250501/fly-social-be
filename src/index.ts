import { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import api from "./api";
import { config } from "./config/config";
import { Environment } from "./config/enviroment";
import database from "./database";
import ConversationRepository from "./database/repositories/ConversationRepository";
import MessageRepository from "./database/repositories/MessageRepository";
import UserRepository from "./database/repositories/UserRepository";

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

    // JOIN CONVERSATION
    socket.on("joinConversation", (conversationId) => {
      socket.join(`conversation_${conversationId}`);
      console.log(`User joined room ${conversationId}`);
    });

    // LEAVE CONVERSATION
    socket.on("leaveConversation", (conversationId) => {
      socket.leave(`conversation_${conversationId}`);
      console.log(`User leaved room ${conversationId}`);
    });

    // SEND NEW MESSAGE
    socket.on("newMessage", async (data) => {
      io.to(`conversation_${data.conversation.id}`).emit(
        "messageResponse",
        data
      );
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
