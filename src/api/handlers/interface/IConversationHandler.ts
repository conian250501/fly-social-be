import { Conversation } from "../../../database/entities/Conversation";

export interface IDataNewConversation
  extends Omit<Conversation, "sender" | "receiver"> {
  senderId: number;
  receiverId: number;
}
export default interface IConversationHandler {
  create(data: IDataNewConversation): Promise<Conversation>;
}
