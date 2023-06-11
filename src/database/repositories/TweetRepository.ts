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
        comments: {
          likes: true,
          user: true,
        },
        likes: {
          user: true,
        },
      },
    });
  }

  getAll(): Promise<Tweet[]> {
    return this.repo.find({
      where: {
        isPrivate: false,
      },
      relations: {
        comments: {
          likes: true,
          user: true,
        },
        user: true,
        likes: {
          user: true,
        },
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  getById(id: number): Promise<Tweet> {
    return this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        comments: {
          likes: true,
          user: true,
        },
        likes: {
          user: true,
        },
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
