import cloudinary from "cloudinary";
import { User } from "../../database/entities/User";
import FollowRepository from "../../database/repositories/FollowRepository";
import UserRepository from "../../database/repositories/UserRepository";
import { IFilterGetUsers } from "../../database/repositories/interface/IUserRepository";
import { UserBaseHandler } from "./base/userBaseHandler";
import IUserHandler from "./interface/IUserHandler";

class UserHandler extends UserBaseHandler implements IUserHandler {
  async getAllUserFollowing(userId: number): Promise<User[]> {
    try {
      const followings = await FollowRepository.getAllByUser(userId);

      const users: User[] = [];
      for (const follow of followings) {
        users.push(follow.follower);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getAllUserFollowers(userId: number): Promise<User[]> {
    try {
      const followers = await FollowRepository.getAllByFollower(userId);

      const users: User[] = [];
      for (const follow of followers) {
        users.push(follow.user);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  async upload(
    id: number,
    files:
      | Express.Multer.File[]
      | {
          [fieldname: string]: Express.Multer.File[];
        }
  ): Promise<{ message: string }> {
    try {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const user = await UserRepository.getById(id);

      const fileList: { [key: string]: string } = {};
      for (const [key, value] of Object.entries(files)) {
        fileList[key] = value[0].path;
      }
      for (const [_key, value] of Object.entries(fileList)) {
        switch (_key) {
          case "avatar":
            const { secure_url } = await cloudinary.v2.uploader.upload(value, {
              public_id: `avatar_${user.id}`,
              use_filename: true,
              folder: `fly-social/users/${user.id}`,
            });
            await UserRepository.update(id, {
              avatar: secure_url,
            } as User);
            break;

          case "cover":
            const { secure_url: _secure_url } =
              await cloudinary.v2.uploader.upload(value, {
                public_id: `cover_${user.id}`,
                use_filename: true,
                folder: `fly-social/users/${user.id}`,
              });
            await UserRepository.update(id, {
              cover: _secure_url,
            } as User);
            break;
          default:
            break;
        }
      }

      return { message: `Upload image successfully` };
    } catch (error) {
      throw error;
    }
  }

  async getAllFollowingYet(
    userId: number,
    filter: IFilterGetUsers
  ): Promise<{ users: User[]; total: number }> {
    try {
      const myFollowings = await UserRepository.getById(userId);
      const followingIds = myFollowings.followings.map(
        (user) => user.follower.id
      );
      const [users, total] = await UserRepository.getUserFollowedYet(
        userId,
        followingIds,
        filter
      );

      return { users, total };
    } catch (error) {
      throw error;
    }
  }
}

export default new UserHandler();
