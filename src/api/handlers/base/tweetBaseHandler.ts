import TweetRepository from "../../../database/repositories/TweetRepository";
import { IBaseFilter } from "../../common/interface";
import { Tweet } from "../../../database/entities/Tweet";

export interface ITweetBaseHandler {
  getAll(filter: IBaseFilter): Promise<{ tweets: Tweet[]; total: number }>;
  getById(id: number): Promise<Tweet>;
}

export class TweetBaseHandler implements ITweetBaseHandler {
  async getAll(
    filter: IBaseFilter
  ): Promise<{ tweets: Tweet[]; total: number }> {
    try {
      const [tweets, total] = await TweetRepository.getAll(filter);
      return { tweets, total };
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<Tweet> {
    try {
      const tweet = await TweetRepository.getById(id);
      return tweet;
    } catch (error) {
      throw error;
    }
  }
}
