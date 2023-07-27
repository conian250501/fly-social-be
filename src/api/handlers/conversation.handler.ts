import UserRepository from "../../database/repositories/UserRepository";
import { Conversation } from "../../database/entities/Conversation";
import IConversationHandler, {
  IDataNewConversation,
} from "./interface/IConversationHandler";
import ConversationRepository from "../../database/repositories/ConversationRepository";

class ConversationHandler implements IConversationHandler {
  async create(data: IDataNewConversation): Promise<Conversation> {
    try {
      const conservationExist = await ConversationRepository.getDetail(
        data.senderId,
        data.receiverId
      );

      // Check conversation exist yet
      if (conservationExist) {
        return conservationExist;
      }

      const sender = await UserRepository.getById(data.senderId);
      const receiver = await UserRepository.getById(data.receiverId);
      const newConversation = await ConversationRepository.create({
        sender,
        receiver,
      } as Conversation);
      return newConversation;
    } catch (error) {
      throw error;
    }
  }
}

export default new ConversationHandler();
