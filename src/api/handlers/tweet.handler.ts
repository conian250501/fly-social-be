import { Tweet } from "../../database/entities/Tweet";
import ITweetHandler from "./interface/ITweetHander";
import TweetRepository from "../../database/repositories/TweetRepository";
import { DeleteResult, UpdateResult } from "typeorm";
import cloudinary from "cloudinary";
import UserRepository from "../../database/repositories/UserRepository";

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

  async getAll(): Promise<Tweet[]> {
    try {
      const tweets = await TweetRepository.getAll();
      return tweets;
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
        folder: "fly-social/tweets",
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

  async getAllByUser(userId: number): Promise<Tweet[]> {
    try {
      const tweets = await TweetRepository.getAllByUser(userId);
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
      const result = await TweetRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new TweetHandler();
