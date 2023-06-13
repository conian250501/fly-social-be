import { StorageTweet } from "src/database/entities/StorageTweet";
import { DeleteResult } from "typeorm";

export default interface IStorageTweetRepository {
  create(data: StorageTweet): Promise<StorageTweet>;
  delete(id: number): Promise<DeleteResult>;
  getById(id: number): Promise<StorageTweet>;
  getByTweetAndUser(tweetId: number, userId: number): Promise<StorageTweet>;
}
