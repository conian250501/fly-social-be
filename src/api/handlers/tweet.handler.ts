import cloudinary from "cloudinary";
import { ETypeLike } from "src/database/entities/interfaces/like.interface";
import { DeleteResult, UpdateResult } from "typeorm";
import { Like } from "../../database/entities/Like";
import { Tweet } from "../../database/entities/Tweet";
import LikeRepository from "../../database/repositories/LikeRepository";
import TweetRepository from "../../database/repositories/TweetRepository";
import UserRepository from "../../database/repositories/UserRepository";
import ITweetHandler, { IDataLike } from "./interface/ITweetHander";
import { IBaseFilter } from "../common/interface";
import FollowRepository from "../../database/repositories/FollowRepository";
import { User } from "../../database/entities/User";
import { IFilterGetTweets } from "../../database/repositories/interface/ITweetRepository";
import { TweetBaseHandler } from "./base/tweetBaseHandler";

class TweetHandler extends TweetBaseHandler implements ITweetHandler {
  async create(userId: number, data: Tweet): Promise<Tweet> {
    try {
      const user = await UserRepository.getById(userId);
      const newTweet = await TweetRepository.create({
        content: data.content,
        isPrivate: data.isPrivate,
        user: user,
      } as Tweet);
      return newTweet;
    } catch (error) {
      throw error;
    }
  }

  async getAllFollowing(
    userId: number,
    { page, limit }: IBaseFilter
  ): Promise<Tweet[]> {
    try {
      const usersFollowing = await FollowRepository.getAllByUser(userId);

      const users: User[] = [];
      for (const follow of usersFollowing) {
        users.push(follow.follower);
      }

      const followedTweets = users
        .flatMap((followedUser) => followedUser.tweets)
        .filter((tweet) => tweet.isPrivate === false)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedTweets = followedTweets.slice(startIndex, endIndex);
      return paginatedTweets;
    } catch (error) {
      throw error;
    }
  }

  async getAllByUser(
    userId: number,
    filter: IFilterGetTweets
  ): Promise<Tweet[]> {
    try {
      const tweets = await TweetRepository.getAllByUser(userId, filter);
      return tweets;
    } catch (error) {
      throw error;
    }
  }

  async getAllSaved(userId: number, filter: IBaseFilter): Promise<Tweet[]> {
    try {
      const tweets = await TweetRepository.getAllSaved(userId, filter);
      return tweets;
    } catch (error) {
      throw error;
    }
  }
  async getAllLiked(userId: number, filter: IBaseFilter): Promise<Tweet[]> {
    try {
      const tweets = await TweetRepository.getAllLiked(userId, filter);
      return tweets;
    } catch (error) {
      throw error;
    }
  }

  async like(data: IDataLike): Promise<Like> {
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

  async dislike(type: ETypeLike, tweetId: number): Promise<DeleteResult> {
    try {
      const like = await LikeRepository.getByTypeAndTweetId(type, tweetId);

      const result = await LikeRepository.delete(like.id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async archive(id: number): Promise<UpdateResult> {
    try {
      const result = await TweetRepository.archive(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async restore(id: number): Promise<UpdateResult> {
    try {
      const result = await TweetRepository.restore(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new TweetHandler();
