import { ArrayContains, In, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Conversation } from "../entities/Conversation";
import IConversationRepository from "./interface/IConversationRepository";

class ConversationRepository implements IConversationRepository {
  repo: Repository<Conversation>;

  constructor() {
    this.repo = AppDataSource.getRepository(Conversation);
  }

  create(data: Conversation): Promise<Conversation> {
    return this.repo.save(data);
  }
  getById(id: number): Promise<Conversation> {
    if (!id) return null;
    return this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        messages: {
          author: true,
        },
        participants: true,
      },
    });
  }
  getByParticipants(ids: number[]): Promise<Conversation> {
    return this.repo
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.participants", "participant")
      .where(
        "conversation.id IN (SELECT conversation_id FROM conversations_participants WHERE participant_id IN (:...ids) GROUP BY conversation_id HAVING COUNT(DISTINCT participant_id) = :count)",
        { ids, count: ids.length }
      )
      .getOne();
  }
}

export default new ConversationRepository();
