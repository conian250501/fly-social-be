import UserRepository from "../../database/repositories/UserRepository";
import { Conversation } from "../../database/entities/Conversation";
import IConversationHandler, {
  IDataNewConversation,
} from "./interface/IConversationHandler";
import ConversationRepository from "../../database/repositories/ConversationRepository";

class ConversationHandler implements IConversationHandler {
  async create(data: IDataNewConversation): Promise<Conversation> {
    try {
      const host = await UserRepository.getById(data.hostId);
      const participant = await UserRepository.getById(data.participantId);
      const newConversation = await ConversationRepository.create({
        host,
        participant,
      } as Conversation);

      return newConversation;
    } catch (error) {
      throw error;
    }
  }
  async getById(id: number): Promise<Conversation> {
    try {
      const conversation = await ConversationRepository.getById(id);
      return conversation;
    } catch (error) {
      throw error;
    }
  }
}

export default new ConversationHandler();
