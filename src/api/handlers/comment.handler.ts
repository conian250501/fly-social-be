import { Comment } from "../../database/entities/Comment";
import ICommentHandler, {
  IDataComment,
  IDataLike,
} from "./interface/ICommentHandler";
import { DeleteResult, UpdateResult } from "typeorm";
import { Like } from "../../database/entities/Like";
import { ETypeLike } from "../../database/entities/interfaces/like.interface";
import TweetRepository from "../../database/repositories/TweetRepository";
import CommentRepository from "../../database/repositories/CommentRepository";
import UserRepository from "../../database/repositories/UserRepository";
import cloudinary from "cloudinary";
import LikeRepository from "../../database/repositories/LikeRepository";

class CommentHandler implements ICommentHandler {
  async create(data: IDataComment): Promise<Comment> {
    try {
      const tweet = await TweetRepository.getById(data.tweetId);
      const user = await UserRepository.getById(data.userId);
      const newComment = await CommentRepository.create({
        ...data,
        tweet: tweet,
        user: user,
        likes: [],
      });
      return newComment;
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

      const comment = await CommentRepository.getById(id);

      if (file.mimetype.startsWith("image")) {
        const { secure_url } = await cloudinary.v2.uploader.upload(file.path, {
          public_id: `image_${comment.id}`,
          use_filename: true,
          folder: `fly-social/comments/${comment.id}`,
        });
        await CommentRepository.update(id, {
          image: secure_url,
        } as Comment);
        return secure_url;
      }

      if (file.mimetype.startsWith("video")) {
        const { secure_url } = await cloudinary.v2.uploader.upload(file.path, {
          public_id: `video_${comment.id}`,
          use_filename: true,
          folder: `fly-social/comments/${comment.id}`,
        });
        await CommentRepository.update(id, {
          video: secure_url,
        } as Comment);
      }
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, data: Comment): Promise<UpdateResult> {
    try {
      const result = await CommentRepository.update(id, data);
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
        prefix: `fly-social/comments/${id}`,
      });

      // Delete each file within the folder
      for (const resource of _result.resources) {
        await cloudinary.v2.uploader.destroy(resource.public_id);
      }
      const result = await CommentRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async like(data: IDataLike): Promise<Like> {
    try {
      const user = await UserRepository.getById(data.userId);
      const comment = await CommentRepository.getById(data.commentId);
      const newLike = await LikeRepository.create({
        type: data.type,
        user: user,
        comment: comment,
      } as Like);
      return newLike;
    } catch (error) {
      throw error;
    }
  }
  async dislike(type: ETypeLike, commentId: number): Promise<DeleteResult> {
    try {
      const like = await LikeRepository.getByTypeAndCommentId(type, commentId);

      const result = await LikeRepository.delete(like.id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getById(id: number): Promise<Comment> {
    try {
      const comment = await CommentRepository.getById(id);
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async getAllByTweet(tweetId: number): Promise<Comment[]> {
    try {
      const comments = await CommentRepository.getAllByTweet(tweetId);
      return comments;
    } catch (error) {
      throw error;
    }
  }
}
export default new CommentHandler();
