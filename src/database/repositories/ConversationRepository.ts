import { In, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Conversation } from "../entities/Conversation";
import IConversationRepository from "./interface/IConversationRepository";
import { IBaseFilter } from "../../api/common/interface";

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
  getAll(
    userId: number,
    { page, limit }: IBaseFilter
  ): Promise<[Conversation[], number]> {
    return this.repo.findAndCount({
      where: {
        participants: {
          id: userId,
        },
      },
      relations: {
        participants: true,
        messages: true,
      },
      skip: page ? (page - 1) * limit : null,
      take: limit ? limit : null,
    });
  }
}

export default new ConversationRepository();
