import { Conversation } from "../../../database/entities/Conversation";

export interface IDataNewConversation
  extends Omit<Conversation, "host" | "participant"> {
  hostId: number;
  participantId: number;
}
export default interface IConversationHandler {
  create(data: IDataNewConversation): Promise<Conversation>;
  getById(id: number): Promise<Conversation>;
}
