import { DeleteResult, Repository } from "typeorm";
import { Like } from "../entities/Like";
import ILikeRepository from "./interface/ILikeRepository";
import { AppDataSource } from "../data-source";
import { ETypeLike } from "../entities/interfaces/like.interface";

class LikeRepository implements ILikeRepository {
  repo: Repository<Like>;
  constructor() {
    this.repo = AppDataSource.getRepository(Like);
  }
  create(data: Like): Promise<Like> {
    return this.repo.save(data);
  }
  delete(id: number): Promise<DeleteResult> {
    if (!id) return null;
    return this.repo.delete(id);
  }
  getByTypeAndTweetId(type: ETypeLike, tweetId: number): Promise<Like> {
    return this.repo.findOne({
      where: {
        type: type,
        tweet: {
          id: tweetId,
        },
      },
    });
  }
  getByTypeAndCommentId(type: ETypeLike, commentId: number): Promise<Like> {
    return this.repo.findOne({
      where: {
        type: type,
        comment: {
          id: commentId,
        },
      },
    });
  }
}
export default new LikeRepository();
