import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Message } from "../entities/Messages";
import IMessageRepository from "./interface/IMessageRepository";

class MessageRepository implements IMessageRepository {
  repo: Repository<Message>;

  constructor() {
    this.repo = AppDataSource.getRepository(Message);
  }

  create(data: Message): Promise<Message> {
    return this.repo.save(data);
  }
}
export default new MessageRepository();
