import { IBaseFilter } from "../../../api/common/interface";
import { StorageTweet } from "../../entities/StorageTweet";
import { DeleteResult } from "typeorm";

export default interface IStorageTweetRepository {
  create(data: StorageTweet): Promise<StorageTweet>;
  delete(id: number): Promise<DeleteResult>;
  getById(id: number): Promise<StorageTweet>;
  getByTweetAndUser(tweetId: number, userId: number): Promise<StorageTweet>;
  getAllByUser(userId: number, filter: IBaseFilter): Promise<StorageTweet[]>;
}
