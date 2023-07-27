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
  getDetail(senderId: number, receiverId: number): Promise<Conversation> {
    if (!senderId || !receiverId) {
      return null;
    }

    return this.repo.findOne({
      where: {
        sender: {
          id: senderId,
        },
        receiver: {
          id: receiverId,
        },
      },
      relations: {
        messages: {
          author: true,
        },
      },
    });
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
