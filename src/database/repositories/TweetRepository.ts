import { DeleteResult, Repository, UpdateResult } from "typeorm";
import ITweetRepository from "./interface/ITweetRepository";
import { Tweet } from "../entities/Tweet";
import { AppDataSource } from "../data-source";
import { IBaseFilter } from "../../api/common/interface";

class TweetRepository implements ITweetRepository {
  repo: Repository<Tweet>;
  constructor() {
    this.repo = AppDataSource.getRepository(Tweet);
  }

  getAllByUser(userId: number, { limit, page }: IBaseFilter): Promise<Tweet[]> {
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
        storageTweets: {
          user: true,
        },
        user: true,
      },
      order: {
        createdAt: "DESC",
      },
      skip: page ? (page - 1) * limit : null,
      take: limit ? limit : null,
    });
  }
  getAllSaved(userId: number, { limit, page }: IBaseFilter): Promise<Tweet[]> {
    return this.repo.find({
      where: {
        storageTweets: {
          user: {
            id: userId,
          },
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
        storageTweets: {
          user: true,
        },
        user: true,
      },
      order: {
        storageTweets: {
          createdAt: "DESC",
        },
      },
      skip: page ? (page - 1) * limit : null,
      take: limit ? limit : null,
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
        storageTweets: {
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
        storageTweets: {
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
