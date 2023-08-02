import { Message } from "src/database/entities/Messages";

export interface IDataNewMessage
  extends Omit<Message, "author" | "conversation"> {
  authorId: number;
  conversationId: number;
}

export default interface IMessageHandler {
  create(data: IDataNewMessage): Promise<Message>;
  getAll(conversationId: number): Promise<Message[]>;
}
