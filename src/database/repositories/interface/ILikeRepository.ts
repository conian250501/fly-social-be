import { ETypeLike } from "../../entities/interfaces/like.interface";
import { Like } from "../../entities/Like";
import { DeleteResult } from "typeorm";

export default interface ILikeRepository {
  create(data: Like): Promise<Like>;
  delete(id: number): Promise<DeleteResult>;
  getByTypeAndTweetId(type: ETypeLike, tweetId: number): Promise<Like>;
  getByTypeAndCommentId(type: ETypeLike, commentId: number): Promise<Like>;
}
