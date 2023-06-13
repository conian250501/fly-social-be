import { DeleteResult } from "typeorm";
import { StorageTweet } from "../../../database/entities/StorageTweet";

export default interface IStorageTweetHandler {
  saveTweet(tweetId: number, userId: number): Promise<StorageTweet>;
  unSaveTweet(tweetId: number, userId: number): Promise<DeleteResult>;
}
