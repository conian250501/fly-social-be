import { DeleteResult, Repository, UpdateResult } from "typeorm";
import ITweetRepository from "./interface/ITweetRepository";
import { Tweet } from "../entities/Tweet";
import { AppDataSource } from "../data-source";

class TweetRepository implements ITweetRepository {
  repo: Repository<Tweet>;
  constructor() {
    this.repo = AppDataSource.getRepository(Tweet);
  }

  getAllByUser(userId: number): Promise<Tweet[]> {
    return this.repo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        comments: true,
        likes: true,
      },
    });
  }

  getAll(): Promise<Tweet[]> {
    return this.repo.find({
      relations: {
        comments: true,
        user: true,
        likes: true,
      },
    });
  }

  getById(id: number): Promise<Tweet> {
    return this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        comments: true,
        likes: true,
        user: true,
      },
    });
  }

  create(data: Tweet): Promise<Tweet> {
    return this.repo.save(data);
  }
  update(id: number, data: Tweet): Promise<UpdateResult> {
    return this.repo.update(id, data);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}

export default new TweetRepository();
