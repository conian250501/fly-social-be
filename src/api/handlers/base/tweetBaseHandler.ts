import TweetRepository from "../../../database/repositories/TweetRepository";
import { IBaseFilter } from "../../common/interface";
import cloudinary from "cloudinary";
import { Tweet } from "../../../database/entities/Tweet";
import { DeleteResult, UpdateResult } from "typeorm";

export interface ITweetBaseHandler {
  getAll(filter: IBaseFilter): Promise<{ tweets: Tweet[]; total: number }>;
  getById(id: number): Promise<Tweet>;
  delete(id: number): Promise<DeleteResult>;
  update(id: number, data: Tweet): Promise<UpdateResult>;
  upload(id: number, file: Express.Multer.File): Promise<string>;
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

  async update(id: number, data: Tweet): Promise<UpdateResult> {
    try {
      const result = await TweetRepository.update(id, data);
      return result;
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
}
