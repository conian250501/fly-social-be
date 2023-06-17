import { DeleteResult, UpdateResult } from "typeorm";
import { Like } from "../../../database/entities/Like";
import { Tweet } from "../../../database/entities/Tweet";
import { ETypeLike } from "../../../database/entities/interfaces/like.interface";
import { IBaseFilter } from "src/api/common/interface";

export interface IDataLike extends Omit<Like, "user" | "tweet"> {
  userId: number;
  tweetId: number;
}

export default interface ITweetHandler {
  getAllByUser(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getAllSaved(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getAllLiked(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
  getById(id: number): Promise<Tweet>;
  getAll(): Promise<Tweet[]>;
  create(userId: number, data: Tweet): Promise<Tweet>;
  update(id: number, data: Tweet): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
  upload(id: number, file: Express.Multer.File): Promise<string>;
  like(data: IDataLike): Promise<Like>;
  dislike(type: ETypeLike, tweetId: number): Promise<DeleteResult>;
}
