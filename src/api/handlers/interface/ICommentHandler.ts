import { ETypeLike } from "src/database/entities/interfaces/like.interface";
import { DeleteResult, UpdateResult } from "typeorm";
import { Comment } from "../../../database/entities/Comment";
import { Like } from "../../../database/entities/Like";

export interface IDataComment extends Omit<Comment, "tweet" | "user"> {
  tweetId: number;
  userId: number;
}
export interface IDataLike extends Omit<Like, "user" | "comment"> {
  userId: number;
  commentId: number;
}

export default interface ICommentHandler {
  create(data: IDataComment): Promise<Comment>;
  delete(id: number): Promise<DeleteResult>;
  update(id: number, data: Comment): Promise<UpdateResult>;
  getById(id: number): Promise<Comment>;
  upload(id: number, file: Express.Multer.File): Promise<string>;
  like(data: IDataLike): Promise<Like>;
  dislike(type: ETypeLike, commentId: number): Promise<DeleteResult>;
  getAllByTweet(tweetId: number): Promise<Comment[]>;
}
