import { Repository } from "typeorm";
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
      },
    });
  }
}

export default new ConversationRepository();
