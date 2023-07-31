import { IBaseFilter } from "../../..//api/common/interface";
import { Conversation } from "../../entities/Conversation";

export default interface IConversationRepository {
  create(data: Conversation): Promise<Conversation>;
  getById(id: number): Promise<Conversation>;
  getByParticipants(ids: number[]): Promise<Conversation>;
  getAll(
    userId: number,
    filter: IBaseFilter
  ): Promise<[Conversation[], number]>;
}
