import { DeleteResult, Repository } from "typeorm";
import { StorageTweet } from "../entities/StorageTweet";
import IStorageTweetRepository from "./interface/IStorageTweetRepository";
import { AppDataSource } from "../data-source";
import { IBaseFilter } from "src/api/common/interface";

class StorageTweetRepository implements IStorageTweetRepository {
  repo: Repository<StorageTweet>;
  constructor() {
    this.repo = AppDataSource.getRepository(StorageTweet);
  }
  create(data: StorageTweet): Promise<StorageTweet> {
    return this.repo.save(data);
  }
  delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
  getById(id: number): Promise<StorageTweet> {
    return this.repo.findOne({
      where: {
        id,
      },
      relations: {
        tweet: true,
        user: true,
      },
    });
  }
  getByTweetAndUser(tweetId: number, userId: number): Promise<StorageTweet> {
    return this.repo.findOne({
      where: {
        tweet: {
          id: tweetId,
        },
        user: {
          id: userId,
        },
      },
      relations: {
        tweet: true,
        user: true,
      },
    });
  }
  getAllByUser(
    userId: number,
    { page, limit }: IBaseFilter
  ): Promise<StorageTweet[]> {
    return this.repo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        tweet: {
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
      },
      order: {
        createdAt: "DESC",
      },
      skip: page ? (page - 1) * limit : null,
      take: limit ? limit : null,
    });
  }
}

export default new StorageTweetRepository();
