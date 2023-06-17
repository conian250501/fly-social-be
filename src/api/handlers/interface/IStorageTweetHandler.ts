import { DeleteResult } from "typeorm";
import { IBaseFilter } from "../../../api/common/interface";
import { StorageTweet } from "../../../database/entities/StorageTweet";
import { Tweet } from "../../../database/entities/Tweet";

export default interface IStorageTweetHandler {
  saveTweet(tweetId: number, userId: number): Promise<StorageTweet>;
  unSaveTweet(tweetId: number, userId: number): Promise<DeleteResult>;
  getAllByUser(userId: number, filter: IBaseFilter): Promise<Tweet[]>;
}
