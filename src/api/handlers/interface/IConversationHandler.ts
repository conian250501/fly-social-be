import { IBaseFilter } from "../../common/interface";
import { Conversation } from "../../../database/entities/Conversation";

export interface IDataNewConversation
  extends Omit<Conversation, "participant"> {
  participantIds: number[];
}
export default interface IConversationHandler {
  create(
    currentUserId: number,
    data: IDataNewConversation
  ): Promise<Conversation>;
  getById(id: number): Promise<Conversation>;
  getAll(
    userId: number,
    filter: IBaseFilter
  ): Promise<{ conversations: Conversation[]; total: number }>;
}
