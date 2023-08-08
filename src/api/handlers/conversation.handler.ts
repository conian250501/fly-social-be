import UserRepository from "../../database/repositories/UserRepository";
import { Conversation } from "../../database/entities/Conversation";
import IConversationHandler, {
  IDataNewConversation,
} from "./interface/IConversationHandler";
import ConversationRepository from "../../database/repositories/ConversationRepository";
import { IBaseFilter } from "../common/interface";

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

      if (data.participantIds.length > 2) {
        const newConversation = await ConversationRepository.create({
          participants,
          isGroup: true,
          groupName: `${participants[0].name},${participants[1].name} and other people`,
        } as Conversation);
        return newConversation;
      }

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
  async getAll(
    userId: number,
    { page, limit }: IBaseFilter
  ): Promise<{ conversations: Conversation[]; total: number }> {
    try {
      const user = await UserRepository.getById(userId);
      const _conversations = user.conversations;
      const total = _conversations.length;

      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, total);

      const conversations = _conversations.slice(startIndex, endIndex);

      return { conversations, total };
    } catch (error) {
      throw error;
    }
  }
}

export default new ConversationHandler();
