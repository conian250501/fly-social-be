import { DeleteResult, Repository, UpdateResult } from "typeorm";
import ITweetRepository, {
  IFilterGetTweets,
} from "./interface/ITweetRepository";
import { Tweet } from "../entities/Tweet";
import { AppDataSource } from "../data-source";
import { IBaseFilter } from "../../api/common/interface";
import { ETypeLike } from "../entities/interfaces/like.interface";
import { ETweetStatus } from "../entities/interfaces/tweet.interface";

class TweetRepository implements ITweetRepository {
  repo: Repository<Tweet>;
  constructor() {
    this.repo = AppDataSource.getRepository(Tweet);
  }

  getAllByUser(
    userId: number,
    { limit, page, status, isArchived }: IFilterGetTweets
  ): Promise<Tweet[]> {
    return this.repo.find({
      where: {
        user: {
          id: userId,
        },
        status: status ? status : ETweetStatus.New,
      },
      withDeleted: isArchived ? true : false,

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
        status: ETweetStatus.New,
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
  getAllLiked(userId: number, { limit, page }: IBaseFilter): Promise<Tweet[]> {
    const skip = page ? (page - 1) * limit : null;
    const take = limit ? limit : null;
    return this.repo.find({
      where: {
        likes: {
          user: {
            id: userId,
          },
          type: ETypeLike.Tweet,
        },
        status: ETweetStatus.New,
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
      skip: skip,
      take: take,
    });
  }

  getAll({ page, limit }: IBaseFilter): Promise<[Tweet[], number]> {
    return this.repo.findAndCount({
      where: {
        isPrivate: false,
        status: ETweetStatus.New,
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
      skip: page ? (page - 1) * limit : null,
      take: limit ? limit : null,
      order: {
        createdAt: "DESC",
      },
    });
  }

  getById(id: number): Promise<Tweet> {
    return this.repo.findOne({
      where: {
        id: id,
        status: ETweetStatus.New,
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

  archive(id: number): Promise<UpdateResult> {
    return this.repo.softDelete(id);
  }
  restore(id: number): Promise<UpdateResult> {
    return this.repo.restore(id);
  }
}

export default new TweetRepository();
