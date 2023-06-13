import StorageTweetRepository from "../../database/repositories/StorageTweetRepository";
import { StorageTweet } from "../../database/entities/StorageTweet";
import IStorageTweetHandler from "./interface/IStorageTweetHandler";
import { DeleteResult } from "typeorm";
import TweetRepository from "../../database/repositories/TweetRepository";
import UserRepository from "../../database/repositories/UserRepository";

class StorageTweetHandler implements IStorageTweetHandler {
  async saveTweet(tweetId: number, userId: number): Promise<StorageTweet> {
    try {
      const tweet = await TweetRepository.getById(tweetId);
      const user = await UserRepository.getById(userId);
      const newStorageTweet = await StorageTweetRepository.create({
        tweet: tweet,
        user: user,
      } as StorageTweet);
      return newStorageTweet;
    } catch (error) {
      throw error;
    }
  }
  async unSaveTweet(tweetId: number, userId: number): Promise<DeleteResult> {
    try {
      const storageTweet = await StorageTweetRepository.getByTweetAndUser(
        tweetId,
        userId
      );
      const result = await StorageTweetRepository.delete(storageTweet.id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export default new StorageTweetHandler();
