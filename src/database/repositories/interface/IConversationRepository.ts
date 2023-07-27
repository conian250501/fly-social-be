import { Conversation } from "../../entities/Conversation";

export default interface IConversationRepository {
  create(data: Conversation): Promise<Conversation>;
  getDetail(senderId: number, receiverId: number): Promise<Conversation>;
  getById(id: number): Promise<Conversation>;
}
