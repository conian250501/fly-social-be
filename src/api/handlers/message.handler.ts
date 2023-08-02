import UserRepository from "../../database/repositories/UserRepository";
import { Message } from "../../database/entities/Messages";
import MessageRepository from "../../database/repositories/MessageRepository";
import IMessageHandler, { IDataNewMessage } from "./interface/IMessageHandler";
import ConversationRepository from "../../database/repositories/ConversationRepository";

class MessageHandler implements IMessageHandler {
  async create(data: IDataNewMessage): Promise<Message> {
    try {
      const author = await UserRepository.getById(data.authorId);
      const conservation = await ConversationRepository.getById(
        data.conversationId
      );

      const newMessage = await MessageRepository.create({
        ...data,
        author,
        conservation,
      } as Message);

      return newMessage;
    } catch (error) {
      throw error;
    }
  }
  async getAll(conversationId: number): Promise<Message[]> {
    try {
      const conversation = await ConversationRepository.getById(conversationId);
      if (!conversation) {
        throw new Error("Conversation doesn't exist");
      }
      const messages = conversation.messages.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
      return messages;
    } catch (error) {
      throw error;
    }
  }
}
export default new MessageHandler();
