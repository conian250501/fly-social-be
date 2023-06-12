import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import ICommentRepository from "./interface/ICommentRepository";

class CommentRepository implements ICommentRepository {
  repo: Repository<Comment>;
  constructor() {
    this.repo = AppDataSource.getRepository(Comment);
  }
  create(data: Comment): Promise<Comment> {
    return this.repo.save(data);
  }
  getAllByTweet(tweetId: number): Promise<Comment[]> {
    return this.repo.find({
      where: {
        tweet: {
          id: tweetId,
        },
      },
      relations: {
        likes: {
          user: true,
        },
        tweet: {
          user: true,
          likes: true,
        },
        user: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }
  getById(id: number): Promise<Comment> {
    if (!id) return null;
    return this.repo.findOne({
      where: { id },
      relations: {
        likes: {
          user: true,
        },
        tweet: {
          user: true,
          likes: true,
        },
        user: true,
      },
    });
  }

  update(id: number, data: Comment): Promise<UpdateResult> {
    return this.repo.update(id, data);
  }
  delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
export default new CommentRepository();
