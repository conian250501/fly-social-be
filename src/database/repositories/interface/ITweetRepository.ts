import { DeleteResult, UpdateResult } from "typeorm";
import { Tweet } from "../../entities/Tweet";
import { IBaseFilter } from "../../../api/common/interface";
import { ETweetStatus } from "../../entities/interfaces/tweet.interface";

export interface IFilterGetTweets extends IBaseFilter {
  status?: ETweetStatus;
  isArchived: boolean;
}

export default interface ITweetRepository {
  getAllByUser(userId: number, filter: IFilterGetTweets): Promise<Tweet[]>;
  getAllSaved(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getAllLiked(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getAll(filter: IBaseFilter): Promise<[Tweet[], number]>;
  getById(id: number): Promise<Tweet>;
  create(data: Tweet): Promise<Tweet>;
  update(id: number, data: Tweet): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
  archive(id: number): Promise<UpdateResult>;
  restore(id: number): Promise<UpdateResult>;
}
