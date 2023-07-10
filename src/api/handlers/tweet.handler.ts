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

class TweetHandler implements ITweetHandler {
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

  async getAll(filter: IBaseFilter): Promise<Tweet[]> {
    try {
      const tweets = await TweetRepository.getAll(filter);
      return tweets;
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
  async getById(id: number): Promise<Tweet> {
    try {
      const tweet = await TweetRepository.getById(id);
      return tweet;
    } catch (error) {
      throw error;
    }
  }
  async upload(id: number, file: Express.Multer.File): Promise<string> {
    try {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const tweet = await TweetRepository.getById(id);

      const { secure_url } = await cloudinary.v2.uploader.upload(file.path, {
        public_id: `file_${tweet.id}`,
        use_filename: true,
        folder: `fly-social/tweets/${tweet.id}`,
      });
      if (file.mimetype.startsWith("image")) {
        await TweetRepository.update(id, {
          image: secure_url,
        } as Tweet);
        return secure_url;
      }

      if (file.mimetype.startsWith("video")) {
        await TweetRepository.update(id, {
          video: secure_url,
        } as Tweet);
      }
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

  async update(id: number, data: Tweet): Promise<UpdateResult> {
    try {
      const result = await TweetRepository.update(id, data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const _result = await cloudinary.v2.api.resources({
        type: "upload",
        prefix: `fly-social/tweets/${id}`,
      });

      // Delete each file within the folder
      for (const resource of _result.resources) {
        await cloudinary.v2.uploader.destroy(resource.public_id);
      }

      const result = await TweetRepository.delete(id);
      return result;
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
}

export default new TweetHandler();
