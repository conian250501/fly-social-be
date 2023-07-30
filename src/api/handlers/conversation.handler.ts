import UserRepository from "../../database/repositories/UserRepository";
import { Conversation } from "../../database/entities/Conversation";
import IConversationHandler, {
  IDataNewConversation,
} from "./interface/IConversationHandler";
import ConversationRepository from "../../database/repositories/ConversationRepository";

class ConversationHandler implements IConversationHandler {
  async create(
    currentUserId: number,
    data: IDataNewConversation
  ): Promise<Conversation> {
    try {
      const conversationExist = await ConversationRepository.getByParticipants([
        ...data.participantIds,
        currentUserId,
      ]);

      if (conversationExist) {
        return conversationExist;
      }

      const participants = await UserRepository.getAllByIds([
        ...data.participantIds,
        currentUserId,
      ]);

      const newConversation = await ConversationRepository.create({
        participants,
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
