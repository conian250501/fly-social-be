import { Like } from "../../database/entities/Like";
import LikeRepository from "../../database/repositories/LikeRepository";
import TweetRepository from "../../database/repositories/TweetRepository";
import UserRepository from "../../database/repositories/UserRepository";
import ILikeHandler, { IDataCreateLike } from "./interface/ILikeHandler";

class LikeHandler implements ILikeHandler {
  async create(data: IDataCreateLike): Promise<Like> {
    try {
      const user = await UserRepository.getById(data.userId);
      const tweet = await TweetRepository.getById(data.tweetId);
      const newLike = await LikeRepository.create({
        type: data.type,
        user: user,
        tweet: tweet,
      } as Like);
      return newLike;
    } catch (error) {
      throw error;
    }
  }
}

export default new LikeHandler();
