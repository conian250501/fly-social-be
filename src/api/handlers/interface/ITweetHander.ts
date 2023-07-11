import { DeleteResult, UpdateResult } from "typeorm";
import { IBaseFilter } from "../../../api/common/interface";
import { Like } from "../../../database/entities/Like";
import { Tweet } from "../../../database/entities/Tweet";
import { ETypeLike } from "../../../database/entities/interfaces/like.interface";
import { IFilterGetTweets } from "../../../database/repositories/interface/ITweetRepository";

export interface IDataLike extends Omit<Like, "user" | "tweet"> {
  userId: number;
  tweetId: number;
}

export default interface ITweetHandler {
  getAllByUser(userId: number, filter: IFilterGetTweets): Promise<Tweet[]>;
  getAllFollowing(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getAllSaved(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getAllLiked(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getById(id: number): Promise<Tweet>;
  getAll(filter: IBaseFilter): Promise<Tweet[]>;
  create(userId: number, data: Tweet): Promise<Tweet>;
  update(id: number, data: Tweet): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
  upload(id: number, file: Express.Multer.File): Promise<string>;
  like(data: IDataLike): Promise<Like>;
  dislike(type: ETypeLike, tweetId: number): Promise<DeleteResult>;
  archive(id: number): Promise<UpdateResult>;
  restore(id: number): Promise<UpdateResult>;
}
